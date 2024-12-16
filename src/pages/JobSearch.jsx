import '../styling/Jobs.css'
import Filter from "../Components/Job/Filter"
import JobCard from "../Components/Job/JobCard"
import Search from "../Components/Search"
import Spinner from "../Components/Spinner"
import useFetchJobs from '../hooks/useFetchJobs'
import { v4 as uuidv4 } from 'uuid'

import {  useState, useEffect   } from 'react'
import  Pagination from '../Components/Job/Pagination'

  

const JobSearch = () => {
 
  const [ filter, setFilter ] = useState(null)
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ isVisible, setIsVisible ] = useState(false)
  const [ searchValue, setSearchValue ] = useState('')
  const [isFetchTriggered, setIsFetchTriggered] = useState(false)
  const { errorMessage, isLoading, jobs, count } =  useFetchJobs({filter, setFilter, searchValue, pageNumber, isFetchTriggered, setIsFetchTriggered, 
  
  })
  

  useEffect(() => { 
    if(window.innerWidth > 768) {
      window.scrollTo({ top: 0 });
    }
  } , [pageNumber])

  const totalPages = Math.ceil(count / 10); // Total number of pages
  
  
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
                setPageNumber={setPageNumber}
                 

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
               (!isLoading && count == 0) && <p className='error' style={{ margin:'auto'}}>No Job Found </p>
              }

              { !isLoading &&
                jobs.map((job) =>{ 
                   const uniqueId = uuidv4() 
                 return (
                  <div  key={uniqueId} className="jobDetails">
                     <JobCard 
                        job={job}
                      /> 
                    
                  </div>
                )})
              }

              { (count > 20 && !isLoading) &&   <Pagination totalpages={totalPages}  pageNumber={pageNumber}  setPageNumber={setPageNumber} /> }
            </div>
 
        </div>

       <section className="select">
       </section>


        </main>
    </>
  )
}



export default JobSearch