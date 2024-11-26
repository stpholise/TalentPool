// import '../styles/Jobs.css'

import { PropTypes } from 'prop-types'

const Filter = ({isVisible}) => {

const skillsets = [
    { skill: 'UI ', level: 'Expert' },
    { skill: 'UX ', level: 'Expert' },
    { skill: 'Figma', level: 'Expert' },
    { skill: 'Sketch', level: 'Expert' },
    { skill: 'JavaScript', level: 'Expert' },
    { skill: 'FrontEnd', level: 'Expert' },
    { skill: 'Backend  ', level: 'Intermediate' },
]

  return (
    <>
    <section className={ isVisible ? "filterContainer show" : 'filterContainer'}>
        <h5 className="bbottom">FILTERS</h5>
        <div className="">
            <h5 className="bbottom">Skills</h5>
        {
            skillsets.map((skill, index) => (
                <div key={index} className="skillBox">
                    <input 
                        type="checkbox" 
                        name="" 
                        id="" 
                    />
                    <label htmlFor="">{skill.skill}</label>
                </div>
            ))
        }
        </div>
        <div  className="bbottom spaceBet"> 
            <label htmlFor="years">Years of Experience  </label>
            <select name="" id="years" className="grayboder1x">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <div className="bbottom spaceBet">
            Age 
            <select name="" id="" className="grayboder1x">
                <option value="1">20</option>
                <option value="2">21</option>
                <option value="3">22</option>
                <option value="4">23</option>
                <option value="5">24</option>

            </select>
        </div>
        <div className="bbottom spaceBet">
            Location
            <select name="" id="" className="grayboder1x">
                <option value=""></option>
            </select>
        </div>
        <div className="bbottom spaceBet">
            Availability
            <select name="" id="" className="grayboder1x">
                <option value=""></option>
            </select>
        </div>
        </section>
    </>
  )
}

Filter.propTypes = {
    isVisible: PropTypes.bool.isReaquired,
}

export default Filter