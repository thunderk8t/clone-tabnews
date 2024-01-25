import React, { useState, useEffect } from "react";

function Home() {
  const [magicText, setMagicText] = useState("");

  useEffect(() => {
    // Retrieve value from localStorage on component mount
    const savedText = localStorage.getItem("magicalText");
    if (savedText) {
      setMagicText(savedText);
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const saveToLocalStorage = () => {
    // Check if the input is not empty
    if (magicText.trim() !== "") {
      // Save the value to localStorage
      localStorage.setItem("magicalText", magicText);
      alert("Text saved to LocalStorage: " + magicText);
    } else {
      alert("Please enter something magical.");
    }
  };

  return (
    <div>
      <p>Descubra a mágica do armazenamento local: </p>

      <input
        type="text"
        value={magicText}
        onChange={(e) => setMagicText(e.target.value)}
        placeholder="digite algo legal pra mim..."
      />

      <button onClick={saveToLocalStorage}>Salve</button>
    </div>
  );
}

export default Home;
