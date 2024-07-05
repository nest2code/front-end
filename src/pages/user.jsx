import React from 'react';
import {SideBar,Card} from '../compontents/compontent'
const User = () => {
    return (
        <div className="flex bg-gray-600">
        <SideBar />
        <div className="flex flex-wrap justify-center h-10 w-full bg-gray-600">
          <Card
            title="Loan Amount"
           
            content="UGX ..."
          />
          <Card
            title="Current Saving"
          
            content="UGX ..."
          />
          <Card
            title="Current Shares"
          
            content="UGX ..."
          />
        </div>
      </div>
    );
}

export default User;
