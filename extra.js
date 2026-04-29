// extra.js - Clean Interaction Logic

window.addEventListener('load', () => {
    // 1. Add a Slim Progress Bar at the very top
    const progressBar = document.createElement('div');
    progressBar.style = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        width: 0%;
        background: #3b82f6;
        z-index: 10000;
        transition: width 0.4s ease;
    `;
    document.body.appendChild(progressBar);

    // 2. Update Progress Bar based on Score
    const updateTopBar = () => {
        const scoreText = document.getElementById('scoreText').innerText;
        progressBar.style.width = scoreText; // Matches the % score
    };

    // Observe changes in the score text
    const observer = new MutationObserver(updateTopBar);
    observer.observe(document.getElementById('scoreText'), { childList: true });

    // 3. Smooth Entry Animation for Task Items
    const originalRenderTasks = window.renderTasks;
    window.renderTasks = function(tasks) {
        originalRenderTasks(tasks);
        const items = document.querySelectorAll('.task-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    };
});
