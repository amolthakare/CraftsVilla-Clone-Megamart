let data = JSON.parse(localStorage.getItem("patch"));
console.log(data._id);
let token = localStorage.getItem("login");
const register = document.getElementById("register");
register.addEventListener("submit", (e) => {
  e.preventDefault();
  const image = document.getElementById("image_post").value;
  const name = document.getElementById("name_post").value;
  const price = document.getElementById("price_post").value;

  fetch(`https://calm-cyan-meerkat-suit.cyclic.app/data/update/${data._id}`, {
    method: "PATCH",
    body: JSON.stringify({ image, name, price,}),
    headers: {
      authenticate: `${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
    //   if (data.success) {
    //     console.log(data);
    //   }
    console.log(data);  
    });
    alert("Product has been updated");
    window.location="./admin_dashboard.html";
});