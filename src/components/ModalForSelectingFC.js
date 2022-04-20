import "./ModalForSelectingFC.css"
import React from "react";
import img1 from "../images/ajax.png"
import img2 from "../images/feyenord.png"
import img3 from "../images/psv.png"



function ModalForSelectingFC(props) {

    return (
        // <Providers>
        <div className="modalContainer2">
            <div className="titleCloseBtn">
                <button
                    onClick={() => {
                        props.setIsModalWindowOpenedToSelectFC(false);
                    }}
                >
                    X
                </button>
            </div>
            <div className="title">
                <h1>Please select your favourite football team</h1>
            </div>
            <div className="body">
                <p>After that you will be able to complete customized challenges</p>
            </div>
            <div className="footerOfModal" style={{display:"flex",flexWrap:"wrap", flexDirection:"row" }}>
                    <img src={img1} onClick={()=>{props.chooseFavouriteFootballClub("Ajax");props.setIsModalWindowOpenedToSelectFC(false);props.setIsModalWindowOpened(true)}} style={{width:"170px",height:"150px"}}/>
                <img src={img2} onClick={()=>{props.chooseFavouriteFootballClub("Feyenoord");props.setIsModalWindowOpenedToSelectFC(false);props.setIsModalWindowOpened(true)}} style={{width:"200px",height:"200px"}}/>
                <img src={img3} onClick={()=>{props.chooseFavouriteFootballClub("PSV");props.setIsModalWindowOpenedToSelectFC(false);props.setIsModalWindowOpened(true)}} style={{width:"170px",height:"160px"}}/>
            </div>
        </div>
        //  </Providers>
    );
}

export default ModalForSelectingFC;