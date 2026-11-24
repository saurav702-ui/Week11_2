import { useEffect, useState } from 'react';

const student = {
  name: 'Saurav Luitel',
  id: '202537255',
  major: 'Computer Engineering',
  university: 'Gachon University',
};

const questions = [
  {
    prompt: 'What is React?',
    choices: ['A programming language', 'A JavaScript library for building user interfaces', 'A database system', 'A CSS preprocessor'],
    answer: 1,
    reason: 'React is a JavaScript library used to build interfaces from reusable components.',
  },
  {
    prompt: 'Which function is written as a valid React component?',
    choices: ['function studentCard() { return <p>Hello</p>; }', 'function StudentCard() { return <p>Hello</p>; }', 'component StudentCard => <p>Hello</p>', 'function StudentCard { return <p>Hello</p>; }'],
    answer: 1,
    reason: 'React component names begin with a capital letter, and the function must use valid JavaScript syntax.',
  },
  {
    prompt: 'How can a component read a prop called title?',
    choices: ['this.title only', 'useState.title', 'props.title or a destructured title parameter', 'document.title'],
    answer: 2,
    reason: 'A function component receives props as its parameter. You can use props.title or destructure title.',
  },
];

function StudentProfile({ name, id, major, university }) {
  return (
    <article className="profile-card">
      <div className="profile-monogram">{name.split(' ').map(part => part[0]).join('')}</div>
      <div className="profile-main">
        <span className="micro-label">STUDENT PROFILE / PROPS DEMO</span>
        <h3>{name}</h3>
        <p>{major} · {university}</p>
        <div className="profile-meta"><span>STUDENT ID</span><strong>{id}</strong></div>
      </div>
      <div className="profile-stamp">W11</div>
    </article>
  );
}

