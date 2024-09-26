import React, { useState } from 'react';

interface CardProps {
  title: string;
  content: string;
  showFooter?: boolean; // Optional prop to control footer visibility
}

const Card: React.FC<CardProps> = ({ title, content, showFooter = true }) => {
  const [likes, setLikes] = useState(0); // Additional state not covered by the test

  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '5px' }}>
      <h3>{title}</h3>
      <p>{content}</p>

      {/* Logic to show/hide footer */}
      {showFooter && (
        <div style={{ marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '0.5rem' }}>
          <button onClick={() => setLikes(likes + 1)}>Like</button>
          <span>{likes} Likes</span>
        </div>
      )}
    </div>
  );
};

export default Card;
