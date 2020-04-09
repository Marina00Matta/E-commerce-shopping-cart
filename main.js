let carts = document.querySelectorAll('.add-cart');


let products = [

    {
        name : 'T-shirt grey',
        tag : 'greyshirt',
        price : 150,
        inCart: 0
    },
    {
        name : 'T-shirt White',
        tag : 'whiteshirt',
        price : 200,
        inCart: 0
    },
     {
        name : 'T-shirt Black',
        tag : 'blackshirt',
        price : 300,
        inCart: 0
    }
];

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click',() => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers (){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers);
    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1 )
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        if(cartItems!=null){
            if(cartItems[product.tag] == undefined){
            cartItems = {
                    ...cartItems,
                [product.tag]:product
                }
            }
         cartItems[product.tag].inCart += 1; 
        } else {
            product.inCart = 1;
                cartItems = {
            [product.tag]:product
            }
        }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));    
}


function totalCost(product){
    // console.log("the product price is", product.price)
    let cartCost = localStorage.getItem('totalCost');
    
    
    console.log("my cartCost is", cartCost);
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else{
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products-container");
    let cartCost = localStorage.getItem('totalCost');

    
    
    if( cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += ` 
            <div class="product">
            <ion-icon name="close-circle"></ion-icon>
            <img src="./images/${item.tag}.jpg">
            </div>
            <div class="price"> EGP${item.price},00 </div>
            <div class="quantity">
            <ion-icon class=" decrease "
            name="arrow-dropleft-circle"></ion-icon>
            <span>${item.inCart}</span>
            </div>
            <div class="total">
            EGP${item.inCart * item.price},00
            </div>
            `
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle"> Basket Total</h4>
        <h4 class="basketTotal"> EGP${cartCost},00</h4>
        </div>
        `
    }
}

function removeitem (product){
    for(let i = 0; i < carts.length ; i++){
        if(cart[i].product === product){
            carts.splice(i, 1)
            return;
        }
        

    }



}

onLoadCartNumbers();
displayCart();















