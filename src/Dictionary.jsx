import './App.css';
import React, { useState, useEffect } from 'react';

const ALPHABET = ["A", "B", "D", "E", "Ẹ", "F", "G", "Gb", "H", "I", "J", "K", "L", "M", "N", "O", "Ọ", "P", "R", "S", "Ṣ", "T", "W", "Y"];

const Dictionary = () => {
  const [words, setWords] = useState([]);
  const [currentLetter, setCurrentLetter] = useState("A");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWords();
  }, [currentLetter]);

  const fetchWords = async () => {
    setLoading(true);
    try {
      // Replace with your actual Render URL
const response = await fetch(`https://ayida-back-end.onrender.com/Lexeme?letter=${currentLetter.toLowerCase()}`);
      const result = await response.json();
      setWords(result.data || []);
    } catch (error) {
      console.error("Error fetching dictionary:", error);
    }
    setLoading(false);
  };

  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'yo-NG'; // Yoruba (Nigeria)
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="dictionary-container">
      <h2>Yoruba Monolingual Dictionary</h2>
      
      {/* Alphabet Ribbon */}
      <div className="alphabet-ribbon">
        {ALPHABET.map(letter => (
          <button 
            key={letter} 
            onClick={() => setCurrentLetter(letter)}
            className={currentLetter === letter ? "active" : ""}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Word List */}
      {loading ? <p>Waking up the database...</p> : (
        <div className="word-list">
          {words.map((item, index) => (
            <div key={index} className="word-card">
              <div className="word-header">
                <h3>{item.Lexeme}</h3>
                
              </div>
              <p className="ipa">[{item.Phone}]</p>
              <p className="pos"><em>{item["Parts of Speech"]}</em></p>
              <p className="definition">{item.Definition}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dictionary;
