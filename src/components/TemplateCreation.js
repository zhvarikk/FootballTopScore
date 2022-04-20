import React, {useContext} from "react";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add"
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import {AdminContext} from "../App";


function TemplateCreation(props) {

    const{setIsModalWindowOpenedToSelectFC,makePlayerTemplate,setIsModalWindowOpened,isSetUpMade,setFile,setName,setRarity,makeFootballClipTemplate}=useContext(AdminContext);

    return (
        <div>
        <div style={{margin:"15px"}} className="TemplateCreation">
            <TextField autoComplete="off" style={{marginRight:"10px"}} size="small" type="text" label="Name of nft" variant="filled" onChange={(e)=>setName(e.target.value)}/>
            <TextField style={{marginRight:"10px"}} size="small" type="text" label="Rarity" placeholder="General/Rare/UltraRare" variant="filled" onChange={(e)=>setRarity(e.target.value)}/>
            <label htmlFor="upload-photo">
                <input
                    onChange={(e)=>setFile(e.target.files[0])}
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                />
                <Fab
                    color="secondary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                >
                    <AddIcon /> Upload video
                </Fab>
            </label>
            <Button startIcon={<CreateIcon/>} color="primary" style={{marginLeft:"10px"}}  onClick={()=>{if(isSetUpMade){makeFootballClipTemplate()}else{setIsModalWindowOpenedToSelectFC(true)}}} variant="contained">Create a football clip template</Button>
        </div>
    <div style={{margin:"15px"}} className="TemplateCreation">
        <TextField autoComplete="off" style={{marginRight:"10px"}} size="small" type="text" label="Name of nft" variant="filled" onChange={(e)=>setName(e.target.value)}/>
        <TextField style={{marginRight:"10px"}} size="small" type="text" label="Rarity" placeholder="General/Rare/UltraRare" variant="filled" onChange={(e)=>setRarity(e.target.value)}/>
        <label htmlFor="upload-photo">
            <input
                onChange={(e)=>setFile(e.target.files[0])}
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
            />
            <Fab
                color="secondary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
            >
                <AddIcon /> Upload image
            </Fab>
        </label>
        <Button startIcon={<CreateIcon/>} color="primary" style={{marginLeft:"10px"}}  onClick={()=>{if(isSetUpMade){makePlayerTemplate()}else{setIsModalWindowOpenedToSelectFC(true)}}} variant="contained">Create a player template</Button>
    </div>
    </div>
    );
}

export default TemplateCreation;