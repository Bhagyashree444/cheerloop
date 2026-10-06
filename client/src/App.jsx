import { useState } from "react";
import "./App.css";

const cheers = [
  {
    id: 1,
    sender: "Sammi",
    message: "You've got this! One mile at a time! 🏃‍♀️",
    duration: "0:18",
    approved: true,
  },
  {
    id: 2,
    sender: "Zack",
    message: "Keep pushing! Your training is paying off!",
    duration: "0:14",
    approved: true,
  },
];

const pendingCheers = [
  {
    id: 3,
    sender: "Taylor",
    message: "Remember why you started. Go get that finish line! 💪",
    duration: "0:16",
  },
];

function App() {
  const [active, setActive] = useState(0);
  const [playlist, setPlaylist] = useState(cheers);
  const [pending, setPending] = useState(pendingCheers);
  const [isPlaying, setIsPlaying] = useState(false);

  const approveCheer = (id) => {
    const cheer = pending.find((item) => item.id === id);

    if (cheer) {
      setPlaylist([...playlist, { ...cheer, approved: true }]);
      setPending(pending.filter((item) => item.id !== id));
    }
  };

  const rejectCheer = (id) => {
    setPending(pending.filter((item) => item.id !== id));
  };

  const nextCheer = () => {
    setActive((active + 1) % playlist.length);
    setIsPlaying(true);
  };

  const previousCheer = () => {
    setActive((active - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <span>♥</span> CheerLoop
        </div>

        <nav>
          <button className="nav-item active">🏃 Dashboard</button>
          <button className="nav-item">🎧 My Cheers</button>
          <button className="nav-item">🏆 Supporters</button>
        </nav>

        <div className="profile">
          <div className="avatar">B</div>
          <div>
            <strong>Bhagyashree</strong>
            <small>Runner</small>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR NEXT CHALLENGE</p>
            <h1>San Jose 5K</h1>
            <p className="muted">Your people are cheering for you.</p>
          </div>

          <button className="send-button">＋ Send a Cheer</button>
        </header>

        <section className="race-card">
          <div>
            <p className="eyebrow">RACE DAY</p>
            <h2>You've got this, Bhagyashree! 💜</h2>
            <p>Every voice in your CheerLoop is here to remind you:</p>
            <strong>KEEP SHOWING UP.</strong>
          </div>

          <div className="race-stats">
            <div>
              <strong>5K</strong>
              <span>Distance</span>
            </div>
            <div>
              <strong>45:00</strong>
              <span>Goal</span>
            </div>
            <div>
              <strong>{playlist.length}</strong>
              <span>Cheers</span>
            </div>
          </div>
        </section>

        <div className="content-grid">
          <section className="playlist-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR PLAYLIST</p>
                <h2>CheerLoop</h2>
              </div>
              <span className="count">{playlist.length} approved</span>
            </div>

            <div className="player">
              <div className="player-icon">🎙️</div>

              <div className="player-info">
                <small>NOW PLAYING</small>
                <h3>{playlist[active]?.sender}</h3>
                <p>{playlist[active]?.message}</p>
              </div>

              <div className="controls">
                <button onClick={previousCheer}>⏮</button>
                <button
                  className="play"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? "Ⅱ" : "▶"}
                </button>
                <button onClick={nextCheer}>⏭</button>
              </div>
            </div>

            <div className="cheer-list">
              {playlist.map((cheer, index) => (
                <div
                  className={`cheer-row ${index === active ? "selected" : ""}`}
                  key={cheer.id}
                  onClick={() => setActive(index)}
                >
                  <div className="mini-play">
                    {index === active && isPlaying ? "🔊" : "▶"}
                  </div>

                  <div className="cheer-text">
                    <strong>{cheer.sender}</strong>
                    <span>{cheer.message}</span>
                  </div>

                  <span className="duration">{cheer.duration}</span>
                </div>
              ))}
            </div>
          </section>

          <aside className="pending-card">
            <div className="section-heading">
              <div>
                <p className="eyebrow">INBOX</p>
                <h2>Pending Cheers</h2>
              </div>
              <span className="badge">{pending.length}</span>
            </div>

            <p className="muted">
              Approve a cheer before it joins your playlist.
            </p>

            {pending.length === 0 ? (
              <div className="empty">
                <span>✨</span>
                <p>No pending cheers!</p>
              </div>
            ) : (
              pending.map((cheer) => (
                <div className="pending-item" key={cheer.id}>
                  <div className="pending-avatar">
                    {cheer.sender[0]}
                  </div>

                  <div className="pending-content">
                    <strong>{cheer.sender}</strong>
                    <p>{cheer.message}</p>

                    <div className="pending-actions">
                      <button
                        className="approve"
                        onClick={() => approveCheer(cheer.id)}
                      >
                        ✓ Approve
                      </button>

                      <button
                        className="reject"
                        onClick={() => rejectCheer(cheer.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;