import { useEffect, useState } from "react";
import "./index.css";

const API = import.meta.env.VITE_API_URL || "";

interface LandingPageProps {
  onSessionStart: (sessionId: string) => void;
}

function LandingPage({ onSessionStart }: LandingPageProps) {
  const [sessionInput, setSessionInput] = useState("");
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [serverOnline, setServerOnline] = useState(true);

  useEffect(() => {
    fetch(`${API}/health`)
      .then((res) => setServerOnline(res.ok))
      .catch(() => setServerOnline(false));
  }, []);

  const handleCreate = async () => {
    setError("");
    setCreating(true);
    try {
      const res = await fetch(`${API}/session`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const data = await res.json();
      onSessionStart(data.sessionId);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create session"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleJoin = async () => {
    const trimmed = sessionInput.trim();
    if (!trimmed) {
      setError("Please enter a session ID");
      return;
    }
    setError("");
    setJoining(true);
    try {
      const res = await fetch(`${API}/session/${trimmed}`);
      if (!res.ok) {
        throw new Error("Session not found");
      }
      onSessionStart(trimmed);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to join session"
      );
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-card">
        <h1>Quick Tabletop</h1>
        <button onClick={handleCreate} disabled={creating || !serverOnline}>
          {creating ? "Creating..." : "Create Session"}
        </button>
        <div className="landing-divider">
          <span>or</span>
        </div>
        <div className="join-section">
          <input
            type="text"
            placeholder="Enter session ID"
            value={sessionInput}
            onChange={(e) => setSessionInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJoin()}
          />
          <button onClick={handleJoin} disabled={joining || !serverOnline}>
            {joining ? "Joining..." : "Join Session"}
          </button>
        </div>
        {!serverOnline && (
          <div className="landing-error">Server is offline — start the engine and refresh</div>
        )}
        {error && <div className="landing-error">{error}</div>}
      </div>
    </div>
  );
}

export default LandingPage;
