import React from "react";
import PropTypes from "prop-types";

function KnowledgeCheckFeedback({ feedback }) {
  return <p className="knowledge-check__feedback">{feedback}</p>;
}

KnowledgeCheckFeedback.propTypes = {
  feedback: PropTypes.string,
};

export default KnowledgeCheckFeedback;
