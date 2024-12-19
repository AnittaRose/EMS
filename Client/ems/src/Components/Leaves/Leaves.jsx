import React from "react";

function LeaveForm(){
    return(<>
        <form >
            <div className="">
                <div className="">
                    <h3>Manage Leaves</h3>
                </div>
            </div>
            <div className="">
                <input type="text" placeholder="search bt dep neame" />
            </div>
            <button>Pending</button>
            <button>Approved</button>
            <button>Rejected</button>
        </form>
    </>)
}
export default LeaveForm;