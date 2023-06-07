import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentRecipes } from '../../redux/actions';
import { usePagination, DOTS } from '../../utilities/usePagination';
import styles from '../Pagination/Pagination.module.css';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipes = useSelector((state) => state.recipes);
  const totalCount = recipes.length;
  const siblingCount = 2;
  const pageSize = 9;
  const dispatch = useDispatch();
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });
  const lastPage = paginationRange[paginationRange.length - 1];

  useEffect(() => {
    const fromIndex = (currentPage - 1) * pageSize;
    const toIndex = fromIndex + pageSize;
    const currentRecipes = recipes.slice(fromIndex, toIndex);
    dispatch(setCurrentRecipes(currentRecipes))
  }, [currentPage, recipes, dispatch]);

  
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // If there are less than 2 items in pagination range we don't render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  };

  return (
    <ul className={styles.paginationContainer}>
       {/* Left navigation arrow */}
      <li key="left arrow" onClick={handlePrevious}
      className={`${styles.paginationItem} ${currentPage === 1 && styles.disabled}`}>
        &#60;
      </li>
      {/* Pagination Range */}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={index} className={styles.paginationItemDots}>&#8230;</li>; 
        }
        return (
          <li key={index} onClick={() => handlePageChange(pageNumber)}
          className={`${styles.paginationItem} ${pageNumber === currentPage && styles.selected}`}>
            {pageNumber}
          </li>
        );
      })}
      {/*  Right navigation arrow */}
      <li key="right arrow" onClick={handleNext}
      className={`${styles.paginationItem} ${currentPage === lastPage && styles.disabled}`}>
        &#62;
      </li>
    </ul>
  );
};

export default Pagination;