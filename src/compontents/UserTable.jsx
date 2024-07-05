import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserTable = () => {
    const [user, setUser] = useState([]);
    const [assoc, setAssoc] = useState([]);
    const [message, setMessage] = useState('');

    const getAssoc = async () => {
        try {
            let result = await fetch('http://localhost:5000/add-association', {
                method: "GET"
            });
            result = await result.json();
            
            if (result.assoc) {
                setAssoc(result.assoc);
            } else {
                setMessage('Currently no associations in the database');
            }
        } catch (error) {
            setMessage('Error fetching associations');
        }
    };

    useEffect(() => {
        getAssoc();
    }, []);

    const getUser = async () => {
        try {
            let result = await fetch('http://localhost:5000/users', {
                method: "GET"
            });
            result = await result.json();
            if (result.message === 'ok') {
                setUser(result.users);
            } else {
                console.log('Error fetching the data');
            }
        } catch (error) {
            console.log('Error fetching the data');
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    

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

    return (
        <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                S/N
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Phone Number
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Association
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Role
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Status
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Action
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((user, index) => {
                        const association = assoc.find(a => a._id === user.association); // Assuming user has assocId field
                        const role = determineRole(user, association);
                      
                        console.log("User ID:", user._id);
                        console.log("User Association ID:", user.assocId);
                        console.log("Association found:", association);

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
                                    <Link to={`/user/${user._id}`} className="font-medium mr-5 text-blue-600 dark:text-blue-500 hover:underline">Update</Link>
                                    <Link to={`/user-view/${user._id}`} className="font-medium mr-5 text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Approve</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
