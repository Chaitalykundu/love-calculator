function loveCalculate() {
  let a = document.getElementById("name").value;
  let b = document.getElementById("partnersname").value;

  let str = (a + "loves" + b).toLowerCase();
  console.log("Combined string:", str);

  let sumOfAscii = frequencyOfCharacters(str);
  console.log("Sum of character frequencies:", sumOfAscii);

  let percentage = reduceNumber(sumOfAscii);

  let result = document.getElementById("result");
  result.textContent = percentage + " %";

  console.log("Final percentage:", percentage);

  saveLoveData(a, b, percentage);
}

function frequencyOfCharacters(str) {
  let n = str.length;

  const countFreq = {};

  for (let i of str) {
    countFreq[i] = (countFreq[i] || 0) + 1;
  }

  let countFreqValue = Object.values(countFreq).join("");
  console.log("countFreqValue", countFreqValue);

  return countFreqValue;
}

function reduceNumber(countFreqValue) {
  let strNum = countFreqValue.toString();

  while (parseInt(strNum) > 100) {
    let newNum = [];
    let len = strNum.length;

    for (let i = 0; i < Math.ceil(len / 2); i++) {
      let sum = parseInt(strNum[i]) + parseInt(strNum[len - 1 - i]);
      newNum.push(sum);
      console.log("each sum", sum);
    }

    strNum = newNum.join(""); // Convert array to string for the next iteration
  }
  strNum = parseInt(strNum);
  return strNum;
}

// Function to send data to JSON backend
function saveLoveData(name, partnersname, percentage) {
    fetch("http://localhost:5000/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        partnersname,
        percentage,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Data saved:", data))
      .catch((error) => console.error("Error:", error));
  }