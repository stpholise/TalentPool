import '../styling/Jobs.css'
import Filter from "../Components/Filter"
import JobCard from "../Components/JobCard"
import Search from "../Components/Search"

import { useEffect, useState, useCallback } from 'react'

import { PropTypes } from 'prop-types'
import Select from 'react-select'

const Jobs = ({scrollToTop}) => {
  const countryList = [
    { value: 'gb', label: 'Great Breatean '},
    { value: 'at', label: 'Austria'},
    { value: 'au', label: 'Australia'},
    { value: 'be', label: 'Belgium'},
    { value: 'br', label: 'Brazil'},
    { value: 'ca', label: 'Canada'},
    { value: 'es', label: 'Spain'},
  ]

  const [ jobs, setJobs ] = useState([])
  const [ pageNumber, setPageNumber ] = useState(1)
  const [country, setCountry] = useState(countryList[0].value); // Initialize with the first country in the list

  const handleCountryChange = (option) => {
    if(!option) return
    if(typeof option === 'object') {
      setCountry(option.value)
      console.log(option.value)
    }
    };
  
  const getJobs = useCallback(async () => {
      const settings = {
        method:'GET',
        headers: {
          Accept: 'application/json',
        },
      }
      try{
        const response = await fetch(`https://api.adzuna.com/v1/api/jobs/${country}/search/${pageNumber}?app_id=22886062&app_key=eed206437ecfaae0d5146924f8038553&results_per_page=10&sort_by=date`, settings)
        const data = await response.json()
        setJobs(data.results)
     
      }
      catch (error ){
        console.log(error)
      }
  }, [pageNumber, country])


  useEffect(() => {
    getJobs()
  }, [getJobs])

  scrollToTop()

  
const removeJob = async (id) => {
  console.log(id)
  const deletingJob = jobs.filter((job) => job.id !== id)
   console.log(deletingJob)
   setJobs(deletingJob)
}

  const showMore = ()=> { 
    setPageNumber((previousPage) => previousPage +1)
    console.log(pageNumber)
  }
  const showLess = () => {
    console.log(pageNumber)
    setPageNumber((previousPage) => {
      if (previousPage === 1) return previousPage; // Prevent going below page 1
      return previousPage - 1; // Decrease page by 1
    });
  };

  return (
    <>
      <main className='dashboard'> 
        <div className="jobs ">
            <Filter isVisible={false}/>
            <div className="cardContainer">
              <Search />
              { jobs &&
                jobs.map((job) =>{ 
                   const {id, title, company, location, category, created, redirect_url} = job
                   const today = new Date() 
                   const creationDate = new Date(created)
                  
                   const timeDifference = today.getTime() - creationDate.getTime()
                   const daysDifference = Math.floor(timeDifference/(1000 * 60 * 60 * 24))
                   
                 return (
                  <div  key={id} className="jobDetails">
                     <JobCard 
                        title={title} 
                        company={company.display_name} 
                        location={location.area}
                        category={category.label}
                        postedAt={daysDifference}
                        redirectUrl={redirect_url}
                        removeJob={removeJob}
                        id={id}
                      /> 
                    
                  </div>
                )})
              }
            </div>
        </div>
       
       <section className="select">
        <Select
          options={countryList}
          onChange={(option)=> handleCountryChange(option)}
       />
       </section>
       <button type='button' onClick={showLess}>less</button>
       <button type='button' onClick={showMore}>more</button>
        </main>
    </>
  )
}

Jobs.propTypes = {
  scrollToTop: PropTypes.func
}

export default Jobs