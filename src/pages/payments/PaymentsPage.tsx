
import React, { useState } from "react";

interface Transaction {
  id: string;
  type: "Deposit" | "Withdraw" | "Transfer";
  amount: number;
  sender: string;
  receiver: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
}

export const PaymentsPage: React.FC = () => {
  const [walletBalance, setWalletBalance] = useState<number>(1000);
  const [amount, setAmount] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  
const handleTransaction = (type: "Deposit" | "Withdraw" | "Transfer") => {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) return;

  const newTransaction: Transaction = {
    id: Date.now().toString(),
    type,
    amount: numericAmount,
    sender: type === "Deposit" ? "User" : "You",
    receiver: type === "Withdraw" ? "Bank" : "Someone",
    status: "Completed",
    date: new Date().toLocaleString(),
  };

  setWalletBalance(prev =>
    type === "Deposit" ? prev + numericAmount : prev - numericAmount
  );

  setTransactions([newTransaction, ...transactions]);
  setAmount(''); // clear input after transaction
};

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Wallet & Payments</h1>

      {/* Wallet Balance */}
      <div className="p-4 bg-blue-100 rounded-lg w-1/3">
        <h2 className="text-lg font-medium">Wallet Balance</h2>
        <p className="text-2xl font-bold">${walletBalance.toFixed(2)}</p>
      </div>

      {/* Transaction Form */}
      <div className="p-4 bg-white rounded-lg shadow space-y-4 w-1/2">
        <h2 className="text-lg font-medium">Make a Transaction</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="border p-2 rounded w-full"
        />
        <div className="flex gap-3">
          <button
            onClick={() => handleTransaction("Deposit")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Deposit
          </button>
          <button
            onClick={() => handleTransaction("Withdraw")}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Withdraw
          </button>
          <button
            onClick={() => handleTransaction("Transfer")}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Transfer
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="p-4 bg-white rounded-lg shadow overflow-x-auto">
        <h2 className="text-lg font-medium mb-2">Transaction History</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Type</th>
              <th className="border px-3 py-2">Amount</th>
              <th className="border px-3 py-2">Sender</th>
              <th className="border px-3 py-2">Receiver</th>
              <th className="border px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No transactions yet
                </td>
              </tr>
            )}
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="border px-3 py-2">{t.date}</td>
                <td className="border px-3 py-2">{t.type}</td>
                <td className="border px-3 py-2">${t.amount.toFixed(2)}</td>
                <td className="border px-3 py-2">{t.sender}</td>
                <td className="border px-3 py-2">{t.receiver}</td>
                <td className="border px-3 py-2">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};