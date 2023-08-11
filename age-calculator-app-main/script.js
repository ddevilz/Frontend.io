const elements = {
  day: document.getElementById("date"),
  month: document.getElementById("month"),
  year: document.getElementById("year"),
  result: document.getElementById("result"),
  inputBox: document.querySelectorAll(".error"),
  yearVal: document.querySelector("#yearVal"),
  monthVal: document.querySelector("#monthVal"),
  daysVal: document.querySelector("#daysVal"),
  label: document.querySelectorAll("label"),
};

const date = new Date();

function getAge(e) {
  e.preventDefault();
  resetFields(elements.yearVal, elements.monthVal, elements.daysVal);
  resetInputBoxes();

  if (!elements.year.value) {
    showError(elements.inputBox[2], elements.year, "Field is required");
    elements.label[2].style.color = "hsl(0, 100%, 67%)";
  }

  if (!elements.month.value) {
    showError(elements.inputBox[1], elements.month, "Field is required");
    elements.label[1].style.color = "hsl(0, 100%, 67%)";
  }

  if (!elements.day.value) {
    showError(elements.inputBox[0], elements.day, "Field is required");
    elements.label[0].style.color = "hsl(0, 100%, 67%)";

    return;
  }

  const checkVal = isValidDate(elements.year.value, elements.month.value);

  if (checkVal <= elements.day.value) {
    showError(elements.inputBox[0], null, "Must be valid day.");
  }

  if (elements.month.value > 12) {
    showError(elements.inputBox[1], null, "Must be valid month.");
  }

  if (elements.year.value > date.getFullYear()) {
    showError(elements.inputBox[2], null, "Must be in the Past.");
    return;
  }

  const years =
    date.getFullYear() -
    elements.year.value -
    (date.getMonth() > elements.month.value ||
    (date.getMonth() === elements.month.value &&
      date.getDate() >= elements.day.value)
      ? 0
      : 1);
  const months = (date.getMonth() + 1 + 12 - elements.month.value) % 12 || 12;
  const days =
    date.getDate() >= elements.day.value
      ? date.getDate() - elements.day.value
      : checkVal - elements.day.value + date.getDate();

  elements.yearVal.textContent = years;
  elements.monthVal.textContent = months;
  elements.daysVal.textContent = days;

  if (months === 0 && days === 0) {
    elements.result.innerHTML = `<p class="wishing">Happy Birthday!🎂🎈🎈</p>`;
  }
}

function resetFields(...fields) {
  fields.forEach((field) => (field.textContent = "--"));
}

function resetInputBoxes() {
  elements.inputBox.forEach((box) => (box.innerHTML = ""));
  elements.year.style.border = "";
  elements.month.style.border = "";
  elements.day.style.border = "";
  elements.label[0].style.color = "hsl(0, 1%, 44%)";
  elements.label[1].style.color = "hsl(0, 1%, 44%)";
  elements.label[2].style.color = "hsl(0, 1%, 44%)";
}

function showError(inputBox, inputElement, message) {
  if (inputBox) {
    inputBox.innerHTML = message;
    if (inputElement) {
      inputElement.style.border = "1px solid hsl(0, 100%, 67%)";
    }
  }
}

function isValidDate(year, month) {
  return new Date(year, month, 0).getDate();
}
