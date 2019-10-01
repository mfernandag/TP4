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
        <img class="tableIcons" src="assets/images/delete.png" onclick="deleteEmployee(${id})">
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

// Editemos usuarios!
// 1) Tomar el id del usuario
// 2) Rellenar el modal con la informacion pre-cargada



// Borremos usuarios :(

// 1) Tomamos el id del usuario
// 2) La funcion que elimina al usuario debe usar ese mismo id
// 3) Cerrar el modal
// 4) Llamar a initialize para que se reimpriman los usuarios

// ELIMINAR EMPLEADO
const deleteEmployee = id => {
    fetch(`${api}/${id}`, {
        method: 'DELETE',
        headers: {
			'Content-Type': 'application/json'
		}
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        toggleDeleteModal()
        initialize()
    })
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









