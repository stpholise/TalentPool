
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import { PropTypes } from 'prop-types';


const ProgressBar = ({ setSkill, skillProficiency, test = false, hideValue = false, exRange = 100, minRange= 0, isClearable, setIsClearable }) => {


    
  const handleSliderChange = (value)  => {
    setSkill(value)
    if(isClearable.includes(value)){
      setIsClearable(isClearable.filter(skill => skill !== value))
  } else {
      setIsClearable([...isClearable, value])
  }
 
    
  }
  const containerStyles = {
    width: '100%',
  };


  return (
    <div style={containerStyles} >
      <Slider 
        min={minRange}
        max={exRange}
        value={skillProficiency} // Controlled value
        onChange={handleSliderChange}
        styles={{
          rail: {height: '5px', backgroundColor: '#C4C4C4'},
          track: {height: '5px', backgroundColor: '#084482'},
          handle: {
            borderColor: '#084482',
            backgroundColor: '#084482',
            boxShadow: '',
            width:'12px',
            height:'12px',
            marginTop: '-4px'
          }
          
        }}
      
      />
      <p>{!hideValue && skillProficiency} { !test && '%'} </p>
      
    </div>
  );
};


  ProgressBar.propTypes = {
    skillProficiency: PropTypes.number.isRequired,
    setSkill: PropTypes.func.isRequired,
    test: PropTypes.bool,
    hideValue: PropTypes.bool,
    exRange: PropTypes.number,
    minRange: PropTypes.number,
    isClearable: PropTypes.arrary,
    setIsClearable: PropTypes.func


  };
  


export default ProgressBar;
