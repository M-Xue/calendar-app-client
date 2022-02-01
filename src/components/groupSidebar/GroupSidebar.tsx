import './groupSidebar.css'

export default function GroupSidebar() {
    return (
        <div className="groupSidebar">
            {/* <div className="groupSearchbar">searchbar filler</div> */}

            <div className="groupDetailsSidebar">
                <div className="groupEventsSidebar">
                    <div className="sidebarSubheading">Group Name's Events</div>

                
                </div>
                <div className="groupMembersSidebar">
                    <div className="sidebarSubheading">Members</div>

                </div>
            </div>
        </div>
    )
}
