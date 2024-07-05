import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateAssociation = () => {
  const [chairperson, setChairPerson] = useState("");
  const [secretary, setSecretary] = useState("");
  const [treasurer, setTreasurer] = useState("");
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate('')

const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/check-auth', {
        method: 'GET',
        credentials: 'include' // Include credentials in the request
      });
      const data = await response.json();
      if (!data.authenticated) {
        navigate('/login'); // Redirect to home page if authenticated
      }
    
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };

useEffect(() => {
    
    checkAuthStatus();

});

  const getUser = async () => {
    let result = await fetch("http://localhost:5000/users", {
      method: "GET",
    });
    result = await result.json();
    if (result.message === "ok") {
      setUser(result.users);
    } else {
      console.log("Error fetching the data");
    }
  };

  useEffect(() => {
    getUser();
  }, []); // use an empty dependency array to run this effect only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chairperson !== secretary && chairperson !== treasurer && secretary !== treasurer) {
    
        let result = await fetch(`http://localhost:5000/update-association/${id}`,{
            method:"PUT",
            body:JSON.stringify({chairperson,secretary,treasurer}),
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'

        })
        result = await result.json()
            if (result.message ==="ok"){
                navigate('/add-association')
            }
            else{
                setMessage(result.message)
            }
    
}
     else {
      setMessage("Individual cannot have more than one position");
      console.log({ chairperson, secretary, treasurer });
      console.log(id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-[30px]">
        <div className="block text-lg font-medium leading-6 mb-10 bg-indigo-600 py-4">
            <p className="text-white-900 px-4">
                Add Association Leaders
            </p>
        </div>
      <div className="sm:col-span-4">
        <label
          htmlFor="chairperson"
          className="block text-lg font-medium leading-6 text-gray-900"
        >
          Chairperson
        </label>
        <div className="mt-2">
          <select
            id="chairperson"
            name="chairperson"
            onChange={(e) => {
              setChairPerson(e.target.value);
            }}
            required
            className="block w-full rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select a chairperson</option>
            {user.map((user, index) => (
              <option key={index} value={user._id}>
                {user.first_name + " " + user.last_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="sm:col-span-4">
        <label
          htmlFor="secretary"
          className="block text-lg font-medium leading-6 text-gray-900"
        >
          Secretary
        </label>
        <div className="mt-2">
          <select
            id="secretary"
            name="secretary"
            required
            onChange={(e) => {
              setSecretary(e.target.value);
            }}
            className="block w-full rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select a secretary</option>
            {user.map((user, index) => (
              <option key={index} value={user._id}>
                {user.first_name + " " + user.last_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="sm:col-span-4">
        <label
          htmlFor="treasurer"
          className="block text-lg font-medium leading-6 text-gray-900"
        >
          Treasurer
        </label>
        <div className="mt-2">
          <select
            id="treasurer"
            name="treasurer"
            required
            onChange={(e) => {
              setTreasurer(e.target.value);
            }}
            className="block w-full rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select a treasurer</option>
            {user.map((user, index) => (
              <option key={index} value={user._id}>
                {user.first_name + " " + user.last_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>
      </div>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
};

export default UpdateAssociation;
