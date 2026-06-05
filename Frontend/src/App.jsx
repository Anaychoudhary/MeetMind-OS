import { useState } from "react";
import "./App.css";

function App() {
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [question, setQuestion] = useState("");
  const [memoryAnswer, setMemoryAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeMeeting = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8080/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });
    const data = await res.json();
    setAnalysis(data);
    setLoading(false);
  };

  const askMemory = async () => {
    const res = await fetch("http://localhost:8080/api/memory/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.text();
    setMemoryAnswer(data);
  };

  return (
    <div className="page">
      <div className="hero">
        <span className="badge">Omi + Qdrant + Lyzr Ready</span>
        <h1>MeetMind OS</h1>
        <p className="subtitle">
          Voice-first meeting intelligence with persistent AI memory.
        </p>
      </div>

      <section className="panel">
        <div className="section-title">
          <h2>Meeting Transcript</h2>
          <p>Paste or record your meeting text and convert it into action-ready intelligence.</p>
        </div>

        <textarea
          placeholder="Example: Today we discussed AI project. Rahul will prepare presentation. Deadline is Friday."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />

        <button onClick={analyzeMeeting} disabled={!transcript || loading}>
          {loading ? "Analyzing..." : "Analyze Meeting"}
        </button>
      </section>

      {analysis && (
        <section className="grid">
          <div className="card wide">
            <span>Summary</span>
            <p>{analysis.summary}</p>
          </div>

          <div className="card">
            <span>Tasks</span>
            <ul>{analysis.tasks?.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </div>

          <div className="card">
            <span>Decisions</span>
            <ul>{analysis.decisions?.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </div>

          <div className="card">
            <span>Risks</span>
            <ul>{analysis.risks?.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </div>

          <div className="card">
            <span>Mood</span>
            <p className="mood">{analysis.mood}</p>
          </div>
        </section>
      )}

      <section className="panel memory">
        <div className="section-title">
          <h2>Ask Past Meeting Memory</h2>
          <p>Query Qdrant-powered memory across previous meeting transcripts.</p>
        </div>

        <div className="ask-row">
          <input
            placeholder="Ask: What is Rahul's task?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={askMemory} disabled={!question}>
            Ask Memory
          </button>
        </div>

        {memoryAnswer && (
          <div className="answer-box">
            <h3>Memory Answer</h3>
            <pre>{memoryAnswer}</pre>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;