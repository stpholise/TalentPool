import { useState } from 'react'

import './App.css'

function App() {

  const [checked, setChecked] = useState({})

  const handleChecked  =(e) => {

    setChecked({
      ...checked,
      [e.target.value]: e.target.checked}
    )
    
  }
  
  const checkedItems = [
    {id:1, value:'apple'},
    {id:2, value:'bar'},
    {id:3, value:'car'},
    {id:4, value:'plane'},
    {id:5, value:'house'}
  ]

  const products = {
    apple: 0,
    car: 0,
    house:1
  }

  const {apple, house} = products

  return (
    <>
      

      <form action="">
        {checkedItems.map((item)=>(
          <div key={item.id} className="checkBox">
            <input  
              type="checkbox"
              onChange={handleChecked}
              checked = {checked[item.name]}
              value={item.value}
              id={item.id}
            
            />
            <label htmlFor={item.id}>{item.value}</label>
          </div>
        ))}
      </form>

        <p>{apple} </p>
        <p>{house} </p>
    </>
  )
}

export default App
