import Button from "@material-ui/core/Button";
import SearchIcon from "@mui/icons-material/Search";
import React, {useContext, useEffect, useState} from "react";
import {MyCollectionsContext} from "../../App";
import * as fcl from "@onflow/fcl";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import RemovelistAddIcon from "@mui/icons-material/PlaylistRemove";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";
import Footer from "../Footer";
import Spinner from "../Spinner";
import "../myCollections.css"

function MyCollectionsScene(props) {

    const {listPlayerNFTForSale,unListPlayerNftFromSale,isUserSearchingForPlayerCollection,isUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerCollection,getUserPlayerNFTs,getUserPlayerSaleNFTs,playerNFTs,salePlayerNFTs,setPlayerNFTs,setSalePlayerNFTs,setIsUserLoggedIn,isUserLoggedIn,loading,setLoading,setPrice,unListForSale,listNFTForSale,setIsUserSearchingForCollection,setIsUserSearchingForSaleCollection,
        getUserNFTs,getUserSaleNFTs,isUserSearchingForCollection,
        isUserSearchingForSaleCollection,nfts,saleNfts}=useContext(MyCollectionsContext);


    useEffect(async ()=>{
        const isUserLoggedIn1=window.localStorage.getItem("isUserLoggedIn");
        setIsUserLoggedIn(JSON.parse(isUserLoggedIn1));
        setIsUserSearchingForCollection(true);
        console.log("NFTS "+nfts);
        console.log(nfts);
        console.log(playerNFTs);
    },[])
    useEffect( ()=>{
        window.localStorage.setItem("isUserLoggedIn",JSON.stringify(isUserLoggedIn));
    })


    const useStyles = makeStyles(() => ({
        textField: {
            color:"white",
            "&::placeholder": {
                color: "white"
            }
        }
    }));

    const classes = useStyles();

    if (loading) return <Spinner />

    return (
        <div className="background-collections">
        <div style={{marginTop:"50px"}}>
        <Button startIcon={<SearchIcon/>} style={{marginRight:"25px",marginTop:"50px",marginBottom:"50px"}} color="primary" variant="contained" onClick={async ()=>{const currentUser = await fcl.currentUser.snapshot();getUserNFTs(currentUser.addr);setIsUserSearchingForCollection(true);
        setIsUserSearchingForSaleCollection(false);
        setIsUserSearchingForPlayerCollection(false);
        setIsUserSearchingForPlayerSaleCollection(false);
            getUserNFTs(currentUser.addr);
        }}>Search my football clips</Button>
            <Button startIcon={<SearchIcon/>} style={{marginRight:"25px",marginTop:"50px",marginBottom:"50px"}} color="primary" variant="contained" onClick={async ()=>{const currentUser = await fcl.currentUser.snapshot();getUserPlayerNFTs(currentUser.addr);setIsUserSearchingForCollection(false);
                setIsUserSearchingForSaleCollection(false);
                setIsUserSearchingForPlayerCollection(true);
                setIsUserSearchingForPlayerSaleCollection(false);
                getUserPlayerNFTs();
            }}>Search my players</Button>
    <Button startIcon={<SearchIcon/>} style={{marginRight:"25px",marginTop:"50px",marginBottom:"50px"}} color="primary" variant="contained" onClick={async ()=>{const currentUser = await fcl.currentUser.snapshot();getUserSaleNFTs(currentUser.addr);
        setIsUserSearchingForCollection(false);
        setIsUserSearchingForSaleCollection(true);
        setIsUserSearchingForPlayerCollection(false);
        setIsUserSearchingForPlayerSaleCollection(false);
    }}>Search my football clips for sale</Button>
            <Button startIcon={<SearchIcon/>} style={{marginRight:"25px",marginTop:"50px",marginBottom:"50px"}} color="primary" variant="contained" onClick={async ()=>{const currentUser = await fcl.currentUser.snapshot();getUserSaleNFTs(currentUser.addr);
                setIsUserSearchingForCollection(false);
                setIsUserSearchingForSaleCollection(false);
                setIsUserSearchingForPlayerCollection(false);
                setIsUserSearchingForPlayerSaleCollection(true);
                getUserPlayerSaleNFTs(currentUser.addr);
            }}>Search my players for sale</Button>
    {isUserSearchingForCollection?<div>
        <div style={{position:"center",display:"flex", justifyContent:"center",flexWrap:"wrap",margin:"auto",padding:"15px", width:"100%"}}>
            {(nfts.length!==0&&nfts)?nfts.map(nft => (
                <div style={{border:"2px solid black",margin:"10px",background:"linear-gradient(to bottom right, blue, pink)",borderRadius:"23px"}} key={nft.id}>
                    <h1 style={{color:"white",fontFamily:"Helvetica"}}>{nft.id}</h1>
                    <h1 style={{color:"white",fontFamily:"Helvetica"}}>{nft.data.name}</h1>
                    <video style={{margin:"10px"}} height="320" autoPlay loop>
                        <source src={`https://ipfs.infura.io/ipfs/${nft.data.ipfs}`} type='video/mp4'/>
                    </video>
                    <div style={{margin:"15px"}}>
                        <TextField InputLabelProps={{
                            style: { color: '#d7d7d7'},
                        }} InputProps={{
                            className: classes.textField
                        }} style={{marginRight:"10px"}} size="small" type="text" placeholder="156.0" label="Price" variant="filled" onChange={(e)=>setPrice(e.target.value)}/>
                    <Button style={{marginTop:"6px",background:"#6262d9"}} startIcon={<PlaylistAddIcon/>} color="primary" onClick={()=>{listNFTForSale(nft.id)}} variant="contained">List NFT for sale</Button>
                    </div>
                </div>
            )):!isUserLoggedIn?<div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>Please log in first:))</h1></div>:
                <div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>You do not have any football clip nfts yet</h1></div>}
        </div>
    </div>:""}
    {isUserSearchingForSaleCollection?
        <div>
            <div style={{position:"center",display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto",padding:"15px", width:"100%",height:"100%"}}>
                {(Object.keys(saleNfts).length!==0&&saleNfts)?Object.keys(saleNfts).map(nftID => (
                    <div id="nftForSaleDescription" style={{border:"2px solid black",margin:"10px",background:"linear-gradient(to bottom right, blue, pink)",borderRadius:"23px"}} key={nftID}>
                        <h1 style={{fontFamily:"Helvetica"}}>{nftID}</h1>
                        <h1 style={{fontFamily:"Helvetica"}}>{saleNfts[nftID].nftRef.data.name}</h1>
                        <h1 style={{fontFamily:"Helvetica"}}>Price: {saleNfts[nftID].price}</h1>
                        <video style={{margin:"10px"}} height="320" autoPlay loop>
                            <source src={`https://ipfs.infura.io/ipfs/${saleNfts[nftID].nftRef.data.ipfs}`} type='video/mp4'/>
                        </video>
                        <div>
                        <Button startIcon={<RemovelistAddIcon/>} color="primary" style={{margin:"10px",width:"400px"}}  onClick={async ()=>{await unListForSale(nftID);const currentUser = await fcl.currentUser.snapshot();getUserSaleNFTs(currentUser.addr);}} variant="contained">Unlist NFT from sale</Button>
                        </div>
                    </div>
                )):!isUserLoggedIn?<div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>Please log in first:))</h1></div>:
                    <div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>You have not listed any football clip nfts</h1></div>}
            </div>
        </div>:""}
            {isUserSearchingForPlayerCollection?
                <div>
                <div style={{position:"center",display:"flex", justifyContent:"center",flexWrap:"wrap",margin:"auto",padding:"15px", width:"100%"}}>
                    {(playerNFTs.length!==0&&playerNFTs)?playerNFTs.map(nft => (
                        <div style={{border:"2px solid black",margin:"10px",background:"linear-gradient(to bottom right, blue, pink)",borderRadius:"23px"}} key={nft.id}>
                            <h1 style={{color:"white",fontFamily:"Helvetica"}}>{nft.id}</h1>
                            <h1 style={{color:"white",fontFamily:"Helvetica"}}>{nft.data.name}</h1>
                            <img src={`https://ipfs.infura.io/ipfs/${nft.data.ipfs}`} style={{width:"325px",height:"300px"}}/>
                            <div style={{margin:"15px"}}>
                                <TextField InputLabelProps={{
                                    style: { color: '#d7d7d7'},
                                }} InputProps={{
                                    className: classes.textField
                                }} style={{marginRight:"10px"}} size="small" type="text" placeholder="156.0" label="Price" variant="filled" onChange={(e)=>setPrice(e.target.value)}/>
                                <Button style={{marginTop:"6px"}} startIcon={<PlaylistAddIcon/>} color="primary" onClick={()=>{listPlayerNFTForSale(nft.id)}} variant="contained">List NFT for sale</Button>
                            </div>
                        </div>
                    )):!isUserLoggedIn?<div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>Please log in first:))</h1></div>:
                        <div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>You do not have any player nfts yet</h1></div>}
                </div>
                </div>
                :""}
            {isUserSearchingForPlayerSaleCollection?
                <div>
                    <div style={{position:"center",display:"flex", flexWrap:"wrap",justifyContent:"center",margin:"auto",padding:"15px", width:"100%",height:"100%"}}>
                        {(Object.keys(salePlayerNFTs).length!==0&&salePlayerNFTs)?Object.keys(salePlayerNFTs).map(nftID => (
                            <div id="nftForSaleDescription" style={{border:"2px solid black",margin:"10px",background:"linear-gradient(to bottom right, blue, pink)",borderRadius:"23px"}} key={nftID}>
                                <h1 style={{fontFamily:"Helvetica"}}>{nftID}</h1>
                                <h1 style={{fontFamily:"Helvetica"}}>{salePlayerNFTs[nftID].nftRef.data.name}</h1>
                                <h1 style={{fontFamily:"Helvetica"}}>Price: {salePlayerNFTs[nftID].price}</h1>
                                <img src={`https://ipfs.infura.io/ipfs/${salePlayerNFTs[nftID].nftRef.data.ipfs}`} style={{width:"325px",height:"300px"}}/>
                                <div>
                                    <Button startIcon={<RemovelistAddIcon/>} color="primary" style={{margin:"10px",width:"400px"}}  onClick={()=>{unListPlayerNftFromSale(nftID)}} variant="contained">Unlist NFT from sale</Button>
                                </div>
                            </div>
                        )):!isUserLoggedIn?<div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>Please log in first:))</h1></div>:
                            <div style={{height:"700px",display:"flex",justifyContent:"center"}}><h1 style={{color:"white",margin:"auto"}}>You have not listed any player nfts</h1></div>}
                    </div>
                </div>:""}
        </div>
            <Footer/>
    </div>
    );
}

export default MyCollectionsScene;