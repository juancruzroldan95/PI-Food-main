import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllRecipes, getDiets } from '../../redux/actions';
import SourceFilter from '../../components/SourceFilter/SourceFilter';
import Sort from '../../components/Sort/Sort';
import DietFilter from '../../components/DietFilter/DietFilter';
import Cards from '../../components/Cards/Cards';
import styles from './Home.module.css'
import Pagination from '../../components/Pagination/Pagination';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.topSection}>
        <div className={styles.topLeft}>
          <SourceFilter />
        </div>
        <div className={styles.topRight}>
          <Sort />
        </div>
      </div>
      <div className={styles.mainSection}>
        <div className={styles.leftSidebar}>
          <DietFilter />
        </div>
        <div className={styles.rightContent}>
          <Cards />
        </div>
      </div>
      <div className={styles.bottomSection}>
        <Pagination />
      </div>
    </div>
  )
};

export default Home