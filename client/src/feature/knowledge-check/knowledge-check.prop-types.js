import PropTypes from "prop-types";

export const media = {
  type: PropTypes.string,
  url: PropTypes.string,
};

export const question = {
  text: PropTypes.string,
  media,
};

export const answer = {
  text: PropTypes.string,
  isCorrect: PropTypes.bool,
  selected: PropTypes.bool,
};

export const KnowledgeCheck = {
  question,
  answers: PropTypes.arrayOf(answer),
  feedback: PropTypes.string,
  hasResponded: PropTypes.bool,
};
