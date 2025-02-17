type Account = {
    id: string;
    owner: string;
    balance: number;
};

const createAccount = (accounts: Account[], account: Account): Account[] => {
    return [...accounts, account];
};

const deposit = (accounts: Account[], idAccount: string, balanceAccount: number): Account[] => {
    return accounts.map(item => 
        item.id === idAccount ? { ...item, balance: item.balance + balanceAccount } : item
    );
};

const withDraw = (accounts: Account[], idAccount: string, balanceAccount: number): Account[] => {
    return accounts.map(item => 
        item.id === idAccount && item.balance >= balanceAccount
            ? { ...item, balance: item.balance - balanceAccount }
            : item
    );
};

const transferMoney = (accounts: Account[], idSender: string, idReceiver: string, money: number): Account[] | null => {
    const sender = accounts.find(item => item.id === idSender);
    const receiver = accounts.find(item => item.id === idReceiver);

    if (!sender || !receiver || sender.balance < money) return null;

    return accounts.map(item => {
        if (item.id === idSender) return { ...item, balance: item.balance - money };
        if (item.id === idReceiver) return { ...item, balance: item.balance + money };
        return item;
    });
};