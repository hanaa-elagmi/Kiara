var password=document.getElementById('password');
var email=document.getElementById('email');
var passwordAlert=document.getElementById('passwordAlert');
var emailAlert=document.getElementById('emailAlert');
var loginbtn=document.getElementById('login');


email.onkeyup=function(){
    if (checkEmail()) {
        emailAlert.classList.add('d-none');
    }
    else{
        emailAlert.classList.remove('d-none');
    }
}

password.onkeyup=function(){
    if(checkPassword())
        {
            passwordAlert.classList.add('d-none');
        }
        else{
            passwordAlert.classList.remove('d-none');
        }
       
}
function checkEmail(){
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (emailPattern.test(email.value)) {
    return true;

}
else{
    return false;
}
};

function checkPassword(){
        if((password.value.trim().length) >=8 )
        {
            return true;        
        }
        else{
            return false;
        }
}

loginbtn.addEventListener('click',function(e){
e.preventDefault();
if (checkPassword() &&checkEmail()) {
    login();
    
}
else{
    console.log('error');
    
}
})

async function login() {
    let userData={
        email:email.value,
        password:password.value
    };
    let result= await fetch("https://kaira.runasp.net/api/Account/login",{
        method:"POST",
        headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
          body:JSON.stringify(userData)
    })


let finalResult=await result.json();
let Result=finalResult;

if(result.status==200){
    showError("");
    //console.log(Result);
    localStorage.setItem('userToken',Result.token);
    window.location.assign("/Kiara/index.html");
}
else{
   showError(Result.message);
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