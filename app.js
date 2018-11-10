<<<<<<< HEAD
///////////////// Budget Controller
var budgetController = (function () {
	// function constructor to store userdata 
	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

// calculateTotal
	var calculateTotal = function(type) {
		var sum = 0;
		data.allItems[type].forEach(cur => {
			sum += cur.value;
		});
		
		data.totals[type] = sum;
	};


	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1

	};

	return {

		addItem: function (type, des, val) {
			var newItem, id;

			// creare new id 
			if (data.allItems[type].length > 0) {
				id = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				id = 0;
			}

			// create new item based on type(지출/수입)
			if (type === 'exp') {
				newItem = new Expense(id, des, val);
			} else if (type === 'inc') {
				newItem = new Income(id, des, val)
			}
			// push it into data structure(배열)
			data.allItems[type].push(newItem);
			// finally return the new element 
			return newItem;

		},

	calculateBudget: function() {

		// call calculaat total income and expenses
	calculateTotal('exp');
	calculateTotal('inc');

	// calculate the budget: income - expenses 
	data.budget = data.totals.inc - data.totals.exp;
	// calculate the percentage of income that we spent 
	if(data.totals.inc > 0) {
	data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
		} else {
			data.percentage = -1;
		}
	},

	getBudget: function() {
		return {
			budget: data.budget,
			totalInc: data.totals.inc,
			totalExp: data.totals.exp,
			percentage: data.percentage
		}
	},


		testing: function () {
			console.log(data);
		}
=======

///////////////// Budget Controller
var budgetController = (function () {
	// function constructor to store userdata 
	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

// calculateTotal
	var calculateTotal = function(type) {
		var sum = 0;
		data.allItems[type].forEach(cur => {
			sum += cur.value;
		});
		
		data.totals[type] = sum;
	};


	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1

	};

	return {

		addItem: function (type, des, val) {
			var newItem, id;

			// creare new id 
			if (data.allItems[type].length > 0) {
				id = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				id = 0;
			}

			// create new item based on type(지출/수입)
			if (type === 'exp') {
				newItem = new Expense(id, des, val);
			} else if (type === 'inc') {
				newItem = new Income(id, des, val)
			}
			// push it into data structure(배열)
			data.allItems[type].push(newItem);
			// finally return the new element 
			return newItem;

		},

	calculateBudget: function() {

		// call calculaat total income and expenses
	calculateTotal('exp');
	calculateTotal('inc');

	// calculate the budget: income - expenses 
	data.budget = data.totals.inc - data.totals.exp;
	// calculate the percentage of income that we spent 
	if(data.totals.inc > 0) {
	data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
		} else {
			data.percentage = -1;
		}
	},

	getBudget: function() {
		return {
			budget: data.budget,
			totalInc: data.totals.inc,
			totalExp: data.totals.exp,
			percentage: data.percentage
		}
	},


		testing: function () {
			console.log(data);
		}
>>>>>>> 07596c6758bf3f93a25cff7f50f239c0d3e8cf98

	}

})();

//////////////// UI Controller
var UIController = (function () {

	// central strings 
	var DOMstrings = {
		inputType: '.add__type',
		inputDesc: '.add__description',
		inputVal: '.add__value',
		inputButton: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage'
	}

<<<<<<< HEAD

	// return an object
	return {
		getInput: function () {

			return {
				// select first 
				type: document.querySelector(DOMstrings.inputType).value,
				// and then do sth with it in this case will be either inc or exp
				description: document.querySelector(DOMstrings.inputDesc).value,
				value: parseFloat(document.querySelector(DOMstrings.inputVal).value)
				// to return three at the same time => obj 

			}
		},

		// addListItem 

		addListItem: function (obj, type) {

			var html, newHtml, element;
			// create html string with placeholder text

			if (type === 'inc') {
				element = DOMstrings.incomeContainer;
				html = `<div class="item clearfix" id="income-%id%">
    <div class="item__description">%description%</div>
    <div class="right clearfix">
    <div class="item__value">%value%</div>
    <div class="item__delete">
	<button class="item__delete--btn">
    <i class="ion-ios-close-outline"></i>
    </button></div></div></div>`;

			} else if (type === 'exp') {
				element = DOMstrings.expensesContainer;
				html = `<div class="item clearfix"id="%expense-%id%">
    <div class="item__description">%description%</div>
    <div class="right clearfix">
    <div class="item__value">%value%</div>
	<div class="item__percentage">21%</div>
	<div class="item__delete">
	<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
    </div></div></div>`;
			}

			// replace 

			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// insert it into the dom => jsonhtmlmethod
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

		},

		clearFields: function () {
			var fields, fieldsArr;

		fields = document.querySelectorAll(DOMstrings.inputDesc + ',' + DOMstrings.inputVal);
		fieldsArr = Array.prototype.slice.call(fields);
	// callback function 
		fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			});
			fieldsArr[0].focus();
		},

=======

	// return an object
	return {
		getInput: function () {

			return {
				// select first 
				type: document.querySelector(DOMstrings.inputType).value,
				// and then do sth with it in this case will be either inc or exp
				description: document.querySelector(DOMstrings.inputDesc).value,
				value: parseFloat(document.querySelector(DOMstrings.inputVal).value)
				// to return three at the same time => obj 

			}
		},

		// addListItem 

		addListItem: function (obj, type) {

			var html, newHtml, element;
			// create html string with placeholder text

			if (type === 'inc') {
				element = DOMstrings.incomeContainer;
				html = `<div class="item clearfix" id="income-%id%">
    <div class="item__description">%description%</div>
    <div class="right clearfix">
    <div class="item__value">%value%</div>
    <div class="item__delete">
	<button class="item__delete--btn">
    <i class="ion-ios-close-outline"></i>
    </button></div></div></div>`;

			} else if (type === 'exp') {
				element = DOMstrings.expensesContainer;
				html = `<div class="item clearfix"id="%expense-%id%">
    <div class="item__description">%description%</div>
    <div class="right clearfix">
    <div class="item__value">%value%</div>
	<div class="item__percentage">21%</div>
	<div class="item__delete">
	<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
    </div></div></div>`;
			}

			// replace 

			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// insert it into the dom => jsonhtmlmethod
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

		},

		clearFields: function () {
			var fields, fieldsArr;

		fields = document.querySelectorAll(DOMstrings.inputDesc + ',' + DOMstrings.inputVal);
		fieldsArr = Array.prototype.slice.call(fields);
	// callback function 
		fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			});
			fieldsArr[0].focus();
		},

>>>>>>> 07596c6758bf3f93a25cff7f50f239c0d3e8cf98
		displayBudget: function(obj) {

			document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
		
		if(obj.percentage > 0) {
	document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage; + '%'
		} else {
			document.querySelector(DOMstrings.percentageLabel).textContent = 'empty';
		}
		
		

		},

		getDOMstrings: function () {
			return DOMstrings;
		}
	}

})();

