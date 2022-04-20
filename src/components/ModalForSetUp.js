import "./ModalForSetUp.css"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Button from "@material-ui/core/Button";
import React from "react";


function ModalForSetUp(props) {

    return (
        // <Providers>
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            props.setIsModalWindowOpened(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>Please set up your collection</h1>
                </div>
                <div className="body">
                    <p>After that you will be able to open packs as well as buy football clips from other people</p>
                </div>
                <div className="footerOfModal">
                    <Button style={{margin:"10px",color:"white"}} color="secondary" startIcon={<PowerSettingsNewIcon/>} onClick={()=>{props.setUpUser();props.setIsModalWindowOpened(false)}}>Set up</Button>
                </div>
            </div>
        //  </Providers>
    );
}

export default ModalForSetUp;