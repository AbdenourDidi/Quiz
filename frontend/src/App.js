import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/quiz") // URL du backend
      .then((response) => {
        setQuizData(response.data); // Stocke les données dans l'état
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données du quiz",
          error
        );
      });
  }, []); // Se lance uniquement lors du premier rendu

  // Vérifiez si quizData est vide ou si currentQuestion dépasse le nombre de questions
  if (quizData.length === 0 || currentQuestion >= quizData.length) {
    return <ReactLoading type="balls" color="Black" />; // Affiche un message de chargement jusqu'à ce que quizData soit disponible
  }

  const quiz = (button, option) => {
    if (option === quizData[currentQuestion].answer) {
      button.style.backgroundColor = "green";
      setScore(score + 1);
    } else {
      button.style.backgroundColor = "red";
    }

    {
      setShowNext(true);
      // Désactiver tous les boutons
      const buttons = document.querySelectorAll("#options button");
      buttons.forEach((btn) => (btn.disabled = true));
    }
  };

  const next = () => {
    setCurrentQuestion((prev) => prev + 1); // Passe à la question suivante
    if (currentQuestion === quizData.length - 1) {
      alert(
        `Bravo ! Vous avez terminé le quiz.\nVotre score : ${score}/${quizData.length}`
      );

      setCurrentQuestion(0); // Réinitialise la question
      setScore(0); // Réinitialise le score
    }
    setShowNext(false);

    // Réinitialiser les styles
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach((btn) => {
      btn.disabled = false;
      btn.style.backgroundColor = "";
    });
  };

  return (
    <div className="quiz-app">
      <h1>Quiz App</h1>
      <p id="question">{quizData[currentQuestion].question}</p>
      <div id="options">
        {quizData[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={(e) => quiz(e.target, option)}
            style={{ cursor: "pointer" }}
          >
            {option}
          </button>
        ))}
      </div>
      {showNext && (
        <button id="btnNext" onClick={next} style={{ cursor: "pointer" }}>
          Suivant
        </button>
      )}
      <p id="score">Score : {score}</p>
    </div>
  );
}
export default App;
