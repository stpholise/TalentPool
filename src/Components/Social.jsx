import { useState } from 'react'
import Add from '../assets/carbon_add.svg'
import Edit from '../assets/bytesize_edit.svg'
import { useDispatch, useSelector } from 'react-redux'
import { addNewSocial } from '../store/UserSlice'
import { v4 as uuidv4 } from 'uuid'
import { modalIsOpen, modalIsClose } from '../store/AppSlice'
import Close from '../assets/close.svg' 

const Social = () => {
    const uniqueId = uuidv4();
    const dispatch = useDispatch(); 
    const [ editId, setEditId] = useState(null)
    const [socialModal, setSocialModal] = useState(false)
    const [ newSocial, setNewSocial ] = useState({ socialLink: '', socialTitle: ''})
    const social  = useSelector((state) => state.users.social)

    const handleSocialModal = () => {
        setSocialModal(!socialModal)
        socialModal ? dispatch(modalIsClose(false)) : dispatch(modalIsOpen(true));
    }
    const closeSocialModal = () => {
        setSocialModal(false)
        setNewSocial({ socialLink: '', socialTitle: ''})
        dispatch(modalIsClose(false))   
    }
    const handleInputChange = (e) => {
        const { name, value} = e.target;
        setNewSocial({...newSocial, [name] : value }); 
    }
    const addSocial = ( e) => {
        e.preventDefault();
        if (newSocial.socialLink === '' || newSocial.socialTitle === '') return;
        if ( editId !== null){
            //update the social accoutn
           const updatedSocial = social.map((social) => social.id === editId ? newSocial : social)
           
            dispatch(addNewSocial(updatedSocial));
            setEditId(null); // Reset editIndex
        }
        else{
            const newSocialId = { ...newSocial, id: uniqueId }
            dispatch(addNewSocial([...social, newSocialId]));
            console.log(newSocialId)
        }
        closeSocialModal()
    } 

    const editSocial = (id) => {
        const selectedSocial = social.find((social) => social.id === id);
        setNewSocial(selectedSocial);
        setEditId(id);
        handleSocialModal()
    }

  return (
    <div className='radius5px padd1 bgF mb1'>
        <div className="topFles spaceBet ">
            <h4 className='subHead'>Social accounts</h4>
            <button className="skillModalBtn btn" onClick={handleSocialModal}><img src={Add} alt="" /></button>

        </div>
        <ul className="skills">
            {social.map((social) => (
                <li key={social.id} className='skillBox spaceBet'>
                    <div className="skillTitle">
                        {social.skillChecked ? <input type="checkbox" checked /> : <input type="checkbox" />}
                        <p>{social.socialTitle}</p>
                    </div>
                    <div className="edit">
                        <button className="skillDelete" onClick={() => editSocial(social.id)}>
                        <img src={Edit} alt="Edit buttton" style={{width:'18px'}} />
                        </button>
                    </div>
                    
                </li>
            ))}
        </ul>

        {socialModal && (
            <>
                <div className="overlay"></div>
                <div className='skillModal modal bgF radius5px padd1 lightShad'>
                <form onSubmit={addSocial}>
                <div className="topFles spaceBet ">
                    <h4 className='subHead'>Social accounts</h4>
                    <button className="skillModalBtn btn" onClick={closeSocialModal}><img src={Close} alt="" /></button>
                </div>
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