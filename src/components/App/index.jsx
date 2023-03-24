import React from 'react';
import { Search } from 'components/Search';
import styles from './style.scss';

export const App = () => {
  return (
    <div className={styles.wrap}>
      <Search />
    </div>
  );
};
