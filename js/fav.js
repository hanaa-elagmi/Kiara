var userId = localStorage.getItem("userId");
var row = document.querySelector(".Favrow");
//get all products---------------------------------------------------------------------
async function getAllProducts() {
  var result = await fetch(
    `https://kaira.runasp.net/api/Favourite/GetFavourite?userId=${userId}`
  );
  var result2 = await result.json();
  var finalResult = result2;

  if (result.status == 200) {
    console.log(finalResult);

    displayProducts(finalResult.favouriteItems);
  }
}
//display products-----------------------------------------------------------------------
function displayProducts(productArr) {
  row.innerHTML = "";
  var cartona = "";
if (productArr.length>0) {
    for (let i = 0; i < productArr.length; i++) {
        cartona += `  <div class="col-md-3">
                <div class="item my-5 ">
                    <img src="${productArr[i].image}" alt=""class="w-100">
                    <div class="icon">
                        <i class="fa-solid fa-eye text-white fs-5" onclick="getProductId(${productArr[i].productId})"></i>
                        <i class="fa-solid fa-cart-arrow-down cart text-white fs-5" onclick="AddToCart(${productArr[i].productId})"></i>
                        <i class="fa-solid fa-heart-circle-minus text-white fs-5" onclick="DeleteFromFAV(${productArr[i].productId})"></i>
                    </div>
                </div>
            </div>`;
      }
}
 else{
    cartona=`<div class="fav-img">
    <img src="images/undraw_favourite_item_pcyo.svg" alt="">
    </div>`
 }

  row.innerHTML = cartona;
}
getAllProducts();

//--------------------------------------------------------------------------------------------------------------------------------
//
//get one product -------------------------------------------------------------------

function getProductId(id) {
  console.log(id);
  localStorage.setItem("productId", id);
  window.location.assign("/productDetails.html");
}
// //add to cart

async function AddToCart(id) {
  if (userId != null) {
    let result = await fetch(
      `https://kaira.runasp.net/api/Cart/addToCart?userId=${userId}&productId=${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, /",
          "Content-Type": "application/json",
        },
      }
    );

    let result2 = await result.json();
    let finalResult = result2;

    if (result.status == 200) {
      Toast.fire({
        icon: "success",
        title: "Added"
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Stock is empty"
      });
    }
  }
}
//-------------------------------------------------------------------------------------------------------
//delete from fav

async function DeleteFromFAV(id) {
  if (userId != null) {
    let result = await fetch(
      `https://kaira.runasp.net/api/Favourite/DeleteFromFavourite?ItemId=${id}&userId=${userId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, /",
          "Content-Type": "application/json",
        },
      }
    );

    let result2 = await result.json();
    let finalResult = result2;

    if (result.status == 200) {
      Toast.fire({
        icon: "success",
        title: "Deleted"
      });
    }
    }
   setTimeout(() => {
    window.location.reload();
   }, 2000);

  }



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