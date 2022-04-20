import Button from "@material-ui/core/Button";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import React, {useContext, useEffect, useState} from "react";
import {PackContext} from "../../App";
import Footer from "../Footer";
import ModalForSetUp from "../ModalForSetUp";
import Modal from "@material-ui/core/Modal";
import ModalForSelectingFC from "../ModalForSelectingFC";
import "../packs.css"


function PackScene(props) {

    const {chooseFavouriteFootballClub,isModalWindowOpenedToSelectFC,setIsModalWindowOpenedToSelectFC,setUpUser,isModalWindowOpened,setIsModalWindowOpened,isSetUpMade,openPack,templates,
        families,getFootballClipTemplates,listFamilies,listChallenges}=useContext(PackContext);

    useEffect( async ()=>{
        console.log("hi");
        await getFootballClipTemplates()
        console.log("hi")
        listFamilies();
        listChallenges();
    },[])

    const handleClose=()=>{
        setIsModalWindowOpened(false);
    }

    const handleCloseOfModalWindowToSelectFC=()=>{
        setIsModalWindowOpenedToSelectFC(false);
    }




    return (
        <div className="background-packs" style={{marginTop:"50px"}}>
                <h1 style={{fontFamily:"Helvetica",marginTop:"35px",color:"#00008B"}}>Available pack launches</h1>
                <div style={{display:"flex",justifyContent:"center",flexDirection: "column"}}>
                    {families.map(family => (
                        <div style={{borderRadius:"23px",position:"center",margin:"auto",border:"2px solid black",padding:"15px",background:"linear-gradient(to bottom right, blue, pink)", width:"75%",marginTop:"10px",marginBottom:"15px"}} key={family.id}>
                            <h1 style={{fontFamily:"Helvetica",color:"white"}}>Pack name: {family.name}</h1>
                            <h1 style={{fontFamily:"Helvetica",color:"white"}}>Pack price: {family.price} flows</h1>
                            <h1 style={{fontFamily:"Helvetica",color:"white"}}>In the pack there are the following football clips: </h1>
                            <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center"}}>
                                {family.templates.map(template=>(
                                    <div style={{border:"2px solid black",margin:"10px",background:"#5c5ccf",borderRadius:"23px"}}>
                                        <h1 style={{fontFamily:"Helvetica",color:"white"}}>{templates[template].name}</h1>
                                        <video style={{margin:"10px"}} height="320" autoPlay loop>
                                            <source src={`https://ipfs.infura.io/ipfs/${templates[template].ipfs}`} type='video/mp4'/>
                                        </video>
                                    </div>
                                ))}
                            </div>
                            <Button startIcon={<LockOpenIcon/>} color="primary" style={{margin:"10px",width:"400px",background:"#6262d9"}}  onClick={()=>{if(isSetUpMade){openPack(family.familyID)} else{setIsModalWindowOpenedToSelectFC(true)}}} variant="contained">Open pack</Button>
                        </div>
                    ))}
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
            {/*{isModalWindowOpened&&<ModalForSetUp setIsModalWindowOpened={setIsModalWindowOpened}/>}*/}
        <Footer/>
        </div>
    );
}

export default PackScene;