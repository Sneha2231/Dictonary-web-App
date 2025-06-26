function searchWord() {
    const word = document.getElementById("searchInput").value.trim();
    const resultDiv = document.getElementById("result");
  
    if (!word) {
      resultDiv.innerHTML = "<p>Please enter a word to search.</p>";
      return;
    }
  
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Word not found");
        }
        return response.json();
      })
      .then(data => {
        const entry = data[0];
        const meaning = entry.meanings[0];
        const def = meaning.definitions[0];
  
        resultDiv.innerHTML = `
          <h2>${entry.word}</h2>
          <p><strong>Phonetics:</strong> ${entry.phonetic || "Not available"}</p>
          <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
          <p><strong>Definition:</strong> ${def.definition}</p>
          <p><strong>Example:</strong> ${def.example || "No example found"}</p>
          <p><strong>Synonyms:</strong> ${def.synonyms?.join(", ") || "None"}</p>
          ${entry.phonetics[0]?.audio ? `<audio controls src="${entry.phonetics[0].audio}"></audio>` : ""}
        `;
      })
      .catch(error => {
        resultDiv.innerHTML = "<p>❌ Word not found. Try another word.</p>";
      });
  }
  