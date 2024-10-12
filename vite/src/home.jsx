import { useState } from 'preact/hooks';

const Home = () => {
    const [showTransactions, setShowTransactions] = useState(false);
    const [balance, setBalance] = useState(2304.51);
    const [transactions, setTransactions] = useState([
        { id: 1, date: '2024-09-01', description: 'Grocery Store', amount: -75.50 },
        { id: 2, date: '2024-09-02', description: 'Salary Deposit', amount: 2500.00 },
        { id: 3, date: '2024-09-03', description: 'Electric Bill', amount: -120.00 },
    ]);
    const [bills, setBills] = useState([
        { id: 1, name: 'Electricity Bill', amount: 120.00, dueDate: '2024-10-15', paid: false },
        { id: 2, name: 'Internet Bill', amount: 59.99, dueDate: '2024-10-20', paid: false },
        { id: 3, name: 'Water Bill', amount: 45.00, dueDate: '2024-10-25', paid: false },
    ]);

    const handleLogout = () => {
        // generate error deliberately!
        localStorage.removeItem('isLoggedIN'); // should be In not IN
        window.location.href = '/';
    };

    const handlePayBill = (billId) => {
        const billToPay = bills.find(bill => bill.id === billId);
        if (billToPay && !billToPay.paid && balance >= billToPay.amount) {
            const newBalance = balance - billToPay.amount;
            setBalance(newBalance);

            const updatedBills = bills.map(bill =>
                bill.id === billId ? { ...bill, paid: true } : bill
            );
            setBills(updatedBills);

            const newTransaction = {
                id: transactions.length + 1,
                date: new Date().toISOString().split('T')[0],
                description: `Paid ${billToPay.name}`,
                amount: -billToPay.amount
            };
            setTransactions([newTransaction, ...transactions]);
        }
    };

    return (
        <div class="h-screen w-full bg-gray-100">
            {/* NAVBAR */}
            <nav class="bg-orange-600 text-white p-4">
                <div class="max-w-6xl mx-auto flex justify-between items-center">
                    <div class="text-xl font-bold">SAS Bank™</div>
                    <button
                        onClick={handleLogout}
                        class="bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div class="max-w-6xl mx-auto p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SUMMARY */}
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h2 class="text-xl font-semibold mb-4">Account Summary</h2>
                        <div class="text-3xl font-bold text-orange-600">&#8377;{balance.toFixed(2)}</div>
                        <div class="text-gray-600">Available Balance</div>
                    </div>

                    {/* VIEW TRANSACTIONS KA CONTAINER */}
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
                        <div class="space-x-4">
                            <button
                                // css selector: #view-transactions
                                id="view-transactions"
                                onClick={() => setShowTransactions(!showTransactions)}
                                class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                            >
                                {showTransactions ? 'Hide' : 'View'} Transactions
                            </button>
                        </div>
                    </div>
                </div>

                {/* TRANSACTIONS CONTAINER */}
                {showTransactions && (
                    <div class="mt-6 bg-white rounded-lg shadow-md p-6">
                        <h2 class="text-xl font-semibold mb-4">Recent Transactions</h2>
                        <div class="overflow-x-auto">
                            <table class="min-w-full">
                                <thead>
                                    <tr class="border-b">
                                        <th class="text-left py-2">Date</th>
                                        <th class="text-left py-2">Description</th>
                                        <th class="text-right py-2">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/*
                                      * NOTE
                                      * for any given transaction
                                      * the tr ID is "transaction-<number>-tr" (1, 2, ...)
                                      * the td IDs are "transaction-<number>-date" (1, 2, ...)
                                      *                "transaction-<number>-desc" (1, 2, ...)
                                      *                "transaction-<number>-amount" (1, 2, ...)
                                      */}
                                    {transactions.map(transaction => (
                                        <tr id={`transaction-${transaction.id}-tr`} key={transaction.id} class="border-b">
                                            <td id={`transaction-${transaction.id}-date`} class="py-2">{transaction.date}</td>
                                            <td id={`transaction-${transaction.id}-desc`} class="py-2">{transaction.description}</td>
                                            <td id={`transaction-${transaction.id}-amount`} class={`py-2 text-right ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                &#8377;{Math.abs(transaction.amount).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Bills Section */}
                <div class="mt-6 bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-semibold mb-4">Upcoming Bills</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/*
                          * NOTE
                          * for any given bill
                          * the bill ID is "bill-<number>"
                          * the info IDs are "bill-<number>-name"
                          *                  "bill-<number>-amount"
                          *                  "bill-<number>-due-date"
                          */}
                        {bills.map(bill => (
                            <div key={bill.id} id={`bill-${bill.id}`} class="border rounded-lg p-4">
                                <div class="font-semibold" id={`bill-${bill.id}-name`}>{bill.name}</div>
                                <div class="text-lg text-orange-600" id={`bill-${bill.id}-amount`}>&#8377;{bill.amount.toFixed(2)}</div>
                                <div class="text-sm text-gray-600" id={`bill-${bill.id}-due-date`}>Due: {bill.dueDate}</div>
                                {bill.paid ? (
                                    <span class="mt-2 inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                        Paid
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => handlePayBill(bill.id)}
                                        disabled={balance < bill.amount}
                                        class={`mt-2 ${balance < bill.amount
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-green-500 hover:bg-green-700'
                                            } text-white font-bold py-1 px-3 rounded text-sm`}
                                    >Pay Now</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;