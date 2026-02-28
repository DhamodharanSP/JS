import { cart, removeFromCart, getCartQuantity, modifyCartItem, getItemQuantity, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import formatCurrency from './utils/price.js';
import { deliveryOptions, calculateDeliveryDate } from '../data/deliveryOptions.js';

renderOrderSummary();

// Rendering Checkout page contents
function renderOrderSummary()
{
    let orderSummaryHTML = '';

    cart.forEach((cartItem) => {

        const productId = cartItem.productId;

        const matchingProduct = products.find(product => product.id === productId);

        if(!matchingProduct) return;

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = deliveryOptions.find(delivery => deliveryOptionId === delivery.id);

        const dateString = calculateDeliveryDate(deliveryOption);

        orderSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${productId}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            $${formatCurrency(matchingProduct.priceCents)}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: 
                                <span class="js-update-quantity-${productId}">
                                    <span class="quantity-label js-quantity-label-${productId}">
                                        ${cartItem.quantity}
                                    </span>
                                    <span class="link-primary js-update-cart-item" data-product-id="${productId}">
                                        Update
                                    </span>
                                </span>
                            </span>
                            
                            <span class="make-invisible js-edit-quantity-${productId}">
                                <input type="number" min="0" max="100" class="input-quantity js-input-quantity-${productId}" value=${cartItem.quantity}>
                                <span class="link-primary save-btn-${productId}">
                                    Save
                                </span>
                            </span>
                            <span class="link-primary js-delete-cart-item" data-product-id="${productId}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(productId, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    const orderSummaryElement = document.querySelector('.js-order-summary');
    orderSummaryElement.innerHTML = orderSummaryHTML;

    updateCheckoutQuantity();
    updateItemQuantity();
    deleteCartItem()
    updateDeliveryOptions();
}

// Generating delivery options
function deliveryOptionsHTML(productId, cartItem)
{
    let deliveryHTML = '';
    deliveryOptions.forEach((deliveryOption) => {
        const dateString = calculateDeliveryDate(deliveryOption);

        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = cartItem.deliveryOptionId === deliveryOption.id;

        deliveryHTML += `
            <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${productId}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
        `;
    });

    return deliveryHTML;
}

// Update the Cart quantity
function updateCheckoutQuantity()
{
    const cartCheckoutElement = document.querySelector('.js-checkout-quantity');
    cartCheckoutElement.textContent = `${ getCartQuantity() || 'No' } Items`;
}


// Update Item quantity
function updateItemQuantity()
{
    const updateItemQuantityElements = document.querySelectorAll('.js-update-cart-item');

    updateItemQuantityElements.forEach((updateItem) => {
        updateItem.addEventListener('click', () => {
            const { productId } = updateItem.dataset;

            // Remove update element
            const updateElement = document.querySelector(`.js-update-quantity-${productId}`);
            updateElement.classList.add('make-invisible');
            
            const editElement = document.querySelector(`.js-edit-quantity-${productId}`);
            editElement.classList.remove('make-invisible');

            const saveButton = document.querySelector(`.save-btn-${productId}`);

            saveButton.addEventListener('click', () => {
                const inputValue = editElement.querySelector('input');

                const newQuantity = Number(inputValue.value);

                modifyCartItem(productId, newQuantity);

                const quantity = getItemQuantity(productId);

                updateCheckoutQuantity();

                if(!quantity) 
                {
                    removeFromCart(productId);
                    // deleting product from webpage
                    const deleteCartItem = document.querySelector(`.js-cart-item-container-${productId}`);
                    if(deleteCartItem) deleteCartItem.remove();
                    return;
                }

                const itemQuantity = document.querySelector(`.js-quantity-label-${productId}`);
                itemQuantity.textContent = quantity;

                // Remove edit
                editElement.classList.add('make-invisible');
                
                // Added update back
                updateElement.classList.remove('make-invisible');
            }, {once: true});
        });
    });
}

// deleting cart item
function deleteCartItem()
{
    const deleteCartItems = document.querySelectorAll('.js-delete-cart-item');

    deleteCartItems.forEach((deleteItem) => {
        deleteItem.addEventListener('click', () => {
            // deleting product from cart
            const { productId } = deleteItem.dataset;
            removeFromCart(productId);

            updateCheckoutQuantity();

            // deleting product from webpage
            const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
            if(cartItemContainer) cartItemContainer.remove();
        });
    });
}

// update delivery options
function updateDeliveryOptions() 
{
    const deliveryOptionElements = document.querySelectorAll('.js-delivery-option');

    deliveryOptionElements.forEach((deliveryOption) => {
        deliveryOption.addEventListener('click', () => {
            const { productId, deliveryOptionId } = deliveryOption.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
        });
    });
}