//////////// Global App Controller
var controller = (function (budgetCtrl, UICtrl) {
<<<<<<< HEAD

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

    // add update budget 

    var updateBudget = function() {
=======

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

    // add update budget 

    var updateBudget = function() {

		// 1. calculate the budget 
		budgetCtrl.calculateBudget();
		// 2. Return the budget 
		var budget = budgetCtrl.getBudget();
		// 3. Display the budget on the UI 
		UICtrl.displayBudget(budget);	
	}


	var ctrlAddItem = function () {
		var input, newItem;
		// console.log('button was clicked!');
		// 1. get the field Input data
		var input = UICtrl.getInput();
		console.log(input);
		if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
		// not just from clicking but also pressing the enter key 
		// 2. add the Item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		// 3. add the Item to user Interfact as well
		UICtrl.addListItem(newItem, input.type);

		// 3-1. clear the fields. 
		UICtrl.clearFields();

		// 4. in budgetController calculate budget =>

		// 5. in UI display that data 
		updateBudget();
		// console.log('it works!');
		}
		
	};

	return {
		init: function () {
			console.log('App has started!');
			UICtrl.displayBudget({
				budget: 0, 
				totalInc: 0, 
				totalExp: 0, 
				percentage: -1
			});
			setupEventListeners();
			
		}
	}
>>>>>>> 07596c6758bf3f93a25cff7f50f239c0d3e8cf98

		// 1. calculate the budget 
		budgetCtrl.calculateBudget();
		// 2. Return the budget 
		var budget = budgetCtrl.getBudget();
		// 3. Display the budget on the UI 
		UICtrl.displayBudget(budget);	
	}

// call init function outside 

<<<<<<< HEAD
	var ctrlAddItem = function () {
		var input, newItem;
		// console.log('button was clicked!');
		// 1. get the field Input data
		var input = UICtrl.getInput();
		console.log(input);
		if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
		// not just from clicking but also pressing the enter key 
		// 2. add the Item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		// 3. add the Item to user Interfact as well
		UICtrl.addListItem(newItem, input.type);

		// 3-1. clear the fields. 
		UICtrl.clearFields();

		// 4. in budgetController calculate budget =>

		// 5. in UI display that data 
		updateBudget();
		// console.log('it works!');
		}
		
	};

	return {
		init: function () {
			console.log('App has started!');
			UICtrl.displayBudget({
				budget: 0, 
				totalInc: 0, 
				totalExp: 0, 
				percentage: -1
			});
			setupEventListeners();
			
		}
	}

})(budgetController, UIController);

// call init function outside 
=======
controller.init();
>>>>>>> 07596c6758bf3f93a25cff7f50f239c0d3e8cf98

controller.init();