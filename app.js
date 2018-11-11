
///////////////// Budget Controller
var budgetController = (function () {
	// function constructor to store userdata 
	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};
	
	Expense.prototype.calcPercentages = function(totalInc) {
		if(totalInc > 0)
		this.percentage = Math.round((this.value / totalInc) * 100);
		else this.percentage = -1;	
	};
	
	Expense.prototype.getPecentages = function() {
		return this.percentage;
	};

	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	// calculateTotal
	var calculateTotal = function (type) {
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
		
		// 삭제 아이템 데이터에서 제거 
		deleteItem: function(type, id) {
		
			// create an array filled with all ids and remove the index of an id
			var ids = data.allItems[type].map(current => {
				return current.id;
			});	
			var index = ids.indexOf(id);
			if(index !== -1) {
				data.allItems[type].splice(index, 1);
			}
		},
		

		calculateBudget: function () {

			// call calculaat total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');

			// calculate the budget: income - expenses 
			data.budget = data.totals.inc - data.totals.exp;
			// calculate the percentage of income that we spent 
			if (data.totals.inc > 0) {
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}
		},
		
		calculatePercentages: function() {
			
			data.allItems.exp.forEach(current => {
				current.calcPercentages(data.totals.inc);
			});
			
		},
		
		getPecentages: function () {
		
			var allPercentages = data.allItems.exp.map(current => {
				return current.getPecentages();
			});
			return allPercentages;
			
		},

		getBudget: function () {
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
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage',
		dateLabel: '.budget__title--month'
	}


	var formatNumber = (num, type) => {

			num = Math.abs(num);
			num = num.toFixed(2); 

			numSplit = num.split('.');

			int = numSplit[0];
			if(int.length > 3) {
				int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); // input 2310, output 2,310
			}

				return (type === 'exp' ? sign ='-' : sign= '+') + ' ' + int;
		};

		var nodeListForEach = function(list, callback) {

			for(var i = 0; i < list.length; i++) {
				callback(list[i], i);
			}
		};


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
				html = `<div class="item clearfix" id="inc-%id%">
    <div class="item__description">%description%</div>
    <div class="right clearfix">
    <div class="item__value">%value%</div>
    <div class="item__delete">
	<button class="item__delete--btn">
    <i class="ion-ios-close-outline"></i>
    </button></div></div></div>`;

			} else if (type === 'exp') {
				element = DOMstrings.expensesContainer;
				html = `<div class="item clearfix"id="%exp-%id%">
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
			newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

			// insert it into the dom => jsonhtmlmethod
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

		},
		
		deleteListItem: function(selectorId) {
			
			var element = document.getElementById(selectorId);
			element.parentNode.removeChild(element);
			
		},
		

		clearFields: function () {
			var fields, fieldsArr;

			fields = document.querySelectorAll(DOMstrings.inputDesc + ',' + DOMstrings.inputVal);
			fieldsArr = Array.prototype.slice.call(fields);
			// callback function 
			fieldsArr.forEach(function (current, index, array) {
				current.value = "";
			});
			fieldsArr[0].focus();
		},

		displayBudget: function (obj) {

			var type;
			obj.budget > 0 ? type = 'inc' : type = 'exp';

			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget);
			document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
			document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

			if (obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent 
				= obj.percentage; + '%'
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '-';
			}
		},

		//1111-1 percentage Display method 

		displayPercentages: function(percentages) {

			var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

		nodeListForEach(fields, function(current, index){

			if(percentages[index] > 0) {
					current.textContent = percentages[index] +'%' ;
			}
			else current.textContent = '---';


			});

		}, 

		// Date object 

		displayMonth: function() {

			var now, year, month, months;
			now = new Date();
			months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
			month = now.getMonth();
			// var christmast = new Date(2018, 11, 25);
			year = now.getFullYear();
			console.log(year);
			document.querySelector(DOMstrings.dateLabel).textContent = year + '년 ' + months[month] + '월';

		},

		// + or - before the number 
		// comma seperating manipulate Strings 1,000,000

		changedType: function() {

			// add or remove css classes 
			var fields = document.querySelectorAll(
				DOMstrings.inputType + ',' +
				DOMstrings.inputDesc + ',' + 
				DOMstrings.inputVal
			);

			nodeListForEach(fields, function(current){

				current.classList.toggle('red-focus');
			});

		document.querySelector(DOMstrings.inputButton).classList.toggle('red');

		},

		getDOMstrings: function () {
			return DOMstrings;
		}
	}

})();

//////////// Global App Controller
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
		// implement delete 
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
		// manipulating input field color from default to red when it expenses
		document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);

	};

	// add update budget 

	var updateBudget = function () {

		// 1. calculate the budget 
		budgetCtrl.calculateBudget();
		// 2. Return the budget 
		var budget = budgetCtrl.getBudget();
		// 3. Display the budget on the UI 
		UICtrl.displayBudget(budget);
	};
	
	var updatePercentages = function() {
		
		//1. calculate percentages 
		budgetCtrl.calculatePercentages();
		//2. read percentages from the budget controller 
		var percentages = budgetCtrl.getPecentages();
		//3. update the ui with the new percentages 
		console.log(percentages);
		UICtrl.displayPercentages(percentages);
	};


	var ctrlAddItem = function () {
		var input, newItem;
		// console.log('button was clicked!');
		// 1. get the field Input data
		var input = UICtrl.getInput();
		console.log(input);
		if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
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
			// 6. call updatePercentages
			updatePercentages();
		}

	};

	var ctrlDeleteItem = function (event) {

		var itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
		console.log(itemId);
		if(itemId) {
	
			//inc-1
		var	splitId = itemId.split('-');
		var	type = splitId[0];
		var	id = parseInt(splitId[1]);
			// 1. delete the item from the data structure 
			budgetCtrl.deleteItem(type, id);
			// 2. then we delete the item from the ui 
			UICtrl.deleteListItem(itemId);
			// 3. then we update and show the new budget 
			updateBudget();
			// 4. call updatePercentages
			updatePercentages();
		}
	};


	return {
		init: function () {
			console.log('App has started!');
			UICtrl.displayMonth(); 
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

controller.init();

