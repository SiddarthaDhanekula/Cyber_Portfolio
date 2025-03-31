document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Array of common Linux commands and cybersecurity terms
    const commands = [
        'ls', 'cd', 'pwd', 'grep', 'chmod', 'sudo', 'ping',
        'nmap', 'ssh', 'curl', 'wget', 'cat', 'find', 'ps',
        'kill', 'rm', 'cp', 'mv', 'mkdir', 'touch', 'vim',
        'nano', 'apt', 'git', 'tar', 'zip', 'unzip', 'man',
        'ifconfig', 'netstat', 'tcpdump', 'wireshark', 'john',
        'hashcat', 'hydra', 'nikto', 'gobuster', 'dirb', 'wpscan',
        'sqlmap', 'msfconsole', 'bash', 'python', 'perl', 'awk',
        'sed', 'gcc', 'make', 'systemctl', 'service', 'cron',
        'iptables', 'ufw', 'ssh-keygen', 'openssl', 'burpsuite'
    ];

    // Calculate font size based on screen width
    function getFontSize() {
        const width = window.innerWidth;
        if (width > 1400) return 16;
        if (width > 1200) return 14;
        return 12;
    }

    // Calculate spacing based on font size
    function getSpacing(fontSize) {
        return fontSize * 3.5;  // Increased spacing multiplier
    }

    let fontSize = getFontSize();
    let spacing = getSpacing(fontSize);
    let columns = Math.floor(window.innerWidth / spacing);
    let drops = Array(columns).fill().map(() => Math.floor(Math.random() * -100));
    let activeCommands = Array(columns).fill().map(() => getRandomCommand());

    function getRandomCommand() {
        return commands[Math.floor(Math.random() * commands.length)];
    }

    function draw() {
        // Update font size and spacing on resize
        fontSize = getFontSize();
        spacing = getSpacing(fontSize);
        columns = Math.floor(window.innerWidth / spacing);
        
        // Adjust arrays if columns changed
        if (drops.length !== columns) {
            drops = Array(columns).fill().map(() => Math.floor(Math.random() * -100));
            activeCommands = Array(columns).fill().map(() => getRandomCommand());
        }

        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            ctx.fillText(activeCommands[i], i * spacing, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i] = -5;
                activeCommands[i] = getRandomCommand();
            }
            drops[i]++;
        }
    }

    window.addEventListener('resize', () => {
        setCanvasSize();
        // Update arrays with new column count
        columns = Math.floor(window.innerWidth / spacing);
        drops = Array(columns).fill().map(() => Math.floor(Math.random() * -100));
        activeCommands = Array(columns).fill().map(() => getRandomCommand());
    });

    setCanvasSize();
    draw();
    setInterval(draw, 80);
});