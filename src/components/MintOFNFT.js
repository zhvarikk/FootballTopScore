import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function MintOfNFT(props) {
    return (
        // <Providers>
        <div style={{margin:"15px"}} className="MintOfNFT">
            <div>
                <TextField style={{marginRight:"10px"}} size="small" type="text" label="Enter address" placeholder="0x7e60df042a9c0868" variant="filled" onChange={(e)=>{props.setSearchableAddress(e.target.value);}}/>
                <TextField style={{marginRight:"10px"}} size="small" type="text" label="Id of nft you want to buy" variant="filled" onChange={(e)=>props.setIdOfNFT(e.target.value)}/>
                <Button startIcon={<ShoppingCartIcon/>} color="primary" style={{marginLeft:"10px"}}  onClick={()=>{props.buyNFT()}} variant="contained">Buy NFT</Button>
            </div>
        </div>
        //  </Providers>
    );
}

export default MintOfNFT;