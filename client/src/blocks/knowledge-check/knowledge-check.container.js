import React, { useCallback } from "react";

import {
  useGetKnowledgeChecks,
  useChooseAnswer,
  useRemoveAnswer,
} from "./knowledge-check.hooks";
import Skeleton from "./components/knowledge-check.skeleton";
import KnowledgeCheck from "./components/knowledge-check.component";

export default function KnowledgeCheckContainer() {
  const { loading, error, data, updateCheck } = useGetKnowledgeChecks();
  const [updateResponse, _chooseAnswer] = useChooseAnswer(updateCheck);
  const [removeResponse, _removeAnswer] = useRemoveAnswer(updateCheck);

  const chooseAnswer = useCallback(
    (props) =>
      _chooseAnswer({
        ...props,
        userId: data.user._id,
      }),
    [data, _chooseAnswer]
  );

  const removeAnswer = useCallback(
    (props) =>
      _removeAnswer({
        ...props,
        userId: data.user._id,
      }),
    [data, _removeAnswer]
  );

  if (loading) return <Skeleton />;

  console.error(error || data.error);

  if (error || data.error) return <pre>{error || data.error}</pre>;

  return data.knowledgeChecks.map((kc) => (
    <KnowledgeCheck
      knowledgeCheck={kc}
      saving={updateResponse.loading || removeResponse.loading}
      error={data.error || updateResponse.error || removeResponse.error}
      chooseAnswer={chooseAnswer}
      removeAnswer={removeAnswer}
    />
  ));
}
