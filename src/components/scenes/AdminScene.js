import TemplateCreation from "../TemplateCreation";
import React, {useContext, useEffect} from "react";
import PackCollectionCreation from "../PackCollectionCreation";
import FootballClipToPackAddition from "../FootballClipToPackAddition";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import {AdminContext} from "../../App";
import * as fcl from "@onflow/fcl";
import Footer from "../Footer";
import Modal from "@material-ui/core/Modal";
import ModalForSetUp from "../ModalForSetUp";
import ModalForSelectingFC from "../ModalForSelectingFC";

function AdminScene(props) {

    const{setFamilyID,removePack,chooseFavouriteFootballClub,isModalWindowOpenedToSelectFC,setIsModalWindowOpenedToSelectFC,createSpecialChallenge,setFavouriteTeam,favouriteTeam,isSetUpMade,isModalWindowOpened,setIsModalWindowOpened,setUpUser,setTask,setReward,createChallenge,task,reward,removeTemplate,setTemplateID}=useContext(AdminContext);

    const handleClose=()=>{
        setIsModalWindowOpened(false);
    }

    const handleCloseOfModalWindowToSelectFC=()=>{
        setIsModalWindowOpenedToSelectFC(false);
    }

    return (
        <div style={{height:"100%"}}>
        <div style={{marginTop:"100px",height:"80%"}}>
            <TemplateCreation/>
            <PackCollectionCreation/>
            <FootballClipToPackAddition/>
            <div style={{margin:"15px"}}>
                <TextField style={{width:"250px",marginRight:"10px"}} size="small" placeholder="1,2" type="text" label="IDs of NFTs user should collect" variant="filled" onChange={(e)=>{let input=e.target.value;setTask(Array.from(input.split(',')).map(i=>Number(i)))}}/>
                <TextField style={{width:"325px",marginRight:"10px"}} size="small" placeholder="3,5" type="text" label="IDs of NFTs user will receive as the reward" variant="filled" onChange={(e)=>{let input=e.target.value;setReward(Array.from(input.split(',')).map(i=>Number(i)))}}/>
                <TextField style={{marginRight:"10px"}} size="small" type="text" label="Football team" variant="filled" onChange={(e)=>setFavouriteTeam(e.target.value)}/>
                <Button startIcon={<AddIcon/>} style={{marginLeft:"10px"}} color="primary" onClick={()=>{if(isSetUpMade){createChallenge(task,reward)}else{setIsModalWindowOpenedToSelectFC(true)}}} variant="contained">Add regular challenge</Button>
            </div>
            <div style={{margin:"15px"}}>
                <TextField style={{width:"250px",marginRight:"10px"}} size="small" placeholder="1,2" type="text" label="IDs of NFTs user should collect" variant="filled" onChange={(e)=>{let input=e.target.value;setTask(Array.from(input.split(',')).map(i=>Number(i)))}}/>
                <TextField style={{width:"325px",marginRight:"10px"}} size="small" placeholder="3,5" type="text" label="IDs of NFTs user will receive as the reward" variant="filled" onChange={(e)=>{let input=e.target.value;setReward(Array.from(input.split(',')).map(i=>Number(i)))}}/>
                <TextField style={{marginRight:"10px"}} size="small" type="text" label="Football team" variant="filled" onChange={(e)=>setFavouriteTeam(e.target.value)}/>
                <Button startIcon={<AddIcon/>} style={{marginLeft:"10px"}} color="primary" onClick={()=>{if(isSetUpMade){createSpecialChallenge(task,reward)}else{setIsModalWindowOpenedToSelectFC(true)}}} variant="contained">Add special challenge</Button>
            </div>
            <div style={{margin:"15px"}}>
                <TextField style={{width:"190px",marginRight:"10px"}} size="small" type="text" label="TemplateID" variant="filled" onChange={(e)=>setTemplateID(e.target.value)}/>
                <Button startIcon={<DeleteIcon/>} style={{marginRight:"35px",marginTop:"5px"}} color="secondary" onClick={()=>{if(isSetUpMade){removeTemplate()}else{setIsModalWindowOpenedToSelectFC(true)}}} variant="contained">Delete template</Button>
                <TextField style={{width:"190px",marginRight:"10px"}} size="small" type="text" label="FamilyID" variant="filled" onChange={(e)=>setFamilyID(e.target.value)}/>
                <Button startIcon={<DeleteIcon/>} style={{marginTop:"5px"}} color="secondary" onClick={()=>{if(isSetUpMade){removePack()}else{setIsModalWindowOpenedToSelectFC(true)}}} variant="contained">Delete pack</Button>
            </div>
        </div>
            <Modal
                open={isModalWindowOpenedToSelectFC}
                onClose={handleCloseOfModalWindowToSelectFC}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalForSelectingFC setIsModalWindowOpened={setIsModalWindowOpened} setIsModalWindowOpenedToSelectFC={setIsModalWindowOpenedToSelectFC} chooseFavouriteFootballClub={chooseFavouriteFootballClub}/>
            </Modal>
            <Modal
                open={isModalWindowOpened}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalForSetUp setIsModalWindowOpened={setIsModalWindowOpened} setUpUser={setUpUser}/>
            </Modal>
            <Footer style={{height:"20%"}}/>
        </div>

    );
}

export default AdminScene;