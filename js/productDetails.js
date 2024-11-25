var product = document.querySelector(".product");
var span = document.querySelector(".span");
var productId = localStorage.getItem("productId");

//get spacific product---------------------------------------------

async function getOneProduct() {
  var result = await fetch(
    `https://kaira.runasp.net/api/Product/getProductById?id=${productId}`
  );
  var result2 = await result.json();
  var finalResult = result2;

  span.innerHTML = `Product Details: ${finalResult.productName}`;
  displayOneProduct(finalResult);
}

//display spacific product---------------------------------------------------
function displayOneProduct(prdct) {
  product.innerHTML = ` <div class="col-md-6">
            <img src="${prdct.productImage}" alt=""class="w-100 p-5 mt-5 mb-5">
        </div>
        <div class="col-md-6 p-5 mt-5 mb-5 ps-0">
            <h2>${prdct.productName}</h2>
            <h3 class="mt-3 mb-3">$${prdct.productPrice}</h3>
            <p class="w-75">${prdct.productDescription}</p>
            <ul class="">
                <li>
                    Armchair chair is made.
                </li>
                <li>
                    Used on the seat and backrest.
                </li>
                <li>
                    Solid wood and chipboard.
                </li>
            </ul>
            <div class="buttons d-flex justify-content-start mt-4 mb-4">
                <button onclick='AddToCart(${prdct.productId})'>Add To Cart</button>
                <button onclick="AddToFavourite(${prdct.productId})"><i class="fa-solid fa-heart-circle-plus fs-5 m-auto"></i></button>
            </div>
            
            <h5>Follow Us :</h5>
            <div class="icons mb-4">
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-linkedin"></i>
                <i class="fa-brands fa-instagram"></i>
            </div>
            <p>SKU: 05</p>
            <p>Category: Clothes</p>
            <p>Tags: glasses,t-shirts,dresses </p>
        </div>`;
}

getOneProduct();

//addproducts-----------------------------------------------------------
var products = document.querySelector(".products");

async function getProducts() {
  var result = await fetch(`https://kaira.runasp.net/api/Product/getAllProducts`);
  var result2 = await result.json();
  var finalResult = result2.slice(0, 4);
  displayProducts(finalResult);
}

//displayProducts-------------------------------------------------------
function displayProducts(prdctsArr) {
  var cartona = "";
  products.innerHTML = "";
  for (let i = 0; i < prdctsArr.length; i++) {
    cartona += `<div class="col-12 col-sm-6 col-md-4 col-lg-3">
       <div class="product">
       <img src="${prdctsArr[i].productImage}" alt="" class="w-100 productImg">
        <div class="options">
           <i class="fa-solid fa-eye" onclick="SetId(${prdctsArr[i].productId})"></i>
           <i class="fa-solid fa-cart-arrow-down" onclick="AddToCart(${prdctsArr[i].productId})"></i>
           <i class="fa-solid fa-heart-circle-plus" onclick="AddToFavourite(${prdctsArr[i].productId})"></i>
       </div>
       </div>
       
       <h3 class="imgTitle mt-3 mb-3">${prdctsArr[i].productName}</h3>
       <h4>$${prdctsArr[i].productPrice}</h4>
      
   </div>`;
  }

  products.innerHTML = cartona;
}

getProducts();

//set id
function SetId(id) {
  localStorage.setItem("productId", id);

  window.scrollTo({
    top: 0,
  });

  window.location.reload();
}

//---------------------------------------------------------------------------------------------------------------------
//add to cart
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