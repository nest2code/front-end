import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cta, Hero, Testmonials } from "../compontents/compontent";

const Home = () => {
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

    return (
      <>
        <Hero />
        <Cta />
        <Testmonials />
      </>
    );
  };
export default Home;
