type Item = {
    id: string;
    name: string;
    price: number;
    stock: number;
}


const addItem = ({ inventory, newItem }: { inventory: Item[], newItem: Item }): Item[] => {
    const inventoryItems = [...inventory, newItem]
    return inventoryItems;
}

const updateStock = (inventory: Item[], itemId: string, quantity: number): Item[] => {
    return inventory.map(item =>
        item.id === itemId
            ? { ...item, stock: Math.max(item.stock + quantity, 0) }
            : item
    );
}

const calculateTotalValue = ({ inventory }: { inventory: Item[] }): number => {
    const totalValue = inventory.reduce((acc, item) => acc + (item.price * item.stock), 0)
    return totalValue;
}

const getLowStockItems = (inventory: Item[], threshold: number): Item[] => {
    return inventory.filter(item => item.stock <= threshold);
};