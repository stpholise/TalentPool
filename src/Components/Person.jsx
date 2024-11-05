import { useDispatch, useSelector } from 'react-redux'
import { profileModalToggle, closeProfileModal, handleNameChange,handleEmailChange, handleOccupationChange, handlePhoneChange, handleLocationChange, handleUserUpdate } from './store'
import DisplayPhoto from '../assets/OhKElOkQ3RE.png'
import Star from '../assets/Star 4.svg'
import EmailIcon from '../assets/carbon_email.svg'
import LocationIcon from '../assets/carbon_location.svg'
import PhoneIcon from '../assets/bx_bx-phone.svg'

const Person = () => {

  const dispatch = useDispatch() 
const profileModal = useSelector((state) => state.count.profileModal)
  const user = useSelector((state) => state.count.user)
  const userReset = useSelector((state) => state.count.userReset )
  const {name, email, occupation, phone, location } = user

 
 
  const handleProfileForm = (e) => {
    e.preventDefault()
    dispatch(handleUserUpdate(userReset))
    dispatch(closeProfileModal())
    console.log('submitted')
  }

  return (
    <>
 <aside className="employeeProfile padd1 radius5px bgF lightShad">
    <div className="top">
            <div >
             <img src={DisplayPhoto} className='rad50' alt=" display photo" />
            </div>
            <h3>{name}</h3>
            <p>{occupation}</p>
            <div className="stars">
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
              <img src={Star} alt="star" />
             
            </div>
          </div>
        <div className="addressSec padd1 ">
                <p className="profileEmail address "> <img src={EmailIcon} alt="profile Email" /> <span>{email}</span> </p>
                <p className="profilePhone address "> <img src={PhoneIcon} alt="profile Phone" /> <span>{phone}</span></p>
                <p className="profileLocation address "> <img src={LocationIcon} alt="profile Location" /> <span>{location}</span></p>
        </div>

        <div className="btnCont">
          <button className="editProfileBtn btn blueBg padd12 radius5px" 
            onClick={() => dispatch(profileModalToggle())} >Edit Profile
          </button>
         
        </div>

     </aside>
        {profileModal && (
            <>
            <div className="overlay" onClick={() => dispatch(closeProfileModal())}>  </div>
            <div className='skillModal modal bgF radius5px padd1 lightShad'>
                
                <form onSubmit={handleProfileForm}>
                    <h4>Add Skill</h4>
                    <input 
                        name="name"
                        type="text" 
                        placeholder="Name"
                        value={userReset.name}
                        onChange={(e) =>  dispatch(handleNameChange(e.target.value)) }
                         className='radius5px'
                    />
                    <input type="text" 
                        name="occupation"
                        placeholder="occupation"
                        value={userReset.occupation}
                        onChange={(e) => dispatch(handleOccupationChange(e.target.value))}
                         className='radius5px'
                    />
                    <input type="email" 
                        name="email"
                        placeholder="email"
                        value={userReset.email}
                        onChange={(e) => dispatch(handleEmailChange(e.target.value))}
                         className='radius5px'
                    />
                    <input type="tel" 
                        name="phone"
                        placeholder="phone"
                        value={userReset.phone}
                        onChange={(e) => dispatch(handlePhoneChange(e.target.value))}
                         className='radius5px'
                    />
                     <input type="text" 
                        name="location"
                        placeholder="location"
                        value={userReset.location}
                        onChange={(e) => dispatch(handleLocationChange(e.target.value))}
                         className='radius5px'
                    />

                    <button type='submit' className="addSkillBtn btn blueBg radius5px">Update Profile</button>
                </form>
          
        </div>
        </>
        )}
        
    </>
  )
}

export default Person