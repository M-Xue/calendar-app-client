import Calendar from '../../components/calendar/Calendar';
import GroupSidebar from '../../components/groupSidebar/GroupSidebar';
import Topbar from '../../components/topbar/Topbar';
import './calendarPage.css';


export default function CalendarPage() {
    return (
        <div className='calendarPage'>

            {/* This div is so that the background colour stays in the view port event if the screen is extended due to viewport resizing issues */}
            <div className="backgroundColour"></div>

            <Topbar/>

			






            <div className="contentContainer">
                
                <div className="mainContent">

                    
                    <div className="groupName">
                        <div className='largeFont'>Group Name</div>
                    </div>


                    <div className="calendarContent">



                        <Calendar/>
                    </div> 


                </div>

                <div className="sidebarContent">
                    <GroupSidebar/>
                </div>
                    
            </div>
        
        
        
        
        
        </div>
    )
}
