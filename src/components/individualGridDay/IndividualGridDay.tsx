import './individualGridDay.css';

import { motion, AnimatePresence } from 'framer-motion';
import EventDetailsModal from '../../components/eventDetailsModal/EventDetailsModal';
import CreateEventModal from '../createEventModal/CreateEventModal';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';

import classNames from "classnames";
import {
	isWeekendDay,
} from "../calendar/helpers";
import IndividualEventTag from '../individualEventTag/IndividualEventTag';


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

    // TODO FETCH ALL EVENTS FOR THE DAY HERE

    const eventDetailsExample = {
        title: "Movie Event (Sing 2)",
        time: "3 PM",
        host: "Max",
        location: "123 Apple Street Petersham 2000",
        description: "Gonna go watch Sing 2"
    }

    const eventDetailsExampleArray = [
        {
            title: "Event 1",
            time: "3 PM",
            host: "Max",
            location: "123 Apple Street Petersham 2000",
            description: "Gonna go watch Sing 2"
        },
        {
            title: "Event 2",
            time: "3 PM",
            host: "Max",
            location: "123 Apple Street Petersham 2000",
            description: "Gonna go watch Sing 2"
        },
        {
            title: "Event 3",
            time: "3 PM",
            host: "Max",
            location: "123 Apple Street Petersham 2000",
            description: "Gonna go watch Sing 2"
        },
        {
            title: "Event 4",
            time: "3 PM",
            host: "Max",
            location: "123 Apple Street Petersham 2000",
            description: "Gonna go watch Sing 2"
        },
        {
            title: "Event 5",
            time: "3 PM",
            host: "Max",
            location: "123 Apple Street Petersham 2000",
            description: "Gonna go watch Sing 2"
        },
        {
            title: "Event 6",
            time: "3 PM",
            host: "Max",
            location: "123 Apple Street Petersham 2000",
            description: "Gonna go watch Sing 2"
        },
        {
            title: "Event 7",
            time: "3 PM",
            host: "Max",
            location: "123 Apple Street Petersham 2000",
            description: "Gonna go watch Sing 2"
        }
    ]

    // Here, we are getting the height of the grid day every time the grid day component is rendered. This will allow us to calculate how many event tags can fit in the grid cell. If we have too many events, we will collapse them into a "X more events" button.
    const dayGridContainer = useRef<HTMLDivElement | null>(null); 
    const dayGridHeader = useRef<HTMLDivElement | null>(null); 
    const eventTagContainer = useRef<HTMLDivElement | null>(null); 

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    const [numFittableTags, setNumFittableTags] = useState(-1);

    const handleResize = () => {
        // console.log("handle resize");
        if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {
            const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));


            // console.log(numTagsInRemainingSpace !== numFittableTags);
            // console.log(numTagsInRemainingSpace);
            // console.log(numFittableTags); 
            
            // THE BUG IS HERE. numFittableTags NEVER RETURNS THE CORRECT STATE IN THE USESTATE HOOK. IT ALAWYS STAYS AT ITS INITIAL VALUE. HENCE THING CONDTION IS BASICALLY PERMA RUNNIG
            if (numTagsInRemainingSpace !== numFittableTags) {
                // console.log("setDimensions");
                setDimensions({
                    height: window.innerHeight,
                    width: window.innerWidth
                });
                window.removeEventListener('resize', handleResize); // You can remove it here becuase when the component is rerendered after the numFittableTags state us updated, the useEffect binding the handler will run again.
            } 
        }        
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => { window.removeEventListener('resize', handleResize) }
    }); 
    // This useEffect needs to run every time setNumFittableTags() is called (i.e., when numFittableTags is updated). Otherwise the event handler will always treat numFittableTags's value as its default initial value, which is -1.

    useLayoutEffect(() => {
        if (numFittableTags === -1) {
            if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {
                const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
                setNumFittableTags(numTagsInRemainingSpace);
            }
        } else {
            if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {
                const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
                // console.log('Run useEffect');
                // console.log(numTagsInRemainingSpace !== numFittableTags);
                // console.log(numTagsInRemainingSpace);
                // console.log(numFittableTags);

                if (numTagsInRemainingSpace !== numFittableTags) {
                    setNumFittableTags(numTagsInRemainingSpace); 
                    // console.log('Run setNumFittableTags');
                } 
            }
        }
        
    }, [dimensions]);

    // Make a second useLayoutEffect hook but this time make the dependency the numFittableTags state. In this hook is where you will update the elements
    // Now that you update numFittableTags every time it needs to change, just change what you render using that state bacause the whole thing needs to rerender every time its updated now.








    // TODO 
    // We now have access to the height of the grid item container, the height of the event tags and the height of the header. We also know that all event tags have a 5px margin.
    // We now just take the height of the grid item container and minus the height of the header to get how much remaining space there is in the container. We then divide the remaining px space by the height of an event tag to see how many events will fit in the remaining space.
    // The exact calculation should be:
        // (dayGridContainer height - dayGridHeader height - 5px) / eventTagContainer height
            // The - 5px is for the margin for the first event tag at the top of the container
    // We then render one less than this amount of tags. The space for the one less tag will be used for a button to open a modal to let us see the remaining events. 
    // The number displayed on this button will be gotten by taking the size of the array of events minus the number of events we actually rendered.
    


    // TODO 
    // Once you render the amount of individual event tags and create the "X more" button, create another modal component and pass in the fetched array with all the events for that day. In the modal, display every event tag, which all are buttons to a eventDetailsModal.
    // Do something like: 
        // if (number of events > however many tags fit) {}
            // for (i = 0; i < (however many tags fit -1); i++) {
                // loop through the events array and render each tag
            // }
            // render the "X more" modal
        // } else {
            // just render all the events availabe because they will fit since number of events <= however many tags fit
        // }


    return (
        <>
            <div
                key={day.dateString}
                ref={dayGridContainer}

                className={classNames("day-grid-item-container", "modalButton",
                
                {
                    "weekend-day": isWeekendDay(day.dateString),
                    "current-month": day.isCurrentMonth
                })}
            >

                <div 
                    className="day-grid-item-header"
                    ref={dayGridHeader}
                >
                    {day.dayOfMonth} | {numFittableTags}
                </div>

                <div 
                    className="indivdualEventTagContainer"
                    ref={eventTagContainer}
                >
                    <IndividualEventTag day={day} eventDetails={eventDetailsExample}/>
                </div>
                
                
                
                
                
                
            </div>
        </>
    )
}


