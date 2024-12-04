import '../styling/Jobs.css'
import Filter from "../Components/Filter"
import JobCard from "../Components/JobCard"
import Search from "../Components/Search"
import Spinner from "../Components/Spinner"

import useFetchJobs from '../hooks/useFetchJobs'


import {  useState,   } from 'react'


  

const Jobs = () => {
  const [ pageNumber, setPageNumber ] = useState(1)
   // Initialize with the first country in the list

   const debounce = (func, delay = 300) => {
    let debounceTimer
    return function() {
      const context = this
      const args = arguments
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
  }
   const [ filter, setFilter ] = useState(null)
  const [ isVisible, setIsVisible ] = useState(false)
  const [ searchValue, setSearchValue ] = useState('')
  const [isFetchTriggered, setIsFetchTriggered] = useState(false)
  const { errorMessage, isLoading, jobs, count } =  useFetchJobs({filter, setFilter, searchValue, pageNumber, isFetchTriggered, setIsFetchTriggered})

// useEffect(() => {setSearchValue('')} , [isVisible])
const totalPages = Math.ceil(count / 20); // Total number of pages
  const showMore = debounce(()=> { 
    setPageNumber((previousPage) => previousPage +1)
  },3000)
  const showLess = debounce( () => {
    setPageNumber((previousPage) => {
      if (previousPage === 1) return previousPage; // Prevent going below page 1
      return previousPage - 1; // Decrease page by 1
    });
  }, 3000)
  console.log(totalPages)
  
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
                setFilter={setFilter} 
                filter={filter}
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
                errorMessage && <div className='error'>{errorMessage}</div>
              }

              {
               (!isLoading && count == 0) && <p>no item matches </p>
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
                        location={location?.area || 'Unknown Location'}
                        category={category?.label || 'No Category'}
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
       <button type='button' disabled={pageNumber === 1} onClick={showLess}>less</button>
       <button type='button' onClick={showMore}>more</button>
        </main>
    </>
  )
}



export default Jobs