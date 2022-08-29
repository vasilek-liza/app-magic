import { Dropdown } from '../common/Dropdown/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import { VALUES_DROPDOWN,
  TIMES_DROPDOWN,
  LAST_DAY,
  LAST_WEEK,
  LAST_MONTH,
  LAST_YEAR,
  GAS_PRICE,
  GAS_VALUE,
  AVERAGE,
  MAX_GAS_PRICE,
  MEDIA_GAS_PRICE 
} from '../constans/consValues';
import { getMedianGasPrice, 
  getGasPrice, 
  getGasValue, 
  getAverage, 
  getMaxGasPrice,
  getLastDay,
  getLasWeek,
  getLastMonth,
  getLastYear
} from '../../store/slices/DatabaseSlice';

export function DropdownItems() {
  const { selectValueName, selectTimeName } = useSelector((state) => state.databaseReducer);
  const dispatch = useDispatch();

  function onSelectDate(date) {
    if (date.name === LAST_DAY) {
      dispatch(getLastDay())
    } else if (date.name === LAST_WEEK) {
      dispatch(getLasWeek())
    } else if (date.name === LAST_MONTH) {
      dispatch(getLastMonth())
    } else if (date.name === LAST_YEAR) {
      dispatch(getLastYear())
    }
    onSelectValues(selectValueName)
  }

  function onSelectValues(value) {
    if (value.name === GAS_PRICE || value === GAS_PRICE) {
      dispatch(getGasPrice())
    } else if (value.name === GAS_VALUE || value === GAS_VALUE) {
      dispatch(getGasValue())
    } else if (value.name === AVERAGE || value === AVERAGE) {
      dispatch(getAverage())
    } else if (value.name === MAX_GAS_PRICE || value === MAX_GAS_PRICE) {
      dispatch(getMaxGasPrice())
    } else if (value.name === MEDIA_GAS_PRICE || value === MEDIA_GAS_PRICE) {
      dispatch(getMedianGasPrice())
    } 
  }

  return (
    <div className='dropdown-items'>
      <Dropdown items={TIMES_DROPDOWN} onSelect={onSelectDate} title={selectTimeName}/>
      <Dropdown items={VALUES_DROPDOWN} onSelect={onSelectValues} title={selectValueName}/>
    </div>
  );
}