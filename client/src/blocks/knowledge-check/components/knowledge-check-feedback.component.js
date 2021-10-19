import React from "react";
import PropTypes from "prop-types";

const CorrectIndicator = () => (
  <>
    <span className="knowledge-check__status-icon knowledge-check__status-icon-correct">
      ✓
    </span>
    <p className="knowledge-check__status-text">Correct</p>
  </>
);

const InCorrectIndicator = () => (
  <>
    <span className="knowledge-check__status-icon knowledge-check__status-icon-incorrect">
      ˟
    </span>
    <p className="knowledge-check__status-text">Incorrect</p>
  </>
);

function KnowledgeCheckFeedback({ feedback, correct }) {
  return (
    <div className="knowledge-check__feedback">
      <div className="knowledge-check__feedback-status">
        {correct ? <CorrectIndicator /> : <InCorrectIndicator />}
      </div>
      <p className="knowledge-check__feedback-message">{feedback}</p>
    </div>
  );
}

KnowledgeCheckFeedback.propTypes = {
  feedback: PropTypes.string,
  correct: PropTypes.bool,
};

export default KnowledgeCheckFeedback;
