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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: userInput }]
        })
    });

    const data = await response.json();
    responseDiv.innerHTML += `<p><strong>GPT:</strong> ${data.choices[0].message.content}</p>`;

    document.getElementById('userInput').value = '';
}

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    // Replace with your file upload endpoint (e.g., AWS S3, Dropbox, etc.)
    const response = await fetch('YOUR_FILE_UPLOAD_ENDPOINT', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML += `<p><strong>File uploaded:</strong> ${data.message}</p>`;
}
