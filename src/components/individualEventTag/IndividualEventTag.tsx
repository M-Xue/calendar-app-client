import './individualEventTag.css';


import { motion, AnimatePresence } from 'framer-motion';
import EventDetailsModal from '../../components/eventDetailsModal/EventDetailsModal';
import CreateEventModal from '../createEventModal/CreateEventModal';
import { useState } from 'react';



interface Props {
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

const IndividualEventTag: React.FC<Props> = ({ day, eventDetails }) => { 
    
    
    

    const [modalOpen, setModalOpen] = useState(false);
    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);
    
    return (
        <div>
            <motion.div 
                className="eventTagContainer"
                onClick={ () => (
                    modalOpen ? close(): open()
                )}
            >

                <div className="eventTagTitle">
                    {eventDetails.title}
                </div>

            </motion.div>
            

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                
                { modalOpen && <EventDetailsModal handleClose={close} day={day} eventDetails={eventDetails}/> }

            </AnimatePresence>



            
            

            


            
        </div>
    )
}





export default IndividualEventTag;







