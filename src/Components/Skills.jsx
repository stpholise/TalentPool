
import Add from '../assets/carbon_add.svg'
import Trash from '../assets/carbon_trash-can.svg'
import { useSelector, useDispatch } from 'react-redux'
import { addSkill, removeSkill } from '../store/UserSlice'
import { modalIsOpen, modalIsClose } from '../store/AppSlice'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ProgressBar from './ProgressBar'
import Close from '../assets/close.svg'

const Skills = () => {
    const uniqueId = uuidv4()
    const dispatch = useDispatch()
    const [skillModal, setSkillModal ] = useState(false)
    const [skill, setSkill] = useState({skillTitle:'', skillProficiency:0})
    const skills = useSelector((state) => state.users.skills) || [];

    const  handleSkillChange = (e) => {
        const { name, value } = e.target;
        console.log({[name]: value})
        setSkill({...skill, [name]: value})
    }
    const toggleSkillModal = () => {
        setSkillModal(!skillModal)
        skillModal ? dispatch(modalIsClose(false)) : dispatch(modalIsOpen(true));
        console.log({'modal is open': skillModal})
    }
    const closeSkillModal = () => {
        setSkillModal(false)
        setSkill({skillTitle:'', skillProficiency:0})
        dispatch(modalIsClose(false))    
    }
    const handleForm = (e) => {
        e.preventDefault();
        if (skill.skillTitle && skill.skillProficiency) {
            dispatch(addSkill({title:skill.skillTitle, proficiency: skill.skillProficiency, id: uniqueId}));
            closeSkillModal()
        }
    }
    const skillRemove = (id) => {
        dispatch(removeSkill(id))
    }
  
  return (
    <div className='radius5px padd1 bgF mb1'>
        <div className="topFles spaceBet ">
            <h4 className='subHead'>Skillsets</h4>
            <button className="skillModalBtn btn" onClick={() => toggleSkillModal()}><img src={Add} alt="" /></button>
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
                
                <form onSubmit={handleForm}>
                    <p className="topFles spaceBet ">
                       <h4 className='subHead'>Skillsets</h4>
                       <button className="skillModalBtn btn"  onClick={closeSkillModal}><img src={Close} alt="" /></button>
                    </p>
                    <input 
                        name="skillTitle"
                        type="text" 
                        placeholder="Skill Title"
                        value={skill.skillTitle}
                        onChange={(e) => handleSkillChange(e)}
                         className='radius5px'
                    />
                    <ProgressBar setSkill={setSkill} skillProficiency={skill.skillProficiency} />    
                    <button type='submit' className="addSkillBtn btn blueBg radius5px">Add skill</button>
                </form>         
        </div>
        </>
        )}
    </div>
  )
}
export default Skills