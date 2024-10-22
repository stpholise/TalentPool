import DisplayPhoto from '../assets/OhKElOkQ3RE.png'
import { PropTypes } from 'prop-types'
import Star from '../assets/Star 4.svg'
import Skills from './Skills'
import Socials from './Social'

import EmailIcon from '../assets/carbon_email.svg'
import LocationIcon from '../assets/carbon_location.svg'
import PhoneIcon from '../assets/bx_bx-phone.svg'

import Minus from '../assets/Minus.svg'


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
    <section className='marginTL profilePage'>
      <aside className="employeeProfile padd1 radius5px bgF lightShad">
        <div className="top">
            <div >
             <img src={DisplayPhoto} className='rad50' alt=" display photo" />
            </div>
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
        <div className="addressSec padd1 ">
                <p className="profileEmail address "> <img src={EmailIcon} alt="profile Email" /> <span>anosikegenesis@gmail.com</span> </p>
                <p className="profilePhone address "> <img src={PhoneIcon} alt="profile Phone" /> <span>0801 - 234 - 5678</span></p>
                <p className="profileLocation address "> <img src={LocationIcon} alt="profile Location" /> <span>Lagos, Nigeria</span></p>
        </div>

        <div className="btnCont">
          <button className="editProfileBtn btn blueBg padd12 radius5px">Edit Profile</button>
         
        </div>
      </aside>
      <section className='flexColumn w80'>
        <div className="fileSection spaceBet mb1">
        <aside className="cvSec radius5px padd1 bgF lightShad w50">
          <div className="cvTop topFles spaceBet ">
            <h4>CV</h4>
            <button className="rmvCv"> <img src={Minus} alt="" /> </button>
          </div>
          <p>File uploaded</p>
          <div className="cvBtnContnn">
            <button className="cvBtn blueBg radius5px">View file </button>
          </div>
        </aside>
        <aside className='portfolioSec radius5px padd1 bgF lightShad w50'>
            <div className="portfolioTop topFles spaceBet">
              <h4>Portfolio</h4>
              <button className="rmvPortfolio"> <img src={Minus} alt="" /> </button>
            </div>  
            <p>Portfolio</p>
            <div className="portfolioBtnCont ">
              <button className="portfolioBtn blueBg radius5px">View file</button>
            </div>
          </aside>
        </div>
        <section className="skillsets">
          <Skills />
          <Socials  />
          
        </section>
      </section>
    </section>
  )
}


Profile.propTypes = {
  user: PropTypes.object.isRequired
}


export default Profile