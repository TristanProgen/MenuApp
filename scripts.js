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
            //(i + 1 ) + ") " + this.instructions[i] + "\n"

        }
        return tempList;

    }

    describe() {  // Helper method to print out a Recipe object in a user frendly format 
        
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
            4) Delete a recipe 
            --------------------
            Press 0 to exit`);
        if (input === "") {
            input += this.showOptions();
        }
        return input;
    }

    viewRecipeDetails(){
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

    addRecipeOptions() {
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

    fetchAllRecipies() { // helper method to create a numbered list  of all recipies for printing or selection 

        let list = "";
        for (let i = 0; i < this.recipes.length; i++) {
            list += `
            ${i + 1}) ${this.recipes[i].name}`
            console.log(list);


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

    deleteRecipe() {
        let index = prompt(
            `Enfer the corisponding number for the recipe you wish to delete:
            ${this.fetchAllRecipies()}`
        );

        if (index > -1 && index <= this.recipes.length) {
            this.recipes.splice((index - 1), 1);

        }
        else {
            alert(`Please select a number between 1 and ${this.recipes.length}`);
        }
    }

}

let menu = new Menu();
menu.start();

