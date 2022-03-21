window.addEventListener("load", load);

function load() {
	const register = document.querySelector("#rejestry");
	const answer = document.querySelector(".Instructions");
	register.addEventListener("click", buttonAction);
	register.addEventListener("input", checkInput);
	answer.addEventListener("click", buttonCounter);
}

function buttonAction(e) {
	if (e.target.nodeName == "BUTTON") {
		switch (e.target.className) {
			case "clear-button":
				for (const input of document.querySelectorAll("#rejestry input")) {
					input.value = null;
					input.classList.remove("hex-invalid-value");
				}
				break;
			case "save-button":
				input = e.target.closest("div").querySelector("input");
				input.value = getRandomHex();
				input.classList.remove("hex-invalid-value");
				console.log(input.value.trim());
				break;
		}
	}
}
function getRandomHex() {
	const hex = "0123456789ABCDEF";
	let temporary = "";
	for (let i = 0; i < 2; i++) {
		temporary += hex[Math.floor(Math.random() * 16)];
	}
	return temporary;
}
function checkInput(e) {
	if (e.target.nodeName == "INPUT") {
		if (e.target.value.trim() !== "") {
			e.target.value = e.target.value.toUpperCase();
			if (isHex(e.target.value)) {
				e.target.classList.remove("hex-invalid-value");
			} else {
				e.target.classList.add("hex-invalid-value");
			}
		} else {
			e.target.classList.remove("hex-invalid-value");
		}
	}
}

function isHex(value) {
	return /[0-9A-Fa-f]{2}/g.test(value);
}
let calssChXG = 1;
function buttonCounter(e) {
	if (e.target.nodeName == "BUTTON") {
		switch (e.target.className) {
			case "MOV-button": {
				for (const input of document.querySelectorAll("#rejestry input")) {
					if (!isHex(input.value)) {
						input.value = null;
						e.target.classList.add("hex-invalid-value");
						setInterval(function () {
							e.target.classList.remove("hex-invalid-value");
						}, 1000);
					}
					input.classList.remove("hex-invalid-value");
				}
				MOV();
				break;
			}
			case "XCHG-button": {
				for (const input of document.querySelectorAll("#rejestry input")) {
					if (!isHex(input.value)) {
						input.value = null;
						e.target.classList.add("hex-invalid-value");
						setInterval(function () {
							e.target.classList.remove("hex-invalid-value");
						}, 1000);
					}
					input.classList.remove("hex-invalid-value");
				}
				XCHG();
				calssChXG++;
				break;
			}
		}
	}
}
function MOV() {
	const input = document.querySelectorAll("input");
	const p = document.querySelector(".answer1");
	const select1 = document.querySelector(".select-1").value.trim();
	const select2 = document.querySelector(".select-2").value.trim();
	console.log(input.value);
	console.log(select1, select2);

	if (select1 == select2) {
		if (input[0].value == "" && input[1].value == "") {
			p.textContent = "Empty input or not Hex";
		} else if (input[0].value != "") {
			p.textContent = `Rejestr ${select1}: ${input[0].value} `;
		} else p.textContent = `Rejestr ${select1}: ${input[1].value} `;
	} else {
		if (input[0].value == "" && input[1].value == "") {
			p.textContent = "Empty input or not Hex";
		} else if (input[0].value != "") p.textContent = `Rejestr ${select1}: ${input[0].value} , Rejestr ${select2}: ${input[0].value}`;
		else p.textContent = `Rejestr ${select2}: ${input[1].value} , Rejestr ${select1}: ${input[1].value}`;
	}
}
function XCHG() {
	const input = document.querySelectorAll("input");
	const p = document.querySelector(".answer2");
	const select1 = document.querySelector(".select-1").value.trim();
	const select2 = document.querySelector(".select-2").value.trim();
	if (calssChXG % 2 == 0) {
		if (input[0].value == "" || input[1].value == "" || (input[0].value == "" && input[1].value == "")) {
			p.textContent = "Empty input or not Hex";
		} else p.textContent = `Rejestr ${select1}: ${input[0].value} , Rejestr ${select2}: ${input[1].value}  `;
	} else if (input[0].value == "" || input[1].value == "" || (input[0].value == "" && input[1].value == "")) {
		p.textContent = "Empty input or not Hex";
	} else p.textContent = `Rejestr ${select1}: ${input[1].value} , Rejestr ${select2}: ${input[0].value}  `;
}
