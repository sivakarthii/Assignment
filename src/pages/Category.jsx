// pages/Category.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const Category = () => {
  const { categoryId } = useParams();

  return (
    <div>
      <h1>Category Page</h1>
      <p>Category ID: {categoryId}</p>
    </div>
  );
};

export default Category;
