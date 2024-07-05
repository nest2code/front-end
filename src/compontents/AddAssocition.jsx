import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAssociation() {
    const [name ,setName] = useState('')
    const [message,setMessage] = useState('')
    const navigate = useNavigate('')
    const handleCancel = () => {
       setName('')
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            let result = await fetch('http://localhost:5000/add-association', {
              method: "POST",
              body: JSON.stringify({name}),
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include' // Include credentials in the request
            });
            result = await result.json();
            console.log(result);
      
            if (result.message === "ok") {
              // Redirect to the profile route on successful registration
             setName('')
            } else {
              // Set the message in case of an error
              setMessage(result.message || 'Failed to Add association');
            }
          } catch (error) {
            setMessage('Failed to Add * association');
          }
        }
    return (
        <form onSubmit={handleSubmit} className="flex items-center justify-end space-x-4 m-10">
            <div className="flex-1 sm:max-w-md">
           
                <div className=" flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value)
                        }}
                        id="association_name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Add Association"
                        required
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button onClick={handleCancel} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add
                </button>
            </div>
            <p className="mt-5 text-center text-sm text-red-500">
            {message && <p>{ message}</p>}
            </p>
        </form>
    );
}
