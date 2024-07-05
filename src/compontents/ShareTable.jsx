import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ShareTable = () => {
  const { userId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShares = async () => {
      try {
        let response = await fetch(`http://localhost:5000/users/view-shares/${userId}`, {
          method: "GET"
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        response = await response.json();
        setTransactions(response.transactions);
        setBalance(response.balance);
      } catch (error) {
        setError("Error fetching shares. Please try again later.");
        console.error("Error fetching shares:", error);
      }
    };

    fetchShares();
  }, [userId]);

  return (
    <div className="relative overflow-x-auto shadow-md m-5">
      <div className="block text-lg font-medium leading-6 mb-10 bg-indigo-600 py-4">
        <p className="text-white-900 px-4">Shares Balance: {balance.toFixed(2)}</p>
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
              <th scope="col" className="px-6 py-3">Transferred To/From</th>
              <th scope="col" className="px-6 py-3">Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">{transaction.type}</td>
                <td className="px-6 py-4">{transaction.amount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  {transaction.type === "Transferred" ? (
                    transaction.amount > 0 ? (
                      `From: ${transaction.fromUser}`
                    ) : (
                      `To: ${transaction.toUser}`
                    )
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4">{transaction.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShareTable;
