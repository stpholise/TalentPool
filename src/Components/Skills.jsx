
import Add from '../assets/carbon_add.svg'
import Trash from '../assets/carbon_trash-can.svg'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSkillModal,  closeSkillModal, setSkill, addSkill, resetSkill, removeSkill } from './store'

import ProgressBar from './ProgressBar'

                            

const Skills = () => {

    const dispatch = useDispatch()

    const skillModal = useSelector((state) => state.count.skillModal)
    const currentSkillProficiency = useSelector((state) => state.count.newSkill.skillProficiency)
    const currentSkillTitle = useSelector((state) => state.count.newSkill.skillTitle)
    const skills = useSelector((state) => state.count.skills)
  
    
    const handleForm = (e) => {
        e.preventDefault();
        if (currentSkillTitle && currentSkillProficiency) {
            dispatch(addSkill({title:currentSkillTitle, proficiency: currentSkillProficiency}));
            dispatch(closeSkillModal())
            dispatch(resetSkill())
        }
    }
    
    const skillRemove = (index) => {
        dispatch(removeSkill(index))
    }
  
  return (
    <div className='radius5px padd1 bgF mb1'>
        <div className="topFles spaceBet ">
            <h4 className='subHead'>Skillsets</h4>
            <button className="skillModalBtn btn" onClick={() => dispatch(toggleSkillModal())}><img src={Add} alt="" /></button>

        </div>
        <ul className="skills">
            {skills.map((skill, index) => (
                <li key={index} className='skillBox spaceBet'>
                    <div className="skillTitle">
                        {skill.skillChecked ? <input type="checkbox"  checked /> : <input type="checkbox" />}
                        <p>{skill.skillTitle}</p>
                        
                    </div>
                    <button className="skillDelete" onClick={() => skillRemove(index)}>
                       <img src={Trash} alt="delete buttton" style={{width:'18px'}} />
                    </button>
                    
                </li>
            ))}
        </ul>

        {skillModal && (
            <>
            <div className="overlay" onClick={() => dispatch(closeSkillModal())}>  </div>
            <div className='skillModal modal bgF radius5px padd1 lightShad'>
                
                <form onSubmit={handleForm}>
                    <h4>Add Skill</h4>
                    <input 
                        name="skillTitle"
                        type="text" 
                        placeholder="Skill Title"
                        value={currentSkillTitle}
                        onChange={(e) => dispatch(setSkill(e.target.value))}
                         className='radius5px'
                    />
                    <ProgressBar />    
                    <button type='submit' className="addSkillBtn btn blueBg radius5px">Add skill</button>
                </form>
          
        </div>
        </>
        )}
    </div>
  )
}

export default Skills