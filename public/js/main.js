const api = 'http://localhost:4002/api/users';

// Funcion para abrir y cerrar modal para agregar empleados
const toggleModal = () => { 
    let modal = document.getElementById('modalContainer');
    modal.classList.toggle('hidden')
    if (modal.classList.contains('hidden')){
        modal.classList.add('active');
    }
    clean()
}

// Funcion para abrir y cerrar modal para editar empleados

const toggleEditModal = (id) => {
    let editModal = document.getElementById('editModalContainer');
    let editBtn = document.getElementsByClassName('addBtn')
    editBtn.onclick = () => editEmployee(id)
    editModal.classList.toggle('hidden')
    if (editModal.classList.contains('hidden')){
        editModal.classList.add('active')
    }
    fetch(`${api}/${id}`)
    .then(res => res.json())
    .then(res => fillEditModal(res)) 
}

// Funcion para abrir y cerrar modal para eliminar 

const toggleDeleteModal = (id) => {
    let deleteModal = document.getElementById('deleteModalContainer');
    let deleteBtn = document.getElementsByClassName('delete')
    deleteModal.classList.toggle('hidden')
    if (deleteModal.classList.contains('hidden')){
        deleteModal.classList.add('active')
    }
    deleteBtn.onclick = () => deleteEmployee(id)
    clean()
}


//Limpiar el form
const clean = ()=>{
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    document.getElementById('phone').value = '';
  
  }

// Inicializa el programa

const initialize = () => {
    getEmployees()
}

//para que solo haga el submit si todos los campos están completos
const formValidation = () => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    let isValid = false;
    if(name !== '' && phone !== '' && address !== '' && email !== ''){
        isValid = true;
    }else{
        isValid = false;
    }
    return isValid
}

const emailValidation = (emailAccount) => {
    let filterEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = false
    if(filterEmail.test(emailAccount)){
        isValid = true;
    }else{
        isValid = false;
    }
    return isValid
}

const textValidation = (name) => {
    var text = /^[a-zA-Z]/
    let isValid = false;
    if(text.test(name) && name.length > 5){
        isValid = true;
    }else{
        isValid = false;
    }
    return isValid
}
// Hacemos un get - fetch de los usuarios
const getEmployees = () => {
    fetch(api)
    .then(res => res.json())
    .then(res => printEmployees(res.users))
}

// Imprime los elementos en el dom

const printEmployees = data => {
    const container = document.getElementById('tableBody')
    container.innerHTML = ''
    data.forEach(e => container.innerHTML += createTableElements(e))
}

// Crea elementos de la tabla con los datos

const createTableElements = ({id, name, email, address, phone}) =>
 `
  <tr>
    <td>
        <span>
            <input type="checkbox">
        </span>
    </td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${address}</td>
    <td>${phone}</td>
    <td class="option-btns">
        <a class="edit" id="${id}" onclick="toggleEditModal(id)">
        <img class="tableIcons" src="assets/images/edit.png">
        </a>
        <a class="delete" id="${id}" onclick="toggleDeleteModal(id)">
        <img class="tableIcons" src="assets/images/delete.png">
        </a>
    </td>
  </tr>
` ;


// Posteemos usuarios!
// 1) tomar los valores del modal
// 2) postearlos en el servidor
// 3) llamar a initialize

// Obtenemos los datos del form
const getFormValues = () => {
    const userName = document.getElementById('name');
    const userEmail = document.getElementById('email');
    const userAddress = document.getElementById('address');
    const userPhone = document.getElementById('phone');
    let payload = {
        'name': userName.value,
        'email': userEmail.value,
        'address': userAddress.value,
        'phone': userPhone.value
    };
    postEmployee(payload)
}

const postEmployee = payload => {
    event.preventDefault()
    const userEmail = document.getElementById('email').value;
    const userName = document.getElementById('name').value;
    if(formValidation(payload) && emailValidation(userEmail) && textValidation(userName)){
        fetch( api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(res => {
                toggleModal()
                initialize()
            })
            .catch(error=> console.log(error))
                
    }else{
        alert('Please complete all the fields correctly')
    }
}

// Editemos usuarios!
// 1) Tomar el id del usuario
// 2) Rellenar el modal con la informacion pre-cargada

const fillEditModal = data => {
    let form = document.getElementById('editForm')
    const {name, email, address, phone} = form

    name.value = data.name;
    email.value = data.email;
    address.value = data.address;
    phone.value = data.phone;
}

// Editar usuarios efectivamente
const editEmployee = id => {
    const editForm = document.getElementById('editForm')
    const {name, email, address, phone} = editForm
    const data = {
        name: name.value,
        email: email.value,
        address: address.value,
        phone: phone.value
    }

        fetch(`${api}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
               // console.log(res);
                toggleEditModal(id)
                getEmployees()
            })
    }



// Borremos usuarios :(

// 1) Tomamos el id del usuario
// 2) La funcion que elimina al usuario debe usar ese mismo id
// 3) Cerrar el modal
// 4) Llamar a initialize para que se reimpriman los usuarios


const deleteEmployee = id => {
    fetch(`${api}/${id}`, {
        method: 'DELETE',
        headers: {
			'Content-Type': 'application/json'
		}
    })
    .then(res => res.json())
    .then(res => {
        toggleDeleteModal(id)
        initialize()
    })
}

// Filtremos usuarios

const searchValues = () => {
    var input, filter, table, tr;
    input = document.getElementById("filterInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableBody");
    tr = table.getElementsByTagName('tr');
    for (let i = 0; i < tr.length; i++) {
        let tdData = tr[i].getElementsByTagName("td");
        let test = false;
    for(let j = 0; j < tdData.length; j++){
        let td = tdData[j];
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            test = true;
        } 
    }
    if(test){
        tr[i].style.display = "";
    }
    else {
        tr[i].style.display = "none";
    }
  }
}






