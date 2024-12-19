// import React from "react";
// import { useNavigate } from "react-router-dom";

// function List(){
//     const params = new URLSearchParams(window.location.search);
//             console.log("params", params);
            
//             let token_key = params.get('login');
//             let token = localStorage.getItem(token_key);
//             console.log("Token:", token);
        
//             let userId = params.get('id');
//             console.log("User ID:", userId);
        
        
//             const navigate = useNavigate();
        
//             const Manage = (id) => {
//                 navigate(`/Manage?login=${token_key}&id=${id}`)
//              }
//     return(<>
//         <div className="">hii</div>
//     </>)
// }
// export default List;