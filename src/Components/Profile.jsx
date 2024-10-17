import DisplayPhoto from '../assets/OhKElOkQ3RE.png'
import { PropTypes } from 'prop-types'
import Star from '../assets/Star 4.svg'

import EmailIcon from '../assets/carbon_email.svg'
import LocationIcon from '../assets/carbon_location.svg'
import PhoneIcon from '../assets/bx_bx-phone.svg'


const Profile = ({user}) => {
const {name } = user
// const skillsets = [
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' },
//     { skill: 'Project Management', level: 'Expert' },
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' },
//     { skill: 'Project Management', level: 'Expert' },
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' },
//     { skill: 'Project Management', level: 'Expert' },
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' },
//     { skill: 'Project Management', level: 'Expert' },
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' },
//     { skill: 'Project Management', level: 'Expert' },
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' },
//     { skill: 'Project Management', level: 'Expert' },
//     { skill: 'UI/UX Design', level: 'Expert' },
//     { skill: 'Frontend Development', level: 'Intermediate' },
//     { skill: 'Backend Development', level: 'Intermediate' },
//     { skill: 'Database Management', level: 'Expert' }
// ]

  return (
    <section className='marginTL'>
      <aside className="employeeProfile">
        <div className="top">
            <img src={DisplayPhoto} alt=" display photo" />
            <h3>{name}</h3>
            <p>{user.occupation}</p>
            <div className="stars">
              <img src={Star} alt="" />
              <img src={Star} alt="" />
              <img src={Star} alt="" />
              <img src={Star} alt="" />
              <img src={Star} alt="" />
            </div>
          </div>
        <div className="className">
                <p className="profileEmail address"> <img src={EmailIcon} alt="profile Email" /> <span>anosikegenesis@gmail.com</span> </p>
                <p className="profilePhone address"> <img src={PhoneIcon} alt="profile Phone" /> <span>0801 - 234 - 5678</span></p>
                <p className="profileLocation address"> <img src={LocationIcon} alt="profile Location" /> <span>Lagos, Nigeria</span></p>
        </div>

        <div className="btnCont">
          <button className="editProfileBtn btn">Edit Profile</button>
         
        </div>
      </aside>
      <section>
        <div className="fileSection">
        <aside className="cvSec">
          <div className="cvTop topFles">
            <h4>CV</h4>
            <button className="rmvCv"> <img src="" alt="" /> </button>
          </div>
          <p></p>
          <div className="cvBtnCont">
            <button className="cvBtn fileVpn">View file </button>
          </div>
        </aside>
        <aside className='portfolioSec'>
            <div className="portfolioTop topFles">
              <h4>Portfolio</h4>
              <button className="rmvPortfolio"> <img src="" alt="" /> </button>
            </div>  
            <p></p>
            <div className="portfolioBtnCont ">
              <button className="portfolioBtn fileVpn">View file</button>
            </div>
          </aside>
        </div>
        <section className="skillsets">
          <div className="topFlex">
            <h3>Skillsets</h3>
            <button className="addSkill">Add Skill</button>
          </div>


        </section>
      </section>
    </section>
  )
}


Profile.propTypes = {
  user: PropTypes.object.isRequired
}


export default Profile