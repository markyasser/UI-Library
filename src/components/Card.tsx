import React from 'react';

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '5px' }}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Card;
