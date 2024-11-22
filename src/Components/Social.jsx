import { useState } from 'react'
import Add from '../assets/carbon_add.svg'
import Edit from '../assets/bytesize_edit.svg'
import { useDispatch, useSelector } from 'react-redux'
import { addNewSocial, delMultipleSocial } from '../store/UserSlice'
import { v4 as uuidv4 } from 'uuid'
import { modalIsOpen, modalIsClose } from '../store/AppSlice'
import Close from '../assets/close.svg' 
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import 'animate.css'
import CreatableSelect  from 'react-select/creatable'

const Social = () => {
   
    const dispatch = useDispatch(); 
    const [ editId, setEditId] = useState(null)
    const [socialModal, setSocialModal] = useState(false)
    const social  = useSelector((state) => state.users.social)
    const [editValues, setEditValues ] = useState(null)
    const [ currentOption, setCurrentOption ] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [ selected, setSelected ] = useState([])

    const socialPlatforms = [
        { value: 'facebook', label: 'Facebook' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'dribble', label: 'Dribble' },
        { value: 'github', label: 'Github' },
        { value: 'behance', label: 'Behance' },
        { value: 'youtube', label: 'Youtube' },
        { value: 'pinterest', label: 'Pinterest' },
        { value: 'tiktok', label: 'Tiktok' },
        { value: 'snapchat', label: 'Snapchat' },
      ]

    // handleOption selection with the imported CreatableSelect from react select
    const handleOptions = (option, formik) => {

        if (!option) return // return if there is no option
        if(typeof option === 'string') {
            setIsLoading(true)
            setTimeout(() => {
            option = { value: option.toLowerCase().replace(/\W/g, ''), label: option } // distructure the inputValue to create a new option
            setCurrentOption({ value: option.value, label: option.label }) // set the current option to the new option
            formik.setFieldValue('socialTitle', option.label) // sets the value of the socialTitle field to the new option label
            setIsLoading(false)
            }, 1000)
        }
        else{
            setCurrentOption(option)
            formik.setFieldValue('socialTitle', option.label) // sets the value of the socialTitle field to the selected option value
            console.log(option)
        }
    }
    
    const initialSocialValues = { 
        socialLink: editValues ? editValues.socialLink : '',
        socialTitle:   editValues ? editValues.socialTitle : '',
    }
    // Yup validation schema for the formik form
    const socialSchema = Yup.object({
        socialTitle: Yup.string().required('Required'),
        socialLink: Yup.string().url('Invalid URL format').required('Required'),
    })
    // handleSocialModal to open and close the modal
    const handleSocialModal = () => {
        setSocialModal(!socialModal)
        socialModal ? dispatch(modalIsClose(false)) : dispatch(modalIsOpen(true)); //changes the modal state to true on the AppSlice
    }
    // closeSocialModal to close the modal and reset the form when close button is clicked
    const closeSocialModal = (resetForm) => {
        setSocialModal(false)
        resetForm() // resets the form values
        dispatch(modalIsClose(false))   //changes the modal state to false on the AppSlice
        setEditValues(null) // reset the edit values
    }
    // addSocial function to add a new social account to the social array in user slice
    const addSocial = (values, actions) => {
         if (editId !== null) {
            // Update existing social account
            const updatedSocial = social.map((item) =>
                item.id === editId ? { ...item, ...values } : item  // update the social account with the new values if the id matches
            );
            dispatch(addNewSocial(updatedSocial));   // dispatch the updated social array to the user slice for redux state management
            setEditId(null); 
            setEditValues(null)
        } else {
            dispatch(addNewSocial([...social, {...values, id: uuidv4()}])) // dispatch the new social account to the user slice for redux state management
        }
        actions.resetForm()
        closeSocialModal(actions.resetForm)
    } 
    // editSocial function to edit a social account
    const editSocial = (id) => {
        const selectedSocial = social.find((social) => social.id === id);
        if (selectedSocial) {
            setEditId(id);
            setEditValues(selectedSocial);
            handleSocialModal();
        }
    }

    const handleChecking = (social) => {
        setSelected(prev => {
            if(prev.includes(social.id)){
                return prev.filter((selectedId) => selectedId !== social.id)
            }else { return [...prev, social.id]}
        })
        // console.log(social)
        console.log(selected)
    }
const socialDelMultiple = () => {
    dispatch(delMultipleSocial(selected))
    setSelected([])
}
  return (
    <div className='radius5px padd1 bgF mb1'>
        <div className="topFles spaceBet ">
            <h4 className='subHead'>Social accounts</h4>
            {(selected.length > 1) && <button 
                onClick={socialDelMultiple}
                aria-label="Delete Selected Skills"
                className=' pad1 btn blueBg radius5px'
            > Delete {selected.length} social</button> }
            {
                (selected.length <= 1) &&
                <button className="skillModalBtn btn" onClick={handleSocialModal}><img src={Add} alt="" /></button>
            }

        </div>
        <ul className="skills">
            {social.map((social) => (
                <li key={social.id} className='skillBox spaceBet'>
                    <div className="skillTitle">
                        <input type="checkbox" 
                            checked={selected.includes(social.id)}
                            onChange={() => {handleChecking(social) }} /> 
                        <p>{social.socialTitle}</p>
                    </div>
                    <div className="edit">
                       {(selected.length <= 1) &&
                                <button className="skillDelete" onClick={() => editSocial(social.id )}>
                                <img src={Edit} alt="Edit buttton" style={{width:'18px'}} />
                                </button>
                           }
                      
                    </div>
                    
                </li>
            ))}
        </ul>

        {socialModal && (
            <>
                <div className="overlay"></div>
                <div className={     
                    socialModal ? 'animate__animated animate__fadeIn skillModal modal bgF radius5px padd1 lightShad'     
                        : `skillModal modal bgF radius5px padd1 lightShad`}>

            <Formik
                initialValues={initialSocialValues}
                validationSchema={socialSchema}
                onSubmit={addSocial}
            >
                {
                (formik) => {


               return(
                <Form >
                <div className="topFles spaceBet ">
                    <h4 className='subHead'>Social accounts</h4>
                    <button className="skillModalBtn btn" onClick={() => closeSocialModal(formik.resetForm)}><img src={Close} alt="" /></button>
                </div>
                    <h5>Select plaform</h5>
                
                    <CreatableSelect 
                        options={socialPlatforms}
                        value={currentOption}
                        onChange={(option) => handleOptions(option, formik)}
                        onCreateOption={(inputValue) => handleOptions(inputValue, formik)}
                        isClearable
                        onClear={() => setCurrentOption(null)}
                        className='radius5px'
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        placeholder={'Select or add a platform'}
                        
                     />
                    
                    <ErrorMessage name='socialTitle' component={'div'} className='error' />
                    <h5>Account link</h5>
                     <Field type="text" 
                        name="socialLink"
                        placeholder="Add link"
                        className='radius5px'
                    /> 
                    <ErrorMessage name='socialLink' component={'div'} className='error' />
                    <button type='submit' className="skillModalBtn blueBg radius5px btn addSkillBtn">Add</button>
                </Form>)
                }}
            </Formik>
            </div>            
            </>
        )}
    </div>
  )
}

export default Social