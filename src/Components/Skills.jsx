
import Add from '../assets/carbon_add.svg'
import Trash from '../assets/carbon_trash-can.svg'
import { useSelector, useDispatch } from 'react-redux'
import { addSkill, removeSkill } from '../store/UserSlice'
import { modalIsOpen, modalIsClose } from '../store/AppSlice'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ProgressBar from './ProgressBar'
import Close from '../assets/close.svg'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Skills = () => {
    const uniqueId = uuidv4()
    const dispatch = useDispatch()
    const [skillModal, setSkillModal ] = useState(false)
    const skills = useSelector((state) => state.users.skills) || [];

    
    const toggleSkillModal = () => {
        setSkillModal(!skillModal)
        skillModal ? dispatch(modalIsClose(false)) : dispatch(modalIsOpen(true));
        console.log({'modal is open': skillModal})
    }
    const closeSkillModal = (resetForm) => {
        setSkillModal(false)
        resetForm();
        dispatch(modalIsClose(false))    
    }

   
    const skillValue = {
        skillTitle: '',
        skillProficiency: 0,
    }    

    const skillValidationSchema = Yup.object({
        skillTitle: Yup.string()
          .trim()
          .min(3, 'Skill title must be at least 3 characters long')
          .max(50, 'Skill title cannot exceed 50 characters')
          .matches(/^[A-Za-z\s]+$/, 'Skill title must contain only letters and spaces')
          .required('Skill title is required'),
        skillProficiency: Yup.number()
          .min(1, 'Proficiency must be at least 1%')
          .max(100, 'Proficiency cannot exceed 100%')
          .required('Proficiency is required'),
      });


    const handleForm = (values, actions) => {
        console.log(values)
        dispatch(
            addSkill({
                title:values.skillTitle, 
                proficiency:values.skillProficiency, 
                id: uniqueId}));
        actions.resetForm()
        closeSkillModal(actions.resetForm)     
    }
    const skillRemove = (id) => {
        dispatch(removeSkill(id))
    }

    


  return (
    <div className='radius5px padd1 bgF mb1'>
        <div className="topFles spaceBet ">
            <h4 className='subHead'>Skillsets</h4>
            <button className="skillModalBtn btn" onClick={() => toggleSkillModal()} aria-label="Add Skill"><img src={Add} alt="" /></button>
        </div>
        <ul className="skills">
            {skills.map((skill) => (
                <li key={skill.id} className='skillBox spaceBet'>
                    <div className="skillTitle">
                        {skill.skillChecked ? <input type="checkbox"  checked /> : <input type="checkbox" />}
                        <p>{skill.skillTitle}</p>         
                    </div>
                    <button className="skillDelete" onClick={() => skillRemove(skill.id)}>
                       <img src={Trash} alt="delete buttton" style={{width:'18px'}} />
                    </button>                   
                </li>
            ))}
        </ul>
        {skillModal && (
            <>
            <div className="overlay">  </div>
            <div className='skillModal modal bgF radius5px padd1 lightShad'>
                <Formik
                initialValues={skillValue}
                onSubmit={handleForm}
                validationSchema={skillValidationSchema}
                >
                    {
                        (formik) => {
                            return(                            
                        <Form >
                            <p className="topFles spaceBet ">
                            <h4 className='subHead'>Skillsets</h4>
                            <button className="skillModalBtn btn"  onClick={() => closeSkillModal(formik.resetForm)}><img src={Close} alt="" /></button>
                            </p>
                            <Field 
                                name="skillTitle"
                                type="text" 
                                placeholder="e.g Javascript"
                                className='radius5px'
                            />
                            <ErrorMessage  name='skillTitle' component={'div'} className='error'/>
                            <ProgressBar 
                                setSkill={(value) => formik.setFieldValue('skillProficiency', value)} 
                                skillProficiency={formik.values.skillProficiency} />    
                            <ErrorMessage  name='skillProficiency' component={'div'} className='error'/>
                            <button type='submit' className="addSkillBtn btn blueBg radius5px">Add skill</button>
                        </Form>  
                        )
                        }
                    }
                 </Formik>       
        </div>
        </>
        )}
    </div>
  )
}
export default Skills