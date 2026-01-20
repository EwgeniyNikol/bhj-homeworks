document.addEventListener('DOMContentLoaded', () => {
    const cart = document.querySelector('.cart');
    const clearBtn = document.createElement('div');
    clearBtn.className = 'cart__clear';
    clearBtn.textContent = 'Очистить корзину';
    cart.appendChild(clearBtn);

    const saveCartToStorage = () => {
        const cartProducts = document.querySelector('.cart__products');
        const products = Array.from(cartProducts.children);
        const cartData = products.map(product => ({
            id: product.dataset.id,
            image: product.querySelector('.cart__product-image').src,
            count: parseInt(product.querySelector('.cart__product-count').textContent)
        }));
        
        localStorage.setItem('cartItems', JSON.stringify(cartData));
    };

    const loadCartFromStorage = () => {
        const cartData = localStorage.getItem('cartItems');
        if (!cartData) return;
        
        const cartProducts = document.querySelector('.cart__products');
        JSON.parse(cartData).forEach(item => {
            const cartProduct = document.createElement('div');
            cartProduct.className = 'cart__product';
            cartProduct.dataset.id = item.id;
            
            cartProduct.innerHTML = `
                <div class="cart__product-remove" title="Удалить товар">×</div>
                <img class="cart__product-image" src="${item.image}" alt="Товар">
                <div class="cart__product-count">${item.count}</div>
            `;
            
            cartProducts.appendChild(cartProduct);
        });
        
        toggleCartVisibility();
    };

    const updateQuantity = (control, change) => {
        const quantityElement = control.closest('.product__quantity-controls').querySelector('.product__quantity-value');
        let currentValue = parseInt(quantityElement.textContent);
        currentValue = Math.max(1, currentValue + change);
        quantityElement.textContent = currentValue;
    };

    const toggleCartVisibility = () => {
        const cart = document.querySelector('.cart');
        const clearBtn = document.querySelector('.cart__clear');
        const hasProducts = document.querySelector('.cart__products').children.length > 0;
        
        if (hasProducts) {
            cart.classList.add('visible');
            clearBtn.style.display = 'block';
        } else {
            cart.classList.remove('visible');
            clearBtn.style.display = 'none';
        }
    };

    const createCartProduct = (productId, productImage, quantity) => {
        const cartProduct = document.createElement('div');
        cartProduct.className = 'cart__product';
        cartProduct.dataset.id = productId;
        
        cartProduct.innerHTML = `
            <div class="cart__product-remove" title="Удалить товар">×</div>
            <img class="cart__product-image" src="${productImage}" alt="Товар">
            <div class="cart__product-count">${quantity}</div>
        `;
        
        return cartProduct;
    };

    const animateAddToCart = (productElement, targetProduct, isExisting = false) => {
        const productImage = productElement.querySelector('.product__image');
        const flyingImage = productImage.cloneNode(true);
        
        const startRect = productImage.getBoundingClientRect();
        const endRect = document.querySelector('.cart').getBoundingClientRect();
        
        let endX, endY;
        
        if (targetProduct.querySelector('.cart__product-image')) {
            const targetRect = targetProduct.querySelector('.cart__product-image').getBoundingClientRect();
            endX = targetRect.left + targetRect.width / 2;
            endY = targetRect.top + targetRect.height / 2;
        } else {
            endX = endRect.left + endRect.width / 2;
            endY = endRect.top + endRect.height / 2;
        }
        
        flyingImage.style.cssText = `
            position: fixed;
            left: ${startRect.left}px;
            top: ${startRect.top}px;
            width: ${startRect.width}px;
            height: ${startRect.height}px;
            object-fit: contain;
            z-index: 10000;
            border-radius: 6px;
            border: 2px dashed green;
            pointer-events: none;
        `;
        
        document.body.appendChild(flyingImage);
        flyingImage.classList.add('flying-image');
        
        const steps = 8;
        const duration = 300;
        const stepDuration = duration / steps;
        const startX = startRect.left + startRect.width / 2;
        const startY = startRect.top + startRect.height / 2;
        let currentStep = 0;
        
        const animateStep = () => {
            if (currentStep > steps) {
                flyingImage.remove();
                
                if (!isExisting) {
                    targetProduct.style.opacity = '0';
                    targetProduct.style.transform = 'scale(0.5)';
                    targetProduct.style.transition = 'all 0.2s';
                    
                    setTimeout(() => {
                        targetProduct.style.opacity = '1';
                        targetProduct.style.transform = 'scale(1)';
                    }, 10);
                }
                return;
            }
            
            const t = currentStep / steps;
            const easeT = t * t;
            const currentX = startX + (endX - startX) * easeT;
            const currentY = startY + (endY - startY) * easeT;
            const scale = 1 - (easeT * 0.8);
            
            flyingImage.style.left = (currentX - startRect.width * scale / 2) + 'px';
            flyingImage.style.top = (currentY - startRect.height * scale / 2) + 'px';
            flyingImage.style.width = (startRect.width * scale) + 'px';
            flyingImage.style.height = (startRect.height * scale) + 'px';
            flyingImage.style.opacity = (1 - easeT * 0.9) + '';
            
            currentStep++;
            setTimeout(animateStep, stepDuration);
        };
        
        animateStep();
    };

    const removeProduct = (cartProduct) => {
        cartProduct.style.transition = 'all 0.2s';
        cartProduct.style.opacity = '0';
        cartProduct.style.transform = 'scale(0)';
        
        setTimeout(() => {
            cartProduct.remove();
            toggleCartVisibility();
            saveCartToStorage();
        }, 200);
    };

    const clearCart = () => {
        const cartProducts = document.querySelector('.cart__products');
        Array.from(cartProducts.children).forEach(product => {
            removeProduct(product);
        });
        
        localStorage.removeItem('cartItems');
    };

    document.querySelectorAll('.product__quantity-control').forEach(control => {
        control.addEventListener('click', () => {
            const isDec = control.classList.contains('product__quantity-control_dec');
            updateQuantity(control, isDec ? -1 : 1);
        });
    });

    document.querySelectorAll('.product__add').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.product');
            const productId = productElement.dataset.id;
            const productImage = productElement.querySelector('.product__image').src;
            const quantity = parseInt(productElement.querySelector('.product__quantity-value').textContent);
            
            const cartProducts = document.querySelector('.cart__products');
            const existingProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);
            
            if (existingProduct) {
                const countElement = existingProduct.querySelector('.cart__product-count');
                countElement.textContent = parseInt(countElement.textContent) + quantity;
                
                countElement.style.backgroundColor = '#e6ffe6';
                countElement.style.transition = 'background-color 0.3s';
                setTimeout(() => countElement.style.backgroundColor = 'white', 300);
                
                animateAddToCart(productElement, existingProduct, true);
                saveCartToStorage();
            } else {
                const cartProduct = createCartProduct(productId, productImage, quantity);
                cartProducts.appendChild(cartProduct);
                animateAddToCart(productElement, cartProduct, false);
                toggleCartVisibility();
                saveCartToStorage();
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart__product-remove')) {
            removeProduct(e.target.closest('.cart__product'));
        }
        
        if (e.target.classList.contains('cart__clear')) {
            clearCart();
        }
    });

    loadCartFromStorage();
});