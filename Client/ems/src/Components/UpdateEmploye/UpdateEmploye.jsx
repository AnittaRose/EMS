import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateEmploye(){
    let params = new URLSearchParams(window.location.search);
    let productIdFromParams = params.get("productId");
    let token_key = params.get("login");
    let token = localStorage.getItem(token_key); // Assuming a token for authorization (e.g., JWT)
    return(
        <>

        </>
    )
}
export default UpdateEmploye;