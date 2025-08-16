
// Shows data - JSON structure: {date, time, city, venue, link}
// date: ISO format YYYY-MM-DD for reliable parsing
// time: optional display time (e.g., "9:15 PM")
const showsData = [
  {
    date: "2025-11-01",
    time: null,
    city: "Rochester, NY",
    venue: "Halloween Hangover @ Genesee Valley Park",
    link: "https://www.monroecounty.gov/parks-geneseevalley"
  },
  {
    date: "2025-12-21",
    time: "7PM",
    city: "Rochester, NY",
    venue: "The Bug Jar",
    link: "https://www.bugjar.com/",
  },
  {
    date: "2025-07-11",
    time: "9:15 PM",
    city: "Rochester, NY",
    venue: "Art Jam @ Boulder Coffee",
    link: "https://www.instagram.com/p/DLIAvc4uANB/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA=="
  },
  {
    date: "2025-05-24",
    time: null,
    city: "Rochester, NY",
    venue: "Bar Bad Ending",
    link: "https://www.barbadending.com"
  },
  {
    date: "2025-05-02",
    time: null,
    city: "Rochester, NY",
    venue: "The Psychic Garden",
    link: "https://psyg.org/"
  },
];

function formatDisplayDate(dateStr, timeStr) {
  // Parse date in local timezone to avoid off-by-one errors
  const [yearNum, monthNum, dayNum] = dateStr.split('-').map(Number);
  const date = new Date(yearNum, monthNum - 1, dayNum); // month is 0-indexed
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  // Add ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  const suffix = getOrdinalSuffix(day);
  let formatted = `${month} ${day}<sup>${suffix}</sup> ${year}`;
  
  if (timeStr) {
    formatted += ` @ ${timeStr}`;
  }
  
  return formatted;
}

function parseDate(dateStr) {
  // Parse date in local timezone to avoid off-by-one errors
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed
}

function sortShowsByDate(shows) {
  return [...shows].sort((a, b) => {
    return parseDate(a.date) - parseDate(b.date);
  });
}

function filterFutureShows(shows) {
  const now = new Date();
  return shows.filter(show => {
    return parseDate(show.date) >= now;
  });
}

function createShowsTable(shows) {
  const table = document.createElement('table');
  
  // Create header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  
  const dateHeader = document.createElement('th');
  dateHeader.className = 'width-smaller';
  dateHeader.innerHTML = 'Date<span class="icon-font">g</span>';
  dateHeader.style.verticalAlign = 'middle';
  dateHeader.style.textAlign = 'center';
  
  const cityHeader = document.createElement('th');
  cityHeader.className = 'width-smallest';
  cityHeader.innerHTML = 'City<span class="icon-font">i</span>';
  cityHeader.style.verticalAlign = 'middle';
  cityHeader.style.textAlign = 'center';
  
  const venueHeader = document.createElement('th');
  venueHeader.className = 'width-auto';
  venueHeader.innerHTML = 'Venue<span class="icon-font">V</span>';
  venueHeader.style.verticalAlign = 'middle';
  venueHeader.style.textAlign = 'center';
  
  headerRow.appendChild(dateHeader);
  headerRow.appendChild(cityHeader);
  headerRow.appendChild(venueHeader);
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Create body
  const tbody = document.createElement('tbody');
  
  if (shows.length === 0) {
    // No shows - create single row spanning all columns
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 3;
    cell.innerHTML = '<center>No upcoming shows<span class="icon-font">A</span><br />Reach out to Book Us at <a href="mailto:band@missukissu.com">BAND@MISSUKISSU.COM</a></center>';
    row.appendChild(cell);
    tbody.appendChild(row);
  } else {
    // Normal show rows
    shows.forEach(show => {
      const row = document.createElement('tr');
      
      const dateCell = document.createElement('td');
      dateCell.innerHTML = formatDisplayDate(show.date, show.time);
      dateCell.style.verticalAlign = 'middle';
      dateCell.style.textAlign = 'center';
      
      const cityCell = document.createElement('td');
      cityCell.textContent = show.city;
      cityCell.style.verticalAlign = 'middle';
      cityCell.style.textAlign = 'center';
      
      const venueCell = document.createElement('td');
      venueCell.style.verticalAlign = 'middle';
      venueCell.style.textAlign = 'center';
      if (show.link) {
        const venueLink = document.createElement('a');
        venueLink.href = show.link;
        venueLink.textContent = show.venue;
        venueCell.appendChild(venueLink);
      } else {
        venueCell.textContent = show.venue;
      }
      
      row.appendChild(dateCell);
      row.appendChild(cityCell);
      row.appendChild(venueCell);
      tbody.appendChild(row);
    });
  }
  
  table.appendChild(tbody);
  return table;
}

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

// Populate shows table when page loads
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('shows-table-container');
  if (container) {
    const futureShows = filterFutureShows(showsData);
    const sortedShows = sortShowsByDate(futureShows);
    const table = createShowsTable(sortedShows);
    container.appendChild(table);
  }
});