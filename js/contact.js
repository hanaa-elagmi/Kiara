
let nameinput, emailinput, messagetext, subjectinput;
let form = document.querySelector('form');
nameinput = document.getElementById("name");
emailinput = document.getElementById("email");
messagetext = document.getElementById("message");
subjectinput = document.getElementById("subject");

const serverID = "service_b26a076"
const tempaletID = "template_8kv239d"
const PublicKey = "I1ELjUIzIplYvBQgg"


// send message
emailjs.init(PublicKey);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputData = {
        user_subject: subjectinput.value,
        from_name: nameinput.value,
        user_email: emailinput.value,
        user_message: messagetext.value
    };
    emailjs.send(serverID, tempaletID, inputData).then(
        () => {
            subjectinput.value = ""
            nameinput.value = ""
            emailinput.value = ""
            messagetext.value = ""

           
                Toast.fire({
                    icon: "success",
                    title: "Sent"
                  });
               
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
               
            
          
                
        
            console.log("success");

        }, (error) => {
           
            
            Toast.fire({
                icon: "error",
                title: error
              });

        }
    );
})



const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });