import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getStat} from '../../redux/slices/statSlice';
import {selectStat} from '../../redux/selectors/selectSelector';

const App = () => {
  const stat = useSelector(selectStat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStat());
  }, [dispatch]);
  
  return <p>hi there</p>
}

export default App;