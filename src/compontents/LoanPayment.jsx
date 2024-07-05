import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const LoanPaymentForm = () => {
    const { userId, loanId } = useParams();
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [message, setMessage] = useState('');
    const [details, setDetails] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await fetch(`http://localhost:5000/loan-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId,
                  loanApplicationId:loanId,
                  details,
                    paymentAmount: parseFloat(paymentAmount.replace(/,/g, '')),
                    paymentMode,
                }),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to make loan payment');
            }

            setMessage(data.message);
            setPaymentAmount('');
            setPaymentMode('Cash');
        } catch (error) {
            setError(error.message);
        }
    };

    const formatAmount = (value) => {
        return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className="m-5">
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="space-y-12">
                    <div className="block text-lg font-medium leading-6 mb-10 bg-indigo-600 py-4">
                        <p className="text-white-900 px-4">Loan Payment</p>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                    Payment Amount
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="amount"
                                        name="amount"
                                        value={formatAmount(paymentAmount)}
                                        onChange={(e) => setPaymentAmount(e.target.value)}
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                           
                            <div className="sm:col-span-4">
                                <label htmlFor="paymentMode" className="block text-sm font-medium leading-6 text-gray-900">
                                    Payment Mode
                                </label>
                                <div className="mt-2 ">
                                    <select
                                        id="paymentMode"
                                        name="paymentMode"
                                        value={paymentMode}
                                        onChange={(e) => setPaymentMode(e.target.value)}
                                        className=" py-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="MobileMoney">Mobile Money</option>
                                        <option value="Bank">Bank</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Saving">Saving</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                   Details
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="detail"
                                        name="amount"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        type="text"
                                        placeholder="e.g Ref or recieptient"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Submit Payment
                    </button>
                </div>
                {message && <p className="text-green-500">{message}</p>}
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default LoanPaymentForm;
