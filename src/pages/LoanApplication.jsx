import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const LoanApplicationForm = () => {
  const [amount, setAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');
  const [user, setUser] = useState(null);
  const [associations, setAssociations] = useState([]);
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');
  const [weeklyPayment, setWeeklyPayment] = useState('');
  const [totalLoanAmount, setTotalLoanAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const { userId } = useParams();

  const getUser = async () => {
    try {
      const result = await fetch(`http://localhost:5000/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await result.json();
      setUser(data.user);
      console.log(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const getAssoc = async () => {
    try {
      const result = await fetch('http://localhost:5000/add-association', {
        method: 'GET',
      });
      const data = await result.json();

      if (data) {
        setAssociations(data.assoc);
      } else {
        setMessage('Currently no associations in the database');
      }
    } catch (error) {
      console.error('Error fetching associations:', error);
    }
  };

  useEffect(() => {
    getUser();
    getAssoc();
  }, [userId]);

  useEffect(() => {
    if (amount) {
      setFormattedAmount(formatNumberWithCommas(amount));
    } else {
      setFormattedAmount('');
    }
  }, [amount]);

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const removeCommas = (formattedNumber) => {
    return formattedNumber.replace(/,/g, '');
  };

  useEffect(() => {
    if (amount && interestRate && duration) {
      const principal = parseFloat(amount);
      const rate = parseFloat(interestRate) / 100;
      const months = parseInt(duration, 10);

      const calculatedInterest = principal * rate;
      const calculatedTotalLoanAmount = principal + calculatedInterest;
      const calculatedWeeklyPayment = calculatedTotalLoanAmount / (months * 4);

      setInterest(calculatedInterest.toFixed(2).toLocaleString());
      setTotalLoanAmount(calculatedTotalLoanAmount.toFixed(2).toLocaleString());
      setWeeklyPayment(calculatedWeeklyPayment.toFixed(2).toLocaleString());
    }
  }, [amount, interestRate, duration]);

  const handleLoanApplication = async (e) => {
    e.preventDefault();
    const loanApplication = {
      user: userId,
      amount: parseFloat(removeCommas(amount)), // Submit raw number without commas
      interestRate: parseFloat(interestRate),
      duration: parseInt(duration, 10),
    };

    try {
      const response = await fetch(`http://localhost:5000/loan-application/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loanApplication),
      });

      if (response.ok) {
        setMessage('Loan application submitted successfully.');
      } else {
        throw new Error('Failed to submit loan application');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const getAssociationName = () => {
    if (user && user.association && associations.length > 0) {
      const association = associations.find((assoc) => assoc._id === user.association);
      return association ? association.name : '';
    }
    return '';
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleLoanApplication} className="m-[30px]">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Loan Application</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please provide the necessary information to apply for a loan.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                Requested Amount
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  onChange={(e) => setAmount(removeCommas(e.target.value))}
                  value={formattedAmount}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="e.g. 5,000"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="interestRate" className="block text-sm font-medium leading-6 text-gray-900">
                Interest Rate (%)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="interestRate"
                  id="interestRate"
                  onChange={(e) => setInterestRate(e.target.value)}
                  value={interestRate}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="e.g. 5"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="duration" className="block text-sm font-medium leading-6 text-gray-900">
                Duration (months)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="duration"
                  id="duration"
                  onChange={(e) => setDuration(e.target.value)}
                  value={duration}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="e.g. 12"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="association" className="block text-sm font-medium leading-6 text-gray-900">
                Association
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="association"
                  id="association"
                  value={getAssociationName()}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="savings" className="block text-sm font-medium leading-6 text-gray-900">
                Savings Balance
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="savings"
                  id="savings"
                  value={user.savings.toLocaleString()}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="interest" className="block text-sm font-medium leading-6 text-gray-900">
                Interest
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="interest"
                  id="interest"
                  value={interest}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="totalLoanAmount" className="block text-sm font-medium leading-6 text-gray-900">
                Total Loan Amount
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="totalLoanAmount"
                  id="totalLoanAmount"
                  value={totalLoanAmount}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="weeklyPayment" className="block text-sm font-medium leading-6 text-gray-900">
                Weekly Payment
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="weeklyPayment"
                  id="weeklyPayment"
                  value={weeklyPayment}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Apply
          </button>
        </div>
        {message && <p className="text-red-500 mt-3">{message}</p>}
      </div>
    </form>
  );
};

export default LoanApplicationForm;
