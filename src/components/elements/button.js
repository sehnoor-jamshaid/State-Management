import React from 'react';


const Button = ({ text, onClick,color }) => (
  <button className={`rounded-pill px-3 py-2 bg-warning text-light border-0 ${color} mb-2 w-100`} onClick={onClick}>
    {text}
  </button>
);



export default Button;