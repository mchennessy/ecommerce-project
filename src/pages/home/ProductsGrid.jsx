import axios from 'axios';
import { ProductControl } from './ProductControl';

export function ProductsGrid({ products, loadCart }) {
    async function addToCart(productId, quantity) {
        await axios.post('/api/cart-items', {
            productId: productId,
            quantity
        });
        await loadCart();
    }

    return (
        <div className="products-grid">
            {products.map((product) => (
                <ProductControl key={product.id} product={product} addToCart={addToCart} />
            ))
            }
        </div>
    );
}