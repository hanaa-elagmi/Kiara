var userIdCart = localStorage.getItem("userId");
var ProductIdCart = localStorage.getItem("productIdCart");

var cartI = document.querySelector(".cartItem");

var totals = document.querySelector(".totals");

//-------------------------------------------------------------------------------------------------------------------------------

//get cart item

async function GetCartItem() {
  var result = await fetch(
    `https://kaira.runasp.net/api/Cart/getCartItems?userId=${userIdCart}`
  );
  var result2 = await result.json();
  var finalResult = result2;

  displayproducts(finalResult.items);
  DisplayTotals(finalResult);
}

function displayproducts(cartItem) {
  cartona = "";
  cartI.innerHTML = "";
  if (cartItem != undefined) {
    for (let i = 0; i < cartItem.length; i++) {
      cartona += `<tr>
                    <td>
                        <i class="fa-solid fa-xmark fs-5 remove-btn" onclick="GetDeletedProduct(${cartItem[i].productId})"></i>
                    </td>
                    <td>
                      
                        <img
                          src="${cartItem[i].productImage}"
                          alt=""
                          width="100px"
                          height="100px"
                        />
                      
                    </td>
                    <td>${cartItem[i].productName}</td>
    
                    <td class="price">$${cartItem[i].price}</td>
    
                    <td class="qnty">
                        <i class="fa-solid fa-plus  mx-3" onclick="updatedQuntityPlus(${cartItem[i].productId}, ${cartItem[i].quantity})"></i>
                         <span class='qnt'>${cartItem[i].quantity}</span>
                         <i class="fa-solid fa-minus  mx-3" onclick="updatedQuntityMinus(${cartItem[i].productId}, ${cartItem[i].quantity})"></i>
                        </td>
    
                    <td>$${cartItem[i].totalPrice}</td>
                  </tr>`;
    }
  }
  if (cartItem.length == 0) {
    cartona = `<tr>
                    <td colspan="6" class='text-center'>
                        <img src="images/undraw_empty_cart_co35.svg" alt="" width="300px" height="300px">
                    </td>
                    </tr>`;
  }
  cartI.innerHTML = cartona;
}

function DisplayTotals(total) {
  totals.innerHTML = "";

  cartona = ` <tr>
                            <td>Total Price :</td>
                            <td>$${total.totalPrice}</td>
                        </tr>
                        <tr>
                            <td>Total Quantity : </td>
                            <td>${total.totalQuantity}</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                              <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                                Proceed To Checkout
                              </button>
                            </td>
                            
                        </tr>`;

  totals.innerHTML = cartona;
}

GetCartItem();
//--------------------------------------------------------------------------------------------------------------------------------
//delete from cart

function GetDeletedProduct(id) {
  //   localStorage.setItem("DeletedProduct", JSON.parse(id));
  DeleteFromCart(id);
  window.location.reload();
}

async function DeleteFromCart(id) {
  let userIdCart = localStorage.getItem("userId");
  //   let DeletedProduct = localStorage.getItem("DeletedProduct");

  let result = await fetch(
    `https://kaira.runasp.net/api/Cart/deleteFromCart?userId=${userIdCart}&productId=${id}`,
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
  if(result.status==200){
    window.location.reload();
  }
}

//-------------------------------------------------------------------------------------------------------------------------------------------
//update Quantity

function updatedQuntityPlus(id, quantity) {
  let q = Number(quantity);
  q++;
  UpdateQuntity(id, q);
  GetCartItem();
}
function updatedQuntityMinus(id, quantity) {
  let q = Number(quantity);
  q--;
  UpdateQuntity(id, q);
  GetCartItem();
}

async function UpdateQuntity(id, Quantity) {
  let userId = localStorage.getItem("userId");

  let itemData = {
    productId: id,
    userId: userId,
    quantity: Quantity,
  };
  if (Quantity > 0) {
    let result = await fetch(`https://kaira.runasp.net/api/Cart/updateQuantity`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });

    let result2 = await result.json();
    let finalResult = result2;
    console.log(finalResult);
    window.location.reload();
  } else {
    DeleteFromCart(id);
   
  }

}
