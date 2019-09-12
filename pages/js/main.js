let newEmployee = []

// Funcion de modal
const toggleModal = () => { 
    let modal = document.getElementById('modalContainer');
    modal.classList.toggle('hidden')
    if (modal.classList.contains('hidden')){
        modal.classList.add('active')
    }
}

const getModalValues = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const adress = document.getElementById('adress').value;
    const phone = document.getElementById('phone').value
    let modalFullData = {'name': name, 'email': email, 'adress': adress, 'phone': phone};
    newEmployee.push(modalFullData)
    console.log(newEmployee)
    toggleModal()
}








