import React from "react";
import "../global-legal.css";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="legal-header">
        <h1>Privacy Policy</h1>
        <p>Last Updated: 10/08/2024</p>
      </section>

      <section className="legal-section">
        <p>
          Welcome to our pizza delivery demo website ("ThePizzaCompiler").
          Please note that this website is for demonstration purposes only and
          does not provide any actual services or products.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          The only personal information we collect is session-related data
          required for authentication. We do not collect any other personal
          data.
        </p>

        <h2>2. Cookies</h2>
        <p>
          We use functional cookies for session authentication and login
          purposes only. These cookies are essential for the proper functioning
          of the website. No tracking or marketing cookies are used.
        </p>

        <h2>3. Data Sharing</h2>
        <p>
          No personal information is shared with third parties. Your session
          data is only used to simulate the functionality of a real pizza
          ordering service.
        </p>

        <h2>4. Data Retention</h2>
        <p>
          Session-related data is stored temporarily during your visit and
          deleted automatically when you close your browser or after a specified
          time.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You can disable cookies in your browser settings, but this may affect
          the functionality of the website.
        </p>

        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy. Any changes will be posted here.
        </p>

        <p>
          If you have any questions, please contact us at{" "}
          <a href="mailto:mitkodd2005@gmail.com">mitkodd2005@gmail.com</a>.
        </p>
      </section>
    </>
  );
}
