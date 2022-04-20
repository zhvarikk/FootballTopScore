import {useState} from "react";

export const useUser=(client)=>{
    const[user,setUser]=useState();
    setUser(client);
    return user;
}