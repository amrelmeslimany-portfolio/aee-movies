import React from "react";
import "./Accessories.less";
function Accessories() {
  return (
    <>
      <svg className="svgacc circle-top" width={400} height={400}>
        <circle cx="200" cy="200" r="200" fill="#543864" />
      </svg>
      <svg className="svgacc circle-bottom" width={400} height={400}>
        <circle cx="200" cy="200" r="200" fill="#ff4d4f" />
      </svg>
    </>
  );
}

export default Accessories;
