 import { PropTypes } from 'prop-types'

const JobCard = ({title, company, location, category, redirectUrl, postedAt, }) => {
  return (
    <>
        
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <a href={redirectUrl}><h4 className='jobTitle'>{title}</h4></a>
                    <h5 className='companyName'>{company}</h5>
                    <p>{location.join(', ')}</p>
                    <p>{category}</p>
                    <p>{postedAt < 1 ? '' : postedAt}</p> 
                </div>
         
    </>
  )
}

JobCard.propTypes = {
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    redirectUrl: PropTypes.string.isRequired,
    postedAt: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    
}

export default JobCard