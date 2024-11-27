// import '../styles/Jobs.css'

import { PropTypes } from 'prop-types'
import { useState } from 'react'
import Close from '../assets/close.svg'
import ProgressBar from './ProgressBar'
import More from '../assets/moreIcon.svg'
import Less from '../assets/lessIcon.svg'
import { Formik, Field, Form } from 'formik'

const Filter = ({isVisible = false, setIsVisible }) => {
    const [ experience, setExperience ] = useState(0)
    const [ toggleSkills, setToggleSkills ] = useState(true)
    const [ openYears, setOpenYears ] = useState(false)
    const [ openLocation, setOpenLocation ] = useState(false)
    const [ selected, setSelected ] = useState([])


    const handlSkillToggle = () => {
        setToggleSkills(!toggleSkills)
    }
    const yearsToggle = () => {
        setOpenYears(!openYears)
    }
    const locationToggle = () => {
        setOpenLocation(!openLocation)
    }



const skillsets = [
    { skill: 'UI ', level: 'Expert' },
    { skill: 'UX ', level: 'Expert' },
    { skill: 'Figma', level: 'Expert' },
    { skill: 'Sketch', level: 'Expert' },
    { skill: 'JavaScript', level: 'Expert' },
    { skill: 'FrontEnd', level: 'Expert' },
    { skill: 'Backend  ', level: 'Intermediate' },
]

 const handleSkill = (e) => {
    if(selected.includes(e.target.value)){
        setSelected(selected.filter(skill => skill !== e.target.value))
    } else {
        setSelected([...selected, e.target.value])
    }
 }



  return (
    <>
    <Formik>
        {
        () => (
        <Form>
    <section className={ isVisible ? "filterContainer show animate__animated animate__zoomIn" : 'filterContainer'}>
        
        <h5 className="bbottom">FILTERS</h5>
        <button className="closeFilter btn"  
            onClick={() => setIsVisible(false)}><img src={Close} alt="" /></button>

        <div className="bbottom">
            <div onClick={handlSkillToggle} className="spaceBet">
                <h5 className="" >Skills</h5>
                {
                    toggleSkills ? 
                    <img src={Less} alt="" /> :
                    <img src={More} alt="" />
                }
            </div>
        { toggleSkills &&
            skillsets.map((skill, index) => (
                <div key={index} className="skillBox">
                    <input 
                        type="checkbox" 
                        name={skill.skill}
                        value={skill.skill}
                        onChange={handleSkill}
                        checked={selected.includes(skill.skill)}
                
                    />
                    <label htmlFor="">{skill.skill}</label>
                </div>
            ))
        }
        </div>
        <div  className="bbottom "> 
            <div htmlFor="years" className='spaceBet' onClick={yearsToggle}> 
                <span>Years of Experience </span>  
                {
                    openYears ? 
                    <img src={Less} alt=""  /> :
                    <img src={More} alt />
                 }  
            </div>
           { openYears &&
            <div className='sliderContainer'>
                <ProgressBar 
                    setSkill={setExperience} 
                    skillProficiency={experience} 
                    test={true}
                    exRange = {20}
                />
            </div>
           }
        </div>
      
        <div className="bbottom  ">
        <div onClick={locationToggle} className="spaceBet">
                <h5 className="" >Location</h5>
                {
                    openLocation ? 
                    <img src={Less} alt="" /> :
                    <img src={More} alt="" />
                }
            </div>
            {openLocation &&
                <Field 
                type="text"
                name='location'
                placeholder="abuja"
                id="location" 
                className="filtlocation radius5px" 
                />
           }
        </div>
        <button className="filterBtn">Apply </button>
        </section>
        </Form>
        )
    }
        </Formik>
    </>
  )
}

Filter.propTypes = {
    isVisible: PropTypes.bool,
    setIsVisible: PropTypes.func,
}

export default Filter