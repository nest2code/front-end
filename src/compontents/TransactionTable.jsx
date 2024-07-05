import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TransactionTable = () => {
  const { userId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let response = await fetch(`http://localhost:5000/users/${userId}/savings-statement`, {
          method: "GET"
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        response = await response.json();
        setTransactions(response.transactions);
        setBalance(response.balance);
      } catch (error) {
        setError("Error fetching transactions. Please try again later.");
        console.error("Error fetching transactions:", error);
      }
    };
  
    fetchTransactions();
  }, [userId]);
  
  return (
    <div className="relative overflow-x-auto shadow-md m-5">
      <div className="block text-lg font-medium leading-6 mb-10 bg-indigo-600 py-4 ">
        <p className="text-white-900 px-4">Account Balance: {balance.toFixed(2)}</p>
      </div>

      {error ? (
        <p>{error}</p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">S/N</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{new Date(transaction.date).toLocaleString()}</td>
                <td className="px-6 py-4">{transaction.type}</td>
                <td className="px-6 py-4">{transaction.amount.toFixed(2)}</td>
                <td className="px-6 py-4">{transaction.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionTable;
