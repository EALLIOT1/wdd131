// Static weather values
const temperature = 28;
const windSpeed = 12;

// Calculate wind chill in Celsius
function calculateWindChill(temp, speed) {
    return 13.12 + (0.6215 * temp) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temp * Math.pow(speed, 0.16));
}

// Display wind chill only when the calculation is valid
let windChill = "N/A";

if (temperature <= 10 && windSpeed > 4.8) {
    windChill = calculateWindChill(temperature, windSpeed).toFixed(1) + " °C";
}

document.querySelector("#windchill").textContent = windChill;

// Current year
const currentYear = new Date().getFullYear();
document.querySelector("#currentyear").textContent = currentYear;

// Last modified date
document.querySelector("#lastModified").textContent = document.lastModified;
