 import { PropTypes } from 'prop-types'
import DefaultComapny from '../assets/company-svgrepo-com.svg'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setJob } from '../store/JobSlice'

const JobCard = ({  title,   company,   location,   category,  postedAt,   job, id,}) => {

  const dispatch = useDispatch()
  
  const handleJobClick = () => {
    dispatch(setJob(job))
   
  }

  return (
    <>
                <div className='imageDetail'>
                    <img src={DefaultComapny} style={{width:'100%'}}  alt="" />
                </div>
                <div className='textDetail'>
                    <Link 
                        to={`/jobs/${id}`}   
                        state={{ job, postedAt }} 
                        onClick={handleJobClick}                     
                    >
                      <h4 className='jobTitle'>{title}</h4>
                    </Link>
                    <h5 className='companyName'>{company}</h5>
                    <p>{location.join(', ')}</p>
                    <p>{category}</p>
                    <p className='postDate'>{postedAt < 1 ? '' : postedAt} day&lsquo;s ago </p> 
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
    job: PropTypes.object.isRequired,

}

export default JobCard