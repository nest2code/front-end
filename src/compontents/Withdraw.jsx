import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Withdraw = () => {
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleWithdraw = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`http://localhost:5000/users/${userId}/withdraw`, {
                method: "POST",
                body: JSON.stringify({ amount: Number(amount) }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const result = await response.json();
            if (response.ok) {
                navigate('/users');
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            console.error('Error during withdraw:', error);
            setMessage('Error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleWithdraw} className='m-[30px]'>
            <div className="space-y-12">
                <div className="block text-lg font-medium leading-6 mb-10 bg-indigo-600 py-4">
                    <p className="text-white-900 px-4">
                        Withdraw Savings
                    </p>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                Withdraw
                            </label>
                            <div className="mt-2">
                                <input
                                    id="amount"
                                    name="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
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
                    Withdraw
                </button>
            </div>
            {message && <p className="text-red-500">{message}</p>}
        </form>
    );
};

export default Withdraw;
