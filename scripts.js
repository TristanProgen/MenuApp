// Menue App for Recibe Book 


class Recipe {
    constructor(name, ingredients, instructions) {
        this.name = name; // String
        this.ingredients = ingredients; // Array or Instructions
        this.instructions = instructions; // Array of Strings 

    }

    fetchIngredients(){ // helper method to gather all ingredients in to a printable format 
        
        let tempList = "";
        for (let i = 0; i < this.ingredients.length; i++ ){
            
            tempList += this.ingredients[i].describe();

        }
        
     
        
        return tempList;   

    }

    fetchInstructions(){ // helper method to gather all instructions in to a printable format 
        let tempList = "";
        for (let i = 0; i < this.instructions.length; i++ ){
            tempList += `
            ${i + 1}) ${this.instructions[i]}`;
            

        }
        return tempList;

    }

    describe() {  // helper method to print out a Recipe object in a user frendly format 
        
        return `
        ${this.name}  
        Ingredients:
        -----------------
        ${this.fetchIngredients()}
        
        Instructions:
        -----------------
        ${this.fetchInstructions()}`;
    }
}

class Ingredient {
    constructor(ammount, name) {
 
        this.ammount = ammount
        this.name = name
    }

    describe(){
        return `
        ${this.ammount}: ${this.name}`;

        }
 }



class Menu { // main appplication driver 
    constructor() {
        this.recipes = [];
        this.selectedRecipe = null;
    }

    start() { // entry point to app 
        let userSelection = this.showOptions(); // Prompt the user with the menue options 
        while (userSelection != 0) {  // continue prompting menue untill user enters a valid selection 

            switch (userSelection) {
                case '1':
                    this.listAllRecipies();
                    break;
                case '2':
                    this.viewRecipeDetails();
                    break;
                        
                case '3':
                    this.addRecipe();
                    break;

                case '4':
                    this.updateRecipe();
                    break;

                case '5':
                    this.deleteRecipe();
                    break;

                case '0':
                    userSelection = 0;
                    break;

                default:
                    userSelection = this.showOptions();

            }

            userSelection = this.showOptions();

        }
        alert('Goodbye');

    }

    showOptions() {

        let input = prompt(`
        Welcome to the Simple JavaScript Recipe Box 
        Please select an option:
            1) View all recipies 
            2) View Recipe details
            3) Add a recipe
            4) Update recipe 
            5) Delete a recipe 
            Press 0 to exit`);
        if (input === "") {
            input += this.showOptions();
        }
        return input;
    }

    fetchAllRecipies() { // helper method to create a numbered list  of all recipies for printing or selection 

        let list = "";
        for (let i = 0; i < this.recipes.length; i++) {
            list += `
            ${i + 1}) ${this.recipes[i].name}`

        };

        return list;
    }

    listAllRecipies() { // alerts all recipes 
        if(this.recipes.length > 0){
            alert(`Recipies in the Box:${this.fetchAllRecipies()}`);

        } else {
            alert(`Recipe Box is currently empty )`);
        }
        
    }

    viewRecipeDetails(){  // Prints a single user selected Recipe with all Ingredients and Instructions 
        if(this.recipes.length > 0){

            let index = prompt(
                `Enfer the corisponding number for the recipe you wish to view:
                ${this.fetchAllRecipies()}`            
            );
    
            this.selectedRecipe = this.recipes[(index -1)];
    
            alert(this.selectedRecipe.describe());

        } else {
            alert(`Recipe Box is currently empty
            Please add a recipe first`);
        }      
       

    }

    addRecipeOptions() { // helper method to display a menue to user for adding recipe ingredients and instructions 
        // prompt the user to keep adding ingredients or instructions untill the indicate they are finished
        let input = prompt(` 
        Please add Ingredients and Instructions to your new Recipe:
        Which do you wish to add?
        1) Add an ingredient 
        2) add an instruction
        3) all done `);
        if (input === "") {
            input += this.addRecipeOptions();
        }
        return input;

    }



    addIngredient() {
        let ingredientName = prompt(
            `Please enter ingredient name`
        );
        let ingredientAmmount = prompt(
            `Please enter ingredient ammount`
        );

        let newIngredient = new Ingredient(ingredientAmmount, ingredientName);

        return newIngredient;

    }

    addInstruction() {
        let instruction = prompt(
            `Please enter new instruction`
        );
        return instruction;
    }



    addRecipe() { // add a recipe to recipe list 
        let newRecipe = new Recipe("", [], []); // empty placeholder object to populate with user input
        newRecipe.name += prompt(`Please enter new recipe name:`); // get recipe name from user


        let addRecipeMenue = this.addRecipeOptions();

        while (addRecipeMenue != 3) { // prompt the user to keep adding ingredients or instructions untill finished 
            switch (addRecipeMenue) {
                case '1':
                    newRecipe.ingredients.push(this.addIngredient());
                    break;

                case '2':
                    newRecipe.instructions.push(this.addInstruction());
                    break;

                case '3':
                    addRecipeMenue = 0;
                    break;

                default:
                    addRecipeMenue = this.addRecipeOptions();

            }
            addRecipeMenue = this.addRecipeOptions();

        }

        this.recipes.push(newRecipe); // adds the  new recipe object to the menue's recipes array

        let listPrint = this.fetchAllRecipies();
        console.log(this.recipes.toString);
        alert(`Recipe : "${newRecipe.name}" added to recipie list:
        Recipies in the box:
        ${listPrint}`);

        console.log(`The new recipe is ${newRecipe.describe()}`);

    }

