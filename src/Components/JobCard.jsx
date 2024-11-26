 import { PropTypes } from 'prop-types'

const JobCard = ({title, company, location, skills,}) => {
  return (
    <>
        
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <h4>{title}</h4>
                    <p>{company}</p>
                    <p>{location}</p>
                    <p>{skills.join(", ")}</p>
                </div>
         
    </>
  )
}

JobCard.propTypes = {
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    skills: PropTypes.array.isRequired,
    experience: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired
}

export default JobCard