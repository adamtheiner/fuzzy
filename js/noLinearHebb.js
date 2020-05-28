'use strict';
function ConmputeNoLinear() {   // učenie 
	var quotient = 0.07;
	var greasy_init = Math.random();
	var dirt_init = Math.random();
	let weight_init = Math.random() * 5;
	var strengths = 0.111;
	var iteration = 10;
	var Wtmp = 0.0;
	var Wout = 0.0;
	var minWashTime = 24; 

	var greasy_out = parseFloat(greasy_range.value.substring(0, 4));
	var dirt_out = parseFloat(dirt_range.value.substring(0, 4));
	var weight_out = parseFloat(wash_WeightRange.value.substring(0, 4));


	Wout = quotient * greasy_init * dirt_init;

	for (var i = 0; i < iteration; i++) {
		Wtmp = quotient * (greasy_init + quotient * 2) * (dirt_init + quotient * 2) * (weight_init * 0.25);
		Wout = Wtmp;
		greasy_init = (greasy_init + greasy_out) / 2;
		dirt_init = (dirt_init + dirt_out) / 2;
		weight_init = (weight_init + weight_out) / 2;
	}
	
	ViewResult();


	function ViewResult () {  // výpočet času prania
		let result_string_variant = ["Veľmi krátky ", "Krátky ", "Stredný ", "Dlhý ", "Veľmi dlhý "];
		let result_string = ((Wout * 1000) + minWashTime).toString().substring(0, 4);
		let result_string_concat = "";

		if (((Wout * 1000) + minWashTime) < 30) {
			result_string_concat = result_string_variant[0] + result_string;
		}
		if (((Wout * 1000) + minWashTime) >= 30 && ((Wout * 1000) + minWashTime) < 45) {
			result_string_concat = result_string_variant[1] + result_string;
		}
		if (((Wout * 1000) + minWashTime) >= 45 && ((Wout * 1000) + minWashTime) < 55) {
			result_string_concat = result_string_variant[2] + result_string;
		}
		if (((Wout * 1000) + minWashTime) >= 55 && ((Wout * 1000) + minWashTime) < 70) {
			result_string_concat = result_string_variant[3] + result_string;
		}
		if (((Wout * 1000) + minWashTime) >= 70) {
			result_string_concat = result_string_variant[4] + result_string;
		}

		setTimeout(() => time_result_span.innerText = result_string_concat + ' minút', 555);
	}
}
