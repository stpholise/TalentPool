// import {PropTypes} from 'prop-types'
import Slider from 'rc-slider'
import {useState } from 'react'
import 'rc-slider/assets/index.css';

const ProgressBar = () => {
  const [sliderValue, setSliderValue ] = useState(80)
  const handleSliderChange = (value)  => {
    setSliderValue(value);
  }
  const containerStyles = {
    width: '100%',
  };


  return (
    <div style={containerStyles} >
      <Slider 
        min={0}
        max={100}
        value={sliderValue} // Controlled value
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
