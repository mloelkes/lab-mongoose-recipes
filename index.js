const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI)
    .then((x) => {
        console.log(`Connected to the database: "${x.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany();
    })
    .then(() => {
        // Run your code here, after you have insured that the connection was made
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
    });

const recipe = {
    title: 'new recipe',
    level: 'Easy Peasy',
    ingredients: ['Pasta', 'Pesto', 'Tomatoes', 'Mozarella'],
    cuisine: 'Italia',
    dishType: 'Dish',
    image: 'foodimage',
    duration: 15,
    creator: 'ML'
};

// Iteration 2

Recipe.create(recipe)
.then(recipeFromDB => {
    console.log("Recipe added: ", recipeFromDB.title);
})
.catch(err => {
    console.log("Error while creating recipe: ", err);
});

// Iteration 3

Recipe.insertMany(data)
.then(recipesFromDB => {
    recipesFromDB.forEach(recipeFromDB => {
        console.log("Recipe added: ", recipeFromDB);
    })
})
.catch(err => {
    console.log("Error while creating recipe: ", err);
});

// Iteration 4

Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
.then(result => {
    console.log('Recipe got updated: ', result);
})
.catch(err => {
    console.log('Error while updating recipe: ', err)
});

// Iteration 5

Recipe.deleteOne({title: 'Carrot Cake'})
.then(result => {
    console.log('Recipe got deleted: ', result)
})
.catch(err => {
    console.log('Error while deleting recipe: ', err)
})

// mongoose.connection
//     .close()
//     .then(() => console.log('connection closed'))
//     .catch(err => console.log('Error while closing connection: ', err))
