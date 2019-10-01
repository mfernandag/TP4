const api = 'http://localhost:4002/api/users';

// Funcion de abrir y cerrar modal
const toggleModal = () => { 
    let modal = document.getElementById('modalContainer');
    modal.classList.toggle('hidden')
    if (modal.classList.contains('hidden')){
        modal.classList.add('active');
    }
    clean()
}

const toggleEditModal = () => {
    let editModal = document.getElementById('editModalContainer');
    editModal.classList.toggle('hidden')
    if (editModal.classList.contains('hidden')){
        editModal.classList.add('active')
    }
    clean()
}

const toggleDeleteModal = () => {
    let deleteModal = document.getElementById('deleteModalContainer');
    deleteModal.classList.toggle('hidden')
    if (deleteModal.classList.contains('hidden')){
        deleteModal.classList.add('active')
    }
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
        <a class="edit" id="${id}" onclick="toggleEditModal()">
        <img class="tableIcons" src="assets/images/edit.png">
        </a>
        <a class="delete" id="${id}" onclick="toggleDeleteModal()">
        <img class="tableIcons" src="assets/images/delete.png" onClick="deleteUser(${id})">
        </a>
    </td>
  </tr>
` ;

 // tenemos que crear modal para editar y otro para eliminar. 


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
        alert('Please complete all the fields properly')
    }
}

// Borremos usuarios :(

const deleteUser = (id) => {
     openDelete();
      
        const buttonDelete = document.querySelector('.delete');
        buttonDelete.onclick = ()=>{
          fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            document.getElementById(`user${id}`).remove()
            closeDelete();
          })
        } 
}

// Modales
const deleteModal = document.querySelector('.delete-modal');
//open delete modal
const openDelete = ()=>{
    const visibleDelete = ()=>deleteModal.classList.remove('hidden');
    visibleDelete();
}
//close delete modal
const closeDelete =()=>{
    const hiddenDelete=() => deleteModal.classList.add('hidden');
    hiddenDelete();
}

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






