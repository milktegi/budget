// 즉시 호출 함수 iffy 
// Budget Controller
var budgetController = (function(){

	


})();

// UI Controller
var UIController = (function(){

// central strings 
var DOMstrings = {
	inputType: '.add__type',
	inputDesc: '.add__description',
	inputVal: '.add__value',
	inputButton: '.add_btn'
}


// return an object
	return {
		getInput: function() {

		return {	
			// select first 
		type: document.querySelector(DOMstrings.inputType).value,
		// and then do sth with it in this case will be either inc or exp
		description: document.querySelector(DOMstrings.inputDesc).value,
		value: document.querySelector(DOMstrings.inputVal).value	
			// to return three at the same time => obj 

			}
		},

		getDOMstrings: function() {
			return DOMstrings;
		}
	}

})();

// Global App Controller
var controller = (function(budgeCtrl, UICtrl){
  
// model can receive arguments

var DOM = UICtrl.getDOMstrings();

var ctrlAddItem = function() {

// console.log('button was clicked!');
	// 1. get the field Input data
var input = UICtrl.getInput();
console.log(input);
	// not just from clicking but also pressing the enter key 

	// 2. add the Item to the budget controller

	// 3. add the Item to user Interfact as well

	// 4. in budgetController calculate budget =>

	// 5. in UI display that data 
	// console.log('it works!');
}


document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

// handle kep pressing event as well 
// because keyEvent happens anywhere in document 
document.addEventListener('keypress', function(event){
	// exicute 
	// console.log(event); // -> keycode is 13(enter pressed)
	// for older browers added .which as well 
	if(event.keycode == 13 || event.which === 13) {
		ctrlAddItem();
	}
	// get data, take what ui iffy returns 




});



})(budgetController, UIController);



