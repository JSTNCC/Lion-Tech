
//Cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')
//Open cart
cartIcon.onclick = ()=>{
    cart.classList.add('active')
};
//Close cart
closeCart.onclick = ()=>{
    cart.classList.remove('active')
    
};

// Cart working JS
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready);
}else{
    ready();
}



//Making Function
function ready(){
    //Remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for(var i = 0;i<removeCartButtons.length;i++){
        var button = removeCartButtons[i];
        button.addEventListener('click',removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i =0;i< quantityInputs.length;i++){
        var input = quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }
    //Add cart
    var addCart = document.getElementsByClassName('add-cart');
    for(var i =0;i< addCart.length;i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked)
    }
    //Buy button
    document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked);

    //Save Data
 


}

function buyButtonClicked(){
    alert('Procesando compra')
    //random = document.getElementsByClassName('cart-content')[0];
    nam = cartName();
    alert(nam)
    alert(cartPrice())
    alert(cartQuantity())
    obtenerDatos();
    /*var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
    */
}




function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value)||input.value <=0){
        input.value = 1;
    }
    updatetotal();

}
//Add to cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("img-front")[0].src;
    addProductToCart(title,price,productImg);
    updatetotal();
    
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems= document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0;i<cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText == title){
            alert('Ya tienes este producto en el carrito');
            return;
        }

    }

    var cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <!--Remove-->
            <i class='bx bxs-trash-alt cart-remove' ></i>
`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

//Update total
function updatetotal(){
    var cartContent=document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total =0;
    for(var i = 0;i<cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("₡", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "₡"+ total;
    
}



const mysql = require('mysql');

var conexion = mysql.createConnection({
    host:'localhost',
    database:'extraclase2',
    user:'root',
    password:''
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXITOSA');
    }
});

conexion.query('SELECT * FROM products',function(error,results,fields){
    if(error){
        throw error;
    }
    results.forEach(results =>{
        console.log(results);
    });
});


function obtenerDatos(){
    alert("INSERT INTO products (nombre, precio, cantidad) VALUES ('"+cartName()+"','"+cartPrice()+"','"+cartQuantity()+"')")
    var sql =("INSERT INTO products (nombre,precio,cantidad) VALUES ('"+cartName()+"','"+cartPrice()+"','"+cartQuantity()+"'");
    conexion.query(sql, function (err, result) {  
    if (err) throw err;  
    console.log(result);  
    });  
}

/*function obtenerDatos(){
    //alert("SE CONECTO");
    //nombre = cartName().value;
    //precio = cartPrice().value;
    //cantidad = cartQuantity().value;
    alert("INSERT INTO products (nombre, precio, cantidad) VALUES ('"+cartName()+"','"+cartPrice()+"','"+cartQuantity()+"')")
    conexion.query("INSERT INTO products (nombre, precio, cantidad) VALUES ('"+cartName()+"','"+cartPrice()+"','"+cartQuantity()+"')",function(error,results,fields){
        if(error){
            throw error;
        }else{
            alert("SE CONECTO");
        }
    });
    conexion.end();
}*/



function cartPrice(){
    var cartContent=document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    for(var i = 0;i<cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        return priceElement.innerText;
}
}

function cartName(){
    var cartItems= document.getElementsByClassName('cart-content')[0];
    nombre = cartItems.getElementsByClassName('cart-product-title');
    for(var i = 0;nombre.length;i++){
        return nombre[i].innerText;
    }
}

function cartQuantity(){
    var cartContent=document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    for(var i = 0;i<cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        
}
return quantityElement.value;
}