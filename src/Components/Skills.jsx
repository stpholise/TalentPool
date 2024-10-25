import {useState } from 'react'
import Add from '../assets/carbon_add.svg'
import Trash from '../assets/carbon_trash-can.svg'



const Skills = () => {
    const [skills, setSkills] = useState([
        {skillTitle: 'UI/UX Design', skillProficiency: '90%', skillChecked: true},
        {skillTitle: 'JavaScript', skillProficiency: '80%', skillChecked: false},
        {skillTitle: 'HTML 5', skillProficiency: '80%', skillChecked: true},
        {skillTitle: 'CSS 3', skillProficiency: '80%', skillChecked: true},
        {skillTitle: 'Bootstrap', skillProficiency: '70%', skillChecked: false},
    ])
    const [skillModal, setSkillModal] = useState(false);
    
    const [newSkill, setNewSkill] = useState({ skillTitle: '', skillProficiency: '', skillChecked: false });

    const handleSkillModal = () => {
        setSkillModal(!skillModal);
        console.log(skillModal)
    }

    const handleInputChange = (e) => {
        const {name , value} = e.target;
        setNewSkill({...newSkill, [name]:value});
    
    }

   
    
    const handleForm = (e) => {
        e.preventDefault();
        if (newSkill.skillTitle && newSkill.skillProficiency) {
            setSkills([...skills, newSkill]);
            setNewSkill({ skillTitle: '', skillProficiency: '', skillChecked: false });
            setSkillModal(false);
        }
    }
    
    const skillRemove = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    }
    const closeAll = () => {
        setSkillModal(false);
    }

    
   
  return (
    <div className='radius5px padd1 bgF mb1'>
        <div className="topFles spaceBet ">
            <h4 className='subHead'>Skillsets</h4>
            <button className="skillModalBtn btn" onClick={handleSkillModal}><img src={Add} alt="" /></button>

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
            <div className="overlay" onClick={closeAll}>  </div>
            <div className='skillModal modal bgF radius5px padd1 lightShad'>
                
                <form onSubmit={handleForm}>
                    <h4>Add Skill</h4>
                    <input 
                        name="skillTitle"
                        type="text" 
                        placeholder="Skill Title"
                        value={newSkill.skillTitle}
                        onChange={handleInputChange}
                         className='radius5px'
                    />
                    <input type="text" 
                        name="skillProficiency"
                        placeholder="Skill Proficiency"
                        value={newSkill.skillProficiency}
                        onChange={handleInputChange}
                         className='radius5px'
                    />
                    
                    <button type='submit' className="addSkillBtn btn blueBg radius5px">Add skill</button>
                </form>
          
        </div>
        </>
        )}
    </div>
  )
}

export default Skills