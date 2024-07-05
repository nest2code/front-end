import React from 'react';
const Card = ({ title,content }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <div className="px-10 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {content}
        </p>
      </div>
    </div>
  );
};
export default Card;