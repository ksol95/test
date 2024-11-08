// Задача 1
const inputFirstTask = document.querySelector("#input-1");
const answerFirstTask = document.querySelector("#answer-1");
const computerCounters = (count) => {
  const words = ["копмьютер", "копмьютера", "копмьютеров"];
  const wordPositions = 0;

  console.log(count % 10, count % 100);
  // Если число кончается на еденицу кроме случаев где остаток от деления = 11
  if (count % 10 === 1 && count % 100 !== 11)
    return String(count) + " " + words[wordPositions];

  // Если число кончается на 2, 3, 4 кроеме 12, 13, 14
  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 12 || count % 100 >= 15)
  ) {
    return String(count) + " " + words[wordPositions + 1];
  }
  return String(count) + " " + words[wordPositions + 2];
};

inputFirstTask.addEventListener("input", () => {
  !inputFirstTask.value &&
    (inputFirstTask.value = inputFirstTask.attributes.min.value);
  const count = parseInt(inputFirstTask.value);
  inputFirstTask.value = count;
  answerFirstTask.textContent = computerCounters(count);
});

// Задача 2
const inputSecondTask = document.querySelector("#input-2");
const LabelSeconTask = document.querySelector("#caption-2");
const buttonSeconTask = document.querySelector("#btn-2");
const buttonPushSeconTask = document.querySelector("#push-btn-2");
const answerSecondTask = document.querySelector("#answer-2");

let request = [];
const getCommonDivisor = (arr) => {
  let devisors = new Set();
  try {
    if (!Array.isArray(arr) || arr.length < 2) {
      throw new Error("В массиве должно быть как минимум два числа");
    }
    // Сортируем массив по возрастанию, а так же оставляем только уникальные значения для уменьшения количества интеракций
    arr.sort((a, b) => a - b);
    arr = [...new Set(arr)];
    // Перебераем первое число
    for (let j = 2; j <= arr[0]; j++) {
      if (typeof arr[0] !== "number" || arr[0] <= 0) {
        throw new Error("Все числа в массиве должны быть положительными");
      }
      arr[0] % j === 0 ? devisors.add(j) : devisors.delete(j);
    }

    // перебераем остальные числа
    for (let i = 1; i < arr.length; i++) {
      if (typeof arr[i] !== "number" || arr[i] <= 0) {
        throw new Error("Все числа в массиве должны быть положительными");
      }
      if (devisors.size != 0) {
        devisors.forEach((devisor) => {
          arr[i] % devisor != 0 && devisors.delete(devisor);
        });
      }
    }
  } catch (e) {
    alert(e.message);
    return arr;
  }
  return Array.from(devisors);
};

inputSecondTask.addEventListener("input", () => {
  !inputSecondTask.value &&
    (inputSecondTask.value = inputSecondTask.attributes.min.value);
  const count = parseInt(inputSecondTask.value);
  inputSecondTask.value = count;
});

const pushInArray = () => {
  if (isNaN(inputSecondTask.value) || inputSecondTask.value <= 0) {
    alert("Введите положительное число");
    return;
  }
  request.push(parseInt(inputSecondTask.value));
  LabelSeconTask.textContent = `Массив: [${request}]`;
  inputSecondTask.value = "";
};

inputSecondTask.addEventListener(
  "keydown",
  (e) => e.key === "Enter" && pushInArray()
);
buttonPushSeconTask.addEventListener("click", pushInArray);

buttonSeconTask.addEventListener("click", () => {
  const answerLi = document.createElement("li");
  if (request.length > 2) {
    LabelSeconTask.textContent = "Массив: []";
    if (getCommonDivisor(request) != 0) {
      answerLi.textContent = `Общие делители -  [${[
        getCommonDivisor(request),
      ]}] для массива [${request}]`;
    } else {
      answerLi.textContent = `Нет общих делителей для массива [${request}]`;
    }
    answerSecondTask.appendChild(answerLi);
    request.length = 0;
  }
});

const inputFrom = document.querySelector("#input-from-3");
const inputTo = document.querySelector("#input-to-3");
const answerThirdTask = document.querySelector("#answer-3");
const buttonThirdTask = document.querySelector("#btn-3");

const isSimpleNumber = (number) => {
  number = parseInt(number);
  for (let i = 2; i < number; i++) {
    if (number % i === 0) return false;
  }
  return true;
};

const createRange = (from, to) => {
  let result = [];
  if (from <= 1) from = 2;
  for (let i = from; i <= to; i++) isSimpleNumber(i) && result.push(i);
  return result;
};

buttonThirdTask.addEventListener("click", () => {
  let answer = createRange(parseInt(inputFrom.value), parseInt(inputTo.value));
  answerThirdTask.textContent = `[${answer}] - всего ${answer.length}`;
  inputFrom.value = "";
  inputTo.value = "";
});

const buttonFourthTask = document.querySelector("#btn-4");
const inputFourthTask = document.querySelector("#input-4");
const answerFourthTask = document.querySelector("#answer-4");
inputFourthTask.value = 5;
const createMultiTable = (numb) => {
  let matrix = [];
  for (let row = 0; row <= numb; row++) {
    matrix[row] = [];
    matrix[row][0] = row;
    for (let column = 1; column <= numb; column++) {
      matrix[0][column] = column;
      matrix[row][column] = column * row;
    }
  }
  return matrix;
};

const multiTableToHtml = (arr) => {
  let table = "<table>";
  for (let i = 0; i < arr.length; i++) {
    table += "<tr>";
    for (let j = 0; j < arr[i].length; j++) {
      table += `<td>${arr[i][j] === 0 ? "" : arr[i][j]}</td>`;
    }
    table += "</tr>";
  }
  table += "</table>";
  return table;
};
const renderMultiTable = () => {
  let res = createMultiTable(parseInt(inputFourthTask.value));
  console.table(res);
  answerFourthTask.innerHTML = multiTableToHtml(res);
};

buttonFourthTask.addEventListener("click", renderMultiTable());
inputFourthTask.addEventListener(
  "keydown",
  (e) => e.key === "Enter" && renderMultiTable()
);

answerFourthTask.innerHTML = multiTableToHtml(createMultiTable(5));
