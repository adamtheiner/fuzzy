'use strict';
function ComputeWater () {
	let water = parseFloat(wash_WeightRange.value, 10) * 1.23 + 2.2;
	water_result_span.innerText = water.toString().substring(0, 4) + ' litre';
}

function ConmputeLinearTimeWash () {
	let wash_time = ["Veľmi rýchlo (20 min.)", "Rýchlo (30 min.)", "Normálny čas (40 min.)", "Dlho (50 min.)", "Veľmi dlho (60 min.)"];

	let VeryShort = 
		greasy_OptionSelect.options[greasy_OptionSelect.selectedIndex].value == "Nemastné" &&
		dirt_QualitySelect.options[dirt_QualitySelect.selectedIndex].value == "Slabo znečistené";
	let Short =
		(greasy_OptionSelect.options[greasy_OptionSelect.selectedIndex].value == "Stredne mastné" &&
		dirt_QualitySelect.options[dirt_QualitySelect.selectedIndex].value == "Slabo znečistené") ||
		(greasy_OptionSelect.options[greasy_OptionSelect.selectedIndex].value == "Nemastné" &&
		dirt_QualitySelect.options[dirt_QualitySelect.selectedIndex].value == "Stredne znečistené");
	let Medium =
		(greasy_OptionSelect.options[greasy_OptionSelect.selectedIndex].value == "Stredne mastné" &&
		dirt_QualitySelect.options[dirt_QualitySelect.selectedIndex].value == "Stredne znečistené") ||
		(greasy_OptionSelect.options[greasy_OptionSelect.selectedIndex].value == "Nemastné" &&
		dirt_QualitySelect.options[dirt_QualitySelect.selectedIndex].value == "Silno znečistené") ||
		(greasy_OptionSelect.options[greasy_OptionSelect.selectedIndex].value == "Mastné" &&
		dirt_QualitySelect.options[dirt_QualitySelect.selectedIndex].value == "Slabo znečistené");
	let Long =
		(greasy_OptionSelect.options[greasy_OptionSelect.selectedIndex].value == "Mastné" &&
		dirt_QualitySelect.options[dirt_QualitySelect.selectedIndex].value == "Stredne znečistené") ||
		(greasy_OptionSelect.options[greasy_OptionSelect.selectedIndex].value == "Stredne mastné" &&
		dirt_QualitySelect.options[dirt_QualitySelect.selectedIndex].value == "Silno znečistené") ;
	let VeryLong =
		(greasy_OptionSelect.options[greasy_OptionSelect.selectedIndex].value == "Mastné" &&
		dirt_QualitySelect.options[dirt_QualitySelect.selectedIndex].value == "Silno znečistené");


	if (VeryShort) {time_result_span.innerText = wash_time[0];}
	if (Short)     {time_result_span.innerText = wash_time[1];}
	if (Medium)    {time_result_span.innerText = wash_time[2];}
	if (Long)      {time_result_span.innerText = wash_time[3];}
	if (VeryLong)  {time_result_span.innerText = wash_time[4];}
}
//linearHebbEducation.js
