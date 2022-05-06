window.addEventListener("load", load);
// załadowanie funkcji przy starcie strony
function load() {
	const register = document.querySelector("#rejestry");
	const answer = document.querySelector(".Instructions");
	register.addEventListener("click", buttonAction);
	register.addEventListener("input", checkInput);
	answer.addEventListener("click", buttonCounter);
}
let a;
let b;
let c;
let d;
let out;
// funckcja obłsugująca buttony zależnie od kliknięcia
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

				break;
			case "save1-button":
				const input1 = document.querySelectorAll("input");
				//zamienianie stringa na hex
				a = parseInt(input1[0].value, 16);
				c = parseInt(input1[0].value, 16);

				d = parseInt(input1[1].value, 16);
				b = parseInt(input1[1].value, 16);

				break;
			case "save2-button":
				const input2 = document.querySelectorAll("input");
				const cd = input2[0].value;
				//funkcja zamieniajaca stringa na binary
				function hex2bin(hex = cd) {
					hex = hex.replace("0x", "").toLowerCase();
					out = "";
					for (var c of hex) {
						switch (c) {
							case "0":
								out += "0000";
								break;
							case "1":
								out += "0001";
								break;
							case "2":
								out += "0010";
								break;
							case "3":
								out += "0011";
								break;
							case "4":
								out += "0100";
								break;
							case "5":
								out += "0101";
								break;
							case "6":
								out += "0110";
								break;
							case "7":
								out += "0111";
								break;
							case "8":
								out += "1000";
								break;
							case "9":
								out += "1001";
								break;
							case "a":
								out += "1010";
								break;
							case "b":
								out += "1011";
								break;
							case "c":
								out += "1100";
								break;
							case "d":
								out += "1101";
								break;
							case "e":
								out += "1110";
								break;
							case "f":
								out += "1111";
								break;
							default:
								return "";
						}
					}
				}
				hex2bin();

				break;
		}
	}
}
//funckcja losująca liczbe hex
function getRandomHex() {
	const hex = "0123456789ABCDEF";
	let temporary = "";
	for (let i = 0; i < 2; i++) {
		temporary += hex[Math.floor(Math.random() * 16)];
	}
	return temporary;
}
// funckja sprawdzajaca czy wartość w inpucie jest liczba hex
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
//funkcja  podpięta to checkInput srpawdza czy wartośc mieści się w liczbach hex
function isHex(value) {
	return /[0-9A-Fa-f]{2}/g.test(value);
}
let calssChXG = 1;
//funkcja kontrolujaca wybór operacji na rejstrze
function buttonCounter(e) {
	if (e.target.nodeName == "BUTTON") {
		switch (e.target.className) {
			case "MOV-button": {
				// colorBtn();
				MOV();
				break;
			}
			case "XCHG-button": {
				// colorBtn();
				XCHG();
				calssChXG++;
				break;
			}
			case "INC-button": {
				// colorBtn();
				INC();
				break;
			}
			case "DEC-button": {
				DEC();
				break;
			}
			case "NOT-button": {
				NOT();
				break;
			}
			case "NEG-button": {
				NEG();
				break;
			}
		}
	}
}
//Funkcja mov przypusujaca rejestrowi 2 wartość rejestru 1
function MOV() {
	const input = document.querySelectorAll("input");
	const p = document.querySelector(".answer1");
	const select1 = document.querySelector(".select-1").value.trim();
	const select2 = document.querySelector(".select-2").value.trim();

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
//funkcja zamieniajaca miejscami wartość w rejestrze
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
//funkcja zwiekszająca wartość o 1
function INC() {
	const select1 = document.querySelector(".select-1").value.trim();
	const select2 = document.querySelector(".select-2").value.trim();
	const input = document.querySelectorAll("input");
	a++;
	b++;
	hexString = a.toString(16);
	hexStringb = b.toString(16);
	const p = document.querySelector(".answer3");
	if (input[0].value != "") {
		p.textContent = `Rejestr ${select1}: ${hexString.toUpperCase()}   `;
	} else if (input[1].value != "") {
		p.textContent = `Rejestr ${select2}: ${hexStringb.toUpperCase()}`;
	} else if (input[1].value != "" && input[0].value != "") p.textContent = `Rejestr ${select1}: ${hexString.toUpperCase()} , ${select2}: ${hexStringb.toUpperCase()}`;
}
//funkcja zmniejszająca wartość o 1
function DEC() {
	const select1 = document.querySelector(".select-1").value.trim();
	const select2 = document.querySelector(".select-2").value.trim();
	const input = document.querySelectorAll("input");
	c--;

	d--;
	hexString = c.toString(16);
	hexStringb = d.toString(16);
	const p = document.querySelector(".answer4");
	if (input[0].value != "") {
		p.textContent = `Rejestr ${select1}: ${hexString.toUpperCase()}   `;
	} else if (input[1].value != "") {
		p.textContent = `Rejestr ${select2}: ${hexStringb.toUpperCase()}`;
	} else if (input[1].value != "" && input[0].value != "") p.textContent = `Rejestr ${select1}: ${hexString.toUpperCase()} , ${select2}: ${hexStringb.toUpperCase()}`;
}
//funkcja zamieniająca 0 na 1 i 1 na 0
function NOT() {
	const p = document.querySelector(".answer5");
	const select1 = document.querySelector(".select-1").value.trim();
	var b = "";
	for (var i = 0; i < out.length; i++) {
		if (out[i] == 0) {
			out[i] = 1;
			b += 1;
		}
		if (out[i] == 1) {
			out[i] = 0;
			b += 0;
		}
	}

	var hex = parseInt(b, 2).toString(16);
	p.textContent = `Rejestr ${select1}: ${hex.toUpperCase()}  `;
}
//funkcja zamieniająca 0 na 1 i 1 na 0 oraz incrementujaca wartość o1
function NEG() {
	const p = document.querySelector(".answer6");
	const select1 = document.querySelector(".select-1").value.trim();
	var b = "";
	var c;
	for (var i = 0; i < out.length; i++) {
		if (out[i] == 0) {
			out[i] = 1;
			b += 1;
		}
		if (out[i] == 1) {
			out[i] = 0;
			b += 0;
		}
	}

	if (b[7] == 0) {
		c = b.replaceAt(7, "1");
	} else if (b[7] == 1) {
		c = b.replaceAt(7, "0");
	}

	var hex = parseInt(c, 2).toString(16);
	p.textContent = `Rejestr ${select1}: ${hex.toUpperCase()}  `;
}
//funkcja zamieniajaca wartość w danym indexie
String.prototype.replaceAt = function (index, replacement) {
	if (index >= this.length) {
		return this.valueOf();
	}

	return this.substring(0, index) + replacement + this.substring(index + 1);
};
