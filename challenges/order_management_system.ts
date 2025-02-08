

type Product = {
    id: string;
    name: string;
    price: number;
    category: 'electronics' | 'clothing' | 'food';
}


type Order = Readonly<{
    id: string;
    products: Product[];
    totalPrice: number;
}>

const totalPrice = (order: Order) => {
    const sum = order.products.reduce((total, item) => total + item.price, 0)
    return sum > 100 ? sum * 0.9 : sum
}

const fetchOrderById = (orders: Order[], id: string) => {
    return orders.find((item) => item.id === id) || null
}
