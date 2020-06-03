// budget controller
var budgetController = (function() {

    //function constructors for expense and income
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // store expenses and incomes into object
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    // return public method from budgetController IIFE
    return {
        addItem: function(type, desc, val) {
            var newItem, ID;

            // create new id. want ID = last ID + 1
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else {
                ID = 0;
            }
            

            // create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            }

            // push it into our data structure
            data.allItems[type].push(newItem);

            // return new element
            return newItem;
            },

            //testing method
            testing: function() {
                console.log(data);
            }
            
        };

})();


// UI controller 
 var UIController = (function() {

    // store dom strings as an object. If html strings changed, can easily be changed here
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
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

        addListItem: function(obj, type) {

            // 1. create HTML string with placeholder text

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // 2. replace the placeholder text with some actual data
            // .replace searches for string and replaces with the data we pass in
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // 3. insert the HTML into the DOM using insert adjacent method
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


        },

        // public method
        getDOMstrings: function() {
            return DOMstrings;
        }
    };


 })();

 // Controller 
 var controller = (function(budgetCtrl, UICtrl) {

    // function for all event listeners
    var setupEventListeners = function() {

        // get access to dom strings
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        // key press event for when user hits return key
        document.addEventListener('keypress', function(event) {
            
            // code for enter button is 13
            if (event.keyCode === 13) {
                ctrlAddItem();
            }
    
        });
    };

    // this is controller of app - tells other functions what to do and receives data back which we store in vars
    var ctrlAddItem = function() {
        var input, newItem;

        // 1. get the field input data
        input = UICtrl.getinput();

        // 2. add item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. add the item to the UI
        UICtrl.addListItem(newItem, input.type)

        // 4. calculate the budget

        // 5. display the budget

        
    };

    // public method to set up event listeners
    return {
        init: function() {
            console.log('app has started');
            setupEventListeners();
        }
    }


 })(budgetController, UIController);

 // call the init function to set things up at start of app
 controller.init();