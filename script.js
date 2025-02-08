// function loveCalculate() {
//   let a = document.getElementById("name").value;
//   let b = document.getElementById("partnersname").value;

//   let str = (a + "loves" + b).toLowerCase();
//   console.log("Combined string:", str);

//   let sumOfAscii = frequencyOfCharacters(str);
//   console.log("Sum of character frequencies:", sumOfAscii);

//   let percentage = reduceNumber(sumOfAscii);

//   let result = document.getElementById("result");
//   result.textContent = percentage + " %";

//   console.log("Final percentage:", percentage);

//   saveLoveData(a, b, percentage);
// }

// function frequencyOfCharacters(str) {
//   let n = str.length;

//   const countFreq = {};

//   for (let i of str) {
//     countFreq[i] = (countFreq[i] || 0) + 1;
//   }

//   let countFreqValue = Object.values(countFreq).join("");
//   console.log("countFreqValue", countFreqValue);

//   return countFreqValue;
// }

// function reduceNumber(countFreqValue) {
//   let strNum = countFreqValue.toString();

//   while (parseInt(strNum) > 100) {
//     let newNum = [];
//     let len = strNum.length;

//     for (let i = 0; i < Math.ceil(len / 2); i++) {
//       let sum = parseInt(strNum[i]) + parseInt(strNum[len - 1 - i]);
//       newNum.push(sum);
//       console.log("each sum", sum);
//     }

//     strNum = newNum.join(""); // Convert array to string for the next iteration
//   }
//   strNum = parseInt(strNum);
//   return strNum;
// }

// // Function to send data to JSON backend
// function saveLoveData(name, partnersname, percentage) {
//     fetch("https://chaitalykundu.github.io/love-calculator/save", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         partnersname,
//         percentage,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log("Data saved:", data))
//       .catch((error) => console.error("Error:", error));
//   }

const BACKEND_URL = "https://chaitalykundu.github.io/love-calculator/"; // 🔹 Replace with your deployed backend URL

function loveCalculate() {
  let a = document.getElementById("name").value;
  let b = document.getElementById("partnersname").value;

  if (!a || !b) {
    alert("Please enter both names!");
    return;
  }

  let str = (a + "loves" + b).toLowerCase();
  let sumOfAscii = frequencyOfCharacters(str);
  let percentage = reduceNumber(sumOfAscii);

  document.getElementById("result").textContent = `Love Percentage: ${percentage}%`;

  saveLoveData(a, b, percentage);
}

function frequencyOfCharacters(str) {
  const countFreq = {};
  for (let i of str) {
    countFreq[i] = (countFreq[i] || 0) + 1;
  }
  return Object.values(countFreq).join("");
}

function reduceNumber(countFreqValue) {
  let strNum = countFreqValue.toString();
  while (parseInt(strNum) > 100) {
    let newNum = [];
    let len = strNum.length;
    for (let i = 0; i < Math.ceil(len / 2); i++) {
      let sum = parseInt(strNum[i]) + parseInt(strNum[len - 1 - i]);
      newNum.push(sum);
    }
    strNum = newNum.join("");
  }
  return parseInt(strNum);
}

// 🔹 Save data to the hosted backend
function saveLoveData(name, partnersname, percentage) {
  fetch(`${BACKEND_URL}/save`, { // 🔹 Corrected API call
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, partnersname, percentage }),
  })
    .then(response => response.json())
    .then(data => console.log("Data saved:", data))
    .catch(error => console.error("Error:", error));
}

// 🔹 Fetch stored results from backend
function fetchStoredResults() {
  fetch(`${BACKEND_URL}/entries`)
    .then(response => response.json())
    .then(data => {
      console.log("Stored Results:", data);
      let resultsDiv = document.getElementById("storedResults");
      resultsDiv.innerHTML = "<h3>Stored Results:</h3>";
      data.forEach(entry => {
        resultsDiv.innerHTML += `<p>${entry.name} ❤️ ${entry.partnersname} = ${entry.percentage}%</p>`;
      });
    })
    .catch(error => console.error("Error fetching data:", error));
}

fetchStoredResults(); // Load previous results on page load
