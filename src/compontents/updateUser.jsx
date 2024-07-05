import React from 'react';
import { useState,useEffect } from 'react';
import {useParams,useNavigate } from 'react-router-dom';
const UpdateUser = () => {
const [assoc,setAssoc] = useState([])
const [user,setUser] = useState('')
const [association,setAssociation] = useState('')
const [message,setMessage] = useState('')
const navigate = useNavigate('')
const {id} = useParams()


const getAssoc =async()=>{
    let result = await fetch('http://localhost:5000/add-association',{
        method:"GET"
    })
    result = await result.json()
    
    if (result){
        setAssoc(result.assoc)
    }
    else{
    
   setMessage('currently no associations in the database') 
    }
    
};

useEffect(()=>{
    getAssoc()
},[])


const getUser =async()=>{
    let result = await fetch(`http://localhost:5000/user/${id}`,{
        method:"GET",
        credentials:'include' 
    })
    result = await result.json()
    
    if (result){
        setUser(result.user)
    }
    else{
    
   setMessage('currently no associations in the database') 
    }
    
};

useEffect(()=>{
    getUser()
})


const handleSubmit =async (e)=>{
    e.preventDefault()
    let result = await fetch(`http://localhost:5000/user/${id}`,{
      method:"PUT",
      body: JSON.stringify({association}),
      headers:{
        'Content-Type':'application/json'
      },
      credentials:'include'
    })
    result = await result.json()
    if (result.message==="ok"){
        navigate('/users')
    }
    else{
      setMessage('Couldnot ass the user to the association')
    }
    
}

    return (
        <form onSubmit={handleSubmit} className="m-[30px]">
            <div className="block text-lg font-medium leading-6 mb-10 bg-indigo-600 py-4">
                <p className="text-white-900 px-4">
                    Add Association to User
                </p>
            </div>
        
            
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={"        "+user.first_name}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                readOnly
               />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={"        "+user.last_name}
                  readOnly
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
          </div>
    
          <div className="sm:col-span-4">
            <label
              htmlFor="secretary"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Association
            </label>
            <div className="mt-2">
              <select
                id="secretary"
                name="secretary"
                required
                onChange={(e)=>{
                    setAssociation(e.target.value)
                }}
                className="block w-full rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Choose Association</option>
                 {assoc.map((assoc, index) => (
                  <option key={index} value={assoc._id}>
                    {assoc.name}
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
}

export default UpdateUser;
