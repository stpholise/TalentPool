
import SearchIcon from '../assets/Search_duotone_line.svg'
import FilterIcon from '../assets/Filter.svg'
import Filter from './Filter'
import { useState } from 'react'
import { modalIsOpen, modalIsClose } from '../store/AppSlice'
import { useDispatch } from 'react-redux'

const Search = () => {
  const dispatch = useDispatch()

  const [ isVisible, setIsVisible ] = useState(false)

  const toggleFilter = () => {
    setIsVisible(!isVisible)
    dispatch(modalIsOpen(true))
  }

  const collapseFilter = () => {
    setIsVisible(false)
    dispatch(modalIsClose(false))    
  }

  return (
    <div className='jobSearchBar redius5px'>
      <img src={SearchIcon} alt="SearchIcon" className="searchIcon"/>
      <input type="search"/>
      <button onClick={toggleFilter}>
        <img src={FilterIcon} alt="FilterIcon" className="filterIcon"/>
      </button>

       {
        isVisible && 
        <>
          <div className="overlay" onClick={collapseFilter}></div>
          <Filter isVisible={isVisible} />
        </>
       }
      
    </div>
  )
}

export default Search