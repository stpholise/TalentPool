import { PropTypes } from 'prop-types'
import { useState } from 'react'

const SavedJobsMenu = ({ setOption}) => {
    const [activeOption, setActiveOption] = useState(null);
    const menu = [
        {value: 'saved', label: 'Saved Jobs'}, 
        {value: 'applied', label: 'Applied'},
        {value: 'in_progress', label: 'In Progress'},
        {value: 'archived', label: 'Archived'},
    ]
const handleMenuToggle = (item) => {
  setOption(item.value)
    setActiveOption(item.value)
}

  return (
    <div className='saved-jobs-menu'> 
        {
            menu.map((item, index) => {
                return (
                    <div key={index} className='menu-item'>
                        <button onClick={() =>handleMenuToggle(item)} className={(activeOption === item.value )? 'active' : ''}>{item.label}</button>
                    </div>
                )
            })
        }
    </div>
  )
}

SavedJobsMenu.propTypes = {
    setOption: PropTypes.func.isRequired,
}

export default SavedJobsMenu