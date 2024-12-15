
import { useState,    } from 'react'
import JobPrefrence from '../Components/Job/JobPrefrence'
import DocUpload from '../Components/Job/DocUpload'
import CompleteApplicaiton from '../Components/Job/CompleteApplicaiton'
import AppSuccess from '../Components/Job/AppSuccess'

const JobApplication = () => {

  const [progress, setProgress ] = useState(0)
  const [ jobPrefrence, setJobPrefrence ] = useState(null)
  const [ uploadedDoc, setUploadedDoc ] = useState(null)
  const [ userData, setUserData ] = useState(null)

   
  

  return (
    <div  className="   ">
      <div className=" fullSize">
     
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
                  setUserData={setUserData}
                />
            </div>
          }
          {
            progress === 3 && 
            
              <AppSuccess 
                userInfo={userData}
              />
            
          }
        
    </div>
    </div>
  )
}

export default JobApplication