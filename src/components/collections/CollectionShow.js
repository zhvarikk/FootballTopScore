
import React, {useContext, useEffect} from "react";
import {CollectionContext} from "../../App";
import Button from "@material-ui/core/Button";
import '../../styles/CollectionShow.css'
import SearchIcon from '@mui/icons-material/Search';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CallReceivedIcon from '@mui/icons-material/CallReceived';



function CollectionShow(props) {

    const {openPack,listCompletedChallenges,completedChallenges,searchableAddress,user,changeChallengeId,mintRewardForCompletingChallenge,setIsUserSearchingForAvailableChallenges,isUserSearchingForAvailableChallenges,setIsUserSearchingForCollection,setIsUserSearchingForSaleCollection,setIsUserSearchingForTemplates,
        setIsUserSearchingForFamilies,getUserNFTs,getUserSaleNFTs,getTemplates,listFamilies,setSearchableAddress,isUserSearchingForCollection,
        isUserSearchingForSaleCollection,nfts,saleNfts,isUserSearchingForTemplates,templates,challenges,setTemplateID,removeTemplate,isUserSearchingForFamilies,
        families,listChallenges}=useContext(CollectionContext);

    // useEffect( ()=>{
    //     console.log(user);
    //     getUserNFTs(user.addr);
    // },[])
    // getUserNFTs(user.addr);
    const checkClaimReward=(templates,task)=>{
        console.log(nfts);
        console.log(task);
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
            return true;
        } else {
            return false;
        }
    }

    return (
        <div style={{margin:"15px"}} className="CollectionShow">
            <Button startIcon={<SearchIcon/>} style={{marginRight:"10px"}} color="primary" variant="contained" onClick={()=>{getUserNFTs(user.addr);setIsUserSearchingForCollection(true);
                setIsUserSearchingForAvailableChallenges(false);
                setIsUserSearchingForSaleCollection(false);
                setIsUserSearchingForFamilies(false);
                setIsUserSearchingForTemplates(false);
                getUserNFTs(searchableAddress);
            }}>Search my collection</Button>
            <Button startIcon={<SearchIcon/>} style={{marginRight:"10px"}} color="primary" variant="contained" onClick={()=>{getUserSaleNFTs(user.addr);setIsUserSearchingForCollection(false);
                setIsUserSearchingForAvailableChallenges(false);
                setIsUserSearchingForSaleCollection(true);
                setIsUserSearchingForFamilies(false);
                setIsUserSearchingForTemplates(false);
                getUserSaleNFTs(searchableAddress);
            }}>Search my sale collection</Button>
            <Button startIcon={<SearchIcon/>} style={{marginRight:"10px"}} color="secondary" variant="contained" onClick={()=>{setIsUserSearchingForCollection(false);
                setIsUserSearchingForAvailableChallenges(false);
                setIsUserSearchingForSaleCollection(false);
                setIsUserSearchingForFamilies(false);
                setIsUserSearchingForTemplates(true);
                getTemplates();
            }}>Search all existing football clips</Button>
            <Button startIcon={<SearchIcon/>} style={{marginRight:"10px"}} color="primary" variant="contained" onClick={()=>{ setIsUserSearchingForCollection(false);
                setIsUserSearchingForAvailableChallenges(false);
                setIsUserSearchingForSaleCollection(false);
                setIsUserSearchingForFamilies(true);
                setIsUserSearchingForTemplates(false);listFamilies()}}>Show all available pack launches</Button>
            <Button startIcon={<SearchIcon/>} style={{marginRight:"10px"}} color="secondary" variant="contained" onClick={()=>{getUserNFTs(user.addr);listCompletedChallenges(user.addr);setIsUserSearchingForAvailableChallenges(true);
                setIsUserSearchingForCollection(false);setIsUserSearchingForSaleCollection(false);setIsUserSearchingForFamilies(false);
                setIsUserSearchingForTemplates(false);listChallenges()}}>Show available challenges</Button>
            {isUserSearchingForCollection?<div>
                <h1 style={{fontFamily:"Helvetica",marginTop:"35px",color:"#00008B"}}>My Collection</h1>
                <div style={{position:"center",display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto",padding:"15px",border:"2px solid black",background:"#00008B", width:"75%"}}>
                    {nfts.map(nft => (
                        <div style={{border:"2px solid black",margin:"10px",background:"#4c4cc1"}} key={nft.id}>
                            <h1 style={{color:"white",fontFamily:"Helvetica"}}>{nft.id}</h1>
                            <h1 style={{color:"white",fontFamily:"Helvetica"}}>{nft.data.name}</h1>
                            <video style={{margin:"10px"}} height="320" autoPlay loop>
                                <source src={`https://ipfs.infura.io/ipfs/${nft.data.ipfs}`} type='video/mp4'/>
                            </video>
                        </div>
                    ))}
                </div>
            </div>:""}
            {isUserSearchingForSaleCollection&&saleNfts?
                <div>
                <h1 style={{fontFamily:"Helvetica",marginTop:"35px",color:"#00008B"}}>My SaleCollection</h1>
                <div style={{position:"center",display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto",padding:"15px",border:"2px solid black",background:"#00008B", width:"75%"}}>
                    {Object.keys(saleNfts).map(nftID => (
                        <div id="nftForSaleDescription" style={{border:"2px solid black",margin:"10px",background:"#4c4cc1"}} key={nftID}>
                            <h1 style={{fontFamily:"Helvetica"}}>{nftID}</h1>
                            <h1 style={{fontFamily:"Helvetica"}}>{saleNfts[nftID].nftRef.data.name}</h1>
                            <h1 style={{fontFamily:"Helvetica"}}>Price: {saleNfts[nftID].price}</h1>
                            <video style={{margin:"10px"}} height="320" autoPlay loop>
                                <source src={`https://ipfs.infura.io/ipfs/${saleNfts[nftID].nftRef.data.ipfs}`} type='video/mp4'/>
                            </video>
                        </div>
                    ))}
                </div>
            </div>:""}
            {isUserSearchingForTemplates?<div>
                <h1 style={{fontFamily:"Helvetica",marginTop:"35px",color:"#DC143C"}}>Existing football clips</h1>
                <div style={{position:"center",display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto",padding:"15px",border:"2px solid black",background:"#DC143C", width:"73%"}}>
                    {Object.keys(templates).map(templateID => (
                        <div style={{border:"2px solid black",margin:"10px",background:"#fd2852"}} key={templateID}>
                            <h1 style={{color:"white",fontFamily:"Helvetica"}}>FootballClipID: {templateID}</h1>
                            <h1 style={{color:"white",fontFamily:"Helvetica"}}>Name: {templates[templateID].name}</h1>
                            <h1 style={{color:"white",fontFamily:"Helvetica"}}>Rarity: {templates[templateID].rarity}</h1>
                            <video style={{margin:"10px"}} height="320" autoPlay loop>
                                <source src={`https://ipfs.infura.io/ipfs/${templates[templateID].ipfs}`} type='video/mp4'/>
                            </video>
                        </div>
                    ))}
                </div>
            </div>:""}
            {isUserSearchingForFamilies?<div>
                <h1 style={{fontFamily:"Helvetica",marginTop:"35px",color:"#00008B"}}>Available pack launches</h1>
                <div style={{display:"flex",justifyContent:"center",flexDirection: "column"}}>
                    {families.map(family => (
                        <div style={{position:"center",margin:"auto",border:"2px solid black",padding:"15px",background:"#00008B", width:"73%",marginTop:"10px",marginBottom:"15px"}} key={family.id}>
                            <h1 style={{fontFamily:"Helvetica",color:"white"}}>Pack id: {family.familyID}</h1>
                            <h1 style={{fontFamily:"Helvetica",color:"white"}}>Pack price: {family.price} flows</h1>
                            <h1 style={{fontFamily:"Helvetica",color:"white"}}>Pack name: {family.name}</h1>
                            <h1 style={{fontFamily:"Helvetica",color:"white"}}>In the pack there are the following football clips: </h1>
                            <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center"}}>
                            {family.templates.map(template=>(
                                <div style={{border:"2px solid black",margin:"10px",background:"#4c4cc1"}}>
                                <h1 style={{fontFamily:"Helvetica",color:"white"}}>FootballClipID: {template}</h1>
                                <video style={{margin:"10px"}} height="320" autoPlay loop>
                                    <source src={`https://ipfs.infura.io/ipfs/${templates[template].ipfs}`} type='video/mp4'/>
                                </video>
                                </div>
                            ))}
                            </div>
                            <Button startIcon={<LockOpenIcon/>} color="primary" style={{margin:"10px",width:"400px"}}  onClick={()=>{openPack(family.familyID)}} variant="contained">Open pack</Button>
                        </div>
                    ))}
                </div>
            </div>:""}
            {isUserSearchingForAvailableChallenges?
                <div>
                    <h1 style={{fontFamily:"Helvetica",marginTop:"35px",color:"#DC143C"}}>Available challenges</h1>
                    <div style={{display:"flex",justifyContent:"center",flexDirection: "column"}}>
                        {Object.keys(challenges).map(challengeID => !checkWhetherUserHasCompletedChallenge(challengeID)?(
                            <div id="challengeDescription" style={{position:"center",margin:"auto",border:"2px solid black",padding:"15px",background:"#DC143C", width:"75%",marginTop:"20px",marginBottom:"15px"}} key={challengeID}>
                                <h1 style={{fontFamily:"Helvetica"}}>ChallengeID: {challengeID}</h1>
                                <h1 style={{fontFamily:"Helvetica"}}>Task to collect following NFTs:</h1>
                                <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto"}}>
                                    {challenges[challengeID].task.map(templateId=>(
                                        <div style={{border:"2px solid black",margin:"10px",background:"#fd2852",padding:"10px"}}>
                                            <h1>FootballClipID: {templateId}</h1>
                                            <video style={{margin:"10px"}} height="320" autoPlay loop>
                                                <source src={`https://ipfs.infura.io/ipfs/${templates[templateId].ipfs}`} type='video/mp4'/>
                                            </video>
                                        </div>
                                    ))}
                                </div>
                                <h1 style={{fontFamily:"Helvetica"}}>Reward for collecting the NFTs:</h1>
                                    <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto"}}>
                                {challenges[challengeID].reward.map(templateId=>(
                                    <div style={{border:"2px solid black",margin:"10px",background:"#fd2852",padding:"10px"}}>
                                        <h1>FootballClipID: {templateId}</h1>
                                    <video style={{margin:"10px"}} height="320" autoPlay loop>
                                        <source src={`https://ipfs.infura.io/ipfs/${templates[templateId].ipfs}`} type='video/mp4'/>
                                    </video>
                                    </div>
                                ))}
                                    </div>

                                {checkClaimReward(templates,challenges[challengeID].task)?
                                    <div style={{margin:"10px"}}>
                                        <Button startIcon={<CallReceivedIcon/>} style={{background:"#ff365f",color:"white",width:"370px"}} onClick={()=>{mintRewardForCompletingChallenge(challengeID)}} variant="contained">Claim the reward</Button>
                                    </div>
                                :""}
                                </div>
                        ):""
                        )}
                    </div>
                </div>
                :""}
        </div>
    );
}

export default CollectionShow;