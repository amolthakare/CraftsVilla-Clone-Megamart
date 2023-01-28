
let data = JSON.parse(localStorage.getItem("item"));
let item_image = document.getElementById("item_image");
let item_name = document.getElementById("item_name");
let item_price = document.getElementById("item_price");
let item_strike = document.getElementById("item_strike")
let item_discount = document.getElementById("item_discount");
let item_cart = document.querySelector(".button_cart");
const get_item=(data) => {

    let item_img = document.createElement("img");
    item_img.src = data.image;
    item_img.setAttribute("class","item_image");
    item_image.append(item_img);

    item_name.innerText=data.name;
    item_price.innerText="₹ "+data.price;
    item_strike.innerText=data.strike;
    item_discount.innerText=data.discount;

    item_cart.addEventListener("click",()=>{
        cart_add(data);
        myFunction();
    })
    
}

get_item(data);

let token = localStorage.getItem("login");
console.log(token);
function cart_add(elem){
    let userid = localStorage.getItem("userID");
    const name = elem.name;
    const image = elem.image;
    const price = elem.price; 
    const discount = elem.discount;
    const strike = elem.strike;
    const userID = userid;
    const quant = 1;
    console.log()
    fetch("https://calm-cyan-meerkat-suit.cyclic.app/cart/create",{
        method:"POST",
        body:JSON.stringify({image,name,price,strike,discount,userID,quant}),
        headers:{
          authenticate: `${token}`,
          "Content-Type": "application/json" 
        },
    })
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
    })
    display_cartlength();
}

  // accordion
  
var acc = document.getElementsByClassName("accordion");
var i;
  
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
    
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
    
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } 
        else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    });
}
