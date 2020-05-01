import { NextPage } from "next";
import { useEffect } from "react";

const Popup: NextPage = () => {
  useEffect(() => {
    const params = window.location.search;
    if (window.opener) {
      window.opener.postMessage(params);
      window.close();
    }
  }, []);
  return (
    <div>
      <h1>playlist goes here</h1>
    </div>
  );
};

export default Popup;
