document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.querySelector('.greeting-text') || document.body; // Apnar HTML-e greeting class thakle seta select korbe
    
    const updateGreeting = () => {
        const hour = new Date().getHours();
        let greeting;

        if (hour < 12) greeting = "Shuvo Sokal! 🌅";
        else if (hour < 17) greeting = "Shuvo Dupur! ☀️";
        else if (hour < 21) greeting = "Shuvo Sondhya! 🌆";
        else greeting = "Shuvo Ratri! 🌙";

        // Jodi apni kono specific element-e text dekhate chan
        if (document.getElementById('greeting')) {
            document.getElementById('greeting').innerText = greeting;
        }
        console.log(`System Status: ${greeting} | Theme: Light Sky Animated`);
    };

    // Initialize Greeting
    updateGreeting();

    // Console-e ekta cool message for debugging
    console.log("%c Daily Task Master: Ultimate Edition Loaded! ", 
                "background: #e0f2fe; color: #0369a1; font-weight: bold; padding: 10px; border-radius: 5px;");
});
