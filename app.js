// budget controller
var budgetController = (function() {

    // some code
    

})();


// UI controller 
 var UIController = (function() {

    // store dom strings as an object. If html strings changed, can easily be changed here
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }



    // returns public method which we can access
    return {
        getinput: function() { // return object
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
          
        },

        // public method
        getDOMstrings: function() {
            return DOMstrings;
        }
    };


 })();

 // Controller 
 var controller = (function(budgetCtrl, UICtrl) {

    // get access to dom strings
    var DOM = UICtrl.getDOMstrings;

    var ctrlAddItem = function() {
        
        // 1. get the field input data
        var input = UICtrl.getinput();
        console.log(input);

        // 2. add item to the budget controller

        // 3. add the item to the UI

        // 4. calculate the budget

        // 5. display the budget

        
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    // key press event for when user hits return key
    // global
    document.addEventListener('keypress', function(event) {
        
        if (event.keyCode === 13) {
            ctrlAddItem();
        }

    });

 })(budgetController, UIController);