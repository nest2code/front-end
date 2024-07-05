import React, { useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  HomeIcon,

  ChatBubbleLeftEllipsisIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';
import './Sidebar.css';
import { Link, useParams } from 'react-router-dom';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {userId} = useParams()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-gray-200 h-screen">
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onClick={toggleSidebar}
      >
        <Bars3Icon className="h-8 w-8 p-1 bg-gray-900 rounded-md" />
      </span>
      <div
        className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <div className="h-6 w-6 p-1 rounded-md bg-blue-600"></div>
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">DashBoard</h1>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer ml-28 lg:hidden"
              onClick={toggleSidebar}
            />
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <input
            type="text"
            placeholder="Search"
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <HomeIcon className="h-5 w-5" />
          <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
        </div>
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={toggleDropdown}
        >
          <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Loan Management</span>
            <ChevronDownIcon
              className={`h-5 w-5 transform ${isDropdownOpen ? '' : 'rotate-180'}`}
              id="arrow"
            />
          </div>
        </div>
        <div
          className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold ${
            isDropdownOpen ? '' : 'hidden'
          }`}
          id="submenu"
        >
        <Link  to={`/users/apply-loan/${userId}`}  className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">LoanApplication</Link>
        <Link  to={`/users/View-loans/${userId}`} className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">view</Link>
       
        </div>


        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={toggleDropdown}
        >
          <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Savings Management</span>
            <ChevronDownIcon
              className={`h-5 w-5 transform ${isDropdownOpen ? '' : 'rotate-180'}`}
              id="arrow"
            />
          </div>
        </div>
        <div
          className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold ${
            isDropdownOpen ? '' : 'hidden'
          }`}
          id="submenu"
        >
          <Link  to={`/users/save/${userId}`}  className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">Deposit</Link>
          <Link  to={`/users/view-saving/${userId}`} className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">View</Link>
          <Link  to={`/users/save-withdaraw/${userId}`} className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">Withdraw</Link>
        </div>


        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={toggleDropdown}
        >
          <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Shares Management</span>
            <ChevronDownIcon
              className={`h-5 w-5 transform ${isDropdownOpen ? '' : 'rotate-180'}`}
              id="arrow"
            />
          </div>
        </div>
        <div
          className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold ${
            isDropdownOpen ? '' : 'hidden'
          }`}
          id="submenu"
        > 
        <Link  to={`/users/share-transfer/${userId}`}  className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">Make Transfer</Link>
        <Link  to={`/users/view-share/${userId}`} className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">View</Link>
        <Link  to={`/users/buy-share/${userId}`} className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">Buy</Link>
        </div>



        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <Link  to='/logout' className="text-[15px] ml-4 text-gray-200 font-bold">Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
