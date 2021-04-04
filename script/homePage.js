import Fight from './fight.js';


window.accountAction = function accountAction () {
    let actionButton = event.target.getAttribute("value"),
        nicknameInput = document.getElementById(`nickname-input-${actionButton}`).value,
        emailInput = document.getElementById(`email-input-${actionButton}`).value,
        passwordInput = document.getElementById(`password-input-${actionButton}`).value;
    // console.log(emailInput,passwordInput)
    let nickname = nicknameInput
    let newUser = {
        email: emailInput,
        password: passwordInput,
        hp: 100,
        gun: {
            name: 'ПМ',
            damage: 20,
            mag: 8,
            fullMag: 8,
            rateOfFire: [1]
        },
        money: 0
    }
    if(actionButton == "reg"){
        window.localStorage.setItem(nickname, JSON.stringify(newUser))
        console.log("пользовтель зарегестрирован")
    }  else if(actionButton == "in"){
        let user = JSON.parse(window.localStorage.getItem(nickname));

        if(passwordInput == user.password){
            alert("Вы вошли")
            let stayLogged = document.getElementById(`stayLogged`).checked;
            let userInfo = `<p id="user-name">${nicknameInput}</p>
                            <p id="user-hp">${JSON.parse(window.localStorage.getItem(nicknameInput)).hp}</p>
                            <p><span id="user-money">${JSON.parse(window.localStorage.getItem(nicknameInput)).money}</span> руб</p>
                            <p id="user-status"><span class="user-status">Бодр</span></p>`
            document.getElementById('user-info').innerHTML = userInfo;
            if(stayLogged == true){
                let lastSave = {
                    name: nicknameInput,
                    saveIs: stayLogged
                }
                window.localStorage.setItem('saveLog', JSON.stringify(lastSave));

            }
            hpRes();
        }   else{
            alert("Неверный пароль")
        }

        console.log("пользовтель вошёл")
        console.log(user)
    }

    document.getElementById(`pop_up_${actionButton}`).classList.toggle('active-pop-up')
    console.log(JSON.stringify(newUser))
}



window.openPopUp = function openPopUp () {
    let parrentButton = event.target.getAttribute("parrent");
    let childBlock = document.getElementById(parrentButton);
    console.log(document.getElementsByClassName('active-pop-up')[0])
    if ((document.getElementsByClassName('active-pop-up')[0] !== undefined)) {
        if ((parrentButton !== document.getElementsByClassName('active-pop-up')[0].id)) {
            document.getElementsByClassName('active-pop-up')[0].classList.remove('active-pop-up');
        }
    }
    childBlock.classList.toggle("active-pop-up")
    console.log(parrentButton)
    console.log(childBlock)
    let save = JSON.parse(window.localStorage.getItem("saveLog"))
    if((parrentButton == "pop_up_in") && (save.saveIs == true) ){
        document.getElementById("nickname-input-in").value = save.name;
        let pass = JSON.parse(window.localStorage.getItem(save.name))
        document.getElementById("password-input-in").value = pass.password;
        document.getElementById("stayLogged").checked=true;
    }
}

let cord = {
    x: undefined,
    y: undefined
}

let house = {
    name: 'Дом',
    color: "black",
    mutants: {
        name: 'Кровосос',
        hp: 250,
        damage: 10,
        attackRange: 1,
        moveSpeed: 9,
        loot: 1000,
        img: 'krovosos.png'
    },
    habar: 100
}

let road = {
    name: 'Дорога',
    color: "gray",
    mutants: null,
    habar: 0
}

let forest = {
    name: 'Лес',
    color: 'green',
    mutants: {
        name: 'Слепой пёс',
        hp: 50,
        damage: 5,
        attackRange: 0,
        moveSpeed: 5,
        loot: 200,
        img: 'pes.png'
    },
    habar: 0
}

let emptyForest = {
    name: 'Густой лес',
    color: "#13450C",
    mutants: null,
    habar: 0
}

window.arrMass = [
    [emptyForest, forest, emptyForest, emptyForest, emptyForest, forest],
    [road, road, road, house, road, road],
    [emptyForest, emptyForest, road, road, road, forest],
    [road, road, road, road, road, road]
];

function createMap() {
    let place = document.getElementById('map');
    for (let i = 0; i < arrMass.length; i++) {
        let string = arrMass[i];
        for (let a = 0; a <  string.length; a++) {
            let block = `<div class="block" style="background-color: ${string[a].color}" value="${string[a].name}" onclick="getName()" x="${a}" y="${i}"></div>`;
            place.innerHTML = place.innerHTML + block;
        }
    }
}


