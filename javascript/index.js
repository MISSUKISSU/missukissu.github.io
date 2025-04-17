
function applyTitleColors() {
  const colors = ['#FF014D', '#FFA300', '#FFEC26', '#01E536', '#34ACFF', '#01E536', '#34ACFF', '#7742DB', ]; // Add/change colors as desired
  document.querySelectorAll('h2').forEach((heading) => {
    const letters = heading.textContent.split('');
    
    heading.innerHTML = letters.map((letter, index) => {
      const colorIndex = index % colors.length;
      return `<span style="color: ${colors[colorIndex]}">${letter}</span>`;
    }).join('');
  });
}

applyTitleColors();