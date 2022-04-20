import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as fcl from "@onflow/fcl";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';


function TradingOfNFT(props) {
    return (
        <div style={{margin:"15px"}} className="TradingOfNFT">
            <TextField style={{marginRight:"10px"}} size="small" type="text" label="Id of nft for sale listing" variant="filled" onChange={(e)=>props.setIdOfNFT(e.target.value)}/>
            <TextField style={{marginRight:"10px"}} size="small" type="text" placeholder="156.0" label="Price" variant="filled" onChange={(e)=>props.setPrice(e.target.value)}/>
            <ButtonGroup style={{marginRight:"10px"}}>
                <Button startIcon={<PlaylistAddIcon/>} color="primary"  onClick={()=>{props.listNFTForSale()}} variant="contained">List NFT for sale</Button>
                <Button startIcon={<PlaylistRemoveIcon/>} color="secondary" onClick={()=>{props.unListNFTForSale()}} variant="contained">Unlist NFT from sale</Button>
            </ButtonGroup>
        </div>
    );
}

export default TradingOfNFT;