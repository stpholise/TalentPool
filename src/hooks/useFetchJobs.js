import { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'

const useFetchJobs = ({filter,  searchValue ='a',pageNumber, isFetchTriggered, setIsFetchTriggered }) => {
  
  const [ jobs, setJobs ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false) 
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ count, setCount ] = useState(0)

  console.log(count)
console.log(filter)
 
  useEffect(() => {

    setIsLoading(true)
    setErrorMessage('')
    const getJobs = async () => {
      const settings = {
        method:'GET',
        headers: {
          Accept: 'application/json',
        },
      }
      const { country = { value: 'gb' }, salaryMin = 0, salaryMax = 0, selected = [], jobType, jobClassification,   }  = filter || {}
      const countryCode = country.value ?? 'gb'
      const search = encodeURIComponent(searchValue || '')
      const skills = encodeURIComponent(selected.join('') ||'')
      const correntPage = pageNumber ?? '1'

// Construct the query string for jobType
const handleJobType = (jobType) => {
  if (!jobType) return ''; // No job type, return empty string
  switch (jobType) {
    case 'permanent':
      return '&permanent=1';
    case 'contract':
      return '&contract=1';
    default:
      return '';
  }
}

// Construct the query string for jobClassification
const handleJobClass = (jobClassification) => {
  if (!jobClassification) return ''; // No job classification, return empty string
  switch (jobClassification) {
    case 'full_time':
      return '&full_time=1';
    case 'part_time':
      return '&part_time=1';
    default:
      return '';
  }
}

const handleMaxSalary = (salaryMax, salaryMin)  =>{
  if (salaryMax == 0) return ''; // No job classification, return empty string
  if (salaryMax <= salaryMin) return ''; 

  return `&salary_max=${salaryMax}`;
}

      const maxSalary = handleMaxSalary(salaryMax, salaryMin)

      const occupationType = handleJobType(jobType)
      const jobClass = handleJobClass(jobClassification)
   
      const url =`https://api.adzuna.com/v1/api/jobs/${countryCode}/search/${correntPage}?app_id=22886062&app_key=eed206437ecfaae0d5146924f8038553&results_per_page=20&what_phrase=${search}&what_or=${skills}&max_days_old=50&salary_min=${salaryMin}${maxSalary}${jobClass}${occupationType}`
        try{
          const response = await fetch(url, settings);
          const data = await response.json()
          setJobs(data.results)
          console.log(data)
          console.log(url)
          setIsLoading(false)
          setCount(data.count)
          if (!response.ok) {
            throw new Error(`Failed to fetch jobs : ${response.status}`);
          }
          setIsFetchTriggered(false)
          
        }
        catch (error ){
          const { doc, display, exception} = error
          console.log(doc, exception)
          console.log(error)
          setErrorMessage(display )
          setIsLoading(false)
          setIsFetchTriggered(false)
        }
        console.log(isFetchTriggered)
      
  }
    getJobs()
  }, [filter, pageNumber, searchValue, isFetchTriggered, setIsFetchTriggered])

  return { 
    jobs,
    isLoading,
    errorMessage,
    count,
  }

}

useFetchJobs.propTypes = { 
  pageNumber: PropTypes.number,
  country: PropTypes.object.isRequired,
  searchValue: PropTypes.string,
  skills: PropTypes.array,
}




export default useFetchJobs