import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const LoanDetails = () => {
  const { userId } = useParams();
  const [loans, setLoans] = useState([]);
  const [totalLoanBalance, setTotalLoanBalance] = useState(0);
  const [error, setError] = useState('');

  // Fetch user's loans on component mount
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`http://localhost:5000/loans/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch loans');
        }
        const data = await response.json();
        setLoans(data);
        calculateTotalLoanBalance(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLoans();
  }, [userId]);

  // Calculate total loan balance including principal + interest
  const calculateTotalLoanBalance = (loanList) => {
    const totalBalance = loanList.reduce((acc, loan) => acc + (loan.amount * (1 + loan.interestRate / 100)), 0);
    setTotalLoanBalance(totalBalance);
  };

  // Handle loan approval
  const approveLoan = async (loanId) => {
    try {
      const response = await fetch(`http://localhost:5000/update-loan/${loanId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to approve loan');
      }

      const result = await response.json();
      alert(result.message);

      // Optionally, refresh the loan list to reflect the changes
      const updatedLoans = loans.map((loan) =>
        loan._id === loanId ? { ...loan, status: 'Approved', startDate: new Date() } : loan
      );
      setLoans(updatedLoans);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md m-5">
      <div className="block text-lg font-medium leading-6 mb-10 bg-indigo-600 py-4">
        <p className="text-white-900 px-4">Total Loan Balance: {totalLoanBalance.toFixed(2)}</p>
      </div>

      {error ? (
        <p>{error}</p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">S/N</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Interest Rate (%)</th>
              <th scope="col" className="px-6 py-3">Duration (months)</th>
              <th scope="col" className="px-6 py-3">Start Date</th>
              <th scope="col" className="px-6 py-3">End Date</th>
              <th scope="col" className="px-6 py-3">Total Amount</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{loan.amount.toFixed(2)}</td>
                <td className="px-6 py-4">{loan.interestRate}</td>
                <td className="px-6 py-4">{loan.duration}</td>
                <td className="px-6 py-4">{new Date(loan.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">{new Date(loan.endDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">{(loan.amount * (1 + loan.interestRate / 100)).toFixed(2)}</td>
                <td className="px-6 py-4">{loan.status}</td>
                <td className="px-6 py-4 text-left">
                  { loan.status ==="Approved" && <Link to={`/loan-payment/${userId}/${loan._id}`} className="font-medium mr-5 text-blue-600 dark:text-blue-500 hover:underline">Payment</Link>}
                  { loan.status ==="Approved" && <Link to={`/payment-view/${userId}/${loan._id}`} className="font-medium mr-5 text-blue-600 dark:text-blue-500 hover:underline">View Details</Link>}
                  {loan.status !== 'Approved' && (
                    <button
                      type="button"
                      onClick={() => approveLoan(loan._id)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LoanDetails;
