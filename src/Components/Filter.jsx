// import '../styles/Jobs.css'

import { PropTypes } from 'prop-types'
import { useState } from 'react'
import Close from '../assets/close.svg'
// import ProgressBar from './ProgressBar'
import CountryFilter from './CountryFilter'
import More from '../assets/moreIcon.svg'
import Less from '../assets/lessIcon.svg'



const Filter = ({
    isVisible = false, 
    setIsVisible, 
    setCountry, 
    country,
    selected,
    setSelected,
    setIsFetchTriggered

 }) => {
        const countryList = [
    { value: 'gb', label: 'Great Breatean '},
    { value: 'at', label: 'Austria'},
    { value: 'au', label: 'Australia'},
    { value: 'be', label: 'Belgium'},
    { value: 'br', label: 'Brazil'},
    { value: 'ch', label: 'Switzerland'},
    { value: 'ca', label: 'Canada'},
    { value: 'de', label: ' Germany'},
    { value: 'fr', label: 'France'},
    { value: 'es', label: 'Spain'},
    { value: 'in', label: ' India'},
    { value: 'it', label: 'Italy'},
    { value: 'mx', label: ' Mexico'},
    { value: 'nl', label: 'Netherlands'},
    { value: 'nz', label: 'New Zealand'},
    { value: 'pl', label: 'Poland'},
    { value: 'sg', label: 'Singapore'},
    { value: 'za', label: 'South Africa'},
    ]

    // const [ experience, setExperience ] = useState(0)
    const [ toggleSkills, setToggleSkills ] = useState(true)
    // const [ openYears, setOpenYears ] = useState(false)
    // const [ openLocation, setOpenLocation ] = useState(false)
    // const [ location, setLocation ] = useState('')

    // handle dropdown toggles 
    const handlSkillToggle = () => {
        setToggleSkills(!toggleSkills)
    }
    // const yearsToggle = () => {
    //     setOpenYears(!openYears)
    // }
    // const locationToggle = () => {
    //     setOpenLocation(!openLocation)
    // }



const skillsets = [
    { skill: 'UI/UX', level: 'Expert' },
    { skill: 'Figma', level: 'Expert' },
    { skill: 'Sketch', level: 'Expert' },
    { skill: 'JavaScript', level: 'Expert' },
    { skill: 'FrontEnd', level: 'Expert' },
    { skill: 'Backend', level: 'Intermediate' },
]

 const handleSkill = (e) => {
    if(selected.includes(e.target.value)){
        setSelected(selected.filter(skill => skill !== e.target.value))
    } else {
        setSelected([...selected, e.target.value])
    }
 
 }

 const applyFilter = () => {
    setIsFetchTriggered(true)
    setIsVisible(false)
 }


  return (
    <>
   
        <form>
    <section className={ isVisible ? "filterContainer show animate__animated animate__zoomIn" : 'filterContainer'}>
        
        <h5 className="bbottom">FILTERS</h5>
        <button 
            className="closeFilter btn" 
            type='button'
            onClick={() => setIsVisible(false)}><img src={Close} alt="close icon" />
        </button>

        <div className="bbottom">
            <div onClick={handlSkillToggle} className="spaceBet">
                <h5 className="" >Skills</h5>
                {
                    toggleSkills ? 
                    <img src={Less} alt="less icon " /> :
                    <img src={More} alt="more icon" />
                }
            </div>
        { toggleSkills &&
            skillsets.map((skill, index) => (
                <div key={index} className="skillBlock">
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
        {/* <div  className="bbottom "> 
            <div htmlFor="years" className='spaceBet' onClick={yearsToggle}> 
                <span>Years of Experience </span>  
                {
                    openYears ? 
                    <img src={Less} alt="less icon"  /> :
                    <img src={More} alt='more icon' />
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
        </div> */}
      
        {/* <div className="bbottom  ">
             <div onClick={locationToggle} className="spaceBet">
                <h5 className="" >Location</h5>
                {
                    openLocation ? 
                    <img src={Less} alt="Less" /> :
                    <img src={More} alt="More" />
                }
            </div>
            {openLocation &&
                <input 
                type="text"
                name='location'
                placeholder="e.g abuja"
                id="location" 
                className="filtlocation radius5px" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
           }
        </div> */}
        <CountryFilter  
            countryList={countryList} 
            setCountry={setCountry} 
            country={country} 
        />

        <button type='button' onClick={applyFilter} className="filterBtn">Apply </button>
        </section>
        </form>
     
    </>
  )
}

Filter.propTypes = {
    isVisible: PropTypes.bool,
    setIsVisible: PropTypes.func,
    setCountry: PropTypes.func.isRequired,
    country: PropTypes.object.isRequired,
    selected: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
    setIsFetchTriggered: PropTypes.func.isRequired,
}

export default Filter