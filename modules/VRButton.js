// VRButton.js
export const VRButton = {
    createButton: function(renderer) {
        const button = document.createElement('button');
        button.style.position = 'absolute';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.padding = '12px';
        button.style.border = '1px solid #fff';
        button.style.borderRadius = '4px';
        button.style.background = 'rgba(0,0,0,0.1)';
        button.style.color = '#fff';
        button.style.font = 'normal 13px sans-serif';
        button.style.textAlign = 'center';
        button.style.opacity = '0.5';
        button.style.outline = 'none';
        button.style.zIndex = '999';
        button.textContent = 'ENTER VR';

        function showEnterVR() {
            let currentSession = null;

            async function onSessionStarted(session) {
                session.addEventListener('end', onSessionEnded);
                await renderer.xr.setSession(session);
                button.textContent = 'EXIT VR';
                currentSession = session;
            }

            function onSessionEnded() {
                currentSession.removeEventListener('end', onSessionEnded);
                button.textContent = 'ENTER VR';
                currentSession = null;
            }

            button.onclick = () => {
                if (currentSession === null) {
                    const sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor'] };
                    navigator.xr.requestSession('immersive-vr', sessionInit).then(onSessionStarted);
                } else {
                    currentSession.end();
                }
            };
        }

        if ('xr' in navigator) {
            navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                supported ? showEnterVR() : button.textContent = 'VR NOT SUPPORTED';
            });
        } else {
            button.textContent = 'VR NOT SUPPORTED';
        }

        return button;
    }
};