"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Birthday.css"
export default function BirthdayPage() {
  const [popup, setPopup] = useState(true);
  const [nameInput, setNameInput] = useState("");

  const [showWelcome, setShowWelcome] = useState(false);
  const [showBlessing, setShowBlessing] = useState(false);

  const [showQuiz1, setShowQuiz1] = useState(false);
  const [quiz1Done, setQuiz1Done] = useState(false);

  const [showQuiz2, setShowQuiz2] = useState(false);
  const [quiz2Done, setQuiz2Done] = useState(false);

  const [showBook, setShowBook] = useState(false);
  const [endAnimation, setEndAnimation] = useState(false);

  const [page, setPage] = useState(0);

  const photos = [
    "/images/pic1.jpg",
    "/images/pic2.jpg",
    "/images/pic3.jpg",
    "/images/pic4.jpg",
    "/images/pic5.jpg",
    "/images/pic6.jpg",
    "/images/pic7.jpg",
    "/images/pic8.jpg",
    "/images/pic9.jpg",
    "/images/pic10.jpg",
  ];

  // START
  const handleStart = () => {
    if (nameInput.trim().toLowerCase() === "ritik ki jaan") {
      setPopup(false);

      setTimeout(() => setShowWelcome(true), 800);
      setTimeout(() => setShowBlessing(true), 3500);
      setTimeout(() => setShowQuiz1(true), 6000);
    }
  };

  // QUIZ 1
  // const finishQuiz1 = () => {
  //   setQuiz1Done(true);
  //   setShowQuiz1(false);
  //   setTimeout(() => setShowQuiz2(true), 1500);
  // };
  const finishQuiz1 = (correct = false) => {
  if (!correct) {
    alert("⛔ Aap Annu nahi ho… Annu ko sahi jawab pata hota hai ❤️");
    return;
  }

  // move to quiz 2
  setQuiz1Done(true);
  setShowQuiz1(false);
  setTimeout(() => setShowQuiz2(true), 1500);
};




  // QUIZ 2
  // const finishQuiz2 = (ans) => {
  //   if (ans === "annu") {
  //     setQuiz2Done(true);
  //     setShowQuiz2(false);
 
  //     document.querySelector(".celebration").classList.add("active");

  //     setTimeout(() => setShowBook(true), 3500);
  //     setTimeout(() => setEndAnimation(true), 20000);
  //   }
  // };
  const finishQuiz2 = (ans) => {
  if (ans !== "annu") {
    alert("⛔ Aap Annu nahi ho… Annu ko sahi jawab pata hota hai ❤️");
    return; // stop here
  }

  // Correct Answer
  setQuiz2Done(true);
  setShowQuiz2(false);

  document.querySelector(".celebration").classList.add("active");

  setTimeout(() => setShowBook(true), 3500);
  setTimeout(() => setEndAnimation(true), 20000);
};


  return (
    <div className="birthday-container">

      {/* BACKGROUND BUTTERFLIES */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="butterfly"
          style={{ top: `${Math.random() * 80}vh` }}
        >
          🦋
        </div>
      ))}

      {/* CELEBRATION (balloons + angels + text) */}
      <div className="celebration">
        <div className="balloon">🎈</div>
        <div className="balloon balloon2">🎈</div>

        <div className="angel">😇</div>
        <div className="angel angel2">😇</div>

        <h1 className="celebrate-text">🌸 Swagat hai Param Sundari Annu 🌸</h1>
      </div>

      {/* Audio */}
      {!popup && (
        <audio autoPlay loop>
          <source src="/audio/ritikToAnnu.mp3" type="audio/mp3" />
        </audio>
      )}

      {/* POPUP */}
      {popup && (
        <div className="popup">
          <h3>Who are you?</h3>
          <input
            type="text"
            placeholder="Type: ritik ki jaan"
            onChange={(e) => setNameInput(e.target.value)}
          />
          <button onClick={handleStart}>Enter</button>
        </div>
      )}

      {/* WELCOME */}
      {showWelcome && (
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6 }}
          className="welcome-text"
        >
          🎉 Happy Birthday Meri Annu ❤️
        </motion.h1>
      )}

      {/* BLESSING */}
      {showBlessing && (
        <motion.p
          className="blessing-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          Tum hamesha muskurao… tumhari zindagi me har pal sirf khushiyan aaye ❤️  
          Tumhari sab wishes poori ho — meri dua hamesha tumhare saath hai 💖
        </motion.p>
      )}

      {/* QUIZ 1 */}
      {showQuiz1 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="quiz-box"
        >
          <h2>🎀 Cute Quiz 1 🎀</h2>
          <p>Ritik tumse kitna pyaar karta hai? ❤️</p>

<button onClick={() => finishQuiz1(false)}>Bahut zyada 💖</button>
<button onClick={() => finishQuiz1(true)}>Jaan se bhi zyada 💘</button>
<button onClick={() => finishQuiz1(false)}>Sabse zyada 💞</button>

        </motion.div>
      )}

      {/* QUIZ 2 */}
      {showQuiz2 && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="quiz-box">
          <h2>🎀 Cute Quiz 2 🎀</h2>
          <p>Sabse sundar ladki kaun? 😍</p>

          <button onClick={() => finishQuiz2("mw")}>Miss World 👑</button>
          <button onClick={() => finishQuiz2("mi")}>Miss India 👑</button>
          <button onClick={() => finishQuiz2("annu")}>Meri Annu ❤️</button>
        </motion.div>
      )}

      {/* BOOK */}
      {showBook && (
        <div className="book-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 90 }}
              transition={{ duration: 0.7 }}
              className="book-page"
            >
              <img src={photos[page]} className="page-photo" />
            </motion.div>
          </AnimatePresence>

          <div className="book-nav">
            <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>◀ Prev</button>
            <button disabled={page === photos.length - 1} onClick={() => setPage((p) => p + 1)}>Next ▶</button>
          </div>
        </div>
      )}

      {/* FINAL MESSAGE */}
      {/* {endAnimation && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="final-love">
          ❤️🎉 HAPPY BIRTHDAY ANNU 🎉❤️  
          <p>From Ritik — who loves you endlessly 💕</p>
        </motion.div>
      )} */}
    </div>
  );
}
