

//navbar


window.addEventListener("scroll", function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY >= 200) {

        navbar.style.backgroundColor = 'black';
        navbar.style.transition = 'background-color 2s';
        
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.transition = 'background-color 2s';
    }

    
    
    
});
//testmonial------------------------------------------------------------------------------
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items:3,
  //      autoplay:false,
        margin:30,
        loop:true,
        dots:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:1,
                nav:false
            },
            1000:{
                items:2,
                nav:true,
                loop:false
            }
          }
        
  //      nav:true,
  //      navText:["<i class='fas fa-long-arrow-alt-left'></i>","<i class='fas fa-long-arrow-alt-right'></i>" ]
    });
  });



//slider------------------------------------------------------------------------------

var swiperWrapper=document.querySelector('.swiper-wrapper');

async function getProducts(){
    var result=await fetch("https://kaira.runasp.net/api/Product/getAllProducts");
    var result2=await result.json();
    var finalResult=result2.slice(0,7);

    if(result.status==200){
        display(finalResult);
    }

    

}
function display(productArr){
var cartona='';
swiperWrapper.innerHtml='';
for (let i = 0; i < productArr.length; i++) {
   cartona+=` <div class="swiper-slide ">
            <img src="${productArr[i].productImage}" alt=""class="w-100">
        </div>`
    
}
swiperWrapper.innerHTML=cartona;


const mySwiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 3000,
    },
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 0,
        stretch: 80,
        depth: 200,
        modifier: 1,
        slideShadows: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

})



}
getProducts();


//----------------------------------


var obj={
    userId:localStorage.getItem('userId')
}

