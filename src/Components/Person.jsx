import { useDispatch, useSelector } from 'react-redux'
// import {  
//   handleUserchange, 
// } from '../store/UserSlice'
import DisplayPhoto from '../assets/OhKElOkQ3RE.png'
import Star from '../assets/Star 4.svg'
import EmailIcon from '../assets/carbon_email.svg'
import LocationIcon from '../assets/carbon_location.svg'
import PhoneIcon from '../assets/bx_bx-phone.svg'
import {useState } from 'react'
import Close from '../assets/close.svg'
import { modalIsOpen, modalIsClose } from '../store/AppSlice'
import {  handleUserchange } from '../store/UserSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


const Person = () => {
  const dispatch = useDispatch() 
  const user = useSelector((state) => state.users.user)
  const {name, email, occupation, phone, location } = user
  const [editProfileModal, setEditProfileModal] = useState(false)

  const initialValues = {
    name: name || '',
    occupation: occupation || '',
    email: email || '',
    location: location || '',
    phone: phone || '',
  }
  const editUserSchema = Yup.object({
    name: Yup
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .required('Required'),
    occupation:
      Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .required('occupation is Required'),
    email: Yup.string().email('Enter a Valid Email Address').required('Email is Required'),
    location: Yup.string().required('Location is required'),
    phone: Yup.string()
    .matches(/^(\+?\d{1,4}[\s-]?)?(\(?\d{1,3}\)?[\s-]?)?[\d\s-]{3,}$/, 'Phone number must contain only digits')
    .required('Phone is required'),
  })
  const handleUserUpdate =  (values, actions) => {
    dispatch(handleUserchange(values)); // Update Redux state
    console.log(values)
    setEditProfileModal(false); // Close modal
    actions.resetForm(); // Reset Formik form

  }
  const profileModalToggle = () => {
    setEditProfileModal(!editProfileModal)
    editProfileModal ? dispatch(modalIsClose(false)) : dispatch(modalIsOpen(true));
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
            <Formik
              initialValues={initialValues}
              validationSchema={editUserSchema}
              onSubmit={handleUserUpdate}
            >

              {
                ( ) => {
                  return(
                      <Form >
                        <p className="topFles spaceBet ">
                            <h4 className='subHead'>Add profile</h4>
                            <button className="skillModalBtn btn"  onClick={() => {setEditProfileModal(false); dispatch(modalIsClose(false))} }><img src={Close} alt="" /></button>
                          </p>
                          <Field 
                              name="name"
                              type="text" 
                              placeholder="e.g john doe"
                              className='radius5px'
                          />
                          <ErrorMessage  name='name' component={'div'} className='error'/>
                          <Field type="text" 
                              name="occupation"
                              placeholder="e.g Teacher"
                              className='radius5px'
                          />
                           <ErrorMessage  name='occupation' component={'div'} className='error'/>
                          <Field type="email" 
                              name="email"
                              placeholder="example@gmail.com"
                              className='radius5px'
                          />
                           <ErrorMessage  name='email' component={'div'} className='error'/>
                           <Field type="tel" 
                              name="phone"
                              placeholder="07069000000"
                              className='radius5px'
                          />
                           <ErrorMessage  name='phone' component={'div'} className='error'/>
                           <Field type="text" 
                              name="location"
                              placeholder="e.g Lagos Nigeria"
                              className='radius5px'
                          />
                           <ErrorMessage  name='location' component={'div'} className='error'/>

                          <button type='submit' className="addSkillBtn btn blueBg radius5px">Update Profile</button>
                      </Form>
                      )
                   }
                  }
                </Formik>
        </div>
        </>
        )}
        
    </>
  )
}

export default Person