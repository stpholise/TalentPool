
import { useState,    } from 'react'
import Slider from 'rc-slider'
import JobPrefrence from '../Components/Job/JobPrefrence'
import DocUpload from '../Components/Job/DocUpload'
import ArrowBack from '../assets/arrow_back.svg'  
import CompleteApplicaiton from '../Components/Job/CompleteApplicaiton'

const JobApplication = () => {

  const [progress, setProgress ] = useState(0)
  const [ jobPrefrence, setJobPrefrence ] = useState(null)
  const [ uploadedDoc, setUploadedDoc ] = useState(null)

   
  

  return (
    <div  className="dashboard   ">
      <div className="jobApplication">
      <div className="sliderContainer">
                 <Slider 
                    min={0}
                    max={2}
                    value={progress} // Controlled value
                    styles={{
                    rail: {height: '5px', backgroundColor: 'transparent',   cursor: 'not-allowed' , border:'1px solid #084482' },
                    track: {height: '5px', backgroundColor: '#084482',  cursor: 'not-allowed',  },
                    handle: {
                        display:'none'
                    }                                 
                    }}
                />
                {
                   progress > 0 && <button onClick={() => setProgress((prog) => prog - 1)} aria-label='back'> 
                       <img src={ArrowBack} alt="back"  />
                   </button>
                }
      </div> 
      {progress < 1 &&
        <div className="form-wrapper">
              <JobPrefrence 
                progress={progress} 
                setProgress={setProgress} 
                setJobPrefrence={setJobPrefrence}
                jobPrefrence={jobPrefrence}
              />
        </div>
      }
      {
        progress === 1 && 
        <div className="form-wrapper">
            <DocUpload 
              setProgress={setProgress} 
              progress={progress}
              setUploadedDoc={setUploadedDoc}
              uploadedDoc={uploadedDoc}
            />
        </div>
      }
          {
        progress === 2 && 
        <div className="form-wrapper">
            <CompleteApplicaiton 
              setProgress={setProgress} 
              progress={progress}
              jobPrefrence={jobPrefrence}
              uploadedDoc={uploadedDoc}
            />
        </div>
      }
        
    </div>
    </div>
  )
}

export default JobApplication