document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrix');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Simple characters for better performance
    const chars = "01";
    const fontSize = 10;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = new Array(columns).fill(0);

    function draw() {
        // Add semi-transparent black background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set the text style
        ctx.font = fontSize + 'px monospace';
        
        // Loop over each column
        for (let i = 0; i < drops.length; i++) {
            // Choose a random character
            const char = chars[Math.floor(Math.random() * chars.length)];
            
            // Set color - bright green for head of the drop
            if (drops[i] === 0) {
                ctx.fillStyle = '#fff';
            } else {
                ctx.fillStyle = '#0F0';
            }
            
            // Draw the character
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            ctx.fillText(char, x, y);
            
            // Move the drop down
            drops[i]++;
            
            // Reset the drop if it's at the bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i] = 0;
            }
        }
    }

    // Handle window resize
    window.addEventListener('resize', setCanvasSize);

    // Initial setup
    setCanvasSize();

    // Run animation
    setInterval(draw, 50);
}); 