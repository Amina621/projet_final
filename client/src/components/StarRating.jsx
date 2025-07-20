import React from 'react';
import { assets } from '../assets/assets'; // ✅ Conserve ceci

function StarRating({ rating = 4 }) {
  return (
    <div className="flex gap-1">
      {Array(5).fill('').map((_, index) => (
        <img
          key={index}
          src={rating > index ? assets.starIconFilled : assets.starIconOutlined}
          alt="star-icon"
          className="w-4.5 h-4.5"
        />
      ))}
    </div>
  );
}

export default StarRating;