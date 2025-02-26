import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filters/filtersSlice';
import { selectFilter } from 'redux/filters/selectors';
import styles from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <label className={styles.label}>
      Find contacts by name or number:
      <input type="text" value={filter} onChange={(e) => dispatch(setFilter(e.target.value))} className={styles.input} />
    </label>
  );
};

export default Filter;
