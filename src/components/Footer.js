import React from "react";
import "../styles/Footer.css"
import {faCoffee} from "@fortawesome/free-solid-svg-icons/faCoffee";
import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {faTwitter} from "@fortawesome/free-brands-svg-icons"
import {faInstagram} from "@fortawesome/free-brands-svg-icons"
import {faDiscord} from "@fortawesome/free-brands-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Footer(props) {

    return (
        <footer className="footer">
            <div className="container">
                <div className="row" style={{display:"flex",justifyContent:"center"}}>
                    <div className="footer-col">
                        <h4 style={{textAlign:"center"}}>company</h4>
                        <ul style={{textAlign:"center"}}>
                            <li><a href="#">about us</a></li>
                            <li><a href="#">our services</a></li>
                            <li><a href="#">privacy policy</a></li>
                            <li><a href="#">referral program</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4 style={{textAlign:"center"}}>get help</h4>
                        <ul style={{textAlign:"center"}}>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">24/7 support</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4 style={{textAlign:"center"}}>follow us</h4>
                        <div className="social-links" style={{textAlign:"center"}}>
                            <a href="#"><FontAwesomeIcon icon={faDiscord} /></a>
                            <a href="#"><FontAwesomeIcon icon={faGithub} /></a>
                            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;