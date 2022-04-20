import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@material-ui/core/Button";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import * as fcl from "@onflow/fcl";
import React, {useContext, useEffect} from "react";
import {HeaderContext} from "../App";
import {useNavigate} from "react-router-dom";



function Header(props) {
    const {setIsUserSearchingForMarketplaceOfPlayers,setIsUserSearchingForRegularChallenges,setIsUserSearchingForSpecialChallenge,setIsUserSearchingForPlayerSaleCollection,setIsUserSearchingForPlayerCollection,setIsUserSearchingForMarketplaceOfFootballClips,getSellingPlayersOfUsers,logout,user,login,setIsUserSearchingForSaleCollection,getSellingFootballClips,
      getUserSaleNFTs,getUserNFTs,
    checkIfUserIsAdmin,isAdmin,setIsUserSearchingForCollection}=useContext(HeaderContext);
    const navigate=useNavigate();



    //const[address,setAddress]=useState();

    // const checkIfUserIsAdmin=async ()=>{
    //     const currentUser = await fcl.currentUser.snapshot();
    //     address=currentUser.addr;
    //     console.log(address);
    //     if(address==0xb7814dfc7710c1d1){
    //         setIsAdmin(true);
    //     }
    // }

    return (

        <header>
            <AppBar style={{background:"#4646b0"}}>
                <Toolbar>
                    <MenuIcon style={{margin:"10px"}}/>
                    <Button style={{margin:"10px",color:"white"}} onClick={async ()=>{const currentUser = await fcl.currentUser.snapshot();await getUserSaleNFTs(currentUser.addr); await getUserNFTs(); setIsUserSearchingForPlayerCollection(false);setIsUserSearchingForPlayerSaleCollection(false);setIsUserSearchingForSaleCollection(false);setIsUserSearchingForCollection(true);navigate('/userCollections')}}>My Collections</Button>
                    <Button style={{margin:"10px",color:"white"}} onClick={async ()=>{await getSellingPlayersOfUsers();await getSellingFootballClips();setIsUserSearchingForMarketplaceOfFootballClips(true);setIsUserSearchingForMarketplaceOfPlayers(false);navigate('/marketplace')}}>Marketplace</Button>
                    <Button style={{margin:"10px",color:"white"}} onClick={ async ()=>{const currentUser = await fcl.currentUser.snapshot();await getUserSaleNFTs(currentUser.addr); await getUserNFTs();setIsUserSearchingForRegularChallenges(true);setIsUserSearchingForSpecialChallenge(false);navigate('/challenges')}}>Challenges</Button>
                    <Button style={{margin:"10px",color:"white"}} onClick={()=>{navigate('/packs')}}>Packs</Button>
                    {isAdmin?
                        <Button style={{margin:"10px",color:"white"}} onClick={()=>{navigate('/admin')}}>Admin</Button>
                    :""}
                    <div style={{position:"absolute", marginLeft:"1050px"}}>
                        <span>Account address: {user&&user.addr?user.addr: 'PLEASE LOGIN'}</span>
                    </div>
                    <div style={{marginLeft:"1525px",position:"absolute"}}>
                        {user&&user.addr? <Button style={{margin:"10px",color:"white"}} startIcon={<LogoutIcon/>} onClick={async ()=>{logout()}}>Logout</Button>:
                            <Button style={{margin:"10px",color:"white"}} startIcon={<LoginIcon/>}  onClick={async ()=>{await login();await checkIfUserIsAdmin();
                            }}>Login</Button>}
                    </div>
                </Toolbar>
            </AppBar>
        </header>
    );
}

export default Header;