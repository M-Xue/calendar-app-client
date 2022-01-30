import './backdrop.css';
import { motion } from "framer-motion";

// Guide used: https://www.youtube.com/watch?v=SuqU904ZHA4

interface Props {
    children: React.ReactNode,
    onClick: () => void
}

const Backdrop: React.FC<Props> = ({ children, onClick }) => {

    return (
        <motion.div
            className="backdrop"
            onClick={onClick}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
        >
            {children}
        </motion.div>
    )
};

export default Backdrop;




///////////////////////////////////////////////////////////////////////// Modal Stuff

// import { motion, AnimatePresence } from 'framer-motion';
// import { useState } from 'react';
// import EventDetailsModal from '../../components/eventDetailsModal/EventDetailsModal';


// const [modalOpen, setModalOpen] = useState(false);
// const close = () => setModalOpen(false);
// const open = () => setModalOpen(true);




{/* <motion.button
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
	{ modalOpen && <EventDetailsModal modalOpen={modalOpen} handleClose={close} /> }
</AnimatePresence> */}

//////////////////////////////////////////////////////////////////////////////////