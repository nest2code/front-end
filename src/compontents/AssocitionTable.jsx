import React from 'react';
import { useEffect,useState  } from 'react';
import { Link, useNavigate} from 'react-router-dom';
const AssociationTable = () => {
const [assoc,setAssoc] = useState([])
const [message,setMessage] = useState('')
const [user,setUser] = useState([])
const navigate = useNavigate('')


const getUser =async()=>{
    let result = await fetch('http://localhost:5000/users',{
        method:"GET"
    })
    result = await result.json()
    if (result.message==='ok'){
        setUser(result.users)
        
    }
    else{
        console.log('Error fetching the data')
    //   setMessage('Error fetching the data') 
    }
    
}

useEffect(()=>{
    getUser()
})




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

    return (
    <div className="relative overflow-x-auto shadow-md m-5">

{ 
message ? (
  <p className="text-red-500">{message}</p>
) : (
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">Association Number</div>
        </th>
        <th scope="col" className="px-6 py-3">Name</th>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">Chairperson</div>
        </th>
        <th scope="col" className="px-6 py-3">Secretary</th>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">Treasurer</div>
        </th>
        <th scope="col" className="px-6 py-3">
          <div className="flex items-center">Action</div>
        </th>
      </tr>
    </thead>
    <tbody>
      {assoc.map((assoc) => {
        const chairperson = user.find(u => u._id === assoc.chairperson);
        const secretary = user.find(u => u._id === assoc.secretary);
        const treasurer = user.find(u=>u._id === assoc.treasurer);
        
        return (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={assoc._id}>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {assoc._id}
            </th>
            <td className="px-6 py-4">{assoc.name}</td>
            <td className="px-6 py-4">{chairperson ? `${chairperson.first_name} ${chairperson.last_name}` : 'N/A'}</td>
            <td className="px-6 py-4">{secretary ? `${secretary.first_name} ${secretary.last_name}` : 'N/A'}</td>
            <td className="px-6 py-4">{treasurer ? `${treasurer.first_name} ${treasurer.last_name}` : 'N/A'}</td>
            <td className="px-6 py-4 text-left">
              <Link to={`/update-association/${assoc._id}`} className="font-medium mr-5 text-blue-600 dark:text-blue-500 hover:underline">Update</Link>
              <Link to="/" className="font-medium mr-5 text-blue-600 dark:text-blue-500 hover:underline">View</Link>
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Approve</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
)}

</div>

    );
}

export default AssociationTable;
