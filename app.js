const games = [
    {
        id: "cubecollector3d",
        title: "3D Cube Collector",
        description: "Move the green player cube around a 3D plane and collect the rotating red cubes before time runs out!",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>3D Cube Collector</title>
    <style>
        body { margin: 0; background: #111; color: white; font-family: sans-serif; overflow: hidden; text-align: center; }
        canvas { display: block; background: #1a1a1a; margin: 0 auto; }
        #ui { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); font-size: 20px; font-weight: bold; pointer-events: none; }
    </style>
</head>
<body>
    <div id="ui">Score: <span id="score">0</span> | Time: <span id="time">30</span>s</div>
    <canvas id="gameCanvas"></canvas>

    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let score = 0;
        let timeLeft = 30;
        let gameActive = true;

        // Player object (Pseudo-3D coordinates)
        const player = { x: 0, y: 0, z: 200, size: 30, speed: 5 };
        // Target object
        const target = { x: (Math.random() * 400) - 200, y: (Math.random() * 400) - 200, z: 200, size: 20 };

        const keys = {};
        window.addEventListener('keydown', e => keys[e.key] = true);
        window.addEventListener('keyup', e => keys[e.key] = false);

        // Timer interval
        const countdown = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                document.getElementById('time').innerText = timeLeft;
            } else {
                gameActive = false;
                clearInterval(countdown);
                alert('Game Over! Your final score: ' + score);
            }
        }, 1000);

        function project(x, y, z) {
            const fov = 400; 
            const scale = fov / (fov + z);
            const projX = (x * scale) + canvas.width / 2;
            const projY = (y * scale) + canvas.height / 2;
            return { x: projX, y: projY, size: Math.max(1, scale) };
        }

        function update() {
            if (!gameActive) return;

            if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
            if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
            if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
            if (keys['ArrowRight'] || keys['d']) player.x += player.speed;

            // Simple 2D distance collision check
            const dist = Math.hypot(player.x - target.x, player.y - target.y);
            if (dist < (player.size + target.size)) {
                score++;
                document.getElementById('score').innerText = score;
                target.x = (Math.random() * 400) - 200;
                target.y = (Math.random() * 400) - 200;
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Target (Red)
            const projTarget = project(target.x, target.y, target.z);
            ctx.fillStyle = '#ff4757';
            ctx.fillRect(projTarget.x - (target.size * projTarget.size)/2, projTarget.y - (target.size * projTarget.size)/2, target.size * projTarget.size, target.size * projTarget.size);

            // Draw Player (Green)
            const projPlayer = project(player.x, player.y, player.z);
            ctx.fillStyle = '#2ed573';
            ctx.fillRect(projPlayer.x - (player.size * projPlayer.size)/2, projPlayer.y - (player.size * projPlayer.size)/2, player.size * projPlayer.size, player.size * projPlayer.size);
        }

        function loop() {
            update();
            draw();
            requestAnimationFrame(loop);
        }

        loop();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    </script>
</body>
</html>`
    },
    {
        id: "snake",
        title: "Snake Game",
        description: "Eat the apples, don't hit the walls!",
        code: `<!DOCTYPE html><html><head><title>Snake</title></head><body style="background:#222;color:#0f0;text-align:center;"><h1>Snake Game</h1><p>Imagine a fun game of snake here!</p></body></html>`
    }
];
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
    a.download = `${game.id}.html`; // Names the file
    
    // Append, click, and clean up
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};

// Initialize the site
renderGames();
