import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/productsSlice';
import { AppDispatch } from '../store';

const SearchBar = () => {
  const dispatch : AppDispatch = useDispatch();

  return (
    <input
      type="text"
      placeholder="Search products..."
      className="border rounded-lg p-2 w-full"
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
    />
  );
};

export default SearchBar;
