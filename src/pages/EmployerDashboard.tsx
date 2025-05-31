import { useSelector } from 'react-redux'
import Slider from 'rc-slider'
import Portfolio from '../Components/Portfolio'
import Cv from '../Components/Profile/Cv'
import { RootState } from '../store'
import Person from '../Components/Person'


interface Skill {
  skillTitle: string;
  skillProficiency: number;
}


const EmployerDashboard = () => {
  const skills = useSelector((state: RootState) => state.users.skills) || [];

  return (
    <section className='marginTL profilePage'>
     <Person employer={true} />
      <section className='flexColumn employer w80'>
        <div className="fileSection spaceBet mb1 ">
       
        <Portfolio />
        <Cv />
        </div>
        <section className="skillsets">
        <div className="softwareAssessmentContainer">
                {skills &&
                    skills.map((skill:Skill, index: number) => (
                        <div key={index} className="assessment">
                            <h5 className="assessmentTitle">{skill.skillTitle}</h5>
                            <div className="slider-container">
                            <Slider 
                                min={0}
                                max={100}
                                value={skill.skillProficiency} // Controlled value
                                styles={{
                                rail: {height: '5px', backgroundColor: '#C4C4C4', display:'none',  cursor: 'not-allowed' },
                                track: {height: '5px', backgroundColor: '#084482',  cursor: 'not-allowed'},
                                handle: {
                                    borderColor: '#084482',
                                    backgroundColor: '#084482',
                                    width:'12px',
                                    height:'12px',
                                    marginTop: '-4px',
                                    zIndex:50, 
                                    boxShadow: 'none',
                                    cursor: 'not-allowed'
                                }                                 
                                }}
                               
                            />
                            </div>
                        </div>
                    ) )
                }        
          </div>
          
        </section>
      </section>
    </section>
  )
}




export default EmployerDashboard