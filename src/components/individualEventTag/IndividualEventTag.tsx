import './individualEventTag.css';


import { motion, AnimatePresence } from 'framer-motion';
import EventDetailsModal from '../../components/eventDetailsModal/EventDetailsModal';
import CreateEventModal from '../createEventModal/CreateEventModal';
import { useState } from 'react';



interface Props {
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

const IndividualEventTag: React.FC<Props> = ({ day }) => { 
    
    const eventDetails = {
        eventName: "Movie Eventffffff",
        date: "10th Feb",
        host: "Max",
        location: "123 Apple Street Petersham 2000"
    }
    

    const [modalOpen, setModalOpen] = useState(false);
    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);
    
    return (
        <>
            <motion.div 
                className="eventTagContainer"
                onClick={ () => (
                    modalOpen ? close(): open()
                )}
            >

                

                <div className="eventTagTitle">
                    {eventDetails.eventName}
                </div>

            </motion.div>
            

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                
                { modalOpen && <EventDetailsModal handleClose={close} day={day}/> }

            </AnimatePresence>



            
            

            


            
        </>
    )
}





export default IndividualEventTag;







