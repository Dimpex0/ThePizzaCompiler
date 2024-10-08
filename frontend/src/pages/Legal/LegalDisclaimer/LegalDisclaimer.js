import React from "react";
import "../global-legal.css";

export default function LegalDisclaimerPage() {
  return (
    <>
      <section className="legal-header">
        <h1>Legal Disclaimer</h1>
      </section>

      <section className="legal-section">
        <p>
          This is a demo website designed to showcase the functionality of a
          pizza ordering platform. It does not represent a real pizza delivery
          service.
        </p>

        <p>
          All content, including menu items, prices, and order processing, is
          for demonstration purposes only. No actual transactions, payments, or
          deliveries are made through this site.
        </p>

        <p>
          If you have any questions, feel free to reach out to us at{" "}
          <a href="mailto:mitkodd2005@gmail.com">mitkodd2005@gmail.com</a>.
        </p>
      </section>
    </>
  );
}
