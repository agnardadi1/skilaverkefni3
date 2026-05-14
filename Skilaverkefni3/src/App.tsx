import { useState, useEffect } from "react";
/* --- NPM pakkar --- */
import confetti from "canvas-confetti";
import { X, Mail } from "lucide-react";

import "./App.css";

/* --- Spurningar og Niðurstöður --- */
import { questions } from "./questions";
import { Result } from "./components/Results";

function App() {
  /* ==========================================================================
     1. STATE 
     Hér geymum við öll gögn sem breytast: Stillingar, spurningar og svör og tíma.
     ========================================================================== */
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);

  const [settings, setSettings] = useState({
    showTimer: false,
    useProgressBar: true,
    instantFeedback: false,
  });

  const [selectedIndexes, setSelectedIndexes] = useState<(number | null)[]>(
    new Array(questions.length).fill(null),
  );
  const [userAnswers, setUserAnswers] = useState<(boolean | null)[]>(
    new Array(questions.length).fill(null),
  );

  /* ==========================================================================
     2. EFFECTS 
     Hér keyrum við effects sem á að gerast á ákveðnum tímapunktum (t.d. Timer).
     ========================================================================== */
  useEffect(() => {
    let interval: any;
    if (isStarted && !showResults && settings.showTimer) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, showResults, settings.showTimer]);

  /* ==========================================================================
     3. LOGIC & FUNCTIONS
     Hér er confetti of föll fyrir að velja svör, fara í næstu spurningu og hætta í quizinu.
     ========================================================================== */

  const fireWinningConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        colors: ["#17408b", "#c9082a", "#ffffff"],
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        colors: ["#17408b", "#c9082a", "#ffffff"],
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleSelectAnswer = (isCorrect: boolean, index: number) => {
    if (settings.instantFeedback && selectedIndexes[currentQuestion] !== null)
      return;
    const updatedIndexes = [...selectedIndexes];
    updatedIndexes[currentQuestion] = index;
    setSelectedIndexes(updatedIndexes);
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = isCorrect;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const allDone = userAnswers.every((ans) => ans !== null);
      if (allDone) {
        setShowResults(true);
        fireWinningConfetti();
      } else {
        alert("Vinsamlegast svaraðu öllum spurningum! 🏀");
      }
    }
  };

  const handleQuit = () => {
    if (
      window.confirm(
        "Ertu viss um að þú viljir hætta? Öll svör þín munu eyðast!",
      )
    ) {
      setIsStarted(false);
      setCurrentQuestion(0);
      setShowResults(false);
      setReviewIndex(null);
      setSeconds(0);
      setSelectedIndexes(new Array(questions.length).fill(null));
      setUserAnswers(new Array(questions.length).fill(null));
    }
  };

  const totalScore = userAnswers.filter((ans) => ans === true).length;

  /* ==========================================================================
     4. RENDER HELPERS
      Hér eru hjálparfall fyrir að rendera navigation dots og aðra hluti sem endurtaka sig.
     ========================================================================== */
  const renderNavDots = () => (
    <div className="nav-dots">
      {questions.map((_, index) => {
        let statusClass = "";
        const isSelectedDot = showResults
          ? reviewIndex === index
          : currentQuestion === index;
        if (showResults) {
          if (userAnswers[index] === true) statusClass = "correct-dot";
          else if (userAnswers[index] === false) statusClass = "wrong-dot";
        } else {
          if (currentQuestion === index) statusClass = "active";
          else if (userAnswers[index] !== null) statusClass = "completed";
        }
        return (
          <button
            key={index}
            className={`dot ${statusClass} ${isSelectedDot ? "review-active" : ""}`}
            onClick={() =>
              showResults ? setReviewIndex(index) : setCurrentQuestion(index)
            }
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );

  /* ==========================================================================
     5. START SCREEN & SETTINGS
      Hér er allt sem tengist byrjunar skjánum og stillingum fyrir quizið.
     ========================================================================== */
  return (
    <div className="app-container">
      {!isStarted ? (
        <div className="start-screen">
          <img
            src="https://cdn.freebiesupply.com/images/large/2x/nba-logo-transparent.png"
            alt="NBA Logo"
            className="nba-logo-main"
          />
          <h1>NBA Quiz 2026</h1>

          <div className="instructions">
            <h3>Leiðbeiningar:</h3>
            <ul>
              <li>Svaraðu öllum {questions.length} spurningunum.</li>
              <li>Skoðaðu svörin þín í lokin.</li>
              <li>Gangi þér vel! 🏀</li>
            </ul>
          </div>

          <div className="settings-panel">
            <h4>Stillingar:</h4>
            <label className="settings-label">
              <input
                type="checkbox"
                checked={settings.showTimer}
                onChange={(e) =>
                  setSettings({ ...settings, showTimer: e.target.checked })
                }
              />
              <span>Hafa tímamæli ⏱️</span>
            </label>
            <label className="settings-label">
              <input
                type="checkbox"
                checked={settings.useProgressBar}
                onChange={(e) =>
                  setSettings({ ...settings, useProgressBar: e.target.checked })
                }
              />
              <span>Nota Progress Bar 📊</span>
            </label>
            <label className="settings-label">
              <input
                type="checkbox"
                checked={settings.instantFeedback}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    instantFeedback: e.target.checked,
                  })
                }
              />
              <span>Sjá rétt/rangt strax ✅</span>
            </label>
          </div>

          <button className="start-btn" onClick={() => setIsStarted(true)}>
            Hefja Quiz 🏀
          </button>
          <a
            href="mailto:agnardadi1@gmail.com"
            className="mail-link"
            title="Senda póst"
          >
            Sendu okkur póst! <Mail size={30} />
          </a>
        </div>
      ) : (
        <>
          {!showResults ? (
            /* ==========================================================================
               6. ACTIVE QUIZ (LEIKURINN)
                Hér er allt sem tengist því að spila quizið: Sýna spurningar, svara og fleira.
               ========================================================================== */
            <div className="quiz-card">
              <button
                className="quit-btn"
                onClick={handleQuit}
                title="Hætta í quiz"
              >
                <X size={20} />
              </button>

              {renderNavDots()}

              {settings.useProgressBar ? (
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              ) : (
                <h3>
                  Spurning {currentQuestion + 1} / {questions.length}
                </h3>
              )}

              {settings.showTimer && (
                <div className="timer-display">Tími: {seconds}s</div>
              )}

              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>

              <div className="answer-list">
                {questions[currentQuestion].answerOptions.map(
                  (option, index) => {
                    const isSelected =
                      index === selectedIndexes[currentQuestion];
                    let btnClass = isSelected ? "selected" : "";
                    if (
                      settings.instantFeedback &&
                      selectedIndexes[currentQuestion] !== null
                    ) {
                      btnClass = option.isCorrect
                        ? "correct"
                        : isSelected
                          ? "incorrect"
                          : "";
                    }
                    return (
                      <button
                        key={index}
                        className={btnClass}
                        onClick={() =>
                          handleSelectAnswer(option.isCorrect, index)
                        }
                        disabled={
                          settings.instantFeedback &&
                          selectedIndexes[currentQuestion] !== null
                        }
                      >
                        {option.answerText}
                      </button>
                    );
                  },
                )}
              </div>

              <button className="next-btn" onClick={handleNext}>
                {currentQuestion === questions.length - 1
                  ? "Klára 🏁"
                  : "Næsta →"}
              </button>
            </div>
          ) : (
            /* ==========================================================================
               7. RESULTS & REVIEW MODE
                Hér er allt sem tengist því að skoða niðurstöður og fara yfir spurningar í review mode.
               ========================================================================== */
            <div className="results-wrapper">
              <button
                className="quit-btn"
                onClick={handleQuit}
                title="Hætta í quiz"
              >
                <X size={20} />
              </button>

              {renderNavDots()}

              {reviewIndex !== null ? (
                <div className="quiz-card review-mode">
                  <h3>Skoðun: Spurning {reviewIndex + 1}</h3>
                  <div className="question-text">
                    {questions[reviewIndex].questionText}
                  </div>
                  <div className="answer-list">
                    {questions[reviewIndex].answerOptions.map((option, idx) => {
                      const wasSelected = selectedIndexes[reviewIndex!] === idx;
                      let reviewClass = option.isCorrect
                        ? "correct"
                        : wasSelected
                          ? "incorrect"
                          : "";
                      return (
                        <button key={idx} className={reviewClass} disabled>
                          {option.answerText}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    className="next-btn"
                    onClick={() => setReviewIndex(null)}
                  >
                    Aftur í stigatöflu
                  </button>
                </div>
              ) : (
                <div className="score-section">
                  <Result
                    score={totalScore}
                    total={questions.length}
                    onRestart={() => window.location.reload()}
                  />
                  {settings.showTimer && (
                    <p className="final-time">Tími: {seconds} sekúndur</p>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
