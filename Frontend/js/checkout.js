
let bag;
const displaycart = async () => {
    try {
        let user_ID = localStorage.getItem("userID");
        let token = localStorage.getItem("login");
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
      applyPromo();
    } catch (err) {
      console.log(err);
    }
  };
  
  function display(data) {
    document.querySelector(".order_products_div").innerHTML = "";
    
    data.map((elem)=>{
        let checkdiv = document.createElement("div");
        checkdiv.setAttribute("class","order_products");

        let img = document.createElement("img");
        img.src=elem.image;

        let namediv = document.createElement("div");
        
        let name = document.createElement("p");
        name.innerText=elem.name;
        name.setAttribute("class","order_products_name")

        let dely = document.createElement("p");
        dely.innerHTML="Estimated delivery time 4 days";
        dely.setAttribute("class","order_products_name1");

        namediv.append(name,dely);

        checkdiv.append(img,namediv);
        document.querySelector(".order_products_div").append(checkdiv);
    })
    
  }
  displaycart();

  function applyPromo()
 {
    var total=bag.reduce(function(acc,elem,index){
        return acc + (elem.price * elem.quant);
    },0);
            var final=bag.reduce(function(acc,elem,index){
                return (acc + (elem.price * elem.quant)*30)/100;
            },0);
console.log(total);
        var rem=bag.reduce(function(acc,elem,index){
            return acc + (elem.price * elem.quant);
        },0);

        var out = Math.floor(final);
        var tt= rem-out;
        // document.querySelector(".total").innerText="₹"+out;
        document.querySelector(".total").innerText="Rs "+rem;
        document.querySelector(".discountt").innerText="Rs "+out;
        document.querySelector(".Total").innerText="Rs "+tt;
}