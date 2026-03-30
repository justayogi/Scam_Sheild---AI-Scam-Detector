// Array of timezones with their data
const timezones = [
    { name: 'EST', flag: '🇺🇸', offset: -5 },
    { name: 'PST', flag: '🇺🇸', offset: -8 },
    { name: 'GMT', flag: '🇬🇧', offset: 0 },
    { name: 'IST', flag: '🇮🇳', offset: 5.5 },
    { name: 'JST', flag: '🇯🇵', offset: 9 }
];

let is24Hour = false;

function updateClock() {
    const clockDiv = document.getElementById('clock');
    const now = new Date();
    
    let html = '<div style="text-align: center; font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 20px;">';
    html += '<h1 style="color: white; margin-bottom: 30px;">🌍 WORLD TIME CLOCK 🌍</h1>'; 
    
timezones.forEach(tz => {
        // Calculate time for each timezone
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const tzTime = new Date(utcTime + (3600000 * tz.offset));
        
        let hours = tzTime.getHours();
        const minutes = String(tzTime.getMinutes()).padStart(2, '0');
        const seconds = String(tzTime.getSeconds()).padStart(2, '0');
        
        let ampm = '';
        if (!is24Hour) {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
        }
        
        hours = String(hours).padStart(2, '0');
        
        html += `
            <div style="background: white; border-radius: 10px; padding: 20px; margin: 15px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: transform 0.3s;">\n                <h2 style="color: #667eea; margin: 0; font-size: 1.2em;">${tz.flag} ${tz.name}</h2>\n                <div style="font-family: 'Courier New', monospace; font-size: 2.5em; color: #333; margin: 15px 0; font-weight: bold;">${hours}:${minutes}:${seconds}${ampm}</div>\n            </div>
        `;
    });
    
    html += `
        <button onclick="toggleFormat()" style="
            margin-top: 20px;
            padding: 12px 30px;
            background: white;
            color: #667eea;
            border: 2px solid white;
            border-radius: 25px;
            font-size: 1em;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        " onmouseover="this.style.background='#667eea'; this.style.color='white';" onmouseout="this.style.background='white'; this.style.color='#667eea';">
            ${is24Hour ? '12-Hour Format' : '24-Hour Format'}
        </button>
    `;
    
    html += '</div>';
    
    clockDiv.innerHTML = html;
}

function toggleFormat() {
    is24Hour = !is24Hour;
    updateClock();
}

// Update clock every second
setInterval(updateClock, 1000);

// Initial call
updateClock();