// __________________Cords_____________________
let cordY = undefined;
let cordX = undefined;
// __________________________________________
let save = JSON.parse(window.localStorage.getItem("saveLog"));
// ___________________Save like user___________

window.getName = function getName () {
    cordY = parseInt(event.target.getAttribute('y'));
    cordX = parseInt(event.target.getAttribute('x'));
    cord.x = cordX;
    cord.y = cordY;
    if (arrMass[cordY][cordX].mutants !== null) {
        console.log(`Вы встретили ${arrMass[cordY][cordX].mutants.name} с ${arrMass[cordY][cordX].mutants.hp} очков здоровья, а дед пидарас`)
        console.table(arrMass[cordY][cordX].mutants);
        // let save = JSON.parse(window.localStorage.getItem("saveLog"));
        if (confirm('Сражаться-то будем?')) {
            let battle_place = `<div class="battle-place">
                                <div>
                                    <img style="width: 100px" src="./images/stalker2.png" alt="Mutant">
                                    <p>${save.name}</p>
                                    <p class="hp-bar" id="user-hp"><span>${JSON.parse(window.localStorage.getItem(save.name)).hp}</span></p>
                                </div>
                                <div>
                                    <button id="shot-btn" onclick="battleShot()">Выстрелить</button>
                                    <button id="run-btn">Бежать</button>
                                </div>
                                <div>
                                    <img style="width: 100px" src="./images/mutants/${arrMass[cordY][cordX].mutants.img}" alt="S.T.A.L.K.E.R">
                                    <p>${arrMass[cordY][cordX].mutants.name}</p>
                                    <p class="hp-bar"><span id="mutant-hp">${arrMass[cordY][cordX].mutants.hp}</span></p>
                                </div>
                            </div>`;
            document.getElementById('root').innerHTML = battle_place;
            alert('штош тебе удачной охоты, сталкер')
        } else {
            alert('Ну ты и сцыкло')
        }
    } else {
        console.log('Здесь пусто и вроде как безопастно')
    }
    console.log(event.target.getAttribute('value'))
    try {
        document.getElementsByClassName('im-here')[0] !== event.target ? document.getElementsByClassName('im-here')[0].classList.remove('im-here') : false
    } catch (e) {

    }

    event.target.classList.add('im-here')
}

let range = null;

window.battleShot = function battleShot () {
    cord.x = cordX;
    cord.y = cordY;

    // let save = JSON.parse(window.localStorage.getItem("saveLog"));
    let user = window.localStorage.getItem(save.name);
    user = JSON.parse(user)
    let enemy = arrMass[cordY][cordX].mutants;
    // let enemy = JSON.stringify(arrMass[cordY][cordX].mutants);
    // enemy = JSON.parse(enemy);
    let battle = null;
    if (range !== null) {
        battle = new Fight(user, enemy, range);
    } else if (range == null) {
        range = (Math.random()*100).toFixed(0);
        battle = new Fight(user, enemy, range);
    }
    console.log(range);
    // console.log(battle.userShotRes())
    // console.table(forest)
    let battleResult = battle.userShotRes();
    document.getElementById('mutant-hp').innerText = typeof battleResult == "object" ? battleResult[0] : document.getElementById('mutant-hp').innerText;
    console.log(battleResult)
    user.gun.mag = battle.user.gun.mag;
    window.localStorage.setItem(save.name, JSON.stringify(user));
    try {
        range = battleResult[3];
    } catch (e) {

    }
    if (battle.enemy.hp <= 0) {
        alert(`Неплохо-неплохо. Ты - победитель! Держи, это твоё - ${arrMass[cord.y][cord.x].mutants.loot} руб`)
        document.getElementById('user-money').innerText = parseInt(document.getElementById('user-money').innerText) + arrMass[cord.y][cord.x].mutants.loot;
        setStat('money', document.getElementById('user-money').innerText);
        document.getElementById('root').innerHTML = '';
        range = null;
        hpRes();
    }

}


function setStat(name, value) {
    let userLocal = JSON.parse(window.localStorage.getItem('saveLog'));
    let user = JSON.parse(window.localStorage.getItem(userLocal.name));
    user[name] = value;
    window.localStorage.setItem(userLocal.name, JSON.stringify(user));
}

function hpRes () {
    let user = JSON.parse(window.localStorage.getItem(save.name));
    user.hp += 10;
    if (user.hp <= 100) {
        window.localStorage.setItem(save.name, JSON.stringify(user));
        setTimeout(hpRes, 3000)
        console.log(`Друже, тебе чуть лучше. Если оценивать в процентах, то чувствуешь ты себя на ${user.hp} из 100`)
    }  else if (user.hp >= 100) {
        user.hp = 100;
    }
    document.getElementById('user-hp').innerText = user.hp;
}






createMap()