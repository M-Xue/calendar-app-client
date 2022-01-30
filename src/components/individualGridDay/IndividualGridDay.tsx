import './individualGridDay.css';


import { motion, AnimatePresence } from 'framer-motion';
//import { useState } from 'react';
import EventDetailsModal from '../../components/eventDetailsModal/EventDetailsModal';
import CreateEventModal from '../createEventModal/CreateEventModal';
import { useState } from 'react';



import classNames from "classnames";
import {
	isWeekendDay,
} from "../calendar/helpers";



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


const IndividualGridDay: React.FC<Props> = ({ day }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);

    return (
        <>

            <motion.div
                key={day.dateString}
                className={classNames("day-grid-item-container", "modalButton",
                
                {
                    "weekend-day": isWeekendDay(day.dateString),
                    "current-month": day.isCurrentMonth
                })}

                onClick={ () => (
                    modalOpen ? close(): open()
                )}
            >

                <div className="day-grid-item-header">
                    {day.dayOfMonth}
                </div>
                
            </motion.div>
            
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {/* { modalOpen && <EventDetailsModal handleClose={close} day={day}/> } */}
                { modalOpen && <CreateEventModal handleClose={close} day={day}/> }

            </AnimatePresence>

        </>
    )
}


export default IndividualGridDay;













            // Original??
            {/* <div
                key={day.dateString}
                className={classNames("day-grid-item-container", {
                    "weekend-day": isWeekendDay(day.dateString),
                    "current-month": day.isCurrentMonth
                })}
            >

                <motion.div
                    className='modalButton day-content-wrapper'
                    onClick={ () => (
                        modalOpen ? close(): open()
                    )}
                >
                    <div className="day-grid-item-header">
                        {day.dayOfMonth}
                    </div>
                </motion.div>


                <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                >
                    { modalOpen && <EventDetailsModal handleClose={close} day={day}/> }
                </AnimatePresence>

            </div> */}


// New
{/* <motion.div
                key={day.dateString}
                className={classNames("day-grid-item-container", "modalButton",
                
                {
                    "weekend-day": isWeekendDay(day.dateString),
                    "current-month": day.isCurrentMonth
                })}

                onClick={ () => (
                    modalOpen ? close(): open()
                )}
            >

                <div className="day-grid-item-header">
                    {day.dayOfMonth}
                </div>
                
            </motion.div>
            
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                { modalOpen && <EventDetailsModal handleClose={close} day={day}/> }
            </AnimatePresence> */}






            // Version 2 new that we dont need
{/* <motion.div
                key={day.dateString}
                className={classNames("day-grid-item-container", {
                    "weekend-day": isWeekendDay(day.dateString),
                    "current-month": day.isCurrentMonth
                })}
                
                onClick={ () => (
                    modalOpen ? close(): open()
                )}
            >

                <div
                    className='modalButton day-content-wrapper'
                >
                    <div className="day-grid-item-header">
                        {day.dayOfMonth}
                    </div>
                </div>
            </motion.div>

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                { modalOpen && <EventDetailsModal handleClose={close} day={day}/> }
            </AnimatePresence> */}



{/* <div className="day-content-wrapper">
    <div className="day-grid-item-header">
        {day.dayOfMonth}

        <motion.button
            className='modalButton'
            onClick={ () => (
                modalOpen ? close(): open()
            )}
        >
            Launch Modal
        </motion.button>


        <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
        >
            { modalOpen && <EventDetailsModal handleClose={close} /> }
        </AnimatePresence>

    </div>
</div> */}



            // <motion.button
            //     className='modalButton'
            //     onClick={ () => (
            //         modalOpen ? close(): open()
            //     )}
            // >
            //     Launch Modal
            // </motion.button>





            // <AnimatePresence
            //     initial={false}
            //     exitBeforeEnter={true}
            //     onExitComplete={() => null}
            // >
            //     { modalOpen && <EventDetailsModal modalOpen={modalOpen} handleClose={close} /> }
            // </AnimatePresence>




            // <div
            //     key={day.dateString}
            //     className={classNames("day-grid-item-container", {
            //         "weekend-day": isWeekendDay(day.dateString),
            //         "current-month": day.isCurrentMonth
            //     })}
            // >
            //     <div className="day-content-wrapper">
            //         <div className="day-grid-item-header">
            //             {day.dayOfMonth}
            //         </div>
            //     </div>
            // </div>



            // <AnimatePresence
            //     initial={false}
            //     exitBeforeEnter={true}
            //     onExitComplete={() => null}
            // >
            //     { modalOpen && <EventDetailsModal modalOpen={modalOpen} handleClose={close} /> }
            // </AnimatePresence>

            