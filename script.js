// Modtag beskeder fra StreamElements widgeten
window.addEventListener("message", function(event) {
    // Tjek at beskeden kommer fra StreamElements
    if (!event.origin.includes("streamelements.com")) return;

    const alertData = event.data;
    console.log("🔔 Modtog event fra StreamElements:", alertData);

    // Kald triggerAlert for at starte animationen
    triggerAlert(alertData);
}, false);

// Indsæt dit StreamElements overlay token her
const overlayToken = "67b4b80d3de849372fb950b9";

// Opret forbindelse til StreamElements WebSocket
const socket = new WebSocket(`wss://realtime.streamelements.com/socket?token=${overlayToken}`);

socket.onopen = function () {
    console.log("✅ Forbundet til StreamElements WebSocket");
};

socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log("🔔 Event modtaget:", data);

    if (data.type === "event") {
        const eventData = data.data;
        const alertData = {
            type: eventData.type,
            name: eventData.username || "Ukendt",
            amount: eventData.amount || 0,
            tier: eventData.tier || 0
        };
        triggerAlert(alertData);
    }
};

socket.onerror = function (error) {
    console.error("❌ WebSocket Fejl:", error);
};

socket.onclose = function () {
    console.log("⚠️ WebSocket lukket, prøver at genoprette forbindelse...");
    setTimeout(() => {
        location.reload();
    }, 5000);
};
