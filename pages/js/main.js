// Funcion de modal
const toggleModal = () => { 
    let modal = document.getElementById('modalContainer');
    modal.classList.toggle('hidden')
    if (modal.classList.contains('hidden')){
        modal.classList.add('active')
    }
}

// Crear las tablas dinamicamente


