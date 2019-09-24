const api = 'http://localhost:4002/api/users';

// Funcion de abrir y cerrar modal
const toggleModal = () => { 
    let modal = document.getElementById('modalContainer');
    modal.classList.toggle('hidden')
    if (modal.classList.contains('hidden')){
        modal.classList.add('active')
    }
}

// Obtener los datos del modal
const getModalValues = () => {
    const userName = document.getElementById('name');
    const userEmail = document.getElementById('email');
    const userAdress = document.getElementById('adress');
    const userPhone = document.getElementById('phone');
    let modalFullData = {
        'name': userName.value,
        'email': userEmail.value,
        'adress': userAdress.value,
        'phone': userPhone.value
    };
    console.log(modalFullData)
    toggleModal()
}


//Limpiar el form
const clean = ()=>{
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('adress').value = '';
    document.getElementById('phone').value = '';
  
  }

// Creamos los usuarios

const initialize = () => {
    getEmployees()
}

const getEmployees = () => {
    fetch(api)
    .then(res => res.json())
    .then(res => printEmployees(res.users))
}

const printEmployees = data => {
    const container = document.getElementById('tableBody')
    container.innerHTML = ''
    data.forEach(e => container.innerHTML += createTableElements(e))
}

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
        <a class="edit" id="${id}" onclick="toggleModal()">
        <img class="tableIcons" src="assets/images/edit.png">
        </a>
        <a class="delete" id="${id}" onclick="toggleModal()">
        <img class="tableIcons" src="assets/images/delete.png">
        </a>
    </td>
  </tr>
` ;

 // tenemos que crear modal para editar y otro para eliminar. 







