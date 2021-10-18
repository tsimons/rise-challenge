import { useState, useEffect, useCallback } from "react";

export const useGetKnowledgeChecks = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateCheck = useCallback(
    (check) => {
      if (!data || !check._id) return;
      setData({
        ...data,
        knowledgeChecks: data.knowledgeChecks.map((c) =>
          check._id === c._id ? check : c
        ),
      });
    },
    [data, setData]
  );

  useEffect(() => {
    async function fetchKnowledgeChecks() {
      try {
        const res = await fetch("/api/v1/bff/knowledge-checks");
        const checks = await res.json();
        setData(checks);
      } catch (err) {
        setError(new Error("Could not connect to the server"));
      } finally {
        setLoading(false);
      }
    }

    fetchKnowledgeChecks();
  }, []); // run only once

  return {
    loading,
    error,
    data,
    updateCheck,
  };
};

export const useChooseAnswer = (updateCheck) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async ({ answerId, knowledgeCheckId, userId }) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/bff/answer-knowledge-check`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answerId, knowledgeCheckId, userId }),
        });

        const { knowledgeCheck, error } = await res.json();
        if (error) throw new Error(error);

        updateCheck(knowledgeCheck);
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, updateCheck]
  );

  return [{ loading, error }, request];
};

export const useRemoveAnswer = (updateCheck) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async ({ knowledgeCheckId, userId }) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/bff/remove-knowledge-check-response`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ knowledgeCheckId, userId }),
        });

        const { knowledgeCheck, error } = await res.json();
        if (error) throw new Error(error);

        updateCheck(knowledgeCheck);
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, updateCheck]
  );

  return [{ loading, error }, request];
};
