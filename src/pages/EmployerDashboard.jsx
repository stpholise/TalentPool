
import { PropTypes } from 'prop-types'

import Skills from '../Components/Skills'
import Person from '../Components/Person'

import Minus from '../assets/Minus.svg'


const EmployerDashboard = ({ scrollToTop}) => {


scrollToTop()


  return (
    <section className='marginTL profilePage'>
     <Person />
      <section className='flexColumn employer w80'>
        <div className="fileSection spaceBet mb1 ">
       
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
        </section>
      </section>
    </section>
  )
}


EmployerDashboard.propTypes = {
  // user: PropTypes.object.isRequired,
  scrollToTop: PropTypes.func.isRequired
}


export default EmployerDashboard