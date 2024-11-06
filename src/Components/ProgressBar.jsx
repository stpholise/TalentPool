// import {PropTypes} from 'prop-types'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import { useSelector, useDispatch } from 'react-redux'
import { setProficiency } from './store'


const ProgressBar = () => {

    const dispatch = useDispatch()
    const currentSkillProficiency = useSelector((state) => state.count.currentSkillProficiency)


 
  const handleSliderChange = (value)  => {
    dispatch(setProficiency(value))
    
  }
  const containerStyles = {
    width: '100%',
  };


  return (
    <div style={containerStyles} >
      <Slider 
        min={0}
        max={100}
        value={currentSkillProficiency} // Controlled value
        onChange={handleSliderChange}
        styles={{
          rail: {height: '5px', backgroundColor: '#C4C4C4'},
          track: {height: '5px', backgroundColor: '#084482'},
          handle: {
            borderColor: '#084482',
            backgroundColor: '#084482',
            width:'12px',
            height:'12px',
            marginTop: '-4px'

          }
          
        }}

      />
      
    </div>
  );
};


  // ProgressBar.propTypes = {
  //   completed: PropTypes.number.isRequired,
  // };
  


export default ProgressBar;
