import { useEffect } from "react";
import { Plot } from './Plot/Plot';
import { Dropdown } from './common/Dropdown/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import { valuesDropdown} from './utils/getValueDropdown';
import { timesDropdown } from './utils/getValueDropdown';
import { getMedianGasPrice, 
  getGasPrice, 
  getGasValue, 
  getAverage, 
  getMaxGasPrice,
  getLastDay,
  getLasWeek,
  getLastMonth,
  getLastYear
} from '../store/slices/DatabaseSlice';

export function Root() {
  const { 
    data,
    selectValues,
    selectValueName,
    selectTimeName
  } = useSelector((state) => state.databaseReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLastDay())
    dispatch(getGasPrice())
  }, []);

  const plot = {
    labels: data.labels,
    selectValues
    }

  function onSelectDate(date) {
    if (date.name === "last day") {
      dispatch(getLastDay())
    } else if (date.name === "last week") {
      dispatch(getLasWeek())
    } else if (date.name === "last month") {
      dispatch(getLastMonth())
    } else if (date.name === "last year") {
      dispatch(getLastYear())
    }
    onSelectValues(selectValueName)
  }

  function onSelectValues(value) {
    if (value.name === "gasPrice" || value === "gasPrice") {
      dispatch(getGasPrice())
    } else if (value.name === "gasValue" || value === "gasValue") {
      dispatch(getGasValue())
    } else if (value.name === "average" || value === "average") {
      dispatch(getAverage())
    } else if (value.name === "maxGasPrice" || value === "maxGasPrice") {
      dispatch(getMaxGasPrice())
    } else if (value.name === "medianGasPrice" || value === "medianGasPrice") {
      dispatch(getMedianGasPrice())
    } 
  }

  return (
    <div>
      <div className='dropdown-items'>
        <Dropdown items={timesDropdown} onSelect={onSelectDate} title={selectTimeName}/>
        <Dropdown items={valuesDropdown} onSelect={onSelectValues} title={selectValueName}/>
      </div>
      { plot.labels.length && <Plot plot={plot} /> }
    </div>
  );
}
