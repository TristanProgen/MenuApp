// Menue App for Recibe Book 

class Recipe {
    constructor(name, ingredients, instructions) {
        this.name = name;
        // this.ingredients = ingredients;
        // this.instructions = instructions;

    }

    

    describe() {
        return `${this.name}  
        Ingredients:
        -----------------
        `
    }
}

class Ingredient {
    constructor(name) {
        this.name = name
        // this.ammount = ammount


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
                    this.addRecipe();
                    break;
                case '3':
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
            2) Add a recipe 
            3) Delete a recipe 
            --------------------
            Press 0 to exit`);
        if (input === ""){
            input += this.showOptions();
        }
        return input;
    }

    fetchAllRecipies() {

        let list = "";
        for (let i = 0; i < this.recipes.length; i++){
            list += `
            ${i + 1}) ${this.recipes[i].name}`
            console.log(list);
            

        };
        
        return list;
    }

    listAllRecipies(){
        let recipeDisplay = "";
        if(this.selectedRecipe == null){
            recipeDisplay = "You do not have a recipe selected";
        }
        else{
            recipeDisplay = this.selectedRecipe;
        }
        alert(`Recipies in the Box:${this.fetchAllRecipies()}
        ${recipeDisplay}`);
    }


    addRecipeMenue(){
       
    }

    addRecipe() {
        
        let recipeName = prompt(`Please enter new recipe name:`);
        this.recipes.push(new Recipe(recipeName));
        let listPrint = this.fetchAllRecipies();
        console.log(this.recipes.toString);
        alert(`Recipe : "${recipeName}" added to recipie list:
        Recipies in the box:
        ${listPrint}`);
       
    }

    deleteRecipe() {
        let index = prompt(
            `Enfer the corisponding number for the recipe you wish to delete:
            ${this.fetchAllRecipies()}`
        );

        if (index > -1 && index <= this.recipes.length){
            this.recipes.splice((index -1),1);

        }
        else {
            alert(`Please select a number between 1 and ${this.recipes.length}`);
        }
    }

}

let menu = new Menu();
menu.start();