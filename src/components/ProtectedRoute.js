import React from "react";
import {Route,Navigate} from "react-router-dom";


function ProtectedRoute({isAdmin:isAdmin,component:Component,...rest}) {

    return (
        <Route
            {...rest}
        render={(props)=>{
            if(isAdmin){
                return <Component/>
            } else{
                return (
                    <Navigate to={{pathname:"/",state:{from:props.location}}}/>
                )
            }
        }}/>
    );
}

export default ProtectedRoute