import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function SignIn() {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [message, setMessage]  = useState('')
const navigate = useNavigate('')




  // Example function to check authentication status
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/check-auth', {
        method: 'GET',
        credentials: 'include' // Include credentials in the request
      });
      const data = await response.json();
      if (data.authenticated) {
        navigate('/'); // Redirect to home page if authenticated
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  });




const handleLogin = async (e) => {
  e.preventDefault();
  const username = email;
  try {
    let result = await fetch('http://localhost:5000/login', {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Include credentials in the request
    });
    result = await result.json();
    console.log(result);

    if (result.message ==="User logged in") {
      // Redirect to the root route on successful login
      navigate('/')
    } else {
      // Set the message in case of an error
      setMessage(result.message || 'Login Failed');
    }
  } catch (error) {
    setMessage('Login Failed');
  }
};


    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleLogin} className="space-y-6" >
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input 
                  onChange={
                    (e)=>(setEmail(e.target.value))}
                    id="email"
                    name="username"
                    type="email"
                    
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                   value={password}
                   onChange={(e)=>(setPassword(e.target.value))}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>

              </div>
              <p className="mt-10 text-center text-sm text-red-500">
              {message && <p>{message}</p>}
              </p>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  