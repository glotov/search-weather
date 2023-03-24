import React, { useState, memo, useCallback } from 'react';
import styles from './style.scss';
import { Search as SearchInput } from './Search';
import { Wheather } from '../Wheather';

export const Search = memo(() => {
  const [list, setList] = useState([]);
  const handleChange = useCallback(
    (data) => {
      setList(data);
    },
    [setList],
  );
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <SearchInput onChangeList={handleChange} />
        <Wheather list={list} />
      </div>
    </div>
  );
});
