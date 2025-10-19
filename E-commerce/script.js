document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 59.99 },
    ];

    const cart = []
    const productList = document.getElementById('product-list')
    const cartItems = document.getElementById('cart-items')
    const emptyCartMessage = document.getElementById('empty-cart')
    const cartTotalMessage = document.getElementById('cart-total')
    const totalPriceDisplay = document.getElementById('total-price')
    const checkOutButton = document.getElementById('checkout-btn')

    // basic guards (avoid runtime errors if HTML changes)
    if (!productList || !cartItems || !emptyCartMessage || !cartTotalMessage || !totalPriceDisplay || !checkOutButton) {
        console.error('Required DOM elements not found')
        return
    }

    // load saved cart from localStorage
    const saved = localStorage.getItem('cart')
    if (saved) {
        try {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed)) {
                cart.push(...parsed)
            }
        } catch (err) {
            console.warn('Failed to parse saved cart', err)
        }
    }

    products.forEach(product => {
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener('click', (e) => {
        if (e.target && e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute('data-id'), 10);
            const product = products.find(p => p.id === productId)
            if (!product) return
            addToCart(product)
        }
    })

    // handle remove buttons inside cart (event delegation)
    cartItems.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('remove-btn')) {
            const idx = parseInt(e.target.getAttribute('data-index'), 10)
            if (!Number.isNaN(idx)) {
                removeFromCart(idx)
            }
        }
    })

    function saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify(cart))
        } catch (err) {
            console.warn('Failed to save cart', err)
        }
    }

    function addToCart(product) {
        cart.push(product)
        saveCart()
        renderCart();
    }

    function removeFromCart(index) {
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1)
            saveCart()
            renderCart()
        }
    }

    function renderCart() {
        cartItems.innerHTML = ""
        let totalPrice = 0

        if (cart.length > 0) {
            emptyCartMessage.classList.add('hidden')
            cartTotalMessage.classList.remove('hidden')
            cart.forEach((item, i) => {
                totalPrice += item.price
                const cartItem = document.createElement('div')
                cartItem.className = 'cart-item'
                const nameSpan = document.createElement('span')
                nameSpan.textContent = `${item.name} - $${item.price.toFixed(2)}`
                const removeBtn = document.createElement('button')
                removeBtn.className = 'remove-btn'
                removeBtn.setAttribute('data-index', i)
                removeBtn.textContent = 'Remove'
                cartItem.appendChild(nameSpan)
                cartItem.appendChild(removeBtn)
                cartItems.appendChild(cartItem)
            })
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`
        } else {
            emptyCartMessage.classList.remove("hidden")
            cartTotalMessage.classList.add('hidden')
            totalPriceDisplay.textContent = `$0.00`
        }
    }

    checkOutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your cart is empty")
            return
        }
        cart.length = 0
        localStorage.removeItem('cart')
        alert("Checkout successful")
        renderCart()
    })

    // initial render
    renderCart()
})