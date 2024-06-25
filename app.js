async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');
    
    const apiKey = 'sk-proj-CFAh6BEbLBcGjrfCWQs2T3BlbkFJdfdX3gwo0w8ZT8dygru3'; // Replace with your actual API key

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // or another model
            messages: [{ role: 'user', content: userInput }]
        })
    });

    const data = await response.json();
    const message = data.choices[0].message.content;

    responseDiv.innerHTML = message;
}
