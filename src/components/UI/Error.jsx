import React from "react";
import PropTypes from "prop-types";
import { Error as ErrorIcon } from "@material-ui/icons";
import { Result } from "antd";
import "./Error.less";

function Error({ title, message, ...others }) {
  const isTitle = title || null;
  return (
    <Result
      status="error"
      icon={<ErrorIcon />}
      title={isTitle}
      subTitle={message}
      {...others}
    />
  );
}

Error.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default Error;
