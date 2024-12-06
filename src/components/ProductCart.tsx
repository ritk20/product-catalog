import React from 'react';

type Product = {
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
};

const ProductCard: React.FC<Product> = ({ title, price, image, rating }) => (
  <div className="border rounded-lg p-4 flex flex-col items-center">
    <img src={image} alt={title} className="w-2 h-2 object-cover mb-2" />
    <h2 className="text-lg font-semibold">{title}</h2>
    <p>${price.toFixed(2)}</p>
    <p>{rating.rate} ⭐ ({rating.count} reviews)</p>
  </div>
);

export default ProductCard;