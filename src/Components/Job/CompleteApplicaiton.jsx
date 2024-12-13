import { PropTypes } from 'prop-types'
import Edit from '../../assets/bytesize_edit.svg'
import { toast, ToastContainer } from 'react-toastify'


const CompleteApplicaiton = ({jobPrefrence, uploadedDoc, setProgress}) => {

    const handleSubmit = () => {
        toast.success('Application Submitted', {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 2000,
            // closeOnClick: true,
        })
    }

  return (
    <div>
        <ToastContainer />
        <h2 className='employerQuest'>Summary </h2>
        <div className="jobPrefrenceValues valueBox">
            <div className="top spaceBet">
                <h2 className='summaryTitle'>Job Prefrence</h2>
                <button onClick={() => setProgress(0)}> <img src={Edit} alt="" /> </button>
            </div>
            <div className="formControl border">
                <p  >Experience:</p>
                <p> {jobPrefrence.experience}</p>
            </div>
            <div className="formControl border">
                <p >Location:</p>
                <p> {jobPrefrence.location}</p>
            </div>
            <div className="formControl border">
                <p    >Salary Expectation:</p>
                <p>  {jobPrefrence.salary_expectation}</p>
            </div>
        </div>
        <div className="docUploadValues valueBox">
           <div className="top spaceBet">
                <h2 className='summaryTitle'> documents</h2>
                <button onClick={() => setProgress(1)}> <img src={Edit} alt=""  /> </button>
            </div>
            {
                uploadedDoc.resume && 
                <div className="formControl border">
                    <p>Resume:</p>
                    <p> {uploadedDoc?.resume.name}</p>
                </div>
            }
            {
                uploadedDoc.coverLetter && 
                <div className="formControl border">
                    <p>Cover Letter </p>
                  <p>{uploadedDoc?.coverLetter.name}</p>
                </div>
            }
        
        </div>
        <button type="button" onClick={handleSubmit} className="applyLink blueBg jobApplicationBtn">Submit</button>

    </div>
  )
}

CompleteApplicaiton.propTypes = {
    jobPrefrence: PropTypes.object.isRequired,
    uploadedDoc: PropTypes.object.isRequired,
    setProgress: PropTypes.func.isRequired,

}

export default CompleteApplicaiton