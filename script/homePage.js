function accountAction () {
    let actionButton = event.target.getAttribute("value"),
        nicknameInput = document.getElementById(`nickname-input-${actionButton}`).value,
        emailInput = document.getElementById(`email-input-${actionButton}`).value,
        passwordInput = document.getElementById(`password-input-${actionButton}`).value;
    // console.log(emailInput,passwordInput)
    let nickname = nicknameInput
    let newUser = {
        email: emailInput,
        password: passwordInput,
        save: false
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
                newUser.save = true;
                window.localStorage.setItem(nickname, JSON.stringify(newUser))
                console.log(window.localStorage.getItem(nickname))

            }
        }   else{
            alert("Неверный пароль")
        }

        console.log("пользовтель вошёл")
        console.log(user)
    }


    console.log(JSON.stringify(newUser))
}


// ИСПРАВИТЬ ЛОГИКУ ПОП АПА
function openPopUp () {
    let parrentButton = event.target.getAttribute("parrent");
    let childBlock = document.getElementById(parrentButton);
    childBlock.classList.toggle("dis-non")
    console.log(parrentButton)
    console.log(childBlock)
    let Sapphire = JSON.parse(window.localStorage.getItem("Сапфир"))
    if((parrentButton == "pop-up-in") && (Sapphire.save == true) ){
        document.getElementById("nickname-input-in").value = "Сапфир";
        document.getElementById("password-input-in").value = Sapphire.password;
        document.getElementById("stayLogged").checked=true;
    }
}

// let stayLogged = document.getElementById(`stayLogged`).checked;
// if(stayLogged == true){

// }