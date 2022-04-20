import React, {useContext} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {AdminContext} from "../App";


function FootballClipToPackAddition(props) {
    const{setIsModalWindowOpenedToSelectFC,isSetUpMade,setIsModalWindowOpened,setPackLaunchID,addFootballClipToPackCollection,setTemplateID}=useContext(AdminContext);
    return (
        <div style={{margin:"15px"}} className="FootballClipToPackAddition">
            <TextField style={{marginRight:"10px"}} size="small" type="text" label="PackCollectionID" variant="filled" onChange={(e)=>setPackLaunchID(e.target.value)}/>
            <TextField style={{marginRight:"10px"}} size="small" type="text" label="FootballClipID" variant="filled"  onChange={(e)=>setTemplateID(e.target.value)}/>
            <Button startIcon={<AddIcon/>} color="primary" style={{marginLeft:"10px"}}  onClick={()=>{if(isSetUpMade){addFootballClipToPackCollection()}else{setIsModalWindowOpenedToSelectFC(true)}}} variant="contained">Add a football clip to pack collection</Button>
        </div>
    );
}

export default FootballClipToPackAddition;