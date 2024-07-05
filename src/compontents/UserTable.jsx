import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [associations, setAssociations] = useState([]);
    const [message, setMessage] = useState('');
    const [searchKey, setSearchKey] = useState('');

    // Fetch associations
    const getAssociations = async () => {
        try {
            let response = await fetch('http://localhost:5000/add-association');
            let data = await response.json();
            if (data.assoc) {
                setAssociations(data.assoc);
            } else {
                setMessage('Currently no associations in the database');
            }
        } catch (error) {
            setMessage('Error fetching associations');
        }
    };

    useEffect(() => {
        getAssociations();
    }, []);

    // Fetch users
    const getUsers = async () => {
        try {
            let response = await fetch('http://localhost:5000/users');
            let data = await response.json();
            if (data.message === 'ok') {
                setUsers(data.users);
            } else {
                console.log('Error fetching the data');
            }
        } catch (error) {
            console.log('Error fetching the data');
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    // Search users
    const searchUsers = async (query) => {
        try {
            let response = await fetch(`http://localhost:5000/search/${query}`);
            let data = await response.json();
            if (data.message === 'ok') {
                setUsers(data.users);
            } else {
                console.log('Error fetching search results');
            }
        } catch (error) {
            console.log('Error fetching search results');
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchKey(query);
        if (query) {
            searchUsers(query);
        } else {
            getUsers();
        }
    };

    const determineRole = (user, association) => {
        if (!association) {
            return 'No Association';
        }
        if (user._id === association.chairperson) {
            return 'Chairperson';
        }
        if (user._id === association.secretary) {
            return 'Secretary';
        }
        if (user._id === association.treasurer) {
            return 'Treasurer';
        }
        return 'Member';
    };

    // Handle approve button click
    const handleApproveClick = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/update-user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to approve user');
            }
            const result = await response.json();
            alert(result.message);

            // Update user status in the UI
            const updatedUsers = users.map(user =>
                user._id === userId ? { ...user, status: 'Approved' } : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <div className="relative w-full max-w-md ml-auto mt-10 mb-10 mr-36">
                <input
                    type="text"
                    value={searchKey}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Search..."
                />
            </div>

            <div className="relative overflow-x-auto shadow-md m-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">S/N</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Phone Number</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Association</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            const association = associations.find(a => a._id === user.association);
                            const role = determineRole(user, association);
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user._id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.first_name + " " + user.last_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.phone_number}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.username}
                                    </td>
                                    <td className="px-6 py-4">
                                        {message ? "N/A" : (association ? association.name : "No Association")}
                                    </td>
                                    <td className="px-6 py-4">
                                        {role}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.status}
                                    </td>
                                    <td className="px-6 py-4 text-left">
                                      { user.status ==="Approved" && <Link to={`/user/${user._id}`} className="font-medium mr-5 text-blue-600 dark:text-blue-500 hover:underline">Update</Link> }
                                       { user.status ==="Approved" &&  <Link to={`/user-view/${user._id}`} className="font-medium mr-5 text-blue-600 dark:text-blue-500 hover:underline">View</Link>}
                                        {user.status !== 'Approved' && (
                                            <button
                                                type="button"
                                                onClick={() => handleApproveClick(user._id)}
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserTable;

