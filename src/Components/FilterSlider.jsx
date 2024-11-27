import Slider from 'rc-slider'

const FilterSlider = () => {
  return (
    <div className='sliderContainer'>
        <Slider
            min={0} 
            max={100}
        />
    </div>
  )
}

export default FilterSlider