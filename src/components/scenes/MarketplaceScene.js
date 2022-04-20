import Button from "@material-ui/core/Button";
import RemovelistAddIcon from "@mui/icons-material/PlaylistRemove";
import React, {useContext, useEffect, useState} from "react";
import {MarketplaceContext} from "../../App";
import * as fcl from "@onflow/fcl";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Footer from "../Footer";
import ModalForSetUp from "../ModalForSetUp";
import Modal from "@material-ui/core/Modal";
import SearchIcon from "@mui/icons-material/Search";
import ModalForSelectingFC from "../ModalForSelectingFC";
import "../marketplace.css"

function MarketplaceScene(props) {

    const{chooseFavouriteFootballClub,isModalWindowOpenedToSelectFC,setIsModalWindowOpenedToSelectFC,getUserPlayerNFTs,buyPlayer,unListPlayerNftFromSale,playerNFTs,getSellingPlayersOfUsers,setSellingPlayers,sellingPlayers,isUserSearchingForMarketplaceOfPlayers,isUserSearchingForMarketplaceOfFootballClips,setIsUserSearchingForMarketplaceOfFootballClips,setIsUserSearchingForMarketplaceOfPlayers,setIsUserLoggedIn,isUserLoggedIn,setUpUser,isModalWindowOpened,setIsModalWindowOpened,isSetUpMade,user,nfts,sellingNFTs,unListForSale,getSellingFootballClips,getUserNFTs,saleNfts,getUserSaleNFTs,buyNFT}=useContext(MarketplaceContext);
    useEffect(async ()=>{
        const isUserLoggedIn1=window.localStorage.getItem("isUserLoggedIn");
        setIsUserLoggedIn(JSON.parse(isUserLoggedIn1));
        const currentUser = await fcl.currentUser.snapshot();
       // checkIfUserLoggedIn();
        await getUserNFTs();
        await getSellingFootballClips();
        await getUserSaleNFTs(currentUser.addr);
        await getSellingPlayersOfUsers();
        setIsUserSearchingForMarketplaceOfFootballClips(true);
    },[])

    useEffect( ()=>{
        window.localStorage.setItem("isUserLoggedIn",JSON.stringify(isUserLoggedIn));
    })

    // const checkIfUserLoggedIn=()=>{
    //     if(user&&user.addr){
    //         setIsUserLoggedIn(true);
    //     } else{
    //         setIsUserLoggedIn(false);
    //     }
    // }


    const checkWhetherUserHasHisOwnNFTListed=(nftID)=>{
        console.log(nftID);
        let isOwnedByUser=false;
        nfts.map(nft => {
            if(nft.id==nftID){
                isOwnedByUser=true;
                console.log("Not yet")
            }
        })
        return isOwnedByUser;
    }

    const checkWhetherUserHasHisOwnPlayerListed=(nftID)=>{
        console.log(nftID);
        let isOwnedByUser=false;
        playerNFTs.map(nft => {
            if(nft.id==nftID){
                isOwnedByUser=true;
                console.log("Not yet")
            }
        })
        return isOwnedByUser;
    }

    const handleClose=()=>{
        setIsModalWindowOpened(false);
    }

    const handleCloseOfModalWindowToSelectFC=()=>{
        setIsModalWindowOpenedToSelectFC(false);
    }

    return (
        <div className="background-marketplace">
            <div style={{marginTop:"50px"}}>
                <Button startIcon={<SearchIcon/>} style={{marginRight:"10px",background:"#4646b0"}} color="primary" variant="contained" onClick={async ()=>{
                    getSellingFootballClips();
                    setIsUserSearchingForMarketplaceOfFootballClips(true);
                    setIsUserSearchingForMarketplaceOfPlayers(false);
                }}>Search football clips</Button>
                <Button startIcon={<SearchIcon/>} style={{marginRight:"10px",background:"#4646b0"}} color="primary" variant="contained" onClick={async ()=>{
                    getSellingPlayersOfUsers();
                    setIsUserSearchingForMarketplaceOfFootballClips(false);
                    setIsUserSearchingForMarketplaceOfPlayers(true);
                }}>Search players</Button>
                {isUserSearchingForMarketplaceOfFootballClips?
            <div style={{position:"center",display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto",padding:"15px", width:"100%", height:"90%"}}>
                {(Object.keys(sellingNFTs).length!==0&&sellingNFTs)?Object.keys(sellingNFTs).map(nftID => (
                    <div id="nftForSaleDescription" style={{borderRadius:"23px",margin:"10px",background:"linear-gradient(to bottom right, blue, pink)"}} key={nftID}>
                        <h1 style={{fontFamily:"Helvetica"}}>{nftID}</h1>
                        <h1 style={{fontFamily:"Helvetica"}}>{sellingNFTs[nftID].name}</h1>
                        <h1 style={{fontFamily:"Helvetica"}}>Price: {sellingNFTs[nftID].price}</h1>
                        <video style={{margin:"10px"}} height="320" autoPlay loop>
                            <source src={`https://ipfs.infura.io/ipfs/${sellingNFTs[nftID].ipfs}`} type='video/mp4'/>
                        </video>
                        <div>
                            {checkWhetherUserHasHisOwnNFTListed(nftID)?
                            <Button startIcon={<RemovelistAddIcon/>} style={{margin:"50px",width:"400px",color:"white",background:"#6262d9"}}  onClick={async()=>{await unListForSale(nftID);await getSellingFootballClips()}} variant="outlined">Unlist NFT from sale</Button>
                             :<Button startIcon={<ShoppingCartIcon/>} color="primary" style={{margin:"50px",width:"400px", background:"#6262d9"}}  onClick={async()=>{if(isSetUpMade){await buyNFT(nftID,sellingNFTs[nftID].owner);await getSellingFootballClips()}else{setIsModalWindowOpenedToSelectFC(true)}}} variant="contained">Buy NFT</Button>}
                        </div>
                    </div>
                )):!isUserLoggedIn?<div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>Please log in first:))</h1></div>:
                    <div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>There are no football clips for sale yet</h1></div>}
            </div>:""}

                {isUserSearchingForMarketplaceOfPlayers?
                    <div style={{position:"center",display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto",padding:"15px", width:"100%", height:"90%"}}>
                        {(Object.keys(sellingPlayers).length!==0&&sellingPlayers)?Object.keys(sellingPlayers).map(nftID => (
                            <div id="nftForSaleDescription" style={{border:"2px solid black",margin:"10px",background:"linear-gradient(to bottom right, blue, pink)"}} key={nftID}>
                                <h1 style={{fontFamily:"Helvetica"}}>{nftID}</h1>
                                <h1 style={{fontFamily:"Helvetica"}}>{sellingPlayers[nftID].name}</h1>
                                <h1 style={{fontFamily:"Helvetica"}}>Price: {sellingPlayers[nftID].price}</h1>
                                <img src={`https://ipfs.infura.io/ipfs/${sellingPlayers[nftID].ipfs}`} style={{width:"325px",height:"300px"}}/>
                                <div>
                                    {checkWhetherUserHasHisOwnPlayerListed(nftID)?
                                        <Button startIcon={<RemovelistAddIcon/>} color="primary" style={{margin:"50px",width:"400px"}}  onClick={async ()=>{await unListPlayerNftFromSale(nftID); await getSellingPlayersOfUsers()}} variant="contained">Unlist NFT from sale</Button>
                                        :<Button startIcon={<ShoppingCartIcon/>} color="primary" style={{margin:"50px",width:"400px"}}  onClick={async ()=>{if(isSetUpMade){await buyPlayer(nftID,sellingPlayers[nftID].owner);await getUserPlayerNFTs();await getSellingPlayersOfUsers()}else{setIsModalWindowOpenedToSelectFC(true)}}} variant="contained">Buy NFT</Button>}
                                </div>
                            </div>
                        )):!isUserLoggedIn?<div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>Please log in first:))</h1></div>:
                            <div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>There are no players for sale yet</h1></div>}
                    </div>:""}

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

export default MarketplaceScene;