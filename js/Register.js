
const registerBtn=document.querySelector('#registerBtn');


    var NameInput=document.querySelector('#name');
    var userNameInput= document.querySelector('#userName');
    var email=document.querySelector('#email');
    var phoneNumber=document.querySelector('#phoneNumber');
    var password=document.querySelector('#password');
    var confirmedPassword=document.querySelector('#confirmedPassword');
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
    var userNameAlert=document.getElementById('userNameAlert');
    userNameInput.onkeyup=function(){
        if (userNameInput.value&&/^[a-zA-Z0-9]+$/.test(userNameInput.value) && (userNameInput.value).length <= 10) {
            console.log('true');
            userNameInput.classList.add('is-valid');
            userNameInput.classList.remove('is-invalid')
            userNameAlert.classList.add('d-none');
        }
        else{
            console.log('false');
            userNameInput.classList.remove('is-valid');
            userNameInput.classList.add('is-invalid')
            userNameAlert.classList.remove('d-none');
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

    var passwordAlert=document.getElementById('passwordAlert');
    password.onkeyup=function(){
        if((password.value.trim().length) >=8 )
        {
            
            passwordAlert.classList.add('d-none');
        }
        else{
           
            passwordAlert.classList.remove('d-none');
        }
        checkFormValidity();
    }
    var cpasswordAlert=document.getElementById('cpasswordAlert');
    confirmedPassword.onkeyup=function(){
        if(password.value===confirmedPassword.value)
        {
            password.classList.add('is-valid');
            confirmedPassword.classList.add('is-valid');
            confirmedPassword.classList.remove('is-invalid');
            password.classList.remove('is-invalid');
            cpasswordAlert.classList.add('d-none');
        }
        else{
            password.classList.remove('is-valid');
            password.classList.add('is-invalid');
            confirmedPassword.classList.add('is-invalid');
            confirmedPassword.classList.remove('is-valid');
            cpasswordAlert.classList.remove('d-none');
        }
        checkFormValidity();
    }

    function checkFormValidity(){
        
        if(NameInput.classList.contains('is-valid')
             && userNameInput.classList.contains('is-valid')
             && email.classList.contains('is-valid')
             && phoneNumber.classList.contains('is-valid') 
             &&password.classList.contains('is-valid') 
             &&confirmedPassword.classList.contains('is-valid'))
             {
                //checkPassword();
                registerBtn.removeAttribute('disabled');
                console.log('done');
                
            } else {
                registerBtn.setAttribute('disabled', 'true');
            }
    }

    function checkPasswordValidity(){
        if(password.value===confirmedPassword.value &&!password.value.trim().length==0&&!confirmedPassword.value.trim().length==0){
            confirmedPassword.classList.add('is-valid');
            password.classList.add('is-valid');

            confirmedPassword.classList.remove('is-invalid');
            password.classList.remove('is-invalid');

        }
        else{
            confirmedPassword.classList.add('is-invalid');
            password.classList.add('is-invalid');

            confirmedPassword.classList.remove('is-valid');
            password.classList.remove('is-valid');
            cpasswordAlert.classList.remove('d-none');
        }
    }
registerBtn.addEventListener('click',function(e){
    e.preventDefault();
    checkPasswordValidity();
    register();
})

 async function register(){
    let userData={
        name: NameInput.value,
        userName: userNameInput.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
        confirmedPassword: confirmedPassword.value
    }

    console.log(userData);
    let result=await fetch("https://kaira.runasp.net/api/Account/register",{
        method:"POST",
        headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        body:JSON.stringify(userData)
    })
    let result2=await result.json();
    let finalResult=result2;
    console.log(finalResult);
    if (result.status==200) {
        showError("");
        window.location.assign("/login.html")
    }
    else{
        showError(finalResult.message)
    }
    

    // }).then((response)=>{
    //     response.json()
        
    // }).then((data)=>{
    //     console.log(data);

    // }).catch((responseError)=>{
    // console.log(responseError);

    // })
    
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