// Weather Controller Logic - extra.js

window.addEventListener('load', () => {
    // ১. একটি কন্ট্রোল প্যানেল তৈরি করা
    const weatherControl = document.createElement('div');
    weatherControl.style = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 10000;
        background: rgba(255,255,255,0.8);
        padding: 10px;
        border-radius: 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        backdrop-filter: blur(5px);
    `;

    // ২. ওয়েদার অপশনগুলো (Emoji, Type)
    const modes = [
        { icon: '☀️', type: 'sunny' },
        { icon: '🌧️', type: 'rainy' },
        { icon: '❄️', type: 'snowy' },
        { icon: '⛈️', type: 'stormy' },
        { icon: '🌙', type: 'night' },
        { icon: '☁️', type: 'cloudy' }
    ];

    modes.forEach(mode => {
        const btn = document.createElement('button');
        btn.innerHTML = mode.icon;
        btn.style = `
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            font-size: 20px;
            transition: 0.3s;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        `;
        
        btn.onclick = () => {
            // মেইন কোডের applyWeatherTheme ফাংশনটি কল করা
            if (typeof applyWeatherTheme === 'function') {
                applyWeatherTheme(mode.type);
                showToast(`Weather changed to ${mode.type.toUpperCase()}! ✨`);
            }
        };

        btn.onmouseover = () => btn.style.transform = 'scale(1.2)';
        btn.onmouseout = () => btn.style.transform = 'scale(1)';
        
        weatherControl.appendChild(btn);
    });

    document.body.appendChild(weatherControl);
});
