import React from "react";
import { Spin, Typography } from "antd";
import "./Loading.less";

function Loading() {
  return (
    <div className="loader-wrap">
      <Spin className="spinner" />
      <Typography.Text>استني بتحمل...</Typography.Text>
    </div>
  );
}

export default Loading;
