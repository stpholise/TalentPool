import { PropTypes } from 'prop-types'
import Edit from '../../assets/bytesize_edit.svg'
import { toast, ToastContainer } from 'react-toastify'
import ContactInfo from './ContactInfo'
import { useState, useEffect  } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { modalIsOpen, modalIsClose } from '../../store/AppSlice'

const CompleteApplicaiton = ({jobPrefrence, uploadedDoc, setProgress}) => {
    const   user = useSelector(state => state.users.user)
    const { name, email, phone, location,    } = user
     const initialContact = {
            name: name || '',
            email: email || '',
            phone: phone || '',
            location: location || '',
        }

    const [userInfo, setUserInfo] = useState(initialContact)
    const [ contactModal, setContactModal ] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if(contactModal){
            dispatch(modalIsOpen(true))
        } else {
            dispatch(modalIsClose(false))
        }

    }, [contactModal])

    const handleSubmit = () => {
        toast.success('Application Submitted', {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 2000,
        })
    }
    const toggleContactModal = () => {
        setContactModal(!contactModal)
    }

  return (
    <div>
        <ToastContainer />
        <h2 className='employerQuest'>Summary </h2>
        <div className="valueBoxWrap"> 
            <div className="valueBoxTitle spaceBet">
                <h2 className='summaryTitle'>Contact information </h2>
                <button onClick={toggleContactModal}> <img src={Edit} alt="" /> </button>
         </div>
        <div className="jobPrefrenceValues valueBox">
           
            <div className="valueWrap  ">
                <p  >name:</p>
                <p className='value'> {userInfo.name}</p>
            </div>
            <div className="valueWrap">   
                <p >email:</p>
                <p className='value'>  {userInfo.email}</p>
            </div>
            <div className="valueWrap  ">
                <p >Location:</p>
                <p className='value'> {userInfo.location}</p>
            </div>
            <div className="valueWrap  ">
                <p >phone:</p>
                <p className='value'> {userInfo.phone}</p>
            </div>
            
        </div>
        </div> 
        <div className="valueBoxWrap"> 
            <div className="valueBoxTitle spaceBet">
                <h2 className='summaryTitle'>Employer questions</h2>
                <button onClick={() => setProgress(0)}> <img src={Edit} alt="" /> </button>
         </div>
        <div className="jobPrefrenceValues valueBox">
           
            <div className="valueWrap  ">
                <p  >Experience:</p>
                <p className='value'> {jobPrefrence.experience}</p>
            </div>
            <div className="valueWrap  ">
                <p >Location:</p>
                <p className='value'> {jobPrefrence.location}</p>
            </div>
            <div className="valueWrap">   
                <p >Salary Expectation:</p>
                <p className='value'>  {jobPrefrence.salary_expectation}</p>
            </div>
        </div>
        </div>
        <div className="valueBoxWrap"> 
                <div className="spaceBet">
                    <h2 className='summaryTitle'> documents</h2>
                    <button onClick={() => setProgress(1)}> <img src={Edit} alt=""  /> </button>
                </div>
                <div className="docUploadValues valueBox">
            
                    {
                        uploadedDoc.resume && 
                        <div className="valueWrap   bbottom">
                            <p className='label'>Resume:</p>
                            <p className='value'>  {uploadedDoc?.resume.name}</p>
                        </div>
                    }
                    {
                        uploadedDoc.coverLetter && 
                        <div className="valueWrap  ">
                            <p>Cover Letter </p>
                        <p className='value'>{uploadedDoc?.coverLetter.name}</p>
                        </div>
                    }

                </div>
        </div>
        {
            contactModal && 
            <ContactInfo userInfo={userInfo} setUserInfo={setUserInfo} initialContact={initialContact} setContactModal={setContactModal}/>
        }
            {/* <ContactInfo userInfo={userInfo} setUserInfo={setUserInfo} initialContact={initialContact} /> */}
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