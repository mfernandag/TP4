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

const formCompleteValidation = () => {
    let name, email, address, phone
    name = document.getElementById('name');
    email = document.getElementById('email');
    address = document.getElementById('address');
    phone = document.getElementById('phone');
    var filterEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var text = /^[a-zA-Z]+$/
    let canSubmit = true;
    if(name.value == '' && email.value == '' && address.value == '' && phone.value == ''){
        canSubmit = false;
    }else{
        document.getElementById('submitBtn').disabled = !canSubmit;
    }
    
    if (!filterEmail.test(email.value)) {
        document.getElementById('submitBtn').disabled = canSubmit;
        return false;
    }
}

const validateForm = () => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    let isValid = 1;

    if(name.length > 1 && email.length > 1 && address.length > 1 && phone.length > 1){
        return false;
    }

    let isOnlyText = /^[a-zA-Z]+$/.test(name);
    if(!isOnlyText){
        return false;
    }

    isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    if(!isValidEmail){
        return false;
    }

    let isNumber = /^\d+$/.test(phone);
    if(!isNumber){
        return false
    }
    document.getElementById('form').Submit();
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
        .catch(error => {
            // acá que ponemos?
        });
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






