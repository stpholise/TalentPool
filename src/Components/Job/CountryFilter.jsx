import Select from 'react-select' 
import { PropTypes } from 'prop-types'

const CountryFilter = ({ countryList, setCountry, country, isClearable, setIsClearable }) => {
   
      const handleCountryChange = (option) => {
        if(!option) return
        if(typeof option === 'object') {
          setCountry(option) 
        }
        if(isClearable.includes(option)){
          setIsClearable(isClearable.filter(skill => skill !== option))
        } else {
            setIsClearable([...isClearable, option])
        }
      };
       

  return (
    <div>
        <Select
            options={countryList}
            onChange={handleCountryChange}
            value={country}
            menuPlacement="top"
            styles={{
              control: (baseStyles,  ) => ({
                ...baseStyles,
                borderColor:  '#ccc',
                border:  '1px solid #ccc' ,
                outline: 'none',
                boxShadow: 'none',
                ':focus': {
                  borderColor: '#ccc', // Keep the gray border even on focus
                  boxShadow: 'none', // Remove box-shadow on focus
                },
                ':hover': {
                  borderColor: '#ccc', // Keep the gray border even on hover
                }
              }),  
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused 
                  ? '#E1F0FF' 
                  : state.isSelected
                  ? '#0A84FF'
                  : '#fff',
                color: state.isFocused ? '#fff' 
                  : state.isSelected 
                  ? '#fff'
                  : '#000',
                cursor: 'pointer',
              }),
              valueContainer: (baseStyles) => ({
                ...baseStyles,
                border: 'none',
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: '#333',
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#eee',
                primary: '#0A84FF',
              },
            })}
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
    isClearable: PropTypes.array, 
    setIsClearable: PropTypes.func
}

export default CountryFilter