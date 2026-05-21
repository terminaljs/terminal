// 1. Define your games here. 
// For the downloader to work perfectly, you can store the game's raw HTML/JS code inside the 'code' property.
const games = [
    {
        id: "pong",
        title: "Classic Pong",
        description: "A simple recreation of the classic arcade game.",
        // Example of a self-contained HTML game
        code: `<!DOCTYPE html><html><head><title>Pong</title></head><body style="background:#000;color:#fff;text-align:center;"><h1>Pong Game</h1><p>Imagine a fun game of pong here!</p><script>console.log('Pong loaded');</script></body></html>`
    },
    {
        id: "snake",
        title: "Snake Game",
        description: "Eat the apples, don't hit the walls!",
        code: `<!DOCTYPE html><html><head><title>Snake</title></head><body style="background:#222;color:#0f0;text-align:center;"><h1>Snake Game</h1><p>Imagine a fun game of snake here!</p></body></html>`
    }
];

// 2. Target the container where games will be displayed
const container = document.getElementById('game-container');

// 3. Render the games to the webpage
function renderGames() {
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        card.innerHTML = `
            <h2>${game.title}</h2>
            <p>${game.description}</p>
            <div class="btn-group">
                <button class="play-btn" onclick="playGame('${game.id}')">Play in Browser</button>
                <button class="download-btn" onclick="downloadGame('${game.id}')">Download HTML</button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// 4. Play game logic (Opens the game in a new tab using the code)
window.playGame = function(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    const newWindow = window.open();
    newWindow.document.write(game.code);
    newWindow.document.close();
};

// 5. Download game logic (The Downloader Feature)
window.downloadGame = function(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    // Create a Blob containing the game's HTML code
    const blob = new Blob([game.code], { type: 'text/html' });
    
    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a hidden anchor tag to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${game.id}.html`; // Names the file (e.g., pong.html)
    
    // Append, click, and clean up
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};

// Initialize the site
renderGames();
