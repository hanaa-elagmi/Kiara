
const payBtn=document.querySelector('#payBtn');


    var NameInput=document.querySelector('#name');
    var Address= document.querySelector('#address');
    var email=document.querySelector('#email');
    var phoneNumber=document.querySelector('#phoneNumber');
    var card=document.querySelector('#card');
  
    var NameAlert=document.querySelector('#NameAlert')
    //name validation
    NameInput.onkeyup =function(){
        if (NameInput.value &&/^[a-zA-Z]+$/.test(NameInput.value)) {
            console.log('true');
            NameInput.classList.add('is-valid');
            NameInput.classList.remove('is-invalid')
            NameAlert.classList.add('d-none');
        }
        else{
            console.log('false');
            NameInput.classList.remove('is-valid');
            NameInput.classList.add('is-invalid')
            NameAlert.classList.remove('d-none');
        }
        checkFormValidity();
    };
    var AddressAlert=document.getElementById('AddressAlert');
    Address.onkeyup=function(){
        if (Address.value&&/^[a-zA-Z0-9 ]+$/.test(Address.value)) {
            console.log('true');
            Address.classList.add('is-valid');
            Address.classList.remove('is-invalid')
            AddressAlert.classList.add('d-none');
        }
        else{
            console.log('false');
            Address.classList.remove('is-valid');
            Address.classList.add('is-invalid')
            AddressAlert.classList.remove('d-none');
        }
        checkFormValidity();
    };

    var emailAlert=document.getElementById('emailAlert');
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    email.onkeyup=function(){
        if (emailPattern.test(email.value)) {
            console.log('true');
            email.classList.add('is-valid');
            email.classList.remove('is-invalid')
            emailAlert.classList.add('d-none');
        }
        else{
            console.log('false');
            email.classList.remove('is-valid');
            email.classList.add('is-invalid')
            emailAlert.classList.remove('d-none');
        }
        checkFormValidity();
    };
    var phoneAlert=document.getElementById('phoneAlert');
    phoneNumber.onkeyup=function(){
        if (/^(010|011|012|015)\d{8}$/.test(phoneNumber.value)) {
            console.log('true');
            phoneNumber.classList.add('is-valid');
            phoneNumber.classList.remove('is-invalid')
            phoneAlert.classList.add('d-none');
        }
        else{
            console.log('false');
            phoneNumber.classList.remove('is-valid');
            phoneNumber.classList.add('is-invalid')
            phoneAlert.classList.remove('d-none');
        }
        checkFormValidity();
    };

    var cardAlert=document.getElementById('cardAlert');
    card.onkeyup=function(){
        const cardRegex = /^\d{14}$/;

        if(cardRegex.test(card.value))
        {
            card.classList.add('is-valid');
            card.classList.remove('is-invalid');
            cardAlert.classList.add('d-none');
        }
        else{
            card.classList.add('is-Invalid')
            card.classList.remove('is-valid');
            cardAlert.classList.remove('d-none');
        }
        checkFormValidity();
    }
    

    function checkFormValidity(){
        
        if(NameInput.classList.contains('is-valid')
             && Address.classList.contains('is-valid')
             && email.classList.contains('is-valid')
             && phoneNumber.classList.contains('is-valid') 
             &&card.classList.contains('is-valid') 
           )
             {
                
                payBtn.removeAttribute('disabled');
                console.log('done');
                
            } else {
                payBtn.setAttribute('disabled', 'true');
            }
    }

payBtn.addEventListener('click',function(e){
    e.preventDefault();
    payment();
})

 async function payment(){
    let paymentObj={
        name: NameInput.value,
        address: Address.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        cardNumber: card.value,
        userId:localStorage.getItem('userId')
    }

    let result=await fetch("https://kaira.runasp.net/api/Payment/Checkout",{
        method:"POST",
        headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        body:JSON.stringify(paymentObj)
    })
    let result2=await result.json();
    let finalResult=result2;
    console.log(finalResult);
    if (result.status==200) {
        Toast.fire({
            icon: "success",
            title: finalResult.message
          });
       
        setTimeout(() => {
            window.location.reload();
        }, 2000);
       
    }
    else{
        Toast.fire({
            icon: "error",
            title: finalResult.message
          });
        
    }
    
}



function showError(errorMessage){
    let backAlert=document.getElementById('backAlert');
    if (errorMessage.length>0) {
        backAlert.innerHTML=errorMessage;
        backAlert.classList.remove('d-none');
    }
    else{
        backAlert.classList.add('d-none');
    }
    
}



const Toast = Swal.mixin({
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  
  