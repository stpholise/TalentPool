import { useDispatch, useSelector } from 'react-redux'
import {  
  handleUserchange, 
} from '../store/UserSlice'
import DisplayPhoto from '../assets/OhKElOkQ3RE.png'
import Star from '../assets/Star 4.svg'
import EmailIcon from '../assets/carbon_email.svg'
import LocationIcon from '../assets/carbon_location.svg'
import PhoneIcon from '../assets/bx_bx-phone.svg'
import {useState } from 'react'
import Close from '../assets/close.svg'
import { modalIsOpen, modalIsClose } from '../store/AppSlice'


const Person = () => {
  const dispatch = useDispatch() 
  const user = useSelector((state) => state.users.user)
  const {name, email, occupation, phone, location } = user
  const [editProfileModal, setEditProfileModal] = useState(false)

  const [newUser, setNewUser] = useState({
    name: '',
    occupation: '',
    email: '',
    location: '',
    phone: '',
  })

  const handleUserUpdate = (e) => {
    console.log({[e.target.name]: e.target.value})
    setNewUser(
     { ...newUser,
      [e.target.name]: e.target.value}
    )
  }


  const profileModalToggle = () => {
    setEditProfileModal(!editProfileModal)
    editProfileModal ? dispatch(modalIsClose(false)) : dispatch(modalIsOpen(true));
  }
  const handleProfileForm = (e) => {
    e.preventDefault()
    console.log('handle form')
    if ( newUser.name === '' 
      || newUser.email === '' 
      || newUser.occupation === '' 
      || newUser.phone === '' 
      || newUser.location === '') {
        console.log('Fields cannot be empty');
      return;
    } else {
      dispatch(handleUserchange(newUser));
      setEditProfileModal(false)
      setNewUser({name: '',
        occupation: '',
        email: '',
        location: '',
        phone: '',})

      console.log('submitted sucessfully')
    }
    
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
                <p className="profileEmail address "> 
                  <img src={EmailIcon} alt="profile Email" /> <span>{email}</span> 
                </p>
                <p className="profilePhone address "> 
                  <img src={PhoneIcon} alt="profile Phone" /> <span>{phone}</span>
                </p>
                <p className="profileLocation address "> 
                  <img src={LocationIcon} alt="profile Location" /> <span>{location}</span>
                </p>
        </div>

        <div className="btnCont">
          <button className="editProfileBtn btn blueBg padd12 radius5px" 
            onClick={() => profileModalToggle()} >Edit Profile
          </button>
         
        </div>

     </aside>
        {editProfileModal && (
            <>
            <div className="overlay">  </div>
            <div className='skillModal modal bgF radius5px padd1 lightShad possitionBtm'>
                
                <form onSubmit={handleProfileForm}>
                  <p className="topFles spaceBet ">
                       <h4 className='subHead'>Add profile</h4>
                       <button className="skillModalBtn btn"  onClick={() => {setEditProfileModal(false); dispatch(modalIsClose(false))} }><img src={Close} alt="" /></button>
                    </p>
                    <input 
                        name="name"
                        type="text" 
                        placeholder="Name"
                        value={newUser.name}
                        onChange={(e) =>  handleUserUpdate(e) }
                         className='radius5px'
                    />
                    <input type="text" 
                        name="occupation"
                        placeholder="occupation"
                        value={newUser.occupation}
                        onChange={(e) => handleUserUpdate(e)}
                         className='radius5px'
                    />
                    <input type="email" 
                        name="email"
                        placeholder="email"
                        value={newUser.email}
                        onChange={(e) => handleUserUpdate(e)}
                         className='radius5px'
                    />
                    <input type="tel" 
                        name="phone"
                        placeholder="phone"
                        value={newUser.phone}
                        onChange={(e) => handleUserUpdate(e)}
                         className='radius5px'
                    />
                     <input type="text" 
                        name="location"
                        placeholder="location"
                        value={newUser.location}
                        onChange={(e) => handleUserUpdate(e)}
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