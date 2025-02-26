import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice.js';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <input
      className={styles.input}
      type="text"
      value={filter}
      onChange={handleChange}
      placeholder="Search contacts..."
    />
  );
};

export default SearchBox;
