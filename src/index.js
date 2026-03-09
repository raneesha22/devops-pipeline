const express = require("express");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;
const START_TIME = Date.now();

app.get("/", (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - START_TIME) / 1000);
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>DevOps Pipeline — Live</title>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #0d1117;
          color: #e6edf3;
          font-family: 'JetBrains Mono', monospace;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .terminal {
          width: 100%;
          max-width: 680px;
          border: 1px solid #30363d;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(88,166,255,0.08);
        }
        .terminal-bar {
          background: #161b22;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid #30363d;
        }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .dot-r { background: #ff5f57; }
        .dot-y { background: #febc2e; }
        .dot-g { background: #28c840; }
        .terminal-title {
          margin-left: 8px;
          font-size: 12px;
          color: #8b949e;
          letter-spacing: 0.05em;
        }
        .terminal-body { padding: 28px 32px; background: #0d1117; }
        .line { margin-bottom: 10px; font-size: 14px; line-height: 1.6; }
        .prompt { color: #58a6ff; }
        .cmd    { color: #e6edf3; }
        .key    { color: #79c0ff; }
        .val    { color: #a5d6ff; }
        .green  { color: #56d364; }
        .yellow { color: #e3b341; }
        .muted  { color: #8b949e; }
        .divider {
          border: none;
          border-top: 1px solid #30363d;
          margin: 20px 0;
        }
        .badge {
          display: inline-block;
          background: #1f6feb33;
          border: 1px solid #388bfd66;
          color: #58a6ff;
          padding: 2px 10px;
          border-radius: 99px;
          font-size: 11px;
          margin-bottom: 20px;
        }
        .blink { animation: blink 1.2s step-start infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      </style>
    </head>
    <body>
      <div class="terminal">
        <div class="terminal-bar">
          <div class="dot dot-r"></div>
          <div class="dot dot-y"></div>
          <div class="dot dot-g"></div>
          <span class="terminal-title">devops-pipeline — bash — deployed via GitHub Actions</span>
        </div>
        <div class="terminal-body">
          <div class="badge">● LIVE</div>

          <div class="line">
            <span class="prompt">$ </span>
            <span class="cmd">./status.sh</span>
          </div>

          <hr class="divider"/>

          <div class="line">
            <span class="key">hostname       </span>
            <span class="val">${os.hostname()}</span>
          </div>
          <div class="line">
            <span class="key">platform       </span>
            <span class="val">${os.platform()} ${os.arch()}</span>
          </div>
          <div class="line">
            <span class="key">node version   </span>
            <span class="val">${process.version}</span>
          </div>
          <div class="line">
            <span class="key">environment    </span>
            <span class="val">${process.env.NODE_ENV || "production"}</span>
          </div>
          <div class="line">
            <span class="key">port           </span>
            <span class="val">${PORT}</span>
          </div>

          <hr class="divider"/>

          <div class="line">
            <span class="key">uptime         </span>
            <span class="green">${hours}h ${minutes}m ${seconds}s</span>
          </div>
          <div class="line">
            <span class="key">memory (used)  </span>
            <span class="val">${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB</span>
          </div>
          <div class="line">
            <span class="key">cpu cores      </span>
            <span class="val">${os.cpus().length}</span>
          </div>
          <div class="line">
            <span class="key">load avg       </span>
            <span class="val">${os
              .loadavg()
              .map((n) => n.toFixed(2))
              .join(" | ")}</span>
          </div>

          <hr class="divider"/>

          <div class="line">
            <span class="key">container      </span>
            <span class="green">✓ running via Docker</span>
          </div>
          <div class="line">
            <span class="key">pipeline       </span>
            <span class="green">✓ deployed via GitHub Actions CI/CD</span>
          </div>
          <div class="line">
            <span class="key">cloud          </span>
            <span class="green">✓ hosted on AWS EC2</span>
          </div>

          <hr class="divider"/>

          <div class="line muted">
            <span class="prompt">$ </span>
            <span class="blink">█</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`[devops-pipeline] Server running on port ${PORT}`);
});
