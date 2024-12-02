import { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'

const useFetchJobs = ({pageNumber = 1, country = 'gb',  searchValue ='a', selected = [], isFetchTriggered, setIsFetchTriggered }) => {
  
  const [ jobs, setJobs ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false) 
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ count, setCount ] = useState(0)
  console.log(count)
  console.log(jobs)
 
  useEffect(() => {

      if(!isFetchTriggered) return

    setIsLoading(true)
    setErrorMessage('')
    const getJobs = async () => {
      const settings = {
        method:'GET',
        headers: {
          Accept: 'application/json',
        },
      }


      const countryCode = country.value ?? 'gb'
      const search = encodeURIComponent(searchValue || '')
      const skills = encodeURIComponent(selected.join('') ||'')
      const correntPage = pageNumber ?? '1'
      const url = `https://api.adzuna.com/v1/api/jobs/${countryCode}/search/${correntPage}?app_id=22886062&app_key=eed206437ecfaae0d5146924f8038553&results_per_page=20&what_phrase=${search}&what_or=${skills}&max_days_old=50`
     



        try{
          const response = await fetch(url, settings);
          const data = await response.json()
          setJobs(data.results)
          console.log(data)
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
  }, [searchValue, isFetchTriggered ])

  return { 
    jobs,
    isLoading,
    errorMessage,
  }

}

useFetchJobs.propTypes = { 
  pageNumber: PropTypes.number,
  country: PropTypes.object.isRequired,
  searchValue: PropTypes.string,
  skills: PropTypes.array,
}




export default useFetchJobs