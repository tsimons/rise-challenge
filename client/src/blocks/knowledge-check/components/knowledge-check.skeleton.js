import React from "react";
import ContentLoader from "react-content-loader";

const KnowledgeCheckLoader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={600}
    viewBox="0 0 400 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="14" rx="0" ry="0" width="498" height="24" />
    <rect x="7" y="55" rx="0" ry="0" width="492" height="312" />
    <circle cx="18" cy="406" r="11" />
    <circle cx="18" cy="453" r="11" />
    <rect x="45" y="396" rx="0" ry="0" width="369" height="23" />
    <rect x="45" y="440" rx="0" ry="0" width="369" height="23" />
    <circle cx="19" cy="502" r="11" />
    <rect x="46" y="489" rx="0" ry="0" width="369" height="23" />
  </ContentLoader>
);

export default KnowledgeCheckLoader;
