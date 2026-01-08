<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Call for Support — README</title>
  <style>
    :root{
      --bg:#0b1220;
      --panel:#0f1a31;
      --panel2:#101f3a;
      --text:#e7eefc;
      --muted:#a9b7d6;
      --border:rgba(231,238,252,.12);
      --brand:#7c5cff;
      --brand2:#52e3c2;
      --warn:#f9c74f;
      --ok:#5eead4;
      --bad:#fb7185;
      --shadow: 0 16px 60px rgba(0,0,0,.35);
      --radius: 22px;
      --radius2: 28px;
      --max: 1020px;
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
      background:
        radial-gradient(1000px 600px at 18% 0%, rgba(124,92,255,.25), transparent 60%),
        radial-gradient(900px 520px at 88% 10%, rgba(82,227,194,.18), transparent 55%),
        radial-gradient(700px 420px at 55% 95%, rgba(249,199,79,.10), transparent 60%),
        linear-gradient(180deg, #070b14 0%, var(--bg) 70%);
      color:var(--text);
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
    }
    a{color:inherit}
    .wrap{max-width:var(--max); margin:0 auto; padding:28px 18px 64px}
    .top{
      position:sticky; top:0; z-index:50;
      backdrop-filter: blur(14px);
      background: rgba(7,11,20,.55);
      border-bottom:1px solid var(--border);
    }
    .topInner{
      max-width:var(--max); margin:0 auto;
      padding:14px 18px;
      display:flex; gap:12px; align-items:center; justify-content:space-between;
    }
    .brand{
      display:flex; align-items:center; gap:10px; font-weight:900; letter-spacing:-.02em;
    }
    .dot{
      width:11px; height:11px; border-radius:999px;
      background:linear-gradient(135deg,var(--brand),var(--brand2));
      box-shadow: 0 0 0 8px rgba(124,92,255,.14);
    }
    .pillRow{display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end}
    .pill{
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 11px; border-radius:999px;
      border:1px solid var(--border);
      background: rgba(255,255,255,.04);
      color:var(--text);
      font-size:13px; font-weight:800;
    }
    .pill small{font-weight:800; color:var(--muted)}
    .hero{
      margin-top:18px;
      border:1px solid var(--border);
      border-radius:var(--radius2);
      background:
        linear-gradient(135deg, rgba(124,92,255,.14), rgba(82,227,194,.08)),
        rgba(255,255,255,.03);
      box-shadow: var(--shadow);
      overflow:hidden;
      position:relative;
    }
    .heroInner{padding:26px 22px}
    h1{
      margin:0;
      font-size: clamp(26px, 3.8vw, 42px);
      letter-spacing:-.03em;
      line-height:1.05;
    }
    .sub{
      margin:12px 0 0;
      color:var(--muted);
      font-size: clamp(14px, 1.9vw, 17px);
      line-height:1.55;
      max-width: 70ch;
    }
    .ctaRow{display:flex; gap:12px; flex-wrap:wrap; margin-top:18px}
    .btn{
      border:1px solid var(--border);
      background: rgba(255,255,255,.04);
      color:var(--text);
      padding:12px 14px;
      border-radius:16px;
      font-weight:900;
      text-decoration:none;
      display:inline-flex; align-items:center; gap:10px;
      transition: transform .12s ease, background .12s ease, border-color .12s ease;
    }
    .btn:hover{transform:translateY(-1px); background: rgba(255,255,255,.06)}
    .btnPrimary{
      border-color: rgba(124,92,255,.35);
      background: linear-gradient(135deg, rgba(124,92,255,.95), rgba(82,227,194,.55));
      color:#06101f;
    }
    .btnPrimary:hover{background: linear-gradient(135deg, rgba(124,92,255,1), rgba(82,227,194,.65))}
    .grid{display:grid; gap:14px; margin-top:16px}
    @media(min-width: 920px){ .grid2{grid-template-columns: 1fr 1fr} }
    .card{
      border:1px solid var(--border);
      border-radius:var(--radius);
      background: rgba(255,255,255,.03);
      box-shadow: 0 10px 40px rgba(0,0,0,.22);
      padding:18px 18px;
    }
    .card.soft{background: rgba(255,255,255,.035)}
    .card h2{
      margin:0 0 8px;
      font-size:18px;
      letter-spacing:-.01em;
    }
    .card p{margin:0; color:var(--muted); line-height:1.6}
    .hr{height:1px; background:var(--border); border:0; margin:14px 0}
    ul{margin:10px 0 0; padding-left:18px; color:var(--text)}
    li{margin:7px 0; color:var(--muted); line-height:1.55}
    li b{color:var(--text)}
    .tagRow{display:flex; flex-wrap:wrap; gap:8px; margin-top:12px}
    .tag{
      font-size:12px; font-weight:900; letter-spacing:.01em;
      border:1px solid var(--border);
      border-radius:999px;
      padding:7px 10px;
      color:var(--text);
      background: rgba(255,255,255,.04);
    }
    .tag.ok{border-color: rgba(94,234,212,.25); background: rgba(94,234,212,.10)}
    .tag.warn{border-color: rgba(249,199,79,.25); background: rgba(249,199,79,.10)}
    .tag.bad{border-color: rgba(251,113,133,.25); background: rgba(251,113,133,.10)}
    .sectionTitle{
      margin:26px 0 10px;
      display:flex; align-items:flex-end; justify-content:space-between; gap:12px;
    }
    .sectionTitle h3{
      margin:0;
      font-size:16px;
      letter-spacing:.08em;
      text-transform:uppercase;
      color:rgba(231,238,252,.85);
    }
    .sectionTitle span{color:var(--muted); font-size:13px}
    .kpi{
      display:grid; gap:10px;
    }
    @media(min-width: 720px){ .kpi{grid-template-columns: repeat(3,1fr);} }
    .kpi .box{
      border:1px solid var(--border);
      border-radius:18px;
      background: rgba(255,255,255,.03);
      padding:14px 14px;
    }
    .kpi .big{font-size:18px; font-weight:950; letter-spacing:-.02em}
    .kpi .small{color:var(--muted); font-size:13px; margin-top:6px; line-height:1.45}
    code, pre{
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 12.5px;
    }
    pre{
      margin:12px 0 0;
      padding:14px;
      border-radius:16px;
      border:1px solid var(--border);
      background: rgba(0,0,0,.28);
      overflow:auto;
      color: rgba(231,238,252,.92);
      line-height:1.55;
    }
    .foot{
      margin-top:26px;
      padding:16px;
      border-radius:18px;
      border:1px solid var(--border);
      background: rgba(255,255,255,.03);
      color:var(--muted);
      line-height:1.6;
      font-size:13px;
    }
  </style>
</head>

<body>
  <div class="top">
    <div class="topInner">
      <div class="brand">
        <span class="dot"></span>
        <span>Call for Support • README</span>
      </div>
      <div class="pillRow">
        <span class="pill">🌕 Deadline <small>1 Feb 2026 • 23:09 (MEZ)</small></span>
        <span class="pill">🔒 NDA-first</span>
        <span class="pill">🌍 NL / EN</span>
        <span class="pill">👤 Solo Dev Only</span>
      </div>
    </div>
  </div>

  <div class="wrap">
    <section class="hero">
      <div class="heroInner">
        <h1>Two partners. One turnaround.<br/>Proof, not promises.</h1>
        <p class="sub">
          This README merges the full story and product spec from the entire conversation:
          the why, the deal, the roles, the structure, the flows, the cards, and the plan—anchored to a hard deadline:
          <b>🌕 Sunday, 1 February 2026 (23:09 MEZ)</b>.
        </p>

        <div class="ctaRow">
          <a class="btn btnPrimary" href="#roles">Choose a role →</a>
          <a class="btn" href="#app">App structure</a>
          <a class="btn" href="#flows">Userflows</a>
          <a class="btn" href="#deadline">Plan to deadline</a>
        </div>

        <div class="tagRow">
          <span class="tag ok">Calm urgency</span>
          <span class="tag ok">Transparency dashboard</span>
          <span class="tag ok">Mentorship → independence</span>
          <span class="tag warn">Two apps first</span>
          <span class="tag warn">MVP before features</span>
          <span class="tag bad">No teams / no agencies</span>
        </div>
      </div>
    </section>

    <div class="sectionTitle">
      <h3>Executive summary</h3>
      <span>What this is, in one glance</span>
    </div>

    <section class="kpi">
      <div class="box">
        <div class="big">Goal</div>
        <div class="small">Break the loop and ship <b>two proof apps</b> with the right partners.</div>
      </div>
      <div class="box">
        <div class="big">Need</div>
        <div class="small"><b>1 financial support partner</b> + <b>1 solo developer/mentor</b>.</div>
      </div>
      <div class="box">
        <div class="big">Deadline</div>
        <div class="small"><b>1 Feb 2026 • 23:09 (MEZ)</b> — “complete, showable, closed”.</div>
      </div>
    </section>

    <div class="sectionTitle" id="story">
      <h3>The story</h3>
      <span>Architect energy + months of fighting + need for a bridge</span>
    </div>

    <section class="grid">
      <div class="card">
        <h2>What happened</h2>
        <p>
          I did not underestimate building apps. I fought hard—daily—across tools, tutorials, and AI coding environments.
          I gathered mountains of material: chats full of app ideas, Raindrops full of tutorials, and 90+ repos with broken code.
          The problem wasn’t motivation. It was the combination of <b>no reliable execution bridge</b> + <b>financial pressure</b> + <b>mental overload</b>.
        </p>
        <hr class="hr"/>
        <p>
          Result: circles, burnout, and losing confidence—not because I’m lazy, but because I pushed far beyond a human limit.
          What can save me now is <b>visible results</b>.
        </p>
      </div>

      <div class="card soft">
        <h2>My real talent</h2>
        <p>
          My strength is fast, deep product thinking: app concepts, feature updates, systems design, and brainstorming with AI
          that becomes exponential. I’m the <b>architect</b>.
        </p>
        <ul>
          <li><b>Ideas:</b> constant and high-quality</li>
          <li><b>Vision:</b> lifemanagement + IdeaFabric as a compounding stack</li>
          <li><b>Need:</b> a bridge from blueprint → shipped product</li>
        </ul>
        <div class="tagRow">
          <span class="tag ok">Architect</span>
          <span class="tag ok">Ideation velocity</span>
          <span class="tag warn">Execution bridge needed</span>
        </div>
      </div>
    </section>

    <div class="sectionTitle" id="not-hype">
      <h3>Positioning</h3>
      <span>Not a hype project — serious collaboration</span>
    </div>

    <section class="grid grid2">
      <div class="card">
        <h2>What this is NOT</h2>
        <p>
          This is not “apps are easy” and it’s not “AI will do everything”.
          I’m not chasing quick riches. I’ve paid the price of months of effort with too little proof.
          The ask is not charity—this is a structured collaboration with transparency and written terms.
        </p>
        <div class="tagRow">
          <span class="tag bad">Not get-rich-quick</span>
          <span class="tag bad">Not naive about complexity</span>
          <span class="tag ok">Trust + structure</span>
        </div>
      </div>

      <div class="card soft">
        <h2>The symbolic quartet</h2>
        <p>
          The “magic” happens when four forces align:
          <b>Me (architect)</b>, <b>Solo Developer (builder/mentor)</b>, <b>Financial partner (breathing room)</b>, and <b>AI (leverage)</b>.
          Together, we turn scattered effort into shipped proof and a compounding system.
        </p>
      </div>
    </section>

    <div class="sectionTitle" id="roles">
      <h3>The deal</h3>
      <span>Two roles • clear rewards • NDA-first</span>
    </div>

    <section class="grid grid2">
      <div class="card">
        <h2>Role 1 — Financial Support Partner</h2>
        <p>
          Temporary financial breathing room to clear immediate pressure and unlock focus.
          In return: long-term upside with transparency.
        </p>
        <ul>
          <li><b>Lifetime 20%</b> on every app I bring to market <i>(net revenue definition, subject to written agreement)</i></li>
          <li><b>Transparent revenue dashboard</b> (subscriptions / platform fees visibility)</li>
          <li><b>Repayment-first</b> principle can be included (priority until amount is repaid)</li>
          <li><b>NDA + optional joint venture</b></li>
        </ul>
        <div class="tagRow">
          <span class="tag ok">20% lifetime (net)</span>
          <span class="tag ok">Transparency</span>
          <span class="tag warn">Written agreement</span>
        </div>
      </div>

      <div class="card">
        <h2>Role 2 — Solo Developer / Mentor</h2>
        <p>
          A single trusted builder who is AI-native and can mentor me daily in “vibe coding”.
          The goal is knowledge transfer: I become independent over time.
        </p>
        <ul>
          <li><b>Revenue split</b> on apps we actively build together <i>(per-project, written agreement)</i></li>
          <li><b>Daily short support</b> (check-ins, pairing, reviews)</li>
          <li><b>AI-native</b>: agentic patterns, MCP awareness, n8n workflows</li>
          <li><b>Solo only</b> — no agencies / no teams</li>
        </ul>
        <div class="tagRow">
          <span class="tag ok">Mentor mindset</span>
          <span class="tag ok">Agentic AI</span>
          <span class="tag ok">n8n workflows</span>
          <span class="tag bad">No team</span>
        </div>
      </div>
    </section>

    <div class="sectionTitle" id="requirements">
      <h3>Developer profile</h3>
      <span>High-signal filter</span>
    </div>

    <section class="grid grid2">
      <div class="card soft">
        <h2>Must-haves</h2>
        <ul>
          <li><b>Solo developer</b>, not a team</li>
          <li><b>AI-native daily workflow</b> (AI-assisted coding is normal)</li>
          <li><b>Agentic AI mindset</b> + curiosity about MCPs</li>
          <li><b>n8n workflows</b> (automation thinking)</li>
          <li><b>Vibe coding</b> + mentoring energy</li>
          <li><b>Timezone alignment</b> preferred</li>
          <li><b>Trustworthiness</b> is non-negotiable</li>
        </ul>
      </div>

      <div class="card">
        <h2>Nice-to-haves</h2>
        <ul>
          <li><b>ADHD empathy</b> (shared experience helps)</li>
          <li><b>Visionary mindset</b> (sees long-term compounding)</li>
          <li>Comfort with building an “Idea Vault” system</li>
          <li>Enjoys pairing, teaching, and shipping MVPs</li>
        </ul>
        <hr class="hr"/>
        <p><b>Core rule:</b> when I need help, I need it. Not half-way. Not “later.” We ship.</p>
      </div>
    </section>

    <div class="sectionTitle" id="two-apps">
      <h3>The proof</h3>
      <span>Two apps first</span>
    </div>

    <section class="grid grid2">
      <div class="card">
        <h2>App 1 — Lifemanagement stack</h2>
        <p>
          A focused system to restore structure and stability. Without automation and a minimal AI layer,
          it becomes months of “monk work.” With the stack, it becomes manageable and compounding.
        </p>
        <div class="tagRow">
          <span class="tag warn">Structure first</span>
          <span class="tag ok">Automation</span>
          <span class="tag ok">Daily stability</span>
        </div>
      </div>

      <div class="card">
        <h2>App 2 — IdeaFabric</h2>
        <p>
          A portable “idea blueprint machine” (Expo app) always with me:
          capture ideas, refine, blueprint, iterate, and keep everything in one searchable vault.
          This becomes the bootstrap engine for every future app.
        </p>
        <div class="tagRow">
          <span class="tag ok">Idea vault</span>
          <span class="tag ok">Blueprints</span>
          <span class="tag warn">Compounding</span>
        </div>
      </div>
    </section>

    <div class="sectionTitle" id="app">
      <h3>Call for Support app</h3>
      <span>Purpose, stack, pages, structure</span>
    </div>

    <section class="grid">
      <div class="card">
        <h2>Purpose</h2>
        <p>
          This app is a high-signal funnel to find exactly two partners before the deadline.
          It communicates the story credibly, qualifies candidates, enforces NDA-first, and collects applications.
        </p>
        <ul>
          <li><b>Convert</b> visitors into qualified applicants</li>
          <li><b>Filter</b> noise (no teams, no hype, high trust)</li>
          <li><b>Enforce</b> NDA before details</li>
          <li><b>Capture</b> role-specific data (skills/availability or support intent)</li>
        </ul>
      </div>

      <div class="card soft">
        <h2>Recommended stack (fast & solid)</h2>
        <ul>
          <li><b>Frontend:</b> Next.js or Vite + React • Tailwind CSS • optional shadcn/ui • Framer Motion</li>
          <li><b>Backend:</b> Supabase (DB + auth optional) • email notifications</li>
          <li><b>Automation:</b> n8n workflows (new application → notify → shortlist → schedule)</li>
          <li><b>Payments:</b> Wise link (simple now) • optional Stripe later</li>
        </ul>
      </div>
    </section>

    <div class="sectionTitle" id="pages">
      <h3>Pages</h3>
      <span>Minimal routes, maximum clarity</span>
    </div>

    <section class="grid grid2">
      <div class="card">
        <h2>Routes</h2>
        <pre>
/                    Landing
/roles               Role selection (Finance / Dev)
/nda                 NDA gate + signature
/apply?role=...      Application form (role-specific)
/donate              Wise link + optional donor wall
/done                Confirmation + next steps
/admin               Optional review dashboard
        </pre>
      </div>

      <div class="card soft">
        <h2>Core UI components</h2>
        <ul>
          <li>Topbar (brand + deadline badge)</li>
          <li>Hero + Cards (story + deal + credibility)</li>
          <li>Stepper (Landing → NDA → Apply)</li>
          <li>Buttons, Badges, Inputs, Toasts</li>
          <li>DonorWall (optional)</li>
        </ul>
      </div>
    </section>

    <div class="sectionTitle" id="flows">
      <h3>Userflows</h3>
      <span>Happy paths + fail paths</span>
    </div>

    <section class="grid grid2">
      <div class="card">
        <h2>Happy path — Developer</h2>
        <ul>
          <li>Landing → Roles → select <b>Solo Developer/Mentor</b></li>
          <li>NDA → sign</li>
          <li>Apply → dev-specific questions</li>
          <li>Done → confirmation</li>
          <li>Admin shortlist → meeting → written agreement → start shipping</li>
        </ul>
      </div>

      <div class="card">
        <h2>Happy path — Finance</h2>
        <ul>
          <li>Landing → Roles → select <b>Financial Support Partner</b></li>
          <li>NDA → sign</li>
          <li>Apply → support intent + structure</li>
          <li>Donate (optional) → Wise</li>
          <li>Admin shortlist → meeting → written agreement → dashboard setup</li>
        </ul>
      </div>

      <div class="card soft">
        <h2>Fail / drop-off handling</h2>
        <ul>
          <li>If NDA not signed → no sensitive details, offer donate (finance) + return to landing</li>
          <li>If application abandoned → optional autosave + gentle reminder via n8n</li>
          <li>If dev is team/agency → stop early, offer finance track or updates</li>
          <li>Respectful rejection workflow (short, clear, kind)</li>
        </ul>
      </div>

      <div class="card soft">
        <h2>Trust & safety baseline</h2>
        <ul>
          <li>NDA-first before roadmap or vault access</li>
          <li>“No guarantees” microcopy everywhere</li>
          <li>Clear boundaries: <b>MVP first, features later</b></li>
          <li>Respect & empathy as non-negotiables</li>
        </ul>
      </div>
    </section>

    <div class="sectionTitle" id="deadline">
      <h3>Deadline plan</h3>
      <span>🌕 1 February 2026 • 23:09 (MEZ)</span>
    </div>

    <section class="grid">
      <div class="card">
        <h2>Definition of “ready” on the deadline</h2>
        <p>Not perfect. <b>Complete, showable, closed.</b></p>
        <ul>
          <li><b>Call for Support app:</b> live + NDA + applications working</li>
          <li><b>IdeaFabric v1:</b> capture → structure → search → iterate (demo-ready)</li>
          <li><b>Lifemanagement v1:</b> minimal workflows that restore daily structure</li>
        </ul>
        <hr class="hr"/>
        <p><b>Rule:</b> ship MVP first. Add features only after the MVP is proven and stable.</p>
      </div>

      <div class="card soft">
        <h2>Phases to hit the date</h2>
        <ul>
          <li><b>Phase 1 — Stabilize:</b> stop tool-hopping, lock scope, lock deadline</li>
          <li><b>Phase 2 — Define MVP:</b> clear “done” for the two proof apps</li>
          <li><b>Phase 3 — Build:</b> daily output, short checkpoints, mentorship bridge</li>
          <li><b>Phase 4 — Close:</b> freeze scope, test, demo, publish</li>
        </ul>
      </div>
    </section>

    <div class="sectionTitle" id="cards">
      <h3>Card library</h3>
      <span>Drop-in content blocks</span>
    </div>

    <section class="grid grid2">
      <div class="card">
        <h2>Landing cards (core)</h2>
        <ul>
          <li><b>Two partners. One turnaround.</b></li>
          <li><b>Not get-rich-quick.</b></li>
          <li><b>Architect + bridge.</b></li>
          <li><b>Quartet: me / dev / finance / AI.</b></li>
          <li><b>Two apps = proof.</b></li>
          <li><b>Chaos → vault → compounding.</b></li>
        </ul>
      </div>

      <div class="card">
        <h2>Role & NDA cards</h2>
        <ul>
          <li><b>Finance:</b> 20% lifetime (net) + transparency dashboard</li>
          <li><b>Dev:</b> revenue split per project + mentorship → independence</li>
          <li><b>NDA-first:</b> required before details + meeting</li>
          <li><b>Solo only:</b> no teams/agencies</li>
        </ul>
      </div>

      <div class="card soft">
        <h2>Application cards</h2>
        <ul>
          <li><b>High-signal application</b> (2–3 minutes)</li>
          <li><b>Alignment standards</b> (respect, transparency, consistency)</li>
          <li><b>No guarantees</b> (subject to written agreement)</li>
        </ul>
      </div>

      <div class="card soft">
        <h2>Closing cards</h2>
        <ul>
          <li><b>Application received</b></li>
          <li><b>Next steps:</b> shortlist → call → written terms → ship</li>
          <li><b>Proof over perception:</b> results change everything</li>
        </ul>
      </div>
    </section>

    <div class="sectionTitle" id="legal">
      <h3>Terms (safe wording)</h3>
      <span>Use in-app consistently</span>
    </div>

    <section class="grid">
      <div class="card">
        <h2>Revenue share language (use everywhere)</h2>
        <pre>
- This is a collaboration request, not investment advice.
- Any revenue share is subject to written agreement.
- “Net revenue” is defined in writing (after platform fees and taxes as applicable).
- No guaranteed returns. Performance depends on product-market results.
- NDA is required before sharing sensitive details (roadmap, vault, workflows).
        </pre>
      </div>
    </section>

    <section class="foot" id="cta">
      <b>Call to action</b><br/>
      If you’re a <b>Financial Support Partner</b> or a <b>Solo Developer/Mentor</b> (AI-native, agentic mindset, n8n, vibe coding),
      and you value trust, transparency, and building something real—then this is the moment.<br/><br/>
      <b>Deadline:</b> 🌕 1 February 2026 • 23:09 (MEZ). Complete. Showable. Closed.
    </section>

  </div>
</body>
</html>
```0