function Foundations() {
  const [answers, setAnswers] = useState({});
  const score = questions.filter((question, index) => answers[index] === question.answer).length;
  return (
    <section className="section-block" id="foundations">
      <div className="section-kicker"><span>01</span><p>START HERE / QUICK REVIEW</p></div>
      <div className="section-title-row">
        <div><h2>React essentials</h2><p className="section-lead">Three quick checks on the ideas behind component-based interfaces.</p></div>
        <div className="score-box"><strong>{score}<small> / 3</small></strong><span>YOUR SCORE</span></div>
      </div>
      <div className="question-stack">
        {questions.map((question, index) => (
          <article className="question-card" key={question.prompt}>
            <div className="question-number">Q{String(index + 1).padStart(2, '0')}</div>
            <div className="question-content">
              <h3>{question.prompt}</h3>
              <div className="choice-grid">
                {question.choices.map((choice, choiceIndex) => {
                  const selected = answers[index] === choiceIndex;
                  const correct = question.answer === choiceIndex;
                  const showResult = answers[index] !== undefined;
                  return (
                    <button
                      type="button"
                      key={choice}
                      className={`choice ${selected ? 'selected' : ''} ${showResult && correct ? 'is-correct' : ''} ${showResult && selected && !correct ? 'is-wrong' : ''}`}
                      onClick={() => setAnswers(current => ({ ...current, [index]: choiceIndex }))}
                    >
                      <span className="choice-letter">{String.fromCharCode(65 + choiceIndex)}</span>{choice}
                    </button>
                  );
                })}
              </div>
              {answers[index] !== undefined && (
                <p className={`answer-note ${answers[index] === question.answer ? 'good' : 'try-again'}`}>
                  {answers[index] === question.answer ? 'Correct — ' : 'Not quite — '}{question.reason}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
      <button className="button button-light" onClick={() => setAnswers({})}>Reset knowledge check ↺</button>
      <p className="fine-print">This is a self-practice score only; it is not an official course grade or attendance record.</p>
    </section>
  );
}

function ExerciseCard({ number, title, description, children, className = '' }) {
  return (
    <article className={`exercise-card ${className}`}>
      <div className="exercise-heading"><span>EXERCISE {String(number).padStart(2, '0')}</span><i>{String(number).padStart(2, '0')}</i></div>
      <h3>{title}</h3>
      <p className="exercise-description">{description}</p>
      <div className="exercise-body">{children}</div>
    </article>
  );
}

function StateWorkshop() {
  const [rounds, setRounds] = useState(0);
  const [displayName, setDisplayName] = useState('');
  const [draft, setDraft] = useState('');
  const [queue, setQueue] = useState([]);
  const [tipVisible, setTipVisible] = useState(false);
  const [filter, setFilter] = useState('All');
  const [checklist, setChecklist] = useState([
    { id: 1, label: 'Review component syntax', done: false },
    { id: 2, label: 'Pass data through props', done: true },
    { id: 3, label: 'Practice state updates', done: false },
  ]);
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [profileMessage, setProfileMessage] = useState('');
  const [note, setNote] = useState(() => {
    try { return localStorage.getItem('saurav-week11-note') || ''; }
    catch { return ''; }
  });
  const [noteStatus, setNoteStatus] = useState('Your note is stored in this browser.');

  useEffect(() => {
    try {
      if (note) localStorage.setItem('saurav-week11-note', note);
      else localStorage.removeItem('saurav-week11-note');
      setNoteStatus(note ? 'Saved automatically in this browser.' : 'No note saved yet.');
    } catch {
      setNoteStatus('Browser storage is unavailable in this session.');
    }
  }, [note]);

  function addQueueItem(event) {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;
    setQueue(items => [...items, { id: Date.now(), label: value }]);
    setDraft('');
  }

  const visibleChecklist = checklist.filter(item =>
    filter === 'All' || (filter === 'Done' ? item.done : !item.done)
  );
  const doneCount = checklist.filter(item => item.done).length;

  function updateProfile(event) {
    const { name, value } = event.target;
    setProfile(current => ({ ...current, [name]: value }));
    setProfileMessage('');
  }

  function submitProfile(event) {
    event.preventDefault();
    if (!profile.name.trim()) return setProfileMessage('Please enter your name.');
    setProfileMessage(`Details checked for ${profile.name.trim()}.`);
  }

  return (
    <section className="section-block state-section" id="workshop">
      <div className="section-kicker"><span>03</span><p>INTERACTIVE PRACTICE / STATE + EVENTS</p></div>
      <div className="section-title-row">
        <div><h2>Try the interactions</h2><p className="section-lead">Seven small experiments. Change something and watch the interface respond.</p></div>
        <span className="exercise-total">07 HANDS-ON TASKS</span>
      </div>
      <div className="exercise-grid">
        <ExerciseCard number={1} title="Practice counter" description="Update a number with button click events.">
          <div className="big-number" role="status">{rounds}</div>
          <div className="button-row">
            <button className="button button-dark" onClick={() => setRounds(value => value - 1)}>− One</button>
            <button className="button button-accent" onClick={() => setRounds(value => value + 1)}>Add one +</button>
            <button className="button button-quiet" onClick={() => setRounds(0)}>Reset</button>
          </div>
        </ExerciseCard>

        <ExerciseCard number={2} title="Name this session" description="A controlled input keeps its value in React state.">
          <label className="field-label">Your display name
            <input value={displayName} onChange={event => setDisplayName(event.target.value)} placeholder="Type your name..." />
          </label>
          <div className="greeting-preview">Ready when you are, <strong>{displayName.trim() || 'student'}</strong>.</div>
        </ExerciseCard>

        <ExerciseCard number={3} title="Study queue" description="Add a task and remove it when it is finished.">
          <form className="inline-form" onSubmit={addQueueItem}>
            <input value={draft} onChange={event => setDraft(event.target.value)} placeholder="Add a study task..." aria-label="New study task" />
            <button className="button button-accent" disabled={!draft.trim()}>Add</button>
          </form>
          {queue.length === 0 ? <p className="empty-state">Nothing in the queue yet.</p> : (
            <ul className="simple-list">{queue.map(item => <li key={item.id}><span>{item.label}</span><button onClick={() => setQueue(items => items.filter(task => task.id !== item.id))}>Remove</button></li>)}</ul>
          )}
        </ExerciseCard>

        <ExerciseCard number={4} title="A quick React tip" description="Use a boolean state value to show or hide content.">
          <button className="button button-dark" aria-expanded={tipVisible} onClick={() => setTipVisible(value => !value)}>{tipVisible ? 'Hide the tip' : 'Reveal a tip'}</button>
          {tipVisible && <div className="tip-panel"><strong>Remember:</strong> update state with its setter function. React then re-renders the component with the new value.</div>}
        </ExerciseCard>

        <ExerciseCard number={5} title="Progress checklist" description="Toggle items, filter the list, or clear completed tasks." className="wide-card">
          <div className="checklist-summary"><strong>{doneCount} / {checklist.length}</strong><span>tasks completed</span><div className="progress-track"><span style={{ width: `${checklist.length ? doneCount / checklist.length * 100 : 0}%` }} /></div></div>
          <div className="filter-row">{['All', 'Active', 'Done'].map(option => <button key={option} className={filter === option ? 'filter-active' : ''} onClick={() => setFilter(option)}>{option}</button>)}</div>
          <ul className="check-list">{visibleChecklist.map(item => (
            <li key={item.id}><label><input type="checkbox" checked={item.done} onChange={() => setChecklist(items => items.map(task => task.id === item.id ? { ...task, done: !task.done } : task))} /><span className={item.done ? 'completed' : ''}>{item.label}</span></label></li>
          ))}</ul>
          <button className="text-action" onClick={() => setChecklist(items => items.filter(item => !item.done))} disabled={!doneCount}>Remove completed items</button>
        </ExerciseCard>

        <ExerciseCard number={6} title="Profile details form" description="Manage multiple input values in one state object.">
          <form className="form-stack" onSubmit={submitProfile}>
            <label className="field-label">Name<input name="name" value={profile.name} onChange={updateProfile} placeholder="Your name" required /></label>
            <label className="field-label">Email<input name="email" type="email" value={profile.email} onChange={updateProfile} placeholder="name@example.com" required /></label>
            <button className="button button-accent">Check details</button>
          </form>
          <p className="form-status" role="status">{profileMessage}</p>
        </ExerciseCard>

        <ExerciseCard number={7} title="Save a study note" description="An effect saves your note in local browser storage.">
          <label className="field-label">Quick note<textarea rows="4" value={note} onChange={event => setNote(event.target.value)} placeholder="Write something to remember..." /></label>
          <div className="note-footer"><span role="status">{noteStatus}</span><button className="text-action" onClick={() => setNote('')} disabled={!note}>Clear note</button></div>
        </ExerciseCard>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#"><span className="wordmark-icon">SL</span><span>SAURAV LUITEL<small>WEB PROGRAMMING / WEEK 11</small></span></a>
        <nav><a href="#foundations">Foundations</a><a href="#profile">Props lab</a><a href="#workshop">State workshop</a></nav>
        <a className="topbar-tag" href="#workshop">PRACTICE FILE ↘</a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-eyebrow"><span /> GACHON UNIVERSITY · COMPUTER ENGINEERING</div>
            <h1>React, in<br /><em>practice.</em></h1>
            <p>A compact Week 11 workspace for revisiting React fundamentals, passing component props, and experimenting with state-driven interfaces.</p>
            <div className="hero-buttons"><a className="button button-accent" href="#foundations">Begin the review ↘</a><a className="hero-link" href="#profile">View student card</a></div>
          </div>
          <div className="hero-aside">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="hero-index">11<span>/WEEK</span></div>
            <div className="hero-aside-bottom"><span>COMPONENTS</span><span>STATE</span><span>EVENTS</span></div>
          </div>
          <div className="hero-footer"><span>LEARNING LOG / 2026</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <div className="content-wrap">
          <section className="section-block profile-section" id="profile">
            <div className="section-kicker"><span>02</span><p>COMPONENT EXERCISE / PROPS</p></div>
            <div className="section-title-row">
              <div><h2>One component,<br />four values.</h2><p className="section-lead">The parent supplies student details. The child component receives them as props and displays a profile.</p></div>
              <div className="props-note"><span>DATA FLOW</span><strong>Parent → Child</strong><small>Props are read-only inputs.</small></div>
            </div>
            <StudentProfile {...student} />
            <div className="code-caption"><span>COMPONENT USAGE</span><code>&lt;StudentProfile name="Saurav Luitel" id="202537255" major="Computer Engineering" /&gt;</code></div>
          </section>

          <Foundations />
          <StateWorkshop />

          <section className="closing-strip">
            <span className="closing-mark">SL.</span>
            <div><p>WEEK 11 / REACT PRACTICE</p><h2>Build a little.<br /><em>Learn a lot.</em></h2></div>
            <a href="#">Back to top ↑</a>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div><strong>SAURAV LUITEL</strong><span>202537255 · COMPUTER ENGINEERING</span></div>
        <p>React practice workspace · Gachon University</p>
        <span>© 2026</span>
      </footer>
    </div>
  );
}