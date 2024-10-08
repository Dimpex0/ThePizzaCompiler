import React from "react";
import "../global-legal.css";

export default function TermsAndConditionsPage() {
  return (
    <>
      <section className="legal-header">
        <h1>Terms and Conditions</h1>
        <p>Last Updated: 10/08/2024</p>
      </section>
      <section className="legal-section">
        <h2>1. Demo Purpose</h2>
        <p>
          This website is a demo and does not provide any real services or
          products. All information, including menu items and prices, is for
          illustrative purposes only.
        </p>

        <h2>2. No Orders or Deliveries</h2>
        <p>
          No actual orders or payments can be placed through this Website. Any
          functionality related to ordering or payments is purely for
          demonstration purposes.
        </p>

        <h2>3. Intellectual Property</h2>
        <p>
          All content on this Website, including images, text, logos, and
          designs, is protected by copyright and intellectual property laws. You
          may not reproduce or use any content without permission.
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          We are not liable for any issues, losses, or misunderstandings arising
          from the use of this demo Website.
        </p>

        <h2>5. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Any changes
          will be posted on this page.
        </p>

        <p>
          If you have any questions, feel free to contact us at{" "}
          <a href="mailto:mitkodd2005@gmail.com">mitkodd2005@gmail.com</a>.
        </p>
      </section>
    </>
  );
}
