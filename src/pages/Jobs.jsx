import '../styling/Jobs.css'
import Filter from "../Components/Filter"
import JobCard from "../Components/JobCard"
import Search from "../Components/Search"
import Spinner from "../Components/Spinner"

import useFetchJobs from '../hooks/useFetchJobs'


import {  useState, } from 'react'

import { PropTypes } from 'prop-types'

const Jobs = () => {
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ country, setCountry] = useState({ value: 'gb', label: 'Great Breatean'}); // Initialize with the first country in the list
  const [ selected, setSelected ] = useState([])
  const [ isVisible, setIsVisible ] = useState(false)
  const [ searchValue, setSearchValue ] = useState('')
  const [isFetchTriggered, setIsFetchTriggered] = useState(false)
  const { errorMessage, isLoading, jobs } =  useFetchJobs({ pageNumber , country,  searchValue, selected, isFetchTriggered, setIsFetchTriggered})

  console.log(jobs)
  console.log(isLoading)
  console.log(errorMessage)
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

 
  
  const handleTimeDifference = (created) => {
    const today = new Date() ;
    const createdAt = new Date(created) 
    const timeDifference = today.getTime() - createdAt.getTime()
    const daysDifference = Math.floor(timeDifference/(1000 * 60 * 60 * 24))
    return daysDifference
}


  return (
    <>
      <main className='dashboard'> 
        <div className="jobs ">
            <Filter 
                isVisible={isVisible}  
                setIsVisible={setIsVisible}
                setCountry={setCountry} 
                country={country}
                selected={selected}
                setSelected={setSelected} 
                setIsFetchTriggered={setIsFetchTriggered}
            />
            <div className="cardContainer">
              <Search 
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setIsFetchTriggered={setIsFetchTriggered}
              />
              {
                isLoading  && <Spinner />
              }
              {
                errorMessage && <div>{errorMessage}</div>
              }

              { !isLoading &&
                jobs.map((job) =>{ 
                   const {id, title, company, location, category, created, redirect_url} = job
                  
                   const daysDifference = handleTimeDifference(created)
                   
                 return (
                  <div  key={id} className="jobDetails">
                     <JobCard 
                        title={title} 
                        company={company.display_name} 
                        location={location.area}
                        category={category.label}
                        postedAt={daysDifference}
                        redirectUrl={redirect_url}
                        id={id}
                      /> 
                    
                  </div>
                )})
              }
            </div>
        </div>
       
       <section className="select">
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