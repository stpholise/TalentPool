
import DefaultComapny from '../../assets/company-svgrepo-com.svg'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setJob } from '../../store/JobSlice'

interface Company { 
  display_name: string;
}

interface Job{
  title: string;
  id: string;
  category?: {
    label: string;
  }
  location?: {
    area: string[];
  };
  company: Company;
  redirect_url?: string;
  created: string;
  description?: string;
  salary_min?: number;
  salary_max?: number;
  contract_type?: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({job} ) => {

  const dispatch = useDispatch()
  
  const  { 
    title,  
    id, 
    category, 
    location, 
    company, 
    redirect_url, 
    created, 
    description,
    salary_min,
    salary_max,
    contract_type,
   } = job
  
  const handleTimeDifference = (created: string) => {
    const today = new Date() ;
    const createdAt = new Date(created) 
    const timeDifference = today.getTime() - createdAt.getTime()
    const daysDifference = Math.floor(timeDifference/(1000 * 60 * 60 * 24))
    return daysDifference
  }
  const daysDifference = handleTimeDifference(created)
  const handleJobClick = () => {
    dispatch(setJob( { title,  
      id, 
      category, 
      location, 
      company, 
      redirect_url, 
      description,
      salary_min,
      salary_max,
      contract_type,
      created,
    } ))
  }

 
  return (
    <>
                <div className='imageDetail'>
                    <img src={DefaultComapny} className="w-full" alt="" />
                </div>
                <div className='textDetail'>
                    <Link 
                        to={`/jobs/${id}`}   
                        state={{ job }} 
                        onClick={handleJobClick}                     
                    >
                      <h4 className='jobTitle'>{title}</h4>
                    </Link>
                    <h5 className='companyName'>{company.display_name}</h5>
                    <p>{location?.area.join(', ')}</p>
                    <p>{category?.label}</p>
                    <p className='postDate'>{daysDifference < 1 ? '' : daysDifference} day&lsquo;s ago </p> 
                </div>
    </>
  )
}


export default JobCard