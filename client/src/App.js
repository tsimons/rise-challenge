import "./app.css";
import KnowledgeChecks from "./blocks/knowledge-check/knowledge-check.container";

function App() {
  return (
    <div className="app">
      <h2 className="app__h2">Knowledge Checks</h2>
      <section className="app__knowledge-checks">
        <KnowledgeChecks />
      </section>
    </div>
  );
}

export default App;
