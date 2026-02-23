import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';

export function OrderSummary({ cart, deliveryOptions }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId);
                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery Date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>

                        <div className="cart-item-details-grid">
                            <img className="product-image"
                                src={cartItem.product.image} />

                            <div className="cart-item-details">
                                <div className="product-name">
                                    {cartItem.product.name}
                                </div>
                                <div className="product-price">
                                    {formatMoney(cartItem.product.priceCents)}
                                </div>
                                <div className="product-quantity">
                                    <span>
                                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                    </span>
                                    <span className="update-quantity-link link-primary">
                                        Update
                                    </span>
                                    <span className="delete-quantity-link link-primary">
                                        Delete
                                    </span>
                                </div>
                            </div>

                            <div className="delivery-options">
                                <div className="delivery-options-title">
                                    Choose a delivery option:
                                </div>
                                {deliveryOptions.map((deliveryOption) => {
                                    return (
                                        <div key={deliveryOption.id} className="delivery-option">
                                            <input type="radio"
                                                checked={deliveryOption.id == cartItem.deliveryOptionId}
                                                className="delivery-option-input"
                                                name={`delivery-option-${cartItem.product.id}`} />
                                            <div>
                                                <div className="delivery-option-date">
                                                    {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                                </div>
                                                <div className="delivery-option-price">
                                                    {deliveryOption.priceCents == 0 ? "FREE Shipping" : formatMoney(deliveryOption.priceCents) + " - Shipping"}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                                }
                            </div>
                        </div>
                    </div>
                );
            })
            }

        </div>
    );
}