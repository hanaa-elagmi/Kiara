var currentPage = 0;

var row = document.querySelector(".row");
//get all products---------------------------------------------------------------------
async function getAllProducts(page) {
  var result = await fetch(
    `https://kaira.runasp.net/api/Product/getProductByPage/${currentPage}`
  );
  var result2 = await result.json();
  var finalResult = result2;

  if (result.status == 200) {
    pageNumber.innerHTML = `Shop Page ${finalResult.page}`;
    span.innerHTML = `Shop Page ${finalResult.page}`;
    displayProducts(finalResult.products);
  }
}
//display products-----------------------------------------------------------------------
function displayProducts(productArr) {
  row.innerHTML = "";
  var cartona = "";

  for (let i = 0; i < productArr.length; i++) {
    cartona += `<div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="product">
            <img src="${productArr[i].productImage}" alt="" class="w-100 productImg">
             <div class="options">
                <i class="fa-solid fa-eye" onclick="getProductId(${productArr[i].productId})"></i>
                <i class="fa-solid fa-cart-arrow-down cart"onclick="AddToCart(${productArr[i].productId})"></i>
                <i class="fa-solid fa-heart-circle-plus" onclick="AddToFavourite(${productArr[i].productId})"></i>
            </div>
            </div>
            
            <h3 class="imgTitle mt-3 mb-3">${productArr[i].productName}</h3>
            <h4>$${productArr[i].productPrice}</h4>
           
        </div>`;
  }

  row.innerHTML = cartona;
}
getAllProducts(1);

//get current page-------------------------------------------------------------
var pageNumber = document.querySelector(".pageNumber");
var span = document.querySelector(".span");
var pages = document.querySelectorAll(".page");
var pageArr = [...pages];
pageArr.forEach((page) =>
  page.addEventListener("click", async () => {
    currentPage = page.innerHTML;
    window.scrollTo({
      top: 0,
    });
    getAllProducts(currentPage);
  })
);

//get one product -------------------------------------------------------------------

function getProductId(id) {
  console.log(id);
  localStorage.setItem("productId", id);
  window.location.assign("/Kiara/productDetails.html");
}

//get id and add to cart --------------------------------------------------------------------------------------------------------

function getProductIdCart(id) {
  localStorage.setItem("productIdCart", id);
  AddToCart();
}

//--------------------------------------------------------------------------------------------------------------------------------
//
// //add to cart

async function AddToCart(id) {
  let userIdCart = localStorage.getItem("userId");
  if (userIdCart != null) {
    let result = await fetch(
      `https://kaira.runasp.net/api/Cart/addToCart?userId=${userIdCart}&productId=${id}`,
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
        title: "Added To Cart"
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Stock is empty"
      });
    }
  }
  else{
    Toast.fire({
      icon: "error",
      title: "Please Login First"
    });
  }
}

//---------------------------------------------------------------------------------------------------------------------------
//add to fav

async function AddToFavourite(id) {
  let userIdfav = localStorage.getItem("userId");

  if (userIdfav != null) {
    let result = await fetch(
      `https://kaira.runasp.net/api/Favourite/AddToFavourite?productId=${id}&userId=${userIdfav}`,
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
        title: "Added To Favourite"
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Already Exist"
      });
    }
  }
  else{
    Toast.fire({
      icon: "error",
      title: "Please Login First"
    });
  }
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

