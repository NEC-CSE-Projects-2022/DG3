// ---------------------------- Navbar Active State ----------------------------
const tabs = document.querySelectorAll('.navbar li');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ---------------------------- Load CSV ----------------------------
let trainData = [];

fetch("etrain_delays.csv")
  .then(response => response.text())
  .then(csv => {
    const rows = csv.trim().split("\n").map(r => r.split(","));
    const headers = rows[0].map(h => h.trim());

    trainData = rows.slice(1).map(row => {
      let obj = {};
      headers.forEach((h, i) => {
        obj[h] = row[i]?.trim();
      });
      return obj;
    });

    displayTable(trainData);
  });


const input = document.getElementById("trainInput");
const dropdown = document.getElementById("dropdownList");

function getUniqueTrains() {
  const map = new Map();
  trainData.forEach(t => {
    if (!map.has(t.train_number)) {
      map.set(t.train_number, t.train_name);
    }
  });
  return [...map.entries()];
}

input.addEventListener("input", () => {
  const value = input.value.toLowerCase().trim();
  dropdown.innerHTML = "";

  if (!value) {
    dropdown.style.display = "none";
    displayTable(trainData);
    return;
  }

  const matches = getUniqueTrains().filter(
    ([num, name]) =>
      num.toLowerCase().includes(value) ||
      name.toLowerCase().includes(value)
  );

  if (matches.length === 0) {
    dropdown.style.display = "none";
    return;
  }

  matches.forEach(([num, name]) => {
    const div = document.createElement("div");
    div.className = "dropdown-item";
    div.textContent = `${num} – ${name}`;

    div.onclick = () => {
      input.value = `${num} – ${name}`;
      dropdown.style.display = "none";
      filterTable(num);
      callBackendForAccuracy(num);   
    };

    dropdown.appendChild(div);
  });

  dropdown.style.display = "block";
});


input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const value = input.value.toLowerCase();
    const match = getUniqueTrains().find(
      ([num, name]) =>
        value.includes(num.toLowerCase()) ||
        value.includes(name.toLowerCase())
    );

    if (match) {
      filterTable(match[0]);
      callBackendForAccuracy(match[0]);
    }
  }
});

document.addEventListener("click", e => {
  if (!e.target.closest(".search-box")) {
    dropdown.style.display = "none";
  }
});


function filterTable(trainNumber) {
  const filtered = trainData.filter(
    t => t.train_number === trainNumber
  );
  displayTable(filtered);
}


function displayTable(data) {
  const output = document.getElementById("output");

  if (!data || data.length === 0) {
    output.innerHTML = "<p class='error'>No matching record found.</p>";
    return;
  }


  const removeCols = ["date", "delay_minutes"];

  const headers = Object.keys(data[0]).filter(h => !removeCols.includes(h));

  let table = "<table><tr>";
  headers.forEach(key => {
    table += `<th>${key}</th>`;
  });
  table += "</tr>";

  data.forEach(row => {
    table += "<tr>";
    headers.forEach(h => {
      table += `<td>${row[h] || "-"}</td>`;
    });
    table += "</tr>";
  });

  table += "</table>";
  output.innerHTML = `<div class="table-container">${table}</div>`;
}

function predictDelay() {
  const data = {
    train_name: document.getElementById("train_name").value,
    source: document.getElementById("source").value,
    destination: document.getElementById("destination").value,
    distance: document.getElementById("distance").value
  };

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    document.getElementById("predictionResult").innerHTML =
      `<h3>🚦 Prediction: ${result.prediction}</h3>
       <h4>🎯 Accuracy: ${result.accuracy}</h4>`;
  });
}

function callBackendForAccuracy(trainNumber) {
  fetch(`http://127.0.0.1:5000/get_accuracy/${trainNumber}`)
    .then(res => res.json())
    .then(data => {
      let output = "<h3>📊 Prediction Accuracy per Record</h3>";
      output += "<table><tr><th>Prediction</th><th>Accuracy</th></tr>";

      data.forEach(row => {
        output += `
          <tr>
            <td>${row.predicted_delay}</td>
            <td>${row.accuracy}</td>
          </tr>
        `;
      });

      output += "</table>";
      document.getElementById("output").innerHTML += output;
    });
}
