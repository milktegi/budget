// 즉시 호출 함수 iffy 
// Budget Controller
var budgetController = (function(){

	


})();

// UI Controller
var UIController = (function(){

	// some code 

})();

// Global App Controller
var controller = (function(budgeCtrl, UICtrl){
  
// model can receive arguments

var ctrlAddItem = function() {

// console.log('button was clicked!');
	// 1. get the field Input data

	// not just from clicking but also pressing the enter key 

	// 2. add the Item to the budget controller

	// 3. add the Item to user Interfact as well

	// 4. in budgetController calculate budget =>

	// 5. in UI display that data 
	console.log('it works!');
}


document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

// handle kep pressing event as well 
// because keyEvent happens anywhere in document 
document.addEventListener('keypress', function(event){
	// exicute 
	// console.log(event); // -> keycode is 13(enter pressed)
	// for older browers added .which as well 
	if(event.keycode == 13 || event.which === 13) {
		ctrlAddItem();
		// console.log('enter was pressed.');

	// 1. get the field Input data
	// not just from clicking but also pressing the enter key 


	// 2. add the Item to the budget controller

	// 3. add the Item to user Interfact as well

	// 4. in budgetController calculate budget =>

	// 5. in UI display that data

	}

});



})(budgetController, UIController);



