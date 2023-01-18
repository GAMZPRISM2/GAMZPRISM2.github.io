window.onload = function() {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || 
  JSON.parse(localStorage.getItem("cart")) || [];
  const discounts = [
  {code: "PZA10", discount: 10},
  {code: "PZA20", discount: 20},
  {code: "PZA30", discount: 30},
  {code: "BRUCEKIDZ", discount: 30},
  {code: "BRUCE100", discount: 100}
  ];
  const clearButton = document.getElementById("clear-cart-button");
  clearButton.addEventListener("click", function() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
});

window.addItem = addItem;

      function addItem(name, qty, price) {
        for (const item of cart) {
          if (item.name === name) {
            item.qty += qty;
            localStorage.setItem("cart", JSON.stringify(cart));
            return;
          }
        }
        cart.push({ name: name, qty: qty, price: price });
        localStorage.setItem("cart", JSON.stringify(cart));
        sessionStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("cart", JSON.stringify(cart));
      }


    
  function removeItem(name) {
    const index = cart.findIndex(item => item.name === name);
      if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQty(name, qty) {
  const item = cart.find(item => item.name === name);
      if (item) {
        item.qty = qty;
        localStorage.setItem("cart", JSON.stringify(cart));
      }
  sessionStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("cart", JSON.stringify(cart));
}

// On page unload, clear the cart from session storage
window.addEventListener("unload", function(e) {
  sessionStorage.removeItem("cart");
});

    function displayCart() {
      const cartList = document.getElementById("cart-list");
      cartList.innerHTML = "";
      let subtotal = 0;
      for (const item of cart) {
        subtotal += item.qty * item.price;
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - ${item.qty} x $${item.price} = $${item.qty * item.price}`;
        cartList.appendChild(li);
      }
      const subtotalElement = document.getElementById("subtotal");
      subtotalElement.innerHTML = `Subtotal: $${subtotal}`;
    }
    
    function calculateSubtotal() {
        let subtotal = 0;
        for (const item of cart) {
            subtotal += item.qty * item.price;
        }
        return subtotal;
    }
    
    function updateTotal(total) {
        document.getElementById("subtotal").innerHTML = `Subtotal: $${total}`;
    }
    
    const addButton = document.getElementById("add-item-button");
    addButton.addEventListener("click", function() {
      const nameInput = document.getElementById("item-name-input");
      const qtyInput = document.getElementById("item-qty-input");
      const priceInput = document.getElementById("item-price-input");
      const name = nameInput.value;
      const qty = parseInt(qtyInput.value);
      const price = parseFloat(priceInput.value);
      addItem(name, qty, price);
      displayCart();
    });
    
    const removeButton = document.getElementById("remove-item-button");
    removeButton.addEventListener("click", function() {
      const nameInput = document.getElementById("item-name-input");
      const name = nameInput.value;
      removeItem(name);
      displayCart();
      });
      
      const updateButton = document.getElementById("update-item-button");
      updateButton.addEventListener("click", function() {
      const nameInput = document.getElementById("item-name-input");
      const qtyInput = document.getElementById("item-qty-input");
      const name = nameInput.value;
      const qty = parseInt(qtyInput.value);
      updateQty(name, qty);
      displayCart();
      });
      
      document.getElementById("apply-discount-button").addEventListener("click", function () {
      const code = document.getElementById("discount-code-input").value;
      let discount = 0;
      for (const item of discounts) {
      if (item.code === code) {
      discount = item.discount;
      break;
      }
      }
      if (discount > 0) {
      const subtotal = calculateSubtotal();
      const discountedTotal = subtotal - (subtotal * discount) / 100;
      updateTotal(discountedTotal);
      } else {
      alert("Invalid discount code.");
      }
      });
      displayCart();
      }
    
    
    
      
      /// Setup Read Only database in MySQL
      /// Display Wait time
      /// Send Order to Shop
      /// Get New Pizza Images
