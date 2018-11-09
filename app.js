// 즉시 호출 함수 iffy 

var budgetController = (function(){

	var x = 23;

	var add = function(a) {
		return x + a; 
	}

	return {
		publicTest: function(b) {
			return add(b);
		} 
	}

})();

var UIController = (function(){

	// some code 

})();

var controller = (function(budgeCtrl, UICtrl){
  
// model can receive arguments

var z  = budgetController.publicTest(5);

return {
	anotherPublic: function() {
		console.log(z);
	}
}


})(budgetController, UIController);



