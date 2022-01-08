let LOGIN = document.getElementById('user-name');
let PASSWORD = document.getElementById('password');
let PASSWORD_ONE_MORE_TIME = document.getElementById('password_one_more_time');
let EMAIL = document.getElementById('user-email');
let REG_BTN = document.getElementById('accept_registration');
let greeting = document.querySelector('#greeting')
let registration = document.getElementById('registration');
let form = document.querySelector('#form');
const iteM_Name = document.querySelector('.item_name');
const PRICE = document.querySelector('.price');
const tovar = document.querySelectorAll('.tovar');
let itemsField = document.getElementById('items');
const MIN_VALUE = document.getElementById('min_value');
const MAX_VALUE = document.getElementById('max_value');
const FILTR_BTN = document.getElementById('filter_btn')





let cart = {};


(function () {
    loadItems();
}) ();



async function loadItems(){
    const response = await fetch('items.json');
    const itmes  = await response.json();

    FILTR_BTN.addEventListener('click', function a(){
        filterItems(itmes);
    })

   

    renderItems(itmes);


}



function renderItems (items){
    for(let item in items){
        // console.log(items)
        const itemDiv = `
        <div class ="item_div">
            <p> Имя: ${items[item] ['name']} </p>
            <p> Описание: ${items[item] ['description']} </p>
            <p>  Цена: <span class="price">${items[item] ['price']}</span> </p>
            <buttton type="button" id="${item}" class= "add_Item_btn add_btn"> Купить </button>
        </div>
        `
        itemsField.innerHTML += itemDiv;

    }
}


registration.addEventListener('click', function (){
    form.classList.add('registration_form');
    form.classList.remove('display_none');

})


// =========================================creating customer=============================================================================

class Customer{
    constructor(login, password, email, promo){
        this.login = login,
        this.password = password,
        this.email = email

    }
}



REG_BTN.addEventListener('click',function registerAcc(){
    let createdCostumer = new Customer(LOGIN.value, PASSWORD.value, EMAIL.value);
    // console.log(createdCostumer);
    form.classList.add('display_none');
    
    greeting.innerHTML =`
    <p class="greetings"> Вітаємо у нашому клубі, ${LOGIN.value}!
    Надіслали на пошту промокод на знижку 10%. 
    Це вікно зараз закриється. </p>
    `
    greeting.classList.add('greeting_div');
    form.classList.remove('display_none');

    setTimeout(finishRegistration,5000)

})
// !! Оговорочка!! Поскольку у нас нету сервера, а все данные о юзерах долджны храниться на серверах мы используем создание объекта !!
function finishRegistration(){
    greeting.classList.remove('greeting_div');
    form.classList.add('display_none');
}


// =========================================creating customer=============================================================================


EMAIL.addEventListener('blur' ,function (){
    validateEmail(EMAIL.value);
});

PASSWORD.addEventListener('blur' ,function (){
    validatePassword(PASSWORD.value);
});

PASSWORD_ONE_MORE_TIME.addEventListener('blur' ,function (){
    comparePassword(PASSWORD_ONE_MORE_TIME.value);
});

LOGIN.addEventListener('blur' ,function (){
    validateLogin(LOGIN.value);
});



function validateEmail(email) 
    {
        let re = /\S+@\S+\.\S+/;
        let b = re.test(email);
        if(b){
            EMAIL.classList.add('accepted');
            EMAIL.classList.remove('non-accepted');

        }else if(email === "" ){
            EMAIL.classList.remove('non-accepted');
            EMAIL.classList.remove('accepted');

        } else{
            EMAIL.classList.add('non-accepted')
            EMAIL.classList.remove('accepted')
        }
    }

    function validatePassword(login){

            let re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
            let b = re.test(login);
            if(b){
                PASSWORD.classList.add('accepted');
                PASSWORD.classList.remove('non-accepted');
    
            }else if(login === "" ){
                PASSWORD.classList.remove('non-accepted');
                PASSWORD.classList.remove('accepted');
    
            } else{
                PASSWORD.classList.add('non-accepted')
                PASSWORD.classList.remove('accepted')
            }
        }

        function comparePassword(passwordToCompare){
            if(passwordToCompare === PASSWORD.value){
                PASSWORD_ONE_MORE_TIME.classList.add('accepted');
                PASSWORD_ONE_MORE_TIME.classList.remove('non-accepted');
            } else {
                PASSWORD_ONE_MORE_TIME.classList.add('non-accepted')
                PASSWORD_ONE_MORE_TIME.classList.remove('accepted')
            }

        }

    
    
    function validateLogin(login) 
    {
        let re = /^[a-zA-Z\-]+$/;;
        let b = re.test(login);
        if(b){
            LOGIN.classList.add('accepted');
            LOGIN.classList.remove('non-accepted');

        }else if(login === "" ){
            LOGIN.classList.remove('non-accepted');
            LOGIN.classList.remove('accepted');

        } else{
            LOGIN.classList.add('non-accepted')
            LOGIN.classList.remove('accepted')
        }
    }




document.addEventListener('click',function add(elem){
    if(elem.target.classList.contains('add_Item_btn')){
        // console.log(elem.target.dataset.id);
        addCart(elem);
    }
})


function addCart(data){
    let article = data.target.id
    console.log(article);

    if(cart[article] !== undefined){
        cart[article]++
    }else{
        cart[article]=1
    }
    localStorage.setItem('cart',JSON.stringify(cart));

}










function filterItems(obj, minValue = MIN_VALUE.value, maxValue = MAX_VALUE.value){
    itemsField.innerHTML =""
    let arr=[];
    arr.push(obj);
   let b = arr.forEach(element =>{
        for(let key in element){
           if(element[key] ['price'] >= parseInt(minValue) && element[key] ['price'] < parseInt(maxValue)){

                const itemDiv = `
                <div class ="item_div">
                    <p> Имя: ${element[key] ['name']} </p>
                    <p> Описание: ${element[key] ['description']} </p>
                    <p>  Цена: <span class="price">${element[key] ['price']}</span> </p>
                    <buttton type="button" id="${key}" class= "add_Item_btn add_btn"> Купить </button>
                </div>
                `
            itemsField.innerHTML += itemDiv;
            }

        }

    })
}






