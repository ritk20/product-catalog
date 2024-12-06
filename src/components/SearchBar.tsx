import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/productsSlice';
import { AppDispatch } from '../store';
import { memo } from 'react';

const SearchBar: React.FC = memo(() => {
  const dispatch : AppDispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  }

  return (
    <input
      type="text"
      placeholder="Search products..."
      className="border rounded-lg p-2 w-full"
      onChange={handleSearch}
    />
  );
});

export default SearchBar;
