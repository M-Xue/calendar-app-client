import './createEventModal.css';
import { motion } from 'framer-motion';
import Backdrop from '../backdrop/Backdrop';
import { useState } from 'react';

// Guide used: https://www.youtube.com/watch?v=SuqU904ZHA4


const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    }, 
    visible: {
        y:0,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 100,
            stiffness: 1000,
        }
    },
    exit: {
        y: "-100vh",
        opacity: 0,
    }
}


interface Props {
    handleClose: () => void,
    day: day
}

// Need to create a second interface for an object.
interface day {
    dateString: string,
    dayOfMonth: number,
    isCurrentMonth: boolean,
    isNextMonth?: boolean,
    isPreviousMonth?: boolean
}


const CreateEventModal: React.FC<Props> = ({ handleClose, day }) => {


    const testEventDetailsObject ={
        eventName: '21st Birthday',
        host: 'Bob',
        address: '123 Peter Street, Burwood NSW 2123, Australia',
        description: 'Yeet sdfegjsdp;ofgj; sdfjgosdfhjgo sdhfgio shdfgiuhs doflighsdifg hsoidfhg oisdfhgoi sdfhgoi sdhfgoihsdfoi ghsdoifg hsdoifghs doihfgoiusdfhg oiusdfhgoi usdh',
    }


    const [eventTitle, setEventTitle] = useState('');
    const [time, setTime] = useState('');
    const [host, setHost] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const newEvent = {
        eventTitle,
        date: day.dateString,
        time,
        host,
        address,
        description,
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        // https://www.youtube.com/watch?v=BYsQE3Nh9IE 
        // This tutorial is great for finding out how to get the correct type for a TypeScript typing.

        e.preventDefault(); // This stops the page from refreshing when you submit, which is the buttons default behaviour
        const newEvent = {
            eventTitle,
            date: day.dateString,
            time,
            host,
            address,
            description,
        }
        console.log(newEvent);
    }



    return (
        <>
            <Backdrop 
                onClick={ handleClose }
            >
                <motion.div 
                    onClick={ (e) => e.stopPropagation() } // TODO maybe this article will help https://github.com/palantir/blueprint/issues/3372
                    className='modal'
                    variants={ dropIn }
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >

                    <div className="eventDetailModalContent">
                        
                        
                        <i className="fas fa-times closeModalCrossButton" onClick={handleClose}></i>
                        

                        <div className="modalFlexboxContainer">
                        
                            <form className="eventDetailForm eventDetails" onSubmit={handleSubmit}>

                                <input 
                                    className="eventTitle eventTitleInput" 
                                    type="text" 
                                    placeholder='Add title'

                                    onChange={e=>setEventTitle(e.target.value)} // Using an event listener to update the state.
                                />


                                <div className="dateAndTimeModalInfo">

                                    <div className="date"> 
                                        <i className="far fa-calendar"></i>
                                        {day.dateString} 
                                    </div>


                                    <div className="time">
                                        <i className="far fa-clock"></i>
                                        <input 
                                            className="timeInput" 
                                            type="text" 
                                            placeholder='Add time'

                                            onChange={e=>setTime(e.target.value)} // Using an event listener to update the state.
                                        />
                                    </div>
                                    
                                </div>



                                <div className="hostInfo">
                                    <i className="far fa-user"></i>
                                    Hosted by&nbsp; <span className='hostUsername'> {testEventDetailsObject.host}</span> 
                                    {/* need that &nbsp; because the span wont have a normal space character before it otherwise. */}
                                </div>



                                <div className="address">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <input 
                                        className="addressInput" 
                                        type="text" 
                                        placeholder='Add address'

                                        onChange={e=>setAddress(e.target.value)} // Using an event listener to update the state.
                                    />
                                </div>



                                <div className="descriptionInfo">
                                    <i className="fas fa-align-left fa-flip-vertical"></i>
                                    {/* <input 
                                        className="descriptionInput" 
                                        type="text" 
                                        placeholder='Add description'

                                        onChange={e=>setDescription(e.target.value)} // Using an event listener to update the state.
                                    /> */}

                                    <textarea 
                                        placeholder='Add description' 
                                        // type='text' 
                                        className='descriptionInput'

                                        onChange={e=>setDescription(e.target.value)} 
                                        // Changes the desc (description) state when the user types something into the input box, which will be send to the backend.
                                    >

                                    </textarea>


                                </div>
                                    






                                    



                                <button className="registerButton" type="submit">Save</button>
                            </form>

                            <div className="groupDetailsCreateEventModal">
                                    
                                <div className="availabilityNavBar">
                                    <div className="members">Members</div>
                                </div>

                                <div className="renderedList"></div>

                            </div>



                        </div>












                    </div>

                </motion.div>

            </Backdrop>
        </>
    )
}

export default CreateEventModal;










{/* <h1 className='eventTitle'>{testEventDetailsObject.eventName}</h1>

<div className="modalFlexboxContainer">

    <div className="eventDetails">
        <div className="dateAndTimeModalInfo">
            <div className="date"> 
                <i className="far fa-calendar"></i>
                {day.dateString} 
            </div>
            <div className="time">
                <i className="far fa-clock"></i>
                2:00PM
            </div>
        </div>
        <div className="hostInfo">
            <i className="far fa-user"></i>
            Hosted by&nbsp; <span className='hostUsername'> {testEventDetailsObject.host}</span> 
            
        </div>
        <div className="address">
            <i className="fas fa-map-marker-alt"></i>
            {testEventDetailsObject.address}
        </div>
        <div className="descriptionInfo">
            <i className="fas fa-align-left fa-flip-vertical"></i>
            {testEventDetailsObject.description}
        </div>
    </div>
    

    <div className="groupDetails">
        
        <div className="availabilityNavBar">
            <div className="members">Members</div>
        </div>

        <div className="renderedList"></div>

    </div>

</div> */}