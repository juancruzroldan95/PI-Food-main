import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllRecipes, getDiets } from '../../redux/actions';
import Cards from '../../components/Cards/Cards';
import Filter from '../../components/Filter/Filter';
import Sort from '../../components/Sort/Sort';
import styles from './Home.module.css'

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <div>
        <Filter />
        <Sort />
      </div>
      <div>
        <Cards />
      </div>
    </div>
  )
};

export default Home