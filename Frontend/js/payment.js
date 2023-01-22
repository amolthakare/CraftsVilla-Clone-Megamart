
let cart = document.querySelector("#card");

let paypal = document.querySelector("#paypal");

let details = document.querySelector("#details");

let paypal_btn = document.querySelector("#paypal_btn");

let checkout = document.querySelector("#checkout");

cart.addEventListener('click',function(){
    // paypal.innerHTML="";
    paypal_btn.innerHTML=""; 
    details.innerHTML=
    `<form>
    <div class="icons">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlWA5kqwZR63rkyAF90ccKk4VAB28WG96VVmvwXnq2o5660x9VjUet0uxOfC4yeY87-w&usqp=CAU" />
    </div>
    <p class="ptag" ><i class="fa-solid fa-user"></i> Name of Card  *</p>
    <div class="inputdiv">
        <!-- <i class="fa-solid fa-user"></i> -->
        <input class="input_tag" type="text" placeholder="Enter card holdername" required/>
    </div>

    <p class="ptag" ><i class="fa-solid fa-credit-card"></i> Credit Card Number  *</p>
    <div class="inputdiv">
        <!-- <i class="fa-solid fa-credit-card"></i> -->
        <input class="input_tag" type="number" placeholder="1111 2222 3333 4444" required/>
    </div>

    <div id="csv">
        <div>
            <p class="ptag" >Expiration date  *</p>
            <div class="inputdiv">
                <input class="input_tags" type="text" placeholder="MM / YY" required/>
            </div>
        </div>
        <div>
            <p class="ptag" >CVC / CVV  *</p>
            <div class="inputdiv">
                <input class="input_tags" type="number" placeholder="123" required/>
            </div>
        </div>

        <!-- <p class="ptag" ><u>What is this ?</u></p> -->
        
    </div>

    <button id="checkout"><a href="./order.html">Place Order</a></button>
</form>`

})
paypal.addEventListener('click',function(){
    details.innerHTML="";
    paypal_btn.innerHTML=
    `<button id="checkout"><a href="./order.html">Place Order</a></button>`
})

checkout.onclick=()=>{
      window.location="./order.html";
}

