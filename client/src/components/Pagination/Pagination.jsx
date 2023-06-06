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

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const currentRecipes = recipes.slice(firstPageIndex, lastPageIndex);
    dispatch(setCurrentRecipes(currentRecipes))
  }, [currentPage, recipes, dispatch]);

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  };

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={styles.paginationContainer}>
       {/* Left navigation arrow */}
      <li key="left arrow" onClick={onPrevious}
      className={`${styles.paginationItem} ${currentPage === 1 && styles.disabled}`}>
        &#60;
      </li>
      {/* Pagination Range */}
      {paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li key="dots" className={styles.paginationItemDots}>&#8230;</li>;
        }
		
        // Render our Page Pills
        return (
          <li key={pageNumber} onClick={() => onPageChange(pageNumber)}
          className={`${styles.paginationItem} ${pageNumber === currentPage && styles.selected}`}>
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li key="right arrow" onClick={onNext}
      className={`${styles.paginationItem} ${currentPage === lastPage && styles.disabled}`}>
        &#62;
      </li>
    </ul>
  );
};

export default Pagination;