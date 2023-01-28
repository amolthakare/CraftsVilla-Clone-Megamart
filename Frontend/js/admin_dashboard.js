let token = localStorage.getItem("login");
const register = document.getElementById("register");
register.addEventListener("submit", (e) => {
  e.preventDefault();
  const image = document.getElementById("image_post").value;
  const name = document.getElementById("name_post").value;
  const price = document.getElementById("price_post").value;
  const strike = "";
  const discount = "";

  fetch("https://calm-cyan-meerkat-suit.cyclic.app/data/create", {
    method: "POST",
    body: JSON.stringify({ image, name, price, strike, discount }),
    headers: {
      authenticate: `${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data);
      } else {
        console.log("err");
      }
      alert("Product has been added");
      window.location.reload();
    });
});

const displaycart = async () => {
  try {
    let res = await fetch(`https://calm-cyan-meerkat-suit.cyclic.app/data`, {
      headers: {
        authenticate: `${token}`,
      },
    });
    let data = await res.json();
    console.log(data);
    bag = data;
    console.log("bag", bag);
    display(data);
  } catch (err) {
    console.log(err);
  }
};
displaycart();
function display(data){
    document.querySelector("tbody").innerText="";
    data.map((elem)=>{
        let row = document.createElement("tr");

        let img = document.createElement("td");
        img.setAttribute("class","image");
        let image = document.createElement("img");
        image.src=elem.image;

        img.append(image);

        let name = document.createElement("td");
        name.innerText=elem.name;
        name.setAttribute("class","name");

        let price = document.createElement("td");
        price.innerText="₹ "+elem.price;
        price.setAttribute("class","price");

        let strike = document.createElement("td");
        strike.innerText=elem.strike;
        strike.setAttribute("class","strike");

        let discount = document.createElement("td");
        discount.innerText=elem.discount;
        discount.setAttribute("class","discount");

        let deletebtn = document.createElement("td");
        deletebtn.innerText="Delete";
        deletebtn.setAttribute("class","deletebtn");
        deletebtn.addEventListener("click", function () {
            Delete(elem._id);
          });

        let editbtn = document.createElement("td");
        editbtn.innerText="Edit";
        editbtn.setAttribute("class","editbtn");
        editbtn.addEventListener("click", function () {
            item(elem);
        });

        row.append(img,name,price,strike,discount,deletebtn,editbtn);
        document.querySelector("tbody").append(row);
    })
}

const Delete = async (id) => {
    try {
      let res = await fetch(`https://calm-cyan-meerkat-suit.cyclic.app/data/delete/${id}`, {
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
};

const item=(elem)=>{
    let patch = elem;
    localStorage.setItem("patch",JSON.stringify(patch));
    window.location="./admin_patch.html"
}

let home = document.getElementById("home");
home.addEventListener("click",()=>{
    window.location="../index.html";
})