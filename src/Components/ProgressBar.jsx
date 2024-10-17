import {PropTypes} from 'prop-types'

const ProgressBar = ({ completed }) => {
  const containerStyles = {
    height: 5,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 'auto'
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor:  '#084482',
    borderRadius: 'inherit',
    textAlign: 'right',
    position: 'relative',
  };

 

  const progressBall ={
    width:10,
    height:10,
    borderRadius:'50%',
    backgroundColor: '#084482',
    position: 'absolute',
    right: 0,
    top: -2,
  
  }

  const handleScroll = () => {
    console.log('scrolling')
  }

  return (
    <div style={containerStyles} onScroll={() => {handleScroll()}}>
      <div style={fillerStyles}>
        <span style={progressBall}></span>
      </div>
    </div>
  );
};

ProgressBar.defaultProps = {
    completed: 10        // Default completion percentage
  };
  

  ProgressBar.propTypes = {
    completed: PropTypes.number.isRequired,
  };
  


export default ProgressBar;
