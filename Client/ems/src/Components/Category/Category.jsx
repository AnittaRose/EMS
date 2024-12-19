
import React from "react";
import { useNavigate } from "react-router-dom";

function Categories(){
    return(
        <>
        <form>
            <div className="">
                <input type="text" placeholder="Department_Name" id="dep_name"></input>
            </div>
            <div className="">
                <input type="text" placeholder="Department_ShortName" id="shortname" />
            </div>
            <div className="">
                <textarea name="Description" id="des" placeholder="description"></textarea>
            </div>
            <div className="">
                <button>Add</button>
            </div>
        </form>
        </>
    )
}
export default Categories;
