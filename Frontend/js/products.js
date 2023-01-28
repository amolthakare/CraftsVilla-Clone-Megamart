
let token = localStorage.getItem("login");
console.log(token);
let bag;

fetch("https://calm-cyan-meerkat-suit.cyclic.app/data", {
  headers: {
    authenticate: `${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    bag = data;
    display(data);
  });

function display(data) {
  document.querySelector("#container").innerHTML = "";
  data.map((elem, index) => {
    var main = document.createElement("div");
    main.setAttribute("class", "map_main");

    var image = document.createElement("img");
    image.setAttribute("src", elem.image);
    image.setAttribute("class", "map_img");
    image.addEventListener("click",() => {
      item(elem);
    });

    var name = document.createElement("p");
    name.innerText = elem.name;
    name.setAttribute("class", "map_name");
    name.addEventListener("click",() => {
      item(elem);
    });

    var price_div = document.createElement("div");
    price_div.setAttribute("class", "map_price_div");
    price_div.addEventListener("click",() => {
      item(elem);
    });

    var price = document.createElement("p");
    price.innerText = "₹ " + elem.price;
    price.setAttribute("class", "map_price");

    var strike = document.createElement("s");
    strike.innerText = elem.strike;

    var discount = document.createElement("p");
    discount.innerText = elem.discount;
    discount.setAttribute("class", "map_discount");

    price_div.append(price, strike, discount);

    var cart_button = document.createElement("button");
    cart_button.innerText = "Add to Cart";
    cart_button.setAttribute("class", "map_button");
    cart_button.addEventListener("click",()=>{
      myFunction();
      cart_add(elem);
    })

    main.append(image, name, price_div, cart_button);

    document.querySelector("#container").append(main);
  });
}

// product details
const item=(elem)=>{
  let Item = elem;
  localStorage.setItem("item",JSON.stringify(Item));
  window.location.href="item_details.html"
}

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

const sortItems = () => {
  // let sorting=document.getElementsByClassName("prod_sort").value;
  let sorting = document.querySelector(".prod_sort").value;
  console.log(sorting);

  if (sorting == "h2l") {
    bag.sort((a, b) => {
      return b.price - a.price;
    });
    display(bag);
  }
  if (sorting == "l2h") {
    bag.sort((a, b) => {
      return a.price - b.price;
    });
    display(bag);
  } else {
    display(bag);
  }
};

// accord

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

// search

function search(){
  let q = document.getElementById("search").value;
  let newData = bag.filter(function(elem){
    return elem.name.toLowerCase().includes(q.toLowerCase());
  })
  console.log(newData);
  display(newData);
}