function accountAction () {
    let actionButton = event.target.getAttribute("value"),
        nicknameInput = document.getElementById(`nickname-input-${actionButton}`).value,
        emailInput = document.getElementById(`email-input-${actionButton}`).value,
        passwordInput = document.getElementById(`password-input-${actionButton}`).value;
    // console.log(emailInput,passwordInput)
    let nickname = nicknameInput
    let newUser = {
        email: emailInput,
        password: passwordInput
    }
    if(actionButton == "reg"){
        window.localStorage.setItem(nickname, JSON.stringify(newUser))
        console.log("пользовтель зарегестрирован")
    }  else if(actionButton == "in"){
        let user = JSON.parse(window.localStorage.getItem(nickname));

        if(passwordInput == user.password){
            alert("Вы вошли")
            let stayLogged = document.getElementById(`stayLogged`).checked;
            if(stayLogged == true){
                let lastSave = {
                    name: nicknameInput,
                    saveIs: stayLogged
                }
                window.localStorage.setItem('saveLog', JSON.stringify(lastSave));

            }
        }   else{
            alert("Неверный пароль")
        }

        console.log("пользовтель вошёл")
        console.log(user)
    }

    document.getElementById(`pop_up_${actionButton}`).classList.toggle('dis-non')
    console.log(JSON.stringify(newUser))
}



function openPopUp () {
    let parrentButton = event.target.getAttribute("parrent");
    let childBlock = document.getElementById(parrentButton);
    childBlock.classList.toggle("dis-non")
    console.log(parrentButton)
    console.log(childBlock)
    let save = JSON.parse(window.localStorage.getItem("saveLog"))
    if((parrentButton == "pop-up-in") && (save.saveIs == true) ){
        document.getElementById("nickname-input-in").value = save.name;
        let pass = JSON.parse(window.localStorage.getItem(save.name))
        document.getElementById("password-input-in").value = pass.password;
        document.getElementById("stayLogged").checked=true;
    }
}

// let stayLogged = document.getElementById(`stayLogged`).checked;
// if(stayLogged == true){

// }