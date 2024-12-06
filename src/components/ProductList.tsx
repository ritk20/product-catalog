import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllProducts } from '../store/productsSlice';
import ProductCard from './ProductCart';
import { RootState, AppDispatch } from '../store';
import SearchBar from './SearchBar';

const ProductList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, searchQuery, status } = useSelector((state: RootState) => state.products) as {
    products: { id: number; title: string; price: number; image: string; rating: { rate: number; count: number } }[];
    searchQuery: string;
    status: string;
  };

  useEffect(() => {
    console.log('Dispatching fetchAllProducts');
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log('Products:', products);
  console.log('Search Query:', searchQuery);
  console.log('Status:', status);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log('Filtered Products:', filteredProducts);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error loading products.</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold p-4">Products</h1>  
      <SearchBar />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} title={product.title} price={product.price} image={product.image} rating={product.rating} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;