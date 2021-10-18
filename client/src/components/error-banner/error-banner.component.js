import React from "react";
import PropTypes from "prop-types";

import "./error-banner.css";

function ErrorBanner({ children }) {
  return <div className="error-banner">{children}</div>;
}

ErrorBanner.propTypes = {
  children: PropTypes.string,
};

export default ErrorBanner;
