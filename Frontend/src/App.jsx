import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [question, setQuestion] = useState("");
  const [memoryAnswer, setMemoryAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const meetings = [
    {
      name: "AI Project Discussion",
      date: "06 June 2026",
      time: "10:30 AM",
      icon: "👥",
    },
    {
      name: "Product Roadmap Meeting",
      date: "05 June 2026",
      time: "04:00 PM",
      icon: "💼",
    },
    {
      name: "Marketing Strategy Call",
      date: "04 June 2026",
      time: "11:15 AM",
      icon: "📢",
    },
    {
      name: "Dev Team Standup",
      date: "03 June 2026",
      time: "09:00 AM",
      icon: "💻",
    },
  ];

  const openAnalyzer = (meetingText = "") => {
    setTranscript(meetingText);
    setPage("analyze");
  };

  const analyzeMeeting = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:8080/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript }),
    });

    const data = await res.json();
    setAnalysis(data);
    setLoading(false);
  };

  const askMemory = async () => {
    const res = await fetch("http://localhost:8080/api/memory/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.text();
    setMemoryAnswer(data);
  };

  if (page === "home") {
    return (
      <div className="home-page">
        <nav className="navbar">
          <div className="brand">
            <div className="logo">🧠</div>
            <div>
              <h2>MeetMind OS</h2>
              <p>AI Meeting Intelligence</p>
            </div>
          </div>

          <div className="nav-links">
            <button className="active">Home</button>
            <button onClick={() => openAnalyzer()}>Analyze Meeting</button>
            <button onClick={() => openAnalyzer()}>Memory</button>
            <button>About</button>
          </div>

          <div className="profile">
            <span>🌙</span>
            <div className="avatar">A</div>
            <b>Anay</b>
          </div>
        </nav>

        <section className="hero-section">
          <div className="hero-left">
            <h1>
              Welcome to <br />
              <span>MeetMind OS</span>
            </h1>

            <p>
              Voice-first meeting intelligence with persistent AI memory.
            </p>

            <p>
              Upload or paste your meeting transcript and let AI generate
              summaries, tasks, decisions, risks and more.
            </p>

            <div className="hero-buttons">
              <button onClick={() => openAnalyzer()}>
                ✨ Analyze New Meeting
              </button>

              <button className="secondary" onClick={() => openAnalyzer()}>
                🔍 Ask Memory
              </button>
            </div>

            <div className="feature-pills">
              <span>✦ AI Powered</span>
              <span>🧠 Persistent Memory</span>
              <span>📊 Smart Analysis</span>
              <span>🛡 Secure & Private</span>
            </div>
          </div>

          <div className="hero-right">
            <div className="brain-circle">🧠</div>
            <div className="floating icon1">📄</div>
            <div className="floating icon2">📊</div>
            <div className="floating icon3">👥</div>
            <div className="floating icon4">✅</div>
          </div>
        </section>

        <section className="recent-section">
          <div className="recent-header">
            <h2>📅 Recent Meetings</h2>
            <p>View All →</p>
          </div>

          <div className="meeting-grid">
            {meetings.map((meeting, index) => (
              <div
                className="meeting-card"
                key={index}
                onClick={() =>
                  openAnalyzer(
                    `Meeting: ${meeting.name}. Date: ${meeting.date}. Time: ${meeting.time}. Today we discussed AI project. Rahul will prepare presentation. Deadline is Friday.`
                  )
                }
              >
                <div className="meeting-icon">{meeting.icon}</div>
                <h3>{meeting.name}</h3>
                <p>📅 {meeting.date}</p>
                <p>🕒 {meeting.time}</p>
                <span>Analyzed</span>
              </div>
            ))}
          </div>
        </section>

        <footer>© 2026 MeetMind OS. Built with ❤️ for smarter teams.</footer>
      </div>
    );
  }

  return (
    <div className="page">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      <div className="hero">
        <h1>MeetMind OS</h1>
        <p className="subtitle">
          Voice-first meeting intelligence with persistent AI memory.
        </p>
      </div>

      <section className="panel">
        <div className="section-title">
          <h2>Meeting Transcript</h2>
          <p>
            Paste or record your meeting text and convert it into action-ready
            intelligence.
          </p>
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