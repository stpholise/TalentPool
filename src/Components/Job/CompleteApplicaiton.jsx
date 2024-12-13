import { PropTypes } from 'prop-types'
import Edit from '../../assets/bytesize_edit.svg'

const CompleteApplicaiton = ({jobPrefrence, uploadedDoc, setProgress}) => {
  return (
    <div>
        <h1>Complete Application</h1>
        <div className="jobPrefrenceValues valueBox">
            <div className="top spaceBet">
                <h2>Job Prefrence</h2>
                <button onClick={() => setProgress(0)}> <img src={Edit} alt="" /> </button>
            </div>
            <p>Experience: {jobPrefrence.experience}</p>
            <p>Location: {jobPrefrence.location}</p>
            <p>Salary Expectation: {jobPrefrence.salary_expectation}</p>
        </div>
        <div className="docUploadValues valueBox">
           <div className="top spaceBet">
                <h2>Personal documents</h2>
                <button onClick={() => setProgress(1)}> <img src={Edit} alt=""  /> </button>
            </div>
            {
                uploadedDoc.resume && 
                <p>Resume: {uploadedDoc?.resume.name}</p>
            }
            {
                uploadedDoc.coverLetter && 
                <p>Cover Letter {uploadedDoc?.coverLetter.name}</p>
            }
        
        </div>
        <button type="button" className="applyLink blueBg jobApplicationBtn">continue</button>

    </div>
  )
}

CompleteApplicaiton.propTypes = {
    jobPrefrence: PropTypes.object.isRequired,
    uploadedDoc: PropTypes.object.isRequired,
    setProgress: PropTypes.func.isRequired,

}

export default CompleteApplicaiton