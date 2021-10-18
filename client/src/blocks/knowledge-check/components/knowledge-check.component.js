import React, { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ErrorBanner from "../../../components/error-banner/error-banner.component";

import { knowledgeCheck } from "../knowledge-check.prop-types";
import KnowledgeCheckMedia from "./knowledge-check-media.component";
import KnowledgeCheckFeedback from "./knowledge-check-feedback.component";

import "../knowledge-check.css";

function KnowledgeCheck({
  knowledgeCheck,
  knowledgeCheck: { question, answers, feedback, hasResponded },
  chooseAnswer,
  removeAnswer,
  saving,
  error,
}) {
  const [clientSelection, setSelection] = useState(null);
  const clickChoose = useCallback(
    (e) => {
      e.preventDefault();

      chooseAnswer({
        answerId: clientSelection,
        knowledgeCheckId: knowledgeCheck._id,
      });
    },
    [clientSelection, chooseAnswer, knowledgeCheck._id]
  );
  const formEl = useRef();
  const clearForm = useCallback(() => {
    formEl.current.reset();
  }, [formEl]);

  return (
    <section
      className={classNames("knowledge-check", {
        "knowledge-check--saving": saving,
      })}
    >
      {error && <ErrorBanner>{error}</ErrorBanner>}

      <div className="knowledge-check__heading-container">
        <h3 className="knowledge-check__heading">{question.text}</h3>
      </div>

      <div className="knowledge-check__media-container">
        <KnowledgeCheckMedia {...question.media} />
      </div>

      <form onSubmit={clickChoose} ref={formEl}>
        <ul className="knowledge-check__answers">
          {answers.map(({ text, selected, _id }) => {
            const checked =
              clientSelection === _id || (!clientSelection && selected);
            return (
              <li
                className={classNames("knowledge-check__answer", {
                  "knowledge-check__answer--chosen": checked,
                })}
              >
                <label className="knowledge_check-answer-label">
                  <input
                    type="radio"
                    name={`${knowledgeCheck._id}-answers`}
                    onChange={(e) => setSelection(_id)}
                    checked={checked}
                    className="knowledge_check-answer-radio"
                  />
                  {text}
                </label>
              </li>
            );
          })}
        </ul>

        <button
          className={classNames("knowledge-check__submit", {
            "knowledge-check__submit--disabled": !clientSelection,
          })}
          disabled={!clientSelection}
        >
          Submit
        </button>
      </form>

      {hasResponded && feedback && (
        <>
          <KnowledgeCheckFeedback feedback={feedback} />
          <button
            className="knowlede-check__retry"
            onClick={async () => {
              await removeAnswer({ knowledgeCheckId: knowledgeCheck._id });
              clearForm();
            }}
          >
            Try again?
          </button>
        </>
      )}
    </section>
  );
}

KnowledgeCheck.propTypes = {
  knowledgeCheck,
  chooseAnswer: PropTypes.func,
  removeAnswer: PropTypes.func,
  saving: PropTypes.bool,
  error: PropTypes.string,
};

export default KnowledgeCheck;
