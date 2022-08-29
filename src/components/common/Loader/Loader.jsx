import Spinner from 'react-spinner-material';
import './Loader.scss';

export function Loader() {

    return (
        <div className='loader'>
            <Spinner size={300} spinnercolor={"#333"} spinnerwidth={2} visible={true} />
        </div>
    )
}