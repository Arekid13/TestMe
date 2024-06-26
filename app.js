document.getElementById('userInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

async function sendMessage() {
  const userInput = document.getElementById('userInput').value;
  if (userInput.trim() === '') return;

  const responseDiv = document.getElementById('response');
  responseDiv.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Update with the actual codename for GPT-4o
        model: 'insert_gpt4o_codename',
        messages: [{ role: 'user', content: userInput }]
      })
    });

    const data = await response.json();
    responseDiv.innerHTML += '<strong>GPT:</strong>';

    // Loop through all generated responses (choices)
    for (const choice of data.choices) {
      responseDiv.innerHTML += `<p>${choice.message.content}</p>`;
    }
  } catch (error) {
    console.error('Error fetching response:', error);
    responseDiv.innerHTML += '<p>Error: Failed to communicate with OpenAI API.</p>';
  }

  document.getElementById('userInput').value = '';
}

// ... uploadFile function remains the same ...
