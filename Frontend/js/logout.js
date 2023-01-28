let name_name = localStorage.getItem("name");
let nname = document.getElementById("login_name");
if(name_name==null){
    nname.innerHTML=`<li><a href="./login.html" id="login_name"><i id="itag" class="fa-solid fa-user"></i>Login</a></li>`
}
else{
    nname.innerHTML=`<li><a href="./login.html" id="login_name"><i id="itag" class="fa-solid fa-user"></i>${name_name}</a></li>`;
}

function logout(){
    localStorage.removeItem("name");
    localStorage.removeItem("login");
    nname.innerHTML=`<li><a href="./login.html" id="login_name"><i id="itag" class="fa-solid fa-user"></i>Login</a></li>`;
    alert("logout Successfully");
    window.location.reload();
}