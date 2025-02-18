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

// Funktion til at trigge animation og lyd
function triggerAlert(eventData) {
    const sunContainer = document.getElementById('sun-container');
    const eventType = document.getElementById('event-type');
    const alertText = document.getElementById('alert-text');
    const usernameSpan = document.getElementById('username');
    const eventInfo = document.getElementById('event-info');
    const alertSound = document.getElementById('alert-sound');

    // Definér lyde
    const sounds = {
        follower: 'sounds/follow.mp3',
        subscriber: 'sounds/sub.mp3',
        tip: 'sounds/dono.mp3',
        cheer: 'sounds/bit.mp3',
        raid: 'sounds/raid.mp3'
    };

    // Opdater teksten og lyden
    usernameSpan.textContent = eventData.name;
    switch(eventData.type) {
        case 'follower':
            eventType.textContent = 'Follower';
            eventInfo.textContent = '';
            alertSound.src = sounds.follower;
            break;
        case 'subscriber':
            eventType.textContent = 'SUB';
            eventInfo.textContent = ` - Tier ${eventData.tier}`;
            alertSound.src = sounds.subscriber;
            break;
        case 'tip':
            eventType.textContent = 'DONO';
            eventInfo.textContent = ` - ${eventData.amount} DKK`;
            alertSound.src = sounds.tip;
            break;
        case 'cheer':
            eventType.textContent = 'BIT';
            eventInfo.textContent = ` - ${eventData.amount} Bits`;
            alertSound.src = sounds.cheer;
            break;
        case 'raid':
            eventType.textContent = 'RAID';
            eventInfo.textContent = ` - ${eventData.amount} Raiders`;
            alertSound.src = sounds.raid;
            break;
    }

    // Start animation og lyd
    sunContainer.classList.add('animate');
    alertText.classList.add('animate');
    alertSound.play();

    // Fjern animation efter 5 sekunder
    setTimeout(() => {
        sunContainer.classList.remove('animate');
        alertText.classList.remove('animate');
    }, 5000);
}