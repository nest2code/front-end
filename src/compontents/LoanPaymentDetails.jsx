import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const LoanPaymentDetails = () => {
    const { userId, loanId } = useParams();
    const [loanDetails, setLoanDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLoanDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/loan-payments/${userId}/${loanId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch loan details');
                }
                const data = await response.json();
                setLoanDetails(data);
            } catch (error) {
                setError('Failed to fetch loan details');
            }
        };

        fetchLoanDetails();
    }, [userId, loanId]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!loanDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="relative overflow-x-auto shadow-md m-5">
            <div className="block text-lg font-medium leading-6 mb-10 bg-indigo-600 py-4">
                <p className="text-white-900 px-4">Loan Payment Details</p>
            </div>
            <div className="mb-4">
                <p><strong>Total Loan Amount:</strong> {loanDetails.loan.amount.toFixed(2)}</p>
                <p><strong>Interest Rate:</strong> {loanDetails.loan.interestRate}%</p>
                <p><strong>Total Paid:</strong> {loanDetails.totalPaid.toFixed(2)}</p>
                <p><strong>Remaining Balance:</strong> {loanDetails.remainingBalance.toFixed(2)}</p>
            </div>
            {loanDetails.payments.length > 0 ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">S/N</th>
                            <th scope="col" className="px-6 py-3">Payment Date</th>
                            <th scope="col" className="px-6 py-3">Payment Amount</th>
                            <th scope="col" className="px-6 py-3">Payment Mode</th>
                            <th scope="col" className="px-6 py-3">Payment Details</th>
                            <th scope="col" className="px-6 py-3">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loanDetails.payments.map((payment, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{payment.paymentAmount.toFixed(2)}</td>
                                <td className="px-6 py-4">{payment.paymentMode}</td>
                                {payment.details? <td className="px-6 py-4">{payment.details}</td>:"No detail"}
                               
                                <td className="px-6 py-4">{payment.balance.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No payments made yet.</p>
            )}
            <div className="m-6 flex items-center justify-end gap-x-6">
                <Link to={`/loan-payment/${userId}/${loanId}`} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Make Payment
                </Link>
            </div>
        </div>
    );
};

export default LoanPaymentDetails;
