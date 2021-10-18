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
  _id: PropTypes.string,
  text: PropTypes.string,
  isCorrect: PropTypes.bool,
  selected: PropTypes.bool,
};

export const knowledgeCheck = {
  question,
  answers: PropTypes.arrayOf(answer),
  feedback: PropTypes.string,
  isCorrect: PropTypes.bool,
  hasResponded: PropTypes.bool,
  _id: PropTypes.string,
};
