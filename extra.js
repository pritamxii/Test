// extra.js - The "Super Saiyan" Logic Controller

window.addEventListener('load', () => {
    console.log("Extra JS: Power Level is over 9000!");

    // 1. Create a "Power Level" display in the Header
    const headerTitle = document.querySelector('.header-left');
    if (headerTitle) {
        const powerLevel = document.createElement('div');
        powerLevel.id = 'power-level-display';
        powerLevel.style = "color: #fdfc47; font-weight: 900; font-size: 14px; text-shadow: 0 0 5px orange;";
        powerLevel.innerHTML = "POWER LEVEL: <span id='pl-value'>9000</span>";
        headerTitle.appendChild(powerLevel);
    }

    // 2. Hijack the toggleTask function for Sound and Visuals
    const originalToggle = window.toggleTask;
    window.toggleTask = function(i) {
        // Run the original logic first
        originalToggle(i);

        // Update Power Level based on score
        const currentScore = parseInt(document.getElementById('scoreText').innerText) || 0;
        const newPL = 9000 + (currentScore * 100);
        document.getElementById('pl-value').innerText = newPL;

        // Play a "Power Up" sound effect (Using a public short spark sound)
        let audio = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');
        audio.volume = 0.5;
        audio.play();

        // Show a "KAMEHAMEHA" toast if score is high
        if (currentScore > 80) {
            showToast("✨ SUPER SAIYAN MODE UNLOCKED!");
        }
    };

    // 3. Hijack the delTask function for a Screen Shake effect
    const originalDelete = window.delTask;
    window.delTask = function(i) {
        // Screen Shake Effect
        const app = document.getElementById('app');
        app.style.transition = "transform 0.1s";
        app.style.transform = "translateX(10px)";
        
        setTimeout(() => app.style.transform = "translateX(-10px)", 50);
        setTimeout(() => app.style.transform = "translateX(5px)", 100);
        setTimeout(() => app.style.transform = "translateX(0)", 150);

        // Run the actual delete
        originalDelete(i);
        showToast("💥 ENEMY DEFEATED!");
    };

    // 4. Add a cool console log for debugging
    console.log("%c DRAGON BALL Z SYSTEM ACTIVE ", "background: #ff8a00; color: #fff; font-weight: bold; padding: 5px;");
});
