// Funktion til at starte animationen
function triggerAlert(username) {
    const sun = document.getElementById('sun');
    const alertText = document.getElementById('alert-text');
    const usernameSpan = document.getElementById('username');
    
    // Opdaterer navnet i alerten
    usernameSpan.textContent = username;
    
    // Tilføjer animationsklasserne
    sun.classList.add('animate');
    alertText.classList.add('animate');

    // Fjerner animationen efter 5 sekunder, så den kan startes igen
    setTimeout(() => {
        sun.classList.remove('animate');
        alertText.classList.remove('animate');
    }, 5000);
}

// Test animationen lokalt
document.addEventListener('DOMContentLoaded', () => {
    // Start animationen med et testnavn
    triggerAlert('TestNavn');
});
