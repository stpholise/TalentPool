import { useState } from 'react'
import Add from '../assets/carbon_add.svg'
// import Trash from '../assets/carbon_trash-can.svg'
import Edit from '../assets/bytesize_edit.svg'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSocialModal, closeSocialModal, addNewSocial } from './store'

const Social = () => {

    const dispatch = useDispatch(); 
    const  socialModal  = useSelector((state) => state.count.socialModal)
    const social  = useSelector((state) => state.count.social)


    const [ newSocial, setNewSocial ] = useState({ socialLink: '', socialTitle: ''})
    
    const [ editIndex, setEditIndex] = useState(null)

    const handleInputChange = (e) => {
        const { name, value} = e.target;
        setNewSocial({...newSocial, [name] : value });
        
    }

    const addSocial = ( e) => {
        e.preventDefault();
        console.log(social)
        if (newSocial.socialLink === '' || newSocial.socialTitle === '') return;
        if ( editIndex !== null){
            //update the social accoutn
            const updatedSocial = [...social]
            updatedSocial[editIndex] = newSocial;
            dispatch(addNewSocial(updatedSocial));
            setEditIndex(null); // Reset editIndex
        }
        else{
            dispatch(addNewSocial([...social, newSocial]));
        }
        setNewSocial({ socialLink: '', socialTitle: ''})
        dispatch(closeSocialModal())
        
    } 

    const handleSocialModal = () => {
        
      dispatch(toggleSocialModal())
    }

 
    const closeAll = () => {
        setNewSocial({ socialLink: '', socialTitle: ''})
        dispatch(closeSocialModal())
    }

    const editSocial = (index) => {
        setNewSocial(social[index]);
        setEditIndex(index);
        dispatch(toggleSocialModal())

    }

    

  return (
    <div className='radius5px padd1 bgF mb1'>
        <div className="topFles spaceBet ">
            <h4 className='subHead'>Social accounts</h4>
            <button className="skillModalBtn btn" onClick={handleSocialModal}><img src={Add} alt="" /></button>

        </div>
        <ul className="skills">
            {social.map((social, index) => (
                <li key={index} className='skillBox spaceBet'>
                    <div className="skillTitle">
                        {social.skillChecked ? <input type="checkbox" checked /> : <input type="checkbox" />}
                        <p>{social.socialTitle}</p>
                    </div>
                    <div className="edit">
                        <button className="skillDelete" onClick={() => editSocial(index)}>
                        <img src={Edit} alt="Edit buttton" style={{width:'18px'}} />
                        </button>
                    </div>
                    
                </li>
            ))}
        </ul>

        {socialModal && (
            <>
                <div className="overlay" onClick={closeAll}></div>
            <div className='skillModal modal bgF radius5px padd1 lightShad'>
                
                <form onSubmit={addSocial}>
                    <h4>Add Skill</h4>
                    <h5>Select plaform</h5>
                    <select name='socialTitle'
                        id='socialLink'
                        value={newSocial.socialTitle} 
                        onChange={handleInputChange}
                        className='radius5px'
                     >
                        <option className='option'  value="">Select</option>
                        {social.map((social, index) => (
                            <option key={index} className='option'  value={social.socialTitle}>{social.socialTitle}</option>
                        ))}
                    </select>

                    <input 
                        name="socialTitle"
                        type="text" 
                        placeholder={newSocial.socialTitle}
                        value={newSocial.socialTitle}
                        onChange={handleInputChange}
                         className='radius5px'
                    />

                    <h5>Account link</h5>
                     <input type="text" 
                        name="socialLink"
                        placeholder="Add link"
                        value={newSocial.socialLink}
                        onChange={handleInputChange}
                        className='radius5px'
                    /> 
                    <button type='submit' className="skillModalBtn blueBg radius5px btn addSkillBtn">Add</button>
                </form>
            </div>
            
            </>
        )}
    </div>
  )
}

export default Social