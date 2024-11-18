import { useState } from 'react'
import Add from '../assets/carbon_add.svg'
import Edit from '../assets/bytesize_edit.svg'
import { useDispatch, useSelector } from 'react-redux'
import { addNewSocial } from '../store/UserSlice'
import { v4 as uuidv4 } from 'uuid'
import { modalIsOpen, modalIsClose } from '../store/AppSlice'
import Close from '../assets/close.svg' 
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Social = () => {
   
    const dispatch = useDispatch(); 
    const [ editId, setEditId] = useState(null)
    const [socialModal, setSocialModal] = useState(false)
    const social  = useSelector((state) => state.users.social)
    const [editValues, setEditValues ] = useState(null)

    const initialSocialValues = { 
        socialLink: editValues ? editValues.socialLink : '',
        socialTitle:   editValues ? editValues.socialTitle : '',
    }

    const socialSchema = Yup.object({
        socialTitle: Yup.string().required('Required'),
        socialLink: Yup.string().url('Invalid URL format').required('Required'),
    })

    const handleSocialModal = () => {
        setSocialModal(!socialModal)
        socialModal ? dispatch(modalIsClose(false)) : dispatch(modalIsOpen(true));
    }
    const closeSocialModal = (resetForm) => {
        setSocialModal(false)
        resetForm()
        dispatch(modalIsClose(false))   
        setEditValues(null)
    }
    const addSocial = (values, actions) => {
         if (editId !== null) {
            // Update existing social account
            const updatedSocial = social.map((item) =>
                item.id === editId ? { ...item, ...values } : item
            );
            dispatch(addNewSocial(updatedSocial));    
            setEditId(null); 
            setEditValues(null)
        } else {
            dispatch(addNewSocial([...social, {...values, id: uuidv4()}]))
        }
        actions.resetForm()
        closeSocialModal(actions.resetForm)
    } 


    const editSocial = (id) => {
        const selectedSocial = social.find((social) => social.id === id);
        if (selectedSocial) {
            setEditId(id);
            console.log(selectedSocial)
            setEditValues(selectedSocial);
            handleSocialModal();
        }
    }

  return (
    <div className='radius5px padd1 bgF mb1'>
        <div className="topFles spaceBet ">
            <h4 className='subHead'>Social accounts</h4>
            <button className="skillModalBtn btn" onClick={handleSocialModal}><img src={Add} alt="" /></button>

        </div>
        <ul className="skills">
            {social.map((social) => (
                <li key={social.id} className='skillBox spaceBet'>
                    <div className="skillTitle">
                        {social.skillChecked ? <input type="checkbox" checked /> : <input type="checkbox" />}
                        <p>{social.socialTitle}</p>
                    </div>
                    <div className="edit">
                       
                                <button className="skillDelete" onClick={() => editSocial(social.id )}>
                                <img src={Edit} alt="Edit buttton" style={{width:'18px'}} />
                                </button>
                           
                      
                    </div>
                    
                </li>
            ))}
        </ul>

        {socialModal && (
            <>
                <div className="overlay"></div>
                <div className='skillModal modal bgF radius5px padd1 lightShad'>

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
                    <Field name='socialTitle'
                        id='socialLink'
                        as='select'
                        className='radius5px'
                     >
                        <option className='option'  value="">Select</option>
                        {social.map((social, index) => (
                            <option 
                                key={index} 
                                className='option'  
                                value={social.socialTitle}
                            >
                                {social.socialTitle}
                            </option>
                        ))}
                    </Field>
                    <Field 
                        name="socialTitle"
                        type="text" 
                        placeholder={formik.values.socialTitle}
                         className='radius5px'
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