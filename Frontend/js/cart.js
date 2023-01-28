let user_ID = localStorage.getItem("userID");
console.log(user_ID);
let token = localStorage.getItem("login");
console.log(token);

var bag;
// fetch(`http://localhost:4500/cart/get/${user_ID}`, {
//     headers: {
//         authenticate: `${token}`,
//     },
// })
// .then((res) => res.json())
// .then((data) => {
//     console.log("data",data);

// });

const displaycart = async () => {
  try {
    let res = await fetch(`https://calm-cyan-meerkat-suit.cyclic.app/cart/get/${user_ID}`, {
      headers: {
        authenticate: `${token}`,
      },
    });
    let data = await res.json();
    console.log(data);
    bag = data;
    console.log("bag", bag);
    display(data);
    Total();
  } catch (err) {
    console.log(err);
  }
};

function display(data) {
  document.querySelector(".left").innerHTML = "";

  data.map(function (el, i) {
    let product = document.createElement("div");
    product.setAttribute("id", "product");

    let img = document.createElement("img");
    img.setAttribute("src", el.image);

    let leftdiv = document.createElement("div");
    leftdiv.setAttribute("class", "productLeft");
    leftdiv.append(img);

    let rightDiv = document.createElement("div");
    rightDiv.setAttribute("class", "productRight");

    let rightTop = document.createElement("div");
    rightTop.setAttribute("class", "productRightTop");

    let brand = document.createElement("p");
    brand.setAttribute("class", "brand");
    brand.textContent = "Megamart";

    var deleteicon = document.createElement("i");
    deleteicon.className = "fa-solid fa-xmark";
    deleteicon.addEventListener("click", function () {
      Delete(el._id);
    });

    let category = document.createElement("p");
    category.setAttribute("class", "category");
    category.textContent = el.name;

    let price = document.createElement("p");
    category.setAttribute("class", "price");
    price.textContent = "₹ " + el.price;

    let inc = document.createElement("button");
    inc.textContent = "+";
    //   inc.setAttribute("class","incbtn");
    inc.addEventListener("click", function () {
      increaseQuant(el);
    });

    let dec = document.createElement("button");
    dec.textContent = "-";
    dec.addEventListener("click", function () {
      decreaseQuant(el);
    });

    let qtyNo = document.createElement("div");
    qtyNo.setAttribute("class", "quant");
    qtyNo.innerText = "Qty : " + el.quant;

    let qty = document.createElement("div");
    qty.setAttribute("class", "qty");
    qty.append(inc, qtyNo, dec);

    rightTop.append(brand, deleteicon);
    rightDiv.append(rightTop, category, price, qty);

    product.append(leftdiv, rightDiv);

    document.querySelector(".left").append(product);
  });
}
displaycart();

const Delete = async (id) => {
  try {
    let res = await fetch(`https://calm-cyan-meerkat-suit.cyclic.app/cart/delete/${id}`, {
      headers: {
        authenticate: `${token}`,
      },
      method: "DELETE",
    });
    let data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }

  displaycart();
  display_cartlength();
};

function increaseQuant(el) {
  let quantity = el.quant + 1;
  console.log(quantity);
  const quant = quantity;
  console.log(quant);

  fetch(`https://calm-cyan-meerkat-suit.cyclic.app/cart/update/${el._id}`, {
    method: "PATCH",
    body: JSON.stringify({ quant }),
    headers: {
      authenticate: `${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  displaycart();
}

function decreaseQuant(el) {
  if (el.quant > 1) {
    let quantity = el.quant - 1;
    console.log(quantity);
    const quant = quantity;
    console.log(quant);

    fetch(`https://calm-cyan-meerkat-suit.cyclic.app/cart/update/${el._id}`, {
      method: "PATCH",
      body: JSON.stringify({ quant }),
      headers: {
        authenticate: `${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    displaycart();
    // window.location.reload();
    display_cartlength();
  }
}

function Total() {
  var cartTotal = bag.reduce(function (acc, el, i) {
    return acc + el.price * el.quant;
  }, 0);
  console.log(cartTotal);
  document.querySelector(".total").innerText = cartTotal;
}

document.querySelector("#cupanButton").addEventListener("click",applyPromo);
    
function applyPromo()
 {
    var promo=document.querySelector("#descountCupon").value;
        if(promo=='mega30')
        {
            var total=bag.reduce(function(acc,elem,index){
                return (acc + (elem.price * elem.quant)*30)/100;
            },0);
          
        }
        else{
            var total=bag.reduce(function(acc,elem,index){
                return acc + (elem.price * elem.quant);
            },0);
        }
        var rem=bag.reduce(function(acc,elem,index){
            return acc + (elem.price * elem.quant);
        },0);

        var out = Math.floor(total);
        var tt= rem-out;
        // document.querySelector(".total").innerText="₹"+out;
        document.querySelector(".total").innerText=tt;
}