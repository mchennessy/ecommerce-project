import { ProductControl } from './ProductControl';

export function ProductsGrid({ products, loadCart }) {
    return (
        <div className="products-grid">
            {products.map((product) => (
                <ProductControl key={product.id} product={product} loadCart={loadCart} />
            ))
            }
        </div>
    );
}