    updateRecipeOptions(){ // helper function to display a menue for recipe updates 
        let input = prompt(`
        Please select the field of the recipe you wish to update?
        1) Update Recipe Name  
        2) Update a Recipe Ingredient 
        3) Update a Recipe Instruction
        4) all done  `);
        if (input === "") {
            input += this.updateRecipeOptions();
        }
        return input;

    }

    updateRecipeName(oldName){ // prompt user for new recipe name, display old and new name to user 
        oldName = oldName;        
        this.selectedRecipe.name = prompt(`Current Name: ${this.selectedRecipe.name} 
        Please enter new name for this Recipe`);

        alert(`Recipe name changed from ${oldName} to ${this.selectedRecipe.name}`);
    }

    fetchAllIngredients(){ // Helper function to generate a list of all ingrediends in a Recipe 
    
        let ingredientList = "";
        for (let i = 0; i < this.selectedRecipe.ingredients.length; i ++ ){
            ingredientList += `
            ${i + 1 }) ${this.selectedRecipe.ingredients[i].name}`;

        }

        return ingredientList;
        
    }

    updateRecipeIngredient(){
        if(this.selectedRecipe.ingredients.length > 0){
            let index = prompt(`Enter the corisponding number for the ingredient you wish to update:
            ${this.fetchAllIngredients()}`); // loop through all ingredients in selected recipe and present list to user to choos which to update
            let oldIngredient = this.selectedRecipe.ingredients[index -1];
            let newIngredientName = prompt(`Enter new Ingredient Name`);
            let newIngredientAmmount = prompt(`Enter new Ingredient Ammount`);

            let newIngredient = new Ingredient(newIngredientAmmount, newIngredientName);


            this.selectedRecipe.ingredients.splice((index -1), 1, newIngredient); // replace the old ingredint with the new ingredient in the array 

            alert(`Ingredient changed:
            Old Ingredent  
            ${oldIngredient.ammount} : ${oldIngredient.name}
            Changed to:
            ${newIngredient.ammount} : ${newIngredient.name}`);


        } else {
            alert(`This Recipe does not have ingredients!`);
        }
    }


    fetchAllInstructions(){ // helper method to fetch a list of all instruction on a recipe object 

        let instructionList = "";
        for (let i = 0; i < this.selectedRecipe.instructions.length; i ++ ){
            instructionList += `
            ${i + 1 }) ${this.selectedRecipe.instructions[i]}`;

        }

        return instructionList;

    }

    updateInstruction(){
        if(this.selectedRecipe.instructions.length > 0){
            
            let index = prompt(`Enter the corisponding number for the instruction you wish to update:
            ${this.fetchAllInstructions()}`); // loop through all instruction in selected recipe and present list to user to choos which to update
            let oldInstruction = this.selectedRecipe.instructions[index -1];
            let newInstruction = prompt(`Enter new instruction`);

            this.selectedRecipe.instructions.splice((index -1), 1, newInstruction);

            alert(`Instruction changed:
            Old Instruction:
            ${oldInstruction}
            Changed to:
            ${newInstruction}`);



        } else {
            alert(`This Recipe does not have instructions!`);
        }
    }





    updateRecipe(){ // user selection for which recipe they wish to update 
        if(this.recipes.length > 0){

            let index = prompt( // Prompt user with list of Recipies in Box so they can select which they wish to update
                `Enter the corisponding number for the recipe you wish to update:
                ${this.fetchAllRecipies()}`
            );  
            
            this.selectedRecipe = this.recipes[index -1]; // set user selection to targeted recipe object 
    
            let userUpdateSelection = this.updateRecipeOptions();

            // once recipe is selected, prompt user for which field on the recipe to update 
    
            while (userUpdateSelection != 4){
                switch(userUpdateSelection){
                    case '1': // update name 
                        
                        this.updateRecipeName(this.selectedRecipe.name);
                        break;
    
                    case '2': // update an ingredient 
                        
                        this.updateRecipeIngredient(this.selectedRecipe.ingredients);
                        break;

                    case '3': // update an instruction 
                        this.updateInstruction(this.selectedRecipe.instruction);
                        break;

                    case '4': // back to main menue 
                        break;

                    default:
                        userUpdateSelection = this.updateRecipeOptions();    
                }
                userUpdateSelection = this.updateRecipeOptions(); 
            } 

        } else {
            alert(`
        Recipe Box is curently empty:
        First add a Recipe before you Update a Recipe`);
        }
           



    }

    deleteRecipe() {
        let index = prompt(
            `Enter the corisponding number for the recipe you wish to delete:
            ${this.fetchAllRecipies()}`
        );

        if (index > 0 && index <= this.recipes.length) {
            this.recipes.splice((index - 1), 1);

        }
        else {
            alert(`Please select a number between 1 and ${this.recipes.length}`);
        }
    }

}

let menu = new Menu();
menu.start();

