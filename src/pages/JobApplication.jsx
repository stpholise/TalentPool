
import { useState,    } from 'react'
import JobPrefrence from '../Components/Job/JobPrefrence'
import DocUpload from '../Components/Job/DocUpload'
import CompleteApplicaiton from '../Components/Job/CompleteApplicaiton'

const JobApplication = () => {

  const [progress, setProgress ] = useState(0)
  const [ jobPrefrence, setJobPrefrence ] = useState(null)
  const [ uploadedDoc, setUploadedDoc ] = useState(null)

   
  

  return (
    <div  className="dashboard   ">
      <div className="jobApplication">
     
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