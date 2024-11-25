var token = localStorage.getItem("userToken");
var signIn = document.querySelector(".signIn");
var signOut = document.querySelector("#signOut");
var signUp = document.querySelector(".signUp");
var logOutBtn = document.querySelector(".logOut");
var cart = document.querySelector(".cart");
var fav=document.querySelector('.fav');
if (token != null) {
  signIn.classList.add("d-none");
  signUp.classList.add("d-none");
} else {
  signOut.classList.add("d-none");
  cart.classList.add("d-none");
  fav.classList.add('d-none');
}

signOut.addEventListener("click", () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem('userId');
  window.location.assign("/Kiara/index.html");
});

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  var x = JSON.parse(jsonPayload);
  console.log(x);

  localStorage.setItem('userId',x.UserId)
}

parseJwt(token);
