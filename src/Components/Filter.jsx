// import '../styles/Jobs.css'

import { PropTypes } from 'prop-types'
import { useState } from 'react'
import Close from '../assets/close.svg'
import ProgressBar from './ProgressBar'
import CountryFilter from './CountryFilter'
import More from '../assets/moreIcon.svg'
import Less from '../assets/lessIcon.svg'



const Filter = ({
    isVisible = false, 
    setIsVisible,
    setIsFetchTriggered,
    setFilter,

 }) => {

     const [ salaryMin, setSalaryMin ] = useState(0)
     const [ salaryMax, setSalaryMax ] = useState(0)
     const [ toggleSkills, setToggleSkills ] = useState(true)
     const [ isMinSalryOpen,  setIsMinSalaryOpen] = useState(false)
     const [ isMaxSalryOpen,  setIsMaxSalaryOpen] = useState(false)
     const [ jobType, setJobType] = useState('')
     const [ selected, setSelected ] = useState([])
     const [ jobClassification, setJobClassification ] = useState('')
     const [ country, setCountry] = useState({ value: 'gb', label: 'Great Breatean'});
    const [ jobTypeToggle, setJobTypeToggle] = useState(false)
    const [ jobClassificationToggle, setJobClassificationToggle] = useState(false)
    const [ isCountryOpen, setIsCountryOpen ] = useState(false)

    const clearFilter = () => {
        setCountry({ value: 'gb', label: 'Great Breatean'})
        setSalaryMin(0)
        setSalaryMax(0)
        setSelected([])
        setJobClassification('')
        setJobType('')
        setJobClassificationToggle(false)
        setIsCountryOpen(false)
        setJobTypeToggle(false)
        setIsMaxSalaryOpen(false)
        setIsMinSalaryOpen(false)
        
    }
    const closeFilter = () =>{
        setIsVisible(false)
        clearFilter()
    }
 
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
 
    // handle dropdown toggles 
    const handlSkillToggle = () => {
        setToggleSkills(!toggleSkills)
    }
    const minSalaryToggle = () => {
        setIsMinSalaryOpen(!isMinSalryOpen)
    }
    const maxSalaryToggle = () => {
        setIsMaxSalaryOpen(!isMaxSalryOpen)
    }
    const handlJobTypeToggle = () => {
        setJobTypeToggle(!jobTypeToggle)
    }
    const handlJobClassificationToggle = () => {
        setJobClassificationToggle(!jobClassificationToggle)
    }
     const handleCountryToggle = () => {
        setIsCountryOpen(!isCountryOpen)
    }
 
const skillsets = [
    { skill: 'UI/UX', level: 'Expert' },
    { skill: 'Figma', level: 'Expert' },
    { skill: 'Sketch', level: 'Expert' },
    { skill: 'JavaScript', level: 'Expert' },
    { skill: 'FrontEnd', level: 'Expert' },
    { skill: 'Backend', level: 'Intermediate' },
]

const jobClassificationArr = [
    {value: 'part_time', label:'Part Time'},
    {value: 'full_time', label:'Full Time'},
]
const jobTypesArr = [
    {value: 'contract', label:'Contract'},
    {value: 'permanent', label:'Permanent'},
]


 const handleSkill = (e) => {
   
    if(selected.includes(e.target.value)){
        setSelected(selected.filter(skill => skill !== e.target.value))
    } else {
        setSelected([...selected, e.target.value])
    }
 }

 const hadleJobType = (e) => {
    setJobType(e.target.value)
 }

 const hadleJobClassification = (e) => {
    setJobClassification(e.target.value)
 }

 const applyFilter = () => {
    setIsFetchTriggered(true)
    // setIsVisible(false)
    setFilter({ 
        selected: selected, 
        country: country, 
        salaryMin: salaryMin, 
        salaryMax: salaryMax, 
        jobClassification: jobClassification, 
        jobType: jobType,
    })
    clearFilter()
 }

  return (
    <>
   
        <form>
    <section className={ isVisible ? "filterContainer show animate__animated animate__zoomIn" : 'filterContainer'}>
        
        <h5 className="bbottom">FILTERS</h5>
        <button 
            className="closeFilter btn" 
            type='button'
            onClick={closeFilter}><img src={Close} alt="close icon" />
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
                        id={skill.skill}
                    />
                    <label htmlFor={skill.skill}>{skill.skill}</label>
                </div>
            ))
        }
        </div>

        <div className="bbottom">
            <div onClick={handlJobTypeToggle} className="spaceBet">
                <h5 className="" >Job Type</h5>
                {
                    jobTypeToggle ? 
                    <img src={Less} alt="less icon " /> :
                    <img src={More} alt="more icon" />
                }
            </div>
        {   jobTypeToggle &&         
            jobTypesArr.map((type, index) => (
                    <div key={index} className="skillBlock">
                        <input 
                            type="radio" 
                            name={'jobType'}
                            value={type.value}
                            onChange={(e) => hadleJobType(e)}
                            checked={jobType === type.value}
                            id={type.value}
                        />
                        <label htmlFor={type.value}>{type.label}</label>
                    </div>
            ))
        }
        </div>

        <div className="bbottom">
            <div onClick={handlJobClassificationToggle} className="spaceBet">
                <h5 className="" >Job Classification</h5>
                {
                    jobClassificationToggle ? 
                    <img src={Less} alt="less icon " /> :
                    <img src={More} alt="more icon" />
                }
            </div>
        {   jobClassificationToggle &&         
            jobClassificationArr.map((type, index) => (
                    <div key={index} className="skillBlock">
                        <input 
                            type="radio" 
                            name={'jobClassification'}
                            value={type.value}
                            onChange={(e) => hadleJobClassification(e)}
                            checked={jobClassification === type.value}
                            id={type.value}
                        />
                        <label htmlFor={type.value}>{type.label}</label>
                    </div>
            ))
        }
        </div>
         <div  className="bbottom "> 
            <div htmlFor="years" className='spaceBet' onClick={minSalaryToggle}> 
                <span>Minimum Salary </span>  
                {
                    isMinSalryOpen ? 
                    <img src={Less} alt="less icon"  /> :
                    <img src={More} alt='more icon' />
                 }  
            </div>
           { isMinSalryOpen &&
            <div className='sliderContainer'>
                  <input className='pad1 priceInput radius5px' type="number" value={salaryMin}  onChange={(e) => setSalaryMin(e.target.value)}/>
                <ProgressBar 
                    setSkill={setSalaryMin} 
                    skillProficiency={parseInt(salaryMin, 10)} 
                    test={true}
                    exRange = {10000}
                    hideValue={true}
                />
            </div>
           }
        </div>  
      
         <div  className="bbottom "> 
            <div htmlFor="years" className='spaceBet' onClick={maxSalaryToggle}> 
                <span>Maximom Salary </span>  
                {
                    isMaxSalryOpen ? 
                    <img src={Less} alt="less icon"  /> :
                    <img src={More} alt='more icon' />
                 }  
            </div>
           { isMaxSalryOpen &&
            <div className='sliderContainer'>
                <input className='pad1 priceInput' type="number" value={salaryMax}  onChange={(e) => setSalaryMax(e.target.value)}/>
                <ProgressBar 
                    setSkill={setSalaryMax} 
                    skillProficiency={parseInt(salaryMax,10)} 
                    test={true}
                    hideValue={true}
                    exRange = {100000}
                    // minRange={0}
                />
            </div>
           }
        </div>  

         <div  className="bbottom "> 
            <div htmlFor="years" className='spaceBet' onClick={handleCountryToggle}> 
                <span>Country </span>  
                {
                    isCountryOpen ? 
                    <img src={Less} alt="less icon"  /> :
                    <img src={More} alt='more icon' />
                 }  
            </div>
           { isCountryOpen &&
            <div className='sliderContainer'>
              
            <CountryFilter  
                countryList={countryList} 
                setCountry={setCountry} 
                country={country} 
            />

            </div>
           }
        </div>  
      
      
      <div className="skillFlex filter">
        <button type='button' onClick={applyFilter} className="filterBtn">Apply </button>
        <button type='button' onClick={clearFilter} className="filterBtn clearBtn">Clear </button>
        </div>
        </section>
        </form>
     
    </>
  )
}

Filter.propTypes = {
    isVisible: PropTypes.bool,
    setIsVisible: PropTypes.func,
    setFilter: PropTypes.func,
    filter: PropTypes.object,
    
    setIsFetchTriggered: PropTypes.func.isRequired,
}

export default Filter