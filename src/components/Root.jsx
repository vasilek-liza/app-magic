import { useEffect } from "react";
import { Plot } from './Plot/Plot';
import { useDispatch, useSelector } from "react-redux";
import { getGasPrice, getLastDay } from '../store/slices/DatabaseSlice';
import { DropdownItems } from "./DropdownItems/DropdownItems";
import { getDatabase } from "../store/slices/DatabaseThunk";
import { Loader } from "./common/Loader/Loader";

export function Root() {
  const { 
    data,
    selectValues,
    actualDateValues,
    db
  } = useSelector((state) => state.databaseReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(getDatabase())
        dispatch(getLastDay())
        dispatch(getGasPrice())
      } catch (error) {}
    }

    init();
    
  }, []);

  const plot = {
    labels: data.labels,
    selectValues
  }
  
  return (
    <div className="root">
      { actualDateValues.length ?
        <>
          <DropdownItems />
          <Plot plot={plot} />
        </> 
        : <Loader />
      }
    </div>
  );
}
