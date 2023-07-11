import React from "react";
import axios from "axios";
import "./DownloadButton.less";

function DownloadButton({ link }) {
  const downloadwatchHandler = () => {
    axios
      .get(link)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };
  return (
    <button
      onClick={downloadwatchHandler}
      type="button"
      className="downloadwatch-link"
    >
      شاهد او حمل
    </button>
  );
}

export default React.memo(DownloadButton);
