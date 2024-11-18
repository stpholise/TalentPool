
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import { PropTypes } from 'prop-types';


const ProgressBar = ({ setSkill, skillProficiency }) => {


    
  const handleSliderChange = (value)  => {
    setSkill(value)
    console.log(value)  
  }
  const containerStyles = {
    width: '100%',
  };


  return (
    <div style={containerStyles} >
      <Slider 
        min={0}
        max={100}
        value={skillProficiency} // Controlled value
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
      <p>{skillProficiency}%</p>
      
    </div>
  );
};


  ProgressBar.propTypes = {
    skillProficiency: PropTypes.number.isRequired,
    setSkill: PropTypes.func.isRequired
  };
  


export default ProgressBar;