export default IndividualGridDay;






/////////////////////////// good stuff

    // const [dimensions, setDimensions] = useState({
    //     height: window.innerHeight,
    //     width: window.innerWidth
    // })
    
    // const handleResize = () => {
    //     setDimensions({
    //         height: window.innerHeight,
    //         width: window.innerWidth
    //     });
    // }

    // useEffect(() => {
    //     window.addEventListener('resize', handleResize)
    //     return () => { window.removeEventListener('resize', handleResize) }
    // },[]); // Only need this to run once at the intial render of the component



    // const [numFittableTags, setNumFittableTags] = useState(-1);
    // useLayoutEffect(() => {
    //     if (numFittableTags === -1) {
    //         if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {
    //             const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
    //             setNumFittableTags(numTagsInRemainingSpace);
    //         }
    //     } else {

            
    //         if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {
    //             const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
    //             if (numTagsInRemainingSpace !== numFittableTags) {
    //                 setNumFittableTags(numTagsInRemainingSpace);
    //                 console.log('setNumFittableTags');
    //             } 
    //         }
    //     }
    // }, [numFittableTags, dimensions]);







//////////////////////////////



// Third attempt at optimising
// const [dimensions, setDimensions] = useState({
//     height: window.innerHeight,
//     width: window.innerWidth
// })
// const [numFittableTags, setNumFittableTags] = useState(-1);

// const handleResize = () => {

//     if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {


//         const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
//         if (numTagsInRemainingSpace !== numFittableTags) {
//             setDimensions({
//                 height: window.innerHeight,
//                 width: window.innerWidth
//             });
//             console.log("setDimensions");
//         } 
//     }        
// }

// useEffect(() => {
//     window.addEventListener('resize', handleResize)
//     return () => { window.removeEventListener('resize', handleResize) }
// },[]); // Only need this to run once at the intial render of the component


// useLayoutEffect(() => {
//     if (numFittableTags === -1) {
//         if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {
//             const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
//             setNumFittableTags(numTagsInRemainingSpace);
//         }
//     } else {

        
//         if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {
//             const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
//             if (numTagsInRemainingSpace !== numFittableTags) {
//                 setNumFittableTags(numTagsInRemainingSpace);
//                 console.log('setNumFittableTags');
//             } 
//         }
//     }
// }, [numFittableTags, dimensions]);










/// second attempt at opimising
// // useLayoutEffect(() => {
//     //     console.log(dayGridContainer);
//     //     if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {
//     //         console.log(dayGridContainer.current.clientHeight);
//     //         console.log(dayGridHeader.current.clientHeight);
//     //         console.log(eventTagContainer.current.clientHeight);

//     //         const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
//     //         setNumFittableTags(numTagsInRemainingSpace);
//     //         console.log(numTagsInRemainingSpace);
//     //     }

//     // }); 
    
//     // Put soomething here so this useEffect only runs when the window is resized

    


//     // Making the component rerender on window resize
//     // This lets us recalculate how many event tags fit in the day grid container and adjust accordingly.
//     // Code copied from: https://dirask.com/posts/React-rerender-component-on-browser-resize-jEL0Rp
//     const [dimensions, setDimensions] = useState({
//         height: window.innerHeight,
//         width: window.innerWidth
//     })

//     const handleResize = () => {

//         //console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)


