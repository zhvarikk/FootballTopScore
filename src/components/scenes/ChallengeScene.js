import Button from "@material-ui/core/Button";
import React, {useContext, useEffect, useState} from "react";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import {ChallengeContext} from "../../App";
import * as fcl from "@onflow/fcl";
import Spinner from "../Spinner";
import Footer from "../Footer";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@material-ui/core/Modal";
import ModalForSelectingFC from "../ModalForSelectingFC";
import ModalForSetUp from "../ModalForSetUp";
import "../challenges.css"



function ChallengeScene(props) {

    const {getUserPlayerNFTs,getUserNFTs,playerNFTs,isModalWindowOpened,setIsModalWindowOpened,chooseFavouriteFootballClub,isModalWindowOpenedToSelectFC,setIsModalWindowOpenedToSelectFC,specialChallenges,listSpecialChallenges,setIsUserSearchingForSpecialChallenge,setIsUserSearchingForRegularChallenges,isUserSearchingForSpecialChallenge,isUserSearchingForRegularChallenges,isSetUpMade,setIsUserLoggedIn,isUserLoggedIn,setUpUser,loading,getPlayerTemplates,listCompletedChallenges,completedChallenges,
        mintRewardForCompletingChallenge,listChallenges,
        nfts,templates, challenges,playerTemplates,getFootballClipTemplates}=useContext(ChallengeContext);

    const [hasUserCompletedAllChallenges,setHasUserCompletedAllChallenges]=useState(true);


    useEffect(async ()=>{
        const isUserLoggedIn1=window.localStorage.getItem("isUserLoggedIn");
        setIsUserLoggedIn(JSON.parse(isUserLoggedIn1));
        const currentUser = await fcl.currentUser.snapshot()
        setIsUserSearchingForRegularChallenges(true);
        getFootballClipTemplates();
        listChallenges();
        listSpecialChallenges();
        getPlayerTemplates();
        listCompletedChallenges(currentUser.addr);
    },[])

    useEffect( ()=>{
        window.localStorage.setItem("isUserLoggedIn",JSON.stringify(isUserLoggedIn));
    })

    const checkClaimReward=(task)=>{
        let counter=0;
        nfts.map((nft) => {
                task.map((templateId)=>{
                    if(templateId===nft.data.templateID){
                        counter++;
                    }
                })
            }
        )
        if(counter===task.length){
            return true;
        } else{
            return false;
        }
    }

    const handleClose=()=>{
        setIsModalWindowOpened(false);
    }

    const handleCloseOfModalWindowToSelectFC=()=>{
        setIsModalWindowOpenedToSelectFC(false);
    }


    let counter=0;

    const checkWhetherUserAlreadyOwnsPlayer=(templateID)=>{
        let isUserOwning=false;
        playerNFTs.map(nft => {
            if(nft.data.templateID==templateID){
                isUserOwning=true;
            }
        });
        return isUserOwning;
    }

    const checkWhetherUserAlreadyOwnsFootballClip=(templateID)=>{
        let isUserOwning=false;
        console.log(nfts);
        nfts.map(nft => {
            if(nft.data.templateID==templateID){
                isUserOwning=true;
            }
        });
       return isUserOwning;
    }

    const checkWhetherUserHasCompletedChallenge=(challengeID)=>{
        let hasUserCompletedChallange=false;
        console.log("ChallengeID "+challengeID);
        console.log(completedChallenges)
        completedChallenges.map((challengeId)=>{
            console.log(challengeId+" "+challengeID);
            if(challengeId==challengeID){
                hasUserCompletedChallange=true;
            }
        })
        if(hasUserCompletedChallange){
            counter++;
            console.log(counter);
            return true;
        } else {
            return false;
        }
    }

    if (loading) return <Spinner />

    return (
        <div className="background-challenges">
                <div style={{marginTop:"50px"}}>
                    <Button startIcon={<SearchIcon/>} style={{marginRight:"25px",marginTop:"50px",marginBottom:"25px"}} color="primary" variant="contained" onClick={async ()=>{
                      setIsUserSearchingForSpecialChallenge(false);
                      setIsUserSearchingForRegularChallenges(true);
                      await listChallenges();
                    }}>Search regular challenges</Button>
                    <Button startIcon={<SearchIcon/>} style={{marginRight:"25px",marginTop:"50px",marginBottom:"25px"}} color="primary" variant="contained" onClick={async ()=>{
                        const currentUser = await fcl.currentUser.snapshot()
                       getUserPlayerNFTs(currentUser.addr);
                      setIsUserSearchingForSpecialChallenge(true);
                       setIsUserSearchingForRegularChallenges(false);
                       await listSpecialChallenges();
                     }}>Search special challenge</Button>
                    {isUserSearchingForRegularChallenges?
                    <div style={{display:"flex",justifyContent:"center",flexDirection: "column"}}>
                        <h1 style={{fontFamily:"Helvetica",color:"white"}}>Available regular challenges</h1>

                        {(Object.keys(challenges).length!==0&&challenges)?Object.keys(challenges).map(challengeID => !checkWhetherUserHasCompletedChallenge(challengeID)?(
                                <div id="challengeDescription" style={{position:"center",margin:"auto",padding:"15px",background:"#5c5ccf",borderRadius:"23px", width:"79%",marginTop:"20px",marginBottom:"15px"}} key={challengeID}>
                                    <h1 style={{fontFamily:"Helvetica"}}>ChallengeID: {challengeID}</h1>
                                    <h1 style={{fontFamily:"Helvetica"}}>Task to collect following NFTs:</h1>
                                    <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto"}}>
                                        {challenges[challengeID].task.map(templateId=>(
                                            <div className={`${ checkWhetherUserAlreadyOwnsFootballClip(templateId)? "nftOwned" : ""}`} style={{border:"2px solid black",margin:"10px",background:"linear-gradient(to bottom right, blue, pink)",padding:"10px"}}>
                                                <h1>{templates[templateId].name}</h1>
                                                <video style={{margin:"10px"}} height="320" autoPlay loop>
                                                    <source  src={`https://ipfs.infura.io/ipfs/${templates[templateId].ipfs}`} type='video/mp4'/>
                                                </video>
                                            </div>
                                        ))}
                                    </div>
                                    <h1 style={{fontFamily:"Helvetica"}}>Reward for collecting the NFTs:</h1>
                                    <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto"}}>
                                        {challenges[challengeID].reward.map(templateId=>(
                                            <div style={{border:"2px solid black",margin:"10px",background:"linear-gradient(to bottom right, blue, pink)",padding:"10px"}}>
                                                <h1>{playerTemplates[templateId].name}</h1>
                                                {/*<video style={{margin:"10px"}} height="320" autoPlay loop>*/}
                                                {/*    <source src={`https://ipfs.infura.io/ipfs/${templates[templateId].ipfs}`} type='video/mp4'/>*/}
                                                {/*</video>*/}
                                                <img src={`https://ipfs.infura.io/ipfs/${playerTemplates[templateId].ipfs}`} style={{width:"325px",height:"300px"}}/>
                                            </div>
                                        ))}
                                    </div>

                                    {checkClaimReward(challenges[challengeID].task)?
                                        <div style={{margin:"10px"}}>
                                            <Button startIcon={<CallReceivedIcon/>} style={{background:"#4c4cc1",color:"white",width:"370px"}} onClick={async ()=>{  const currentUser = await fcl.currentUser.snapshot();await mintRewardForCompletingChallenge(challengeID);await listChallenges();await listCompletedChallenges(currentUser.addr);
                                                await getPlayerTemplates();}} variant="contained">Claim the reward</Button>
                                        </div>
                                        :""}
                                </div>
                            ):""
                        ):!isSetUpMade&&isUserLoggedIn?<div style={{height:"700px",display:"flex",justifyContent:"center"}}><div style={{marginTop:"auto",marginBottom:"auto", marginRight:"25px"}}><h1 style={{color:"white",margin:"auto"}}>Please set up your collection first</h1></div>
                            <div style={{marginTop:"auto",marginBottom:"auto"}}>
                                <Button style={{margin:"10px",color:"white",background:"#4c4cc1", width:"125px",borderRadius:"15px"}} color="secondary" startIcon={<PowerSettingsNewIcon/>} onClick={async ()=>{listChallenges();setIsModalWindowOpenedToSelectFC(true)}}>Set up</Button>
                            </div>
                            </div>:!isUserLoggedIn?<div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>Please log in first:))</h1></div>:
                            <div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>Ups... There are no challenges for you yet</h1></div>}
                    </div>:""}
                    {(counter===Object.keys(challenges).length&&isUserLoggedIn&&Object.keys(challenges).length!==0&&challenges)?<div style={{
                        height: "700px",
                        display: "flex",
                        justifyContent: "center",
                    }}><h1 style={{
                        color: "white",
                        margin: "auto"
                    }}>Looks like you have completed all the existing regular challenges... Congrats!!!</h1></div>
                        :""
                    }

                    {isUserSearchingForSpecialChallenge?
                        <div>
                            <div style={{display:"flex",justifyContent:"center",flexDirection: "column"}}>
                                <h1 style={{fontFamily:"Helvetica",color:"white"}}>Available special challenge</h1>

                                {(specialChallenges.task)?(
                                        <div id="challengeDescription" style={{position:"center",margin:"auto",padding:"15px",background:"#5c5ccf",borderRadius:"23px", width:"79%",marginTop:"20px",marginBottom:"15px"}} key={specialChallenges.challengeID}>
                                            <h1 style={{fontFamily:"Helvetica"}}>ChallengeID: {specialChallenges.challengeID}</h1>
                                            <h1 style={{fontFamily:"Helvetica"}}>Task to collect following NFTs:</h1>
                                            <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto"}}>
                                                {specialChallenges.task.map(templateId=>(
                                                    <div className={`${ checkWhetherUserAlreadyOwnsPlayer(templateId)? "nftOwned" : ""}`} style={{border:"2px solid black",margin:"10px",background:"linear-gradient(to bottom right, blue, pink)",padding:"10px"}}>
                                                        <h1>{playerTemplates[templateId].name}</h1>
                                                        <img src={`https://ipfs.infura.io/ipfs/${playerTemplates[templateId].ipfs}`} style={{width:"325px",height:"300px"}}/>
                                                    </div>
                                                ))}
                                            </div>
                                            <h1 style={{fontFamily:"Helvetica"}}>Reward for collecting the NFTs:</h1>
                                            <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto"}}>
                                                {specialChallenges.reward.map(templateId=>(
                                                    <div style={{border:"2px solid black",margin:"10px",background:"linear-gradient(to bottom right, blue, pink)",padding:"10px"}}>
                                                        <h1>{playerTemplates[templateId].name}</h1>
                                                        {/*<video style={{margin:"10px"}} height="320" autoPlay loop>*/}
                                                        {/*    <source src={`https://ipfs.infura.io/ipfs/${templates[templateId].ipfs}`} type='video/mp4'/>*/}
                                                        {/*</video>*/}
                                                        <img src={`https://ipfs.infura.io/ipfs/${playerTemplates[templateId].ipfs}`} style={{width:"325px",height:"300px"}}/>
                                                    </div>
                                                ))}
                                            </div>

                                            {checkClaimReward(specialChallenges.task)?
                                                <div style={{margin:"10px"}}>
                                                    <Button startIcon={<CallReceivedIcon/>} style={{background:"#4c4cc1",color:"white",width:"370px"}} onClick={async ()=>{await mintRewardForCompletingChallenge(specialChallenges.challengeID);await listSpecialChallenges();await getUserPlayerNFTs()}} variant="contained">Claim the reward</Button>
                                                </div>
                                                :""}
                                        </div>
                                    ):hasUserCompletedAllChallenges&&isUserLoggedIn&&isSetUpMade?<div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>Ups... There are no challenges for you yet</h1></div>:
                                isUserLoggedIn&&!isSetUpMade?<div style={{height:"700px",display:"flex",justifyContent:"center"}}><div style={{marginTop:"auto",marginBottom:"auto", marginRight:"25px"}}><h1 style={{color:"white",margin:"auto"}}>Please set up your collection first</h1></div>
                                    <div style={{marginTop:"auto",marginBottom:"auto"}}>
                                        <Button style={{margin:"10px",color:"white",background:"#4c4cc1", width:"125px",borderRadius:"15px"}} color="secondary" startIcon={<PowerSettingsNewIcon/>} onClick={async ()=>{setIsModalWindowOpenedToSelectFC(true)}}>Set up</Button>
                                    </div>
                                </div>:!isUserLoggedIn?<div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>Please log in first:))</h1></div>:
                                    <div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>Ups... There are no challenges for you yet</h1></div>}
                            </div></div>:""}

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
        <Footer/>
        </div>

    );
}

export default ChallengeScene;
