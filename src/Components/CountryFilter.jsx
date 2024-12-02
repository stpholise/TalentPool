import Select from 'react-select'
// import { useState } from 'react'
import { PropTypes } from 'prop-types'

const CountryFilter = ({ countryList, setCountry, country }) => {
   
      const handleCountryChange = (option) => {
        if(!option) return
        if(typeof option === 'object') {
          setCountry(option) 
        }};
       

  return (
    <div>
        <Select
            options={countryList}
            onChange={handleCountryChange}
            value={country}
        />
    </div>
  )
}

CountryFilter.propTypes = {
  countryList: PropTypes.arrayOf(
   
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
    setCountry: PropTypes.func.isRequired,
    country: PropTypes.object.isRequired,
}

export default CountryFilter