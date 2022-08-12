import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFiltered, filteredContact } from 'redux/filterSlice';
import styles from './filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFiltered);

  const handleFilterChange = e => {
    dispatch(filteredContact(e.target.value));
  };

  return (
    <label className={styles.filter_label}>
      Find contacts by name:
      <input type="text" value={filter} onChange={handleFilterChange} />
    </label>
  );
};

export default Filter;
