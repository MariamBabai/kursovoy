let cartBLOCK = document.querySelector('.cart');



let cart = {};

(function () {
    loadItems();
}) ();
async function loadItems(){
    const response = await fetch('items.json');
    const itmes  = await response.json();
    console.log(itmes);

    showWhatCartHasInside();
    renderItemsfromBasket();

    function renderItemsfromBasket() {


        let itemDiv = "";
        for(let key in cart){
            
            itemDiv += `
            <div class ="item.div">
            <button type="button" class= "delete" id="${key}"> Удалить товар из корзины </button>
                <p> Имя: ${itmes[key] ['name']} </p>
                <p> Цена: ${itmes[key] ['price']*cart[key]} </p>
                <div class ="btn_field">
                <button type="button" class= "plus" id="${key}"> Добавить </button>
                    <p> ${cart[key]} </p>
                <button type="button" class= "minus" id="${key}"> Уменьшить </button>
                </div>
            </div>
            `

        }
        
        cartBLOCK.innerHTML = itemDiv;
        

        const plussBtn = document.querySelectorAll('.plus');
        const arrayPlus = Array.from(plussBtn);
        arrayPlus.forEach(element=>{
            return element.addEventListener('click', addNumber)
        })

        
        const minusBtn = document.querySelectorAll('.minus');
        const arrayMinus = Array.from(minusBtn);
        arrayMinus.forEach(element=>{
            return element.addEventListener('click', decreaseNumber)
        })

        const dleteBtn = document.querySelectorAll('.delete');
        const arrayDelete = Array.from(dleteBtn);
        arrayDelete.forEach(element=>{
            return element.addEventListener('click', deleteItem)
        })


    }



    function addNumber(element){
        let article = element.target.id;
        ++cart[article];
        localStorage.setItem('cart',JSON.stringify(cart));
        renderItemsfromBasket();
}

    function decreaseNumber(element){
        let article = element.target.id;
        if(cart[article] > 1){
            cart[article]--;
        }else{
            delete cart[article];
        }

        localStorage.setItem('cart',JSON.stringify(cart));
         renderItemsfromBasket();
}

    function deleteItem(element){
        console.log('das')
        let article = element.target.id;
        delete cart[article];
        localStorage.setItem('cart',JSON.stringify(cart));
        renderItemsfromBasket();

}

};


function showWhatCartHasInside(){
    let out = ''
    if(localStorage.getItem('cart') !== undefined){
        cart= JSON.parse(localStorage.getItem('cart')); 

    }
    for(let key in cart){
        out+= `ARTCODE: ${key} <br>`
        out+= `Kilkist': ${cart[key]} <br>`

    }
    cartBLOCK.innerHTML = out
}



