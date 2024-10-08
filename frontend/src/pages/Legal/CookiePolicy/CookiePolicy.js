import React from "react";
import "../global-legal.css";

export default function CookiePolicyPage() {
  return (
    <>
      <section className="legal-header">
        <h1>Cookie Policy</h1>
        <p>Last Updated: 10/08/2024</p>
      </section>

      <section className="legal-section">
        <p>
          This demo pizza website uses cookies that are essential for its
          functionality. By continuing to use the Website, you agree to the use
          of these cookies as described below.
        </p>

        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device to help websites
          provide a better user experience. Our Website uses only functional
          cookies that are necessary for authentication and maintaining your
          session.
        </p>

        <h2>2. Cookies We Use</h2>
        <ul>
          <li>
            <strong>Session Cookies:</strong> These cookies are used to manage
            your login session. They are deleted automatically when you close
            your browser.
          </li>
        </ul>

        <h2>3. Managing Cookies</h2>
        <p>
          You can manage and disable cookies in your browser settings. However,
          disabling cookies may affect the functionality of the Website,
          particularly session authentication.
        </p>

        <p>
          If you have any questions regarding our Cookie Policy, please contact
          us at <a href="mailto:mitkodd2005@gmail.com">mitkodd2005@gmail.com</a>
          .
        </p>
      </section>
    </>
  );
}