//         // ONLY SET THIS WHEN THE CURR NUMTAGS != the state numtags
//         // setDimensions({
//         //     height: window.innerHeight,
//         //     width: window.innerWidth
//         // });

//         if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {
//             const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
//             if (numTagsInRemainingSpace !== numFittableTags) {
//                 setDimensions({
//                     height: window.innerHeight,
//                     width: window.innerWidth
//                 });

//                 console.log("setDimensions");
//             } 
//         }
        
//     }
//     useEffect(() => {
//         window.addEventListener('resize', handleResize)
//         return () => { window.removeEventListener('resize', handleResize) }
//     },[]); // Only need this to run once at the intial render of the component



//     const [numFittableTags, setNumFittableTags] = useState(-1);
//     useLayoutEffect(() => {
        
//         if (numFittableTags === -1) {
//             if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {
//                 const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
//                 setNumFittableTags(numTagsInRemainingSpace);

//                 console.log("first render");
//                 console.log(numFittableTags); // Here the value is still -1 because the state does not update till the rerender
//             }
//         } else {
//             //console.log(numFittableTags);
//             //console.log('useLayoutEffect running after first render');
//             // console.log('second render');
            
//             if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {
//                 const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
                

//                 if (numTagsInRemainingSpace !== numFittableTags) {
//                     setNumFittableTags(numTagsInRemainingSpace);
//                     console.log('setNumFittableTags');
//                 } else if (numTagsInRemainingSpace === numFittableTags) {
//                     //console.log("no change")
//                 }


//             }

//         }

//     }, [numFittableTags, dimensions]);
    


//// first attepmt at optimising


// const [dimensions, setDimensions] = useState({
//     height: window.innerHeight,
//     width: window.innerWidth
// })

// const handleResize = () => {

//     console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)

//     setDimensions({
//         height: window.innerHeight,
//         width: window.innerWidth
//     });

//     // if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {

//     //     const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
        
//     //     console.log(numTagsInRemainingSpace);

//     //     // console.log('test');

//     //     if (numFittableTags == -1) {
//     //         setNumFittableTags(numTagsInRemainingSpace);
//     //     }

//     //     if (numFittableTags !== numTagsInRemainingSpace) {
//     //         console.log('CHANGE!!');
//     //         console.log(numFittableTags);
//     //         console.log(numTagsInRemainingSpace);
//     //         setNumFittableTags(numTagsInRemainingSpace);
//     //     }



//     //     // const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));


//     //     // if (numFittableTags !== numTagsInRemainingSpace) {
//     //     //     console.log('CHANGE!!');
//     //     // }
//     // }
    
// }
// useEffect(() => {
//     window.addEventListener('resize', handleResize)
//     return () => { window.removeEventListener('resize', handleResize) }
// },[]); // Only need this to run once at the intial render of the component











////////////////////////////// Unoptimised version


// // Here, we are getting the height of the grid day every time the grid day component is rendered. This will allow us to calculate how many event tags can fit in the grid cell. If we have too many events, we will collapse them into a "X more events" button.
// const dayGridContainer = useRef<HTMLDivElement | null>(null); 
// const dayGridHeader = useRef<HTMLDivElement | null>(null); 
// const eventTagContainer = useRef<HTMLDivElement | null>(null); 

// useLayoutEffect(() => {
//     console.log(dayGridContainer);
//     if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {
//         console.log(dayGridContainer.current.clientHeight);
//         console.log(dayGridHeader.current.clientHeight);
//         console.log(eventTagContainer.current.clientHeight);

//         const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));
//         setNumFittableTags(numTagsInRemainingSpace);
//         console.log(numTagsInRemainingSpace);
//     }

// }); 

// // Put soomething here so this useEffect only runs when the window is resized




// // Making the component rerender on window resize
// // This lets us recalculate how many event tags fit in the day grid container and adjust accordingly.
// // Code copied from: https://dirask.com/posts/React-rerender-component-on-browser-resize-jEL0Rp
// const [dimensions, setDimensions] = useState({
//     height: window.innerHeight,
//     width: window.innerWidth
// })

// const handleResize = () => {

//     console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)

//     setDimensions({
//         height: window.innerHeight,
//         width: window.innerWidth
//     });


//     // if (dayGridContainer.current !== null && eventTagContainer.current !== null && dayGridHeader.current !== null) {

        
//     //     console.log('test');




//     //     // const numTagsInRemainingSpace = Math.floor((dayGridContainer.current.clientHeight - dayGridHeader.current.clientHeight - 5) / (eventTagContainer.current.clientHeight + 5));


//     //     // if (numFittableTags !== numTagsInRemainingSpace) {
//     //     //     console.log('CHANGE!!');
//     //     // }
//     // }
// }
// useEffect(() => {
//     window.addEventListener('resize', handleResize)
//     return () => { window.removeEventListener('resize', handleResize) }
// },[]); // Only need this to run once at the intial render of the component




////////////////////////////




























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



















{/* { modalOpen && <EventDetailsModal handleClose={close} day={day}/> } */}





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

            