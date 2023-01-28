// cart length

// fetch(`http://localhost:4500/cart/get/${userid}`, {
//     headers: {
//         authenticate: `${data_length}`,
//     },
// })
// .then((res) => res.json())
// .then((data) => {
//     console.log(data);
//     let cart_c = document.getElementById("cart_c");
//     cart_c.innerHTML=`(${data.length})`;
// });


const display_cartlength = async()=>{
    let data_length = localStorage.getItem("login");
    let userid = localStorage.getItem("userID");
    try{
        let res = await fetch(`https://calm-cyan-meerkat-suit.cyclic.app/cart/get/${userid}`, {
            headers: {
                authenticate: `${data_length}`,
            },
        })
        let data = await res.json();
        console.log("cartlength"+data);
        let cart_c = document.getElementById("cart_c");
        cart_c.innerHTML=`(${data.length})`;
    }
    catch(err){
        console.log(err);
    }
}

display_cartlength();