import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TransferShare = () => {
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [toUserId, setToUserId] = useState('');
    const { userId } = useParams();
    const navigate = useNavigate();

    const getUsers = async () => {
        try {
            let result = await fetch(`http://localhost:5000/users`, {
                method: "GET",
                credentials: 'include'
            });
            result = await result.json();
            if (result) {
                const filteredUsers = result.users.filter(user => user._id !== userId);
                setUsers(filteredUsers);
            } else {
                setMessage('Currently no user in the database');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setMessage('Error fetching users. Please try again later.');
        }
    };

    useEffect(() => {
        getUsers();
    });

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`http://localhost:5000/users/transfer-shares/${userId}`, {
                method: "POST",
                body: JSON.stringify({ amount, toUserId }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            // Check if the response is JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                let result = await response.json();
                if (result.message === 'Shares transferred successfully') {
                    navigate('/users');
                } else {
                    setMessage(result.message);
                }
            } else {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                setMessage('Error: Non-JSON response from server');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            setMessage('Error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleTransfer} className='m-[30px]'>
            <div className="space-y-12">
                <div className="block text-lg font-medium leading-6 mb-10 bg-indigo-600 py-4">
                    <p className="text-white-900 px-4">
                        Transfer Shares
                    </p>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                Amount
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
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="user"
                                className="block text-lg font-medium leading-6 text-gray-900"
                            >
                                Account Name
                            </label>
                            <div className="mt-2">
                                <select
                                    id="user"
                                    name="user"
                                    required
                                    onChange={(e) => setToUserId(e.target.value)}
                                    className="block w-full rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option value="">Choose User</option>
                                    {users.map((user, index) => (
                                        <option key={index} value={user._id}>
                                            {`${user.first_name} ${user.last_name}`}
                                        </option>
                                    ))}
                                </select>
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
                    Transfer
                </button>
            </div>
            {message && <p className="text-red-500">{message}</p>}
        </form>
    );
}

export default TransferShare;
