import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDietFilter } from '../../redux/actions';

const DietFilter = () => {
  const diets = useSelector((state) => state.diets);
  let dietFilter = useSelector((state) => state.dietFilter);
  const dispatch = useDispatch();

  const handleDietChange = (e) => {
    if (dietFilter.includes(e.target.value)) {
      dietFilter = dietFilter.filter((diet) => diet !== e.target.value);
      dispatch(setDietFilter(dietFilter));
    } else {
      dietFilter.push(e.target.value);
      dispatch(setDietFilter(dietFilter));
    }
  };

  return (
    <div>
      <h3>Diets</h3>
      <div>
        {diets.map((diet) => (
          <div key={diet.id}>
            <input id={diet.id} type="checkbox" value={diet.name} onChange={handleDietChange}/>
            <label title={diet.name}>
              <span>{diet.name}</span>
              {/* <span>(x)</span> */}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DietFilter;