import './eventDetailsModal.css';
import { motion } from 'framer-motion';
import Backdrop from '../backdrop/Backdrop';

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
    day: day,
    eventDetails: eventDetails
}

// Need to create a second interface for an object.
interface day {
    dateString: string,
    dayOfMonth: number,
    isCurrentMonth: boolean,
    isNextMonth?: boolean,
    isPreviousMonth?: boolean
}

interface eventDetails {
    title: string,
    time: string,
    host: string,
    location: string,
    description: string
}


const EventDetailsModal: React.FC<Props> = ({ handleClose, day, eventDetails }) => {


    const testEventDetailsObject ={
        eventName: '21st Birthday',
        host: 'Bob',
        address: '123 Peter Street, Burwood NSW 2123, Australia',
        description: 'Yeet sdfegjsdp;ofgj; sdfjgosdfhjgo sdhfgio shdfgiuhs doflighsdifg hsoidfhg oisdfhgoi sdfhgoi sdhfgoihsdfoi ghsdoifg hsdoifghs doihfgoiusdfhg oiusdfhgoi usdh',
    }

    return (
        <>
            <Backdrop 
                onClick={ handleClose }
            >
                <motion.div 
                    onClick={ (e) => e.stopPropagation() }
                    className='modal'
                    variants={ dropIn }
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >

                    <div className="eventDetailModalContent">
                        
                        
                        <i className="fas fa-times closeModalCrossButton" onClick={handleClose}></i>
                        
                        
                        <h1 className='eventTitle'>{eventDetails.title}</h1>

                        <div className="modalFlexboxContainer">

                            <div className="eventDetails">
                                <div className="dateAndTimeModalInfo">
                                    <div className="date"> 
                                        <i className="far fa-calendar"></i>
                                        {day.dateString} 
                                    </div>
                                    <div className="time">
                                        <i className="far fa-clock"></i>
                                        {eventDetails.time}
                                    </div>
                                </div>
                                <div className="hostInfo">
                                    <i className="far fa-user"></i>
                                    Hosted by&nbsp; <span className='hostUsername'> {eventDetails.host}</span> 
                                    {/* need that &nbsp; because the span wont have a normal space character before it otherwise. */}
                                </div>
                                <div className="address">
                                    <i className="fas fa-map-marker-alt"></i>
                                    {eventDetails.location}
                                </div>
                                <div className="descriptionInfo">
                                    <i className="fas fa-align-left fa-flip-vertical"></i>
                                    {eventDetails.description}
                                </div>
                            </div>
                            
                            <div className="groupDetailsEventDetailsModal">
                                
                                <div className="availabilityNavBar">
                                    <div className="going">Going</div>
                                    <div className="pending">Pending</div>
                                    <div className="cantGo">Can't Go</div>
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

export default EventDetailsModal;


