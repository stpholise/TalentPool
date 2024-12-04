
// import { PropTypes } from 'prop-types'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import DisplayPhoto from '../assets/OhKElOkQ3RE.png'
import EmailIcon from '../assets/carbon_email.svg'
import LocationIcon from '../assets/carbon_location.svg'
import PhoneIcon from '../assets/bx_bx-phone.svg'
import TwitterIcon from '../assets/il_twitter.svg'
import Behance from '../assets/jam_behance-square.svg'
import Dribble from '../assets/topcoat_dribble.svg'

import { useSelector } from 'react-redux'


const Dashboard = () => {

    const cards = [
        { title: 'JOBS', count: 3052, status:'AVAILABLE' },
        { title: 'JOBS', count: 12, status:'APPLIED FOR'},
        { title: 'PENDING', count: 16, status:'APPLICATIONS'}
    ]

    const skills = useSelector((state) => state.users.skills) || [];

  

    // scrollToTop()
   

  return (
    <main className='dashboard'>
        <h2 className="pageTitle">
            Dashboard       </h2>
        <section className="cards">
            {cards.map((card, index) => (
                <div key={index} className={`card card${index}`}> 
                    <h2 className="cardCount">{card.count}</h2>
                    <h5 className="cardTitle">{card.title}</h5>
                    <h5 className="cardStatus">{card.status}</h5>
                </div>)
            )}
        </section>
        <div className="grid2">
        <section className="contactInfoSection">
            <h4 className="sectionTitle">
                Contact Information
            </h4>
            <div className="contactInfoContainer">
            <div className="contactProfile">
                <img src={DisplayPhoto} className='displayPhoto' alt="display photo" />
                <h3 className="profileName">Genesis Anosike</h3>
                <h5 className="profileOcupation">UI/UX Designer</h5>
            </div>
            <div className="contactAddress">
                <p className="profileEmail address"> <img src={EmailIcon} alt="profile Email" /> <span>anosikegenesis@gmail.com</span> </p>
                <p className="profilePhone address"> <img src={PhoneIcon} alt="profile Phone" /> <span>0801 - 234 - 5678</span></p>
                <p className="profileLocation address"> <img src={LocationIcon} alt="profile Location" /> <span>Lagos, Nigeria</span></p>
                <h5 className="profileTitle address">Portfolio</h5>
                <p className="profileTwitter address"><img src={TwitterIcon} alt="Twitter link" /> @Anosike_UI</p>
                <p className="profileDribble address"><img src={Dribble} alt="Dribble link" />https://dribbble.com</p>
                <p className="profileBehance address"><img src={Behance} alt="Behance link" />https://www.behance.net</p>
            </div>
            </div>
        </section>

        <section className="softwareAssessmentSection">
            <h4 className="sectionTitle"> Softwar Assessment</h4>
            <div className="softwareAssessmentContainer">
                {skills &&
                    skills.map((skill, index) => (
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
        </div>
    </main>
  )
}

// Dashboard.propTypes = {
//     scrollToTop: PropTypes.func.isRequired
// }

export default Dashboard