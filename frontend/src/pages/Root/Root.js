import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../utils/ScrollToTop";
import { useRef, useState } from "react";
import { Messages } from "primereact/messages";

export default function RootPage() {
  const msgs = useRef(null);
  const [messageClass, setMessageClass] = useState("");

  window.addGlobalMessage = (messages) => {
    msgs.current.show(messages);
    setMessageClass(messages[0].severity);

    // setTimeout(() => {
    //   msgs.current.clear();
    //   console.log("clear");
    // }, 3000);
  };

  return (
    <>
      <ScrollToTop />
      <div className={`messages-container ${messageClass}`}>
        <Messages ref={msgs} />
      </div>
      <MainNavigation />
      <Outlet />
      <Footer />
    </>
  );
}
