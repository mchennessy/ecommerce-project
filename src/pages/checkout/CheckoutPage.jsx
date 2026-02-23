import axios from 'axios';
import { useState, useEffect } from 'react';
import './checkout-header.css'
import './CheckoutPage.css'
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime').then((response) => {
            setDeliveryOptions(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get('/api/payment-summary').then((response) => {
            setPaymentSummary(response.data);
        });
    }, [cart]);
    
    return (
        <>
            <title>Checkout</title>

            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">{totalItems} items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div >
                <div className="checkout-page">
                    <div className="page-title">Review your order</div>
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

                    <div className="checkout-grid">
                        <PaymentSummary paymentSummary={paymentSummary} />
                    </div>
                </div>
            </div>
        </>
    )
}