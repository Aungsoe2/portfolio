const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".buttons button");
const clearBtn = document.querySelector("#clear");
const equalsBtn = document.querySelector("#equals");

buttons.forEach(function (button) {
    button.addEventListener("click", function () {

        const value = button.dataset.value;

        if (value) {
            display.value += value;
        }
    });
});

clearBtn.addEventListener("click", function () {
    display.value = "";
});

equalsBtn.addEventListener("click", function () {

    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
});
document.addEventListener("keydown", function (event) {

    if (event.key >= "0" && event.key <= "9") {
        display.value += event.key;
    }

    if (event.key === "+" || event.key === "-" ||
        event.key === "*" || event.key === "/") {
        display.value += event.key;
    }

    if (event.key === ".") {
        display.value += ".";
    }

    if (event.key === "Enter") {
        try {
            display.value = eval(display.value);
        } catch {
            display.value = "Error";
        }
    }

    if (event.key === "Escape") {
        display.value = "";
    }
});
