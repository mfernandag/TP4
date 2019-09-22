
// Funcion de modal
const toggleModal = () => { 
    let modal = document.getElementById('modalContainer');
    modal.classList.toggle('hidden')
    if (modal.classList.contains('hidden')){
        modal.classList.add('active')
    }
}

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

//check all

const checkAll = document.getElementById('select-all');

checkAll.onclick = () => {
  if(checkAll.checked){
    document.querySelectorAll('.check').forEach(u=>u.checked= true)

  } else if(!checkAll.checked){
    document.querySelectorAll('.check').forEach(u=>u.checked= false)
  }
}







