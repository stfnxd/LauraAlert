// Lyt efter beskeder fra StreamElements
window.addEventListener("message", function(event) {
    // Tjek at beskeden kommer fra StreamElements
    if (!event.origin.includes("streamelements.com")) return;

    const alertData = event.data;
    console.log("🔔 Modtog event fra StreamElements:", alertData);

    // Vis alerten
    triggerAlert(alertData);
}, false);

// Funktion til at vise alert
function triggerAlert(alertData) {
    const sunContainer = document.getElementById("sun-container");
    const username = document.getElementById("username");
    const eventInfo = document.getElementById("event-info");
    const alertText = document.getElementById("alert-text");

    // Opdater teksten baseret på event-type
    username.innerText = alertData.username || "Ukendt";
    eventInfo.innerText = alertData.type === "tip" ? `donerede ${alertData.amount} kr!` 
    : alertData.type === "subscriber" ? `subbede på tier ${alertData.tier}!` 
    : alertData.type === "cheer" ? `cheerede ${alertData.amount} bits!` 
    : "gør noget fedt!";

    // Start animation
    sunContainer.classList.add("animate");
    alertText.classList.add("animate");

    // Afspil lyd (hvis du har en lydfil)
    const alertSound = document.getElementById("alert-sound");
    alertSound.src = "alert.mp3"; // Tilføj din egen lydfil
    alertSound.play();

    // Fjern animation efter et par sekunder
    setTimeout(() => {
        sunContainer.classList.remove("animate");
        alertText.classList.remove("animate");
    }, 4000);
}
