import React from "react";
import logoImg from "../../assets/images/logo/Pizza slice with brackets.png";

import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <img src={logoImg} alt="logo" />
      <h4>The pizza compiler</h4>
      <div className="footer-container">
        <div className="footer-legal">
          <p>Legal pages</p>
          <Link to="/legal/privacy-policy">Privacy Policy</Link>
          <Link to="/legal/terms-and-conditions">Terms and Conditions</Link>
          <Link to="/legal/cookie-policy">Cookie Policy</Link>
          <Link to="/legal/legal-disclaimer">Legal Disclaimer</Link>
        </div>
        <div className="divider"></div>
        <div className="footer-contacts">
          <p>Contacts</p>
          <div className="footer-icons">
            <a
              href="https://github.com/Dimpex0"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="mailto:mitkodd2005@gmail.com">
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/dimitar-dimitrov-441834267/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
