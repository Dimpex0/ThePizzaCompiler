import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyTransaction } from "../../utils/payment";
import { useCartStore } from "../../store/cart";

import "./SuccessPayment.css";

export default function SuccessPaymentPage() {
  const resetCart = useCartStore((state) => state.reset);
  const [statusText, setStatusText] = useState("Verifying transaction...");
  const [countdown, setCountdown] = useState(3);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const transactionId = searchParams.get("t");
  const orderCode = searchParams.get("s");

  useEffect(() => {
    async function checkTrans() {
      try {
        const response = await verifyTransaction(transactionId, orderCode);
        if (response.ok) {
          resetCart();
          setStatusText("Creating order");
        } else {
          setStatusText("Couldn't verify transaction.");
        }
      } catch {
        setStatusText("Couldn't verify transaction.");
      }
    }
    checkTrans();
  }, [resetCart, transactionId]);

  useEffect(() => {
    if (countdown === 0 && statusText === "Creating order") {
      navigate("/");
    }

    if (statusText === "Couldn't verify transaction.") {
      navigate("/cart");
    }

    let timer;
    if (statusText === "Creating order") {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown, setCountdown, statusText]);

  return (
    <section className="success-page">
      <h1>Successful payment</h1>
      <div className="icon-container">
        <i class="fa-solid fa-receipt"></i>
      </div>
      <p>{statusText}</p>
      {statusText === "Creating order" && (
        <p>Redirecting to order tracking {countdown}...</p>
      )}
    </section>
  );
}
