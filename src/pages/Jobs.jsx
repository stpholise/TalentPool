import '../styling/Jobs.css'
import Filter from "../Components/Filter"
import JobCard from "../Components/JobCard"
import Search from "../Components/Search"
import Spinner from "../Components/Spinner"
// import NextIcon from '../assets/chevron-left'
import ChevronLeft from '../assets/chevron-left.svg'
import ChevronRight from '../assets/chevron-right.svg'
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
  },1000)
  const showLess = debounce( () => {
    setPageNumber((previousPage) => {
      if (previousPage === 1) return previousPage; // Prevent going below page 1
      return previousPage - 1; // Decrease page by 1
    });
  }, 1000)
  
  const handleTimeDifference = (created) => {
    const today = new Date() ;
    const createdAt = new Date(created) 
    const timeDifference = today.getTime() - createdAt.getTime()
    const daysDifference = Math.floor(timeDifference/(1000 * 60 * 60 * 24))
    return daysDifference
}

  // const handlePageNumber = (pageNumber) => {
  //   setPageNumber(pageNumber)
  // }


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
               (!isLoading && count == 0) && <p className='error' style={{ margin:'auto'}}>no item matches </p>
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
{ (count > 20) &&
       <div className="paginationControls">
          <button type='button' disabled={pageNumber === 1} onClick={showLess} aria-label='previous'>
                  <img src={ChevronRight} alt="" />
          </button>
          <span>Page {pageNumber} of {totalPages}</span>
          <button type='button' onClick={showMore} aria-label='next'>
                  <img src={ChevronLeft} alt="" />
          </button>

          {/* {Array.from({ length: totalPages }, (_, index) => index + 1).map((i) => (
        <button
          key={i}
          onClick={() => handlePageNumber(i)}
          style={{ margin: '5px' }}
        >
          {i}
        </button>
      ))} */}
       </div>
       }
        </main>
    </>
  )
}



export default Jobs