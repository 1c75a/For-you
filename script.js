const yesButton = document.getElementById('yesButton');
        const noButton = document.getElementById('noButton');
        const buttonContainer = document.querySelector('.button-container');
        const daisy = document.getElementById('daisy');
        const customModal = document.getElementById('customModal');
        const daisyBackground = document.getElementById('daisyBackground');

        function createPixelDaisy() {
            const daisy = document.createElement('div');
            daisy.classList.add('pixel-daisy');
            
            const daisySVG = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="40" height="40">
                    <circle cx="5" cy="5" r="3" fill="#FFD700"/>
                    <path d="M2,5 L8,5 M5,2 L5,8 M3,3 L7,7 M3,7 L7,3" stroke="#FFFFFF" stroke-width="0.5"/>
                    <circle cx="5" cy="5" r="1" fill="#FF69B4"/>
                </svg>
            `;
            
            daisy.innerHTML = daisySVG;

            daisy.style.left = `${Math.random() * 100}%`;
            daisy.style.top = `${Math.random() * 100}%`;

            daisy.style.animationDelay = `${Math.random() * 5}s`;
            
            return daisy;
        }

        for (let i = 0; i < 40; i++) {
            daisyBackground.appendChild(createPixelDaisy());
        }

        noButton.addEventListener('mouseenter', function() {
            const containerWidth = buttonContainer.offsetWidth;
            const containerHeight = buttonContainer.offsetHeight;
            const yesButton = document.getElementById('yesButton');
            
            let randomX, randomY;
            let attempts = 0;
            const maxAttempts = 100;
            
            do {
                randomX = Math.random() * (containerWidth - noButton.offsetWidth);
                randomY = Math.random() * (containerHeight - noButton.offsetHeight);
                
                const noRect = {
                    left: randomX,
                    right: randomX + noButton.offsetWidth,
                    top: randomY,
                    bottom: randomY + noButton.offsetHeight
                };
                
                const yesRect = {
                    left: yesButton.offsetLeft,
                    right: yesButton.offsetLeft + yesButton.offsetWidth,
                    top: yesButton.offsetTop,
                    bottom: yesButton.offsetTop + yesButton.offsetHeight
                };
                
                const noOverlap = 
                    noRect.right < yesRect.left || 
                    noRect.left > yesRect.right || 
                    noRect.bottom < yesRect.top || 
                    noRect.top > yesRect.bottom;
                
                if (noOverlap || attempts >= maxAttempts) {
                    break;
                }
                
                attempts++;
            } while (true);
            
            noButton.style.position = 'absolute';
            noButton.style.left = `${randomX}px`;
            noButton.style.top = `${randomY}px`;
        });

        yesButton.addEventListener('click', function() {
            daisy.style.display = 'block';
            customModal.style.display = 'flex';
        });

        function closeModal() {
            customModal.style.display = 'none';
        }

        document.body.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });