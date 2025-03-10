import React, { useState } from "react";

function DescriptionGenerator() {
  const [topic, setTopic] = useState("");
  const [technology, setTechnology] = useState("");
  const [description, setDescription] = useState("");

  const generateDescription = async () => {
    const response = await fetch("http://localhost:8000/api/generate-description/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, technology }),
    });

    const data = await response.json();
    setDescription(data.description);
  };

  return (
    <div>
      <h2>Generate Description</h2>
      <input
        type="text"
        placeholder="Enter Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Technology"
        value={technology}
        onChange={(e) => setTechnology(e.target.value)}
      />
      <button onClick={generateDescription}>Generate</button>

      {description && (
        <div>
          <h3>Description:</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}

export default DescriptionGenerator;
