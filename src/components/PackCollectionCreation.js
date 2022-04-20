import React, {useContext} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import {AdminContext} from "../App";


function PackCollectionCreation(props) {
    const{setIsModalWindowOpenedToSelectFC,isSetUpMade,setIsModalWindowOpened,setNameOfPackLaunch,setPrice,createFamily}=useContext(AdminContext);

    return (
        <div style={{margin:"10px"}} className="PackCollectionCreation">
            <TextField style={{marginRight:"10px"}} size="small" type="text" label="Name of pack collection" variant="filled" onChange={(e)=>setNameOfPackLaunch(e.target.value)}/>
            <TextField style={{marginRight:"10px"}} size="small" type="text" placeholder="123.0" label="Price" variant="filled" onChange={(e)=>setPrice(e.target.value)}/>
            <Button startIcon={<CreateIcon/>} color="primary" style={{marginLeft:"10px"}}  onClick={()=>{if(isSetUpMade){createFamily()}else{setIsModalWindowOpenedToSelectFC(true)}}} variant="contained">Create a pack launch</Button>
        </div>
    );
}

export default PackCollectionCreation;