// import PropTypes from "prop-types";
import classNames from "classnames";
import {
	daysOfWeek,
	createDaysForCurrentMonth,
	createDaysForNextMonth,
	createDaysForPreviousMonth,
	isWeekendDay,
	getMonthDropdownOptions,
	getYearDropdownOptions
} from "./helpers";

import { ChangeEvent, useState } from 'react'; // Need ChangeEvent for defining the event type in TypeScript with the evt parameter for the handleMonthSelect and handleYearSelect event handler functions
import './calendar.css';
import IndividualGridDay from "../individualGridDay/IndividualGridDay";

const Calendar: React.FC = () => {

	const currDate = new Date();
	const currYear = currDate.getFullYear();
	const currMonth = currDate.getMonth() + 1; // You need to add 1 here because getMonth assigns January as 0 and goes up to 11 for December. However, we are treating January as 1 and so on until December, which is 12.

	const [yearAndMonth, setYearAndMonth] = useState([currYear, currMonth ]);

	const onYearAndMonthChange = setYearAndMonth;

  	const [year, month] = yearAndMonth;

	// Creates an array of objects holding every day needed to be displayed on the calendar for a particular month
  	let currentMonthDays = createDaysForCurrentMonth(
		year, 
		month
	);
  	let previousMonthDays = createDaysForPreviousMonth(
    	year,
    	month,
    	currentMonthDays // This is the array of objects created previously above.
  	);
  	let nextMonthDays = createDaysForNextMonth(
		year, 
		month, 
		currentMonthDays
	);
  	let calendarGridDayObjects = [
    	...previousMonthDays,
    	...currentMonthDays,
    	...nextMonthDays
  	];

 	const handleMonthNavBackButtonClick = () => {
    	let nextYear = year;
    	let nextMonth = month - 1;
    	if (nextMonth === 0) {
      		nextMonth = 12;
      		nextYear = year - 1;
    	}
    	onYearAndMonthChange([nextYear, nextMonth]);
  	};
	
	const handleMonthNavForwardButtonClick = () => {
    	let nextYear = year;
    	let nextMonth = month + 1;
    	if (nextMonth === 13) {
      		nextMonth = 1;
      		nextYear = year + 1;
    	}
    	onYearAndMonthChange([nextYear, nextMonth]);
	};
	
  	const handleMonthSelect = (evt: ChangeEvent<HTMLSelectElement>) => { // https://www.youtube.com/watch?v=bjnW2NLAofI
    	let nextYear = year;
    	let nextMonth = parseInt(evt.target.value, 10); // the pasreInt() function takes a string and returns an integer. The second argument is the base of the number system. E.g., 10 would be decimal and 2 would be binary.
    	onYearAndMonthChange([nextYear, nextMonth]);
  	};

  	const handleYearSelect = (evt: ChangeEvent<HTMLSelectElement>) => {
    	let nextMonth = month;
    	let nextYear = parseInt(evt.target.value, 10);
    	onYearAndMonthChange([nextYear, nextMonth]);
  	};

	return (
    	<div className="calendar-root">
			
			{/* The navigation bar of the calendar */}
      		<div className="navigation-header">
				<button className="month-nav-arrow-button prev-button" onClick={handleMonthNavBackButtonClick}> <i className="fas fa-chevron-left"></i> </button>
				<div className="dropdownSelect">
					<select
						className="month-select"
						value={month}
						onChange={handleMonthSelect}
					>
						{getMonthDropdownOptions().map(({ label, value }: { label: string, value: number }) => ( // https://stackoverflow.com/questions/40745992/binding-element-index-implicitly-has-an-any-type
							<option value={value} key={value} className="month-option">
								{label}
							</option>
						))}

					</select>
					<select
						className="year-select"
						value={year}
						onChange={handleYearSelect}
					>
						{getYearDropdownOptions(year).map(({ label, value }: { label: string, value: number }) => (
							<option value={value} key={value} className="year-option">
								{label}
							</option>
						))}
					</select>
				</div>
				<button className="month-nav-arrow-button next-button" onClick={handleMonthNavForwardButtonClick}> <i className="fas fa-chevron-right"></i> </button>
      		</div>
			
			{/* Outputs the weekdays at the top of the calendar */}
      		<div className="days-of-week">
        		{daysOfWeek.map((day, index) => (
          			<div
            			key={day}
            			className={classNames("day-of-week-header-cell", {
							"weekend-day": [6, 0].includes(index)
            			})}
          			>
            			{day}
          			</div>
        		))}
      		</div>
			




			{/* The actual grid of the calendar */}
      		<div className="days-grid">
        		{calendarGridDayObjects.map((day) => (
					<IndividualGridDay day={day}/>
				))}
      		</div>

    	</div>
  	);
}


export default Calendar;

















/* <div className="days-grid">
	{calendarGridDayObjects.map((day) => (
		<div
			key={day.dateString}
			className={classNames("day-grid-item-container", {
				"weekend-day": isWeekendDay(day.dateString),
				"current-month": day.isCurrentMonth
			})}
		>
			<div className="day-content-wrapper">
				<div className="day-grid-item-header">
					{day.dayOfMonth}
				</div>
			</div>
		</div>
	))}
</div> */






















// Calendar.propTypes = {
// 	className: PropTypes.string,
// 	yearAndMonth: PropTypes.array.isRequired, // e.g. [2021, 6] for June 2021
// 	onYearAndMonthChange: PropTypes.func.isRequired,
// };


///////////////////////////////////////////////////////////////////////// Modal Stuff

// import { motion, AnimatePresence } from 'framer-motion';
// import { useState } from 'react';
// import EventDetailsModal from '../../components/eventDetailsModal/EventDetailsModal';


// const [modalOpen, setModalOpen] = useState(false);
// const close = () => setModalOpen(false);
// const open = () => setModalOpen(true);




/* <motion.button
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
</AnimatePresence> */

//////////////////////////////////////////////////////////////////////////////////