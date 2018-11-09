// 즉시 호출 함수 iffy 
// Budget Controller
var budgetController = (function () {




})();

// UI Controller
var UIController = (function () {

	// central strings 
	var DOMstrings = {
		inputType: '.add__type',
		inputDesc: '.add__description',
		inputVal: '.add__value',
		inputButton: '.add__btn'
	}


	// return an object
	return {
		getInput: function () {

			return {
				// select first 
				type: document.querySelector(DOMstrings.inputType).value,
				// and then do sth with it in this case will be either inc or exp
				description: document.querySelector(DOMstrings.inputDesc).value,
				value: document.querySelector(DOMstrings.inputVal).value
				// to return three at the same time => obj 

			}
		},

		getDOMstrings: function () {
			return DOMstrings;
		}
	}

})();

// Global App Controller
var controller = (function (budgetCtrl, UICtrl) {

	// model can receive arguments

	var setupEventListeners = function () {

	var DOM = UICtrl.getDOMstrings();
		document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem); 
		document.addEventListener('keypress', function (event) {
			if (event.keycode == 13 || event.which === 13) {
				ctrlAddItem();
			}
			// get data, take what ui iffy returns 
		});
	};

	var ctrlAddItem = function () {

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
	};

	return {
		init: function() {
			console.log('App has started!');
			setupEventListeners();
		}
	}

})(budgetController, UIController);

// call init function outside 

controller.init();

