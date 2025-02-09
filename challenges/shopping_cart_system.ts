import { Product } from "./order_management_system";

type CartItem = {
    product: Product;
    quantity: number;
};

type ShoppingCart = Readonly<{
    items: CartItem[];
}>;

let cart: ShoppingCart = { items: [] };

const addProduct = (cart: ShoppingCart, product: Product, quantity: number): ShoppingCart => {
    // Clone the cart items (immutability)
    let cartItems = [...cart.items];

    // Check if product exists in cart
    const existingIndex = cartItems.findIndex((item) => item.product.id === product.id);

    if (existingIndex !== -1) {
        // If product exists, update its quantity
        cartItems[existingIndex] = {
            ...cartItems[existingIndex],
            quantity: cartItems[existingIndex].quantity + quantity,
        };
    } else {
        // Apply discount if quantity >= 5
        const discountedProduct = quantity >= 5
            ? { ...product, price: product.price * 0.9 }
            : product;

        cartItems.push({ product: discountedProduct, quantity });
    }

    return { items: cartItems };
};

const removeProduct = (cart: ShoppingCart, productId: string): ShoppingCart => {
    return { items: cart.items.filter((item) => item.product.id !== productId) };
};

const calculateTotal = (cart: ShoppingCart): number => {
    const sum = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    return sum > 200 ? sum * 0.85 : sum; // Apply 15% discount if > $200
};