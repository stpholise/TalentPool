
import SearchIcon from '../assets/Search_duotone_line.svg'
import FilterIcon from '../assets/Filter.svg'

import { modalIsOpen,  } from '../store/AppSlice'
import { useDispatch } from 'react-redux'
import { PropTypes } from 'prop-types'
import { useState } from 'react'


const Search = ({ setIsVisible, isVisible, setSearchValue, setIsFetchTriggered }) => {

  const dispatch = useDispatch()

  const [ searchText, setSearchText ] = useState('')
  


  const debounce = (func, delay = 300) => {
    let debounceTimer
    return function() {
      const context = this
      const args = arguments
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchValue(value)
    setIsFetchTriggered(true)
  }

  const toggleFilter = () => {
    setIsVisible(!isVisible)
    dispatch(modalIsOpen(true))

  }
  {   isVisible ? document.body.classList.add('modalIsOpen') : document.body.classList.remove('modalIsOpen');  }

  // const debounceSearch = debounce(handleSearch(e), 800)

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
  }

  return (
    
      
        <div className='jobSearchBar redius5px'>
          <img src={SearchIcon} alt="SearchIcon" className="searchIcon"/>
          <input 
              type="text" 
              name='search'
              onKeyUp={debounce(handleSearch, 1500)}
              value={searchText}
              onChange={handleSearchText}
              className='searchbox'
          />
          <button type='button' onClick={toggleFilter}>
            <img src={FilterIcon} alt="FilterIcon" className="filterIcon"/>
          </button>
          {
            isVisible && 
            <>
              <div className="overlay"></div>
            </>
          }
          
        </div>
    
  )
}

Search.propTypes = { 
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  setIsFetchTriggered: PropTypes.func.isRequired,
}

export default Search