import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import "./footer.css";

function Footer() {
  return (
    <footer id="footer">
        <div className="footer-wrapper">
            <div id="footer-div">
                <div id="footer-img">
                    <img src="/images/nav-logotext.png" alt="logo"></img>  
                </div>
                <br></br>
                <div id="address">
                    <p>
                    1 St Katherines Way, E1W 1UN
                    <br></br>
                    London, United Kingdom
                    <br></br>
                    <a href="mailto:contact@oloid.ventures" target="_blank" rel="noreferrer">
                        contact@oloid.ventures</a>
                    </p>
                </div>
                
                <a href="https://linkedin.com/company/oloid-ventures" target="_blank" rel="noreferrer" style={{margin: "5px"}}><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://twitter.com/oloidventures" target="_blank" rel="noreferrer" style={{margin: "5px"}}><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
        </div>
    </footer>
  );
}

export default Footer;