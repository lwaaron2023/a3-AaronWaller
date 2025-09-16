let login;
let create;
let data;
window.onload = function () {
    login = document.getElementById("login");
    create = document.getElementById("create");
    try{
        const response = document.getElementById("response");
        setTimeout(()=>{
            response.textContent = "";
        },1000)
    } catch(err){
        console.log("Error: ", err);
    }
}

const switchScreen = ()=>{
    if(login && create){
        if(login.classList.contains("hidden")){
            login.classList.remove("hidden");
            create.classList.add("hidden");
        }
        else{
            login.classList.add("hidden");
            create.classList.remove("hidden");
        }
    }
}