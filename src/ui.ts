export function renderDashboard(weatherHtml: string, tideHtml: string): void {
  const dashboardElement = document.getElementById('dashboard');
  if (dashboardElement) {
    dashboardElement.innerHTML = `
      <div class="weather">
        ${weatherHtml}
      </div>
      <div class="tide">
        <h2>Tide Information</h2>
        ${tideHtml}
      </div>
      <div class="footer">
        ${getFooter()}
      </div>
    `;
  }
}

function getFooter(): string {
  const now = new Date();
  const sunriseTime = new Date(now.setHours(6, 23, 0, 0)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunsetTime = new Date(now.setHours(20, 17, 0, 0)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const moonPhase = '🌓'; // This should be calculated based on the actual moon phase

  return `
    ${now.toLocaleDateString()} ${moonPhase} 
    🌅 ${sunriseTime} 🌇 ${sunsetTime}
  `;
}
