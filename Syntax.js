// Arrow functions
// const lordify = function(firstName) {
//     return `${firstName} of Bluesberry`
// };
// const lordify = firstName => `${firstName} of Bluesberry`; // equivalent. 1 arg doesnt need parenthesis

// multi arg arrow func
// const lordify = (firstName, land) => `${firstName} of ${land}`;

// multi arg arrow func with multiple lines
// const lordify = (firstName, land) => {
//     if (!firstName || !lastname) {
//         throw new Error("need a name and land")
//     }
//     return `${firstName} of ${land}`;
// }

// arrow func returning objects
const person = (firstName, lastName) => ({
    first: firstName,
    last: lastName
}); // NOTE: need need round parens when returning objects with an arrow func


// Destructuring objects
// const sandwich = {
//     bread: "dutch crunch",
//     meat: "tuna",
//     cheese: "swiss",
//     toppings: ["lettuce","tomato","mustard"]
// }

// const { bread, meat } = sandwich;
// console.log(bread,meat) // dutch crunch tuna

// let { bread, meat } = sandwich;
// bread = "garlic";
// meat = "turkey";
// console.log(bread) // garlic
// console.log(meat) // turkey
// console.log(sandwich.bread, sandwich.meat) // dutch crunch tuna


// Destructuring function arguments
// const lordify = regularPerson => {
//     console.log(`${regularPerson.firstname} of Canterbury`)
// };

// const regularPerson = {
//     firstname: "Bill",
//     lastname: "Wilson"
// };
// lordify(regularPerson);

// Destructure wanted prop values from function arg
// const lordify = ({ firstname }) => {
//     console.log(`${firstname} of Bebbanberg`)
// };

// const regularPerson = {
//     firstname: "Bill",
//     lastname: "Wilson"
// };
// lordify(regularPerson); // Bill of Canterbury. Notice it just automatically grabs the firstname prop, regardless of the object passed

// const regularPerson = {
//     firstname: "Bill",
//     lastname: "Wilson",
//     spouse: {
//         firstname: "Phillys",
//         lastname: "Wilson"
//     }
// };
// const lordify = ({ spouse: { firstname } }) => {
//     console.log(`${firstname} of Burnsley`)
// };
// lordify(regularPerson) // Phillys of Burnsley. Notice how it groups the nested object property and its property


// Destructuring Arrays

// const [firstAnimal] = ["Horse", "Mouse", "Cat"];
// console.log(firstAnimal) // Horse

// const [,, thirdAnimal] = ["Horse", "Mouse", "Cat"];
// console.log(thirdAnimal) // Cat

//// Object Literal Enhancement
// const name = "Tallac";
// const elevation = 9738
// const funHike = { name, elevation }; // sets name, elevation vars to be keys of funHike object
// console.log(funHike)// { name: 'Tallac', elevation: 9738 }

//// Creating object methods with literal enhancement or restructuring
// const name = "Tallac";
// const elevation = 9874;
// const print = function() {
//     console.log(`Mt. ${this.name} is ${this.elevation} feet tall`)
// };
// const funHike = { name, elevation, print };
// funHike.print()

//// object methods with no function keyword
// const skier = {
//     name,
//     sound,
//     powderYell() {
//         let yell = this.sound.toUpperCase();
//         console.log(`${yell} ${yell} ${yell}!!!`)
//     },
//     speed(mph) {
//         this.speed = mph;
//         console.log(`speed: ${mph}`)
//     }
// };


//// Spread operator: combine elements of an array
// const peaks = ["Tallac", "Ralston", "Rose"];
// const canyons = ["Ward", "Blackwood"];
// const tahoe = [...peaks, ...canyons];
// console.log(tahoe.join(", ")); // Tallac, Ralston, Rose, Ward, Blackwood

// here we mutate...
// const peaks = ["Tallac", "Ralston", "Rose"];
// const [first] = peaks
// const [last] = peaks.reverse()
// console.log(first)
// console.log(last)
// console.log(peaks.join(", "))
// console.log(peaks.reverse().join(", "))

// ...but with spread, we dont have to mutate
// const peaks = ["Tallac", "Ralston", "Rose"];
// const [last] = [...peaks].reverse()
// console.log(last)
// console.log(peaks.join(", "))

//// spread slicing
// const lakes = ["Ozark","Tahoe", "Minihaha", "Victoria"]
// const [first, ...rest] = lakes;
// console.log(rest.join(", "))

//// spread functional args
// function directions(...args) {
//     let [start, ...remaining] = args;
//     let [finish, ...stops] = remaining.reverse();

//     console.log(`drive through ${args.length} towns`)
//     console.log(`start in ${start}`)
//     console.log(`the destination is ${finish}`)
//     console.log(`stopping ${stops.length} times in between`)
// }
// // flexible now, because we can list any number of args
// directions("Tenochtitlan","Alexandria","Babylon","Rome","Thebes")

//// Object ...spreads
// const morning = {
//     breakfast: "oatmeal",
//     lunch: "PB & J"
// }
// const dinner = "mac and cheese"
// const backpackingMeals = {
//     ...morning,
//     dinner
// }
// console.log(backpackingMeals)

////// ASYNC JS
//// Promises with Fetch
//// Promise: operation that represents whether the async operation is pending, has been completed, or has failed.

fetch("https://api.randomuser.me/?nat=US&results=1").then(res =>
console.log(res.json())
);
fetch("https://api.randomuser.me/?nat=US&results=1")// GET request
.then(res => res.json())                        // convert response body to JSON
.then(json = json.results)                      // take JSON data and return results
.then(console.log)                              // log results
.catch(console.error);                          // catch error

//// async/await
//// alternative approach to handling promises
//// async function: tells promise to resolve before further executing any code. so just wait, dont handle cases
//// await: tells async func where to wait for the promise from fetch

const getFakePerson = async () => {
    let res = await fetch("https://api.randomuser.me/?nat=US&results=1");
    let { results } = res.json();
    console.log(results);
}
getFakePerson()

// async/await funcs need to wrap promise calls in a trycatch in case the promise is unresolved
const getFakePerson = async () => {
    try {
        let res = await fetch("https://api.randomuser.me/?nat=US&results=1");
        let { results } = res.json();
        console.log(results);
    } catch (error) {
        console.error(error);
    }
};
getFakePerson();

// getPeople func returns new promise, which makes a request. if unsuccessful, error occurs
const getPeople = count =>
new Promise((resolves, rejects) => {
    const api = `https://api.randomuser.me/?nat=US&results=${count}1`;
    const request = new XMLHttpRequest();
    request.open("GET", api);
    request.onload = () => 
        request.status === 200
            ? resolves(JSON.parse(request.response).results)
            : rejects(Error(request.statusText));
    request.onerror = err => rejects(err);
    request.send();
});
getPeople(5)
    .then(members => console.log(members))
    .catch(error => console.error(`getPeople failed: ${error.message}`));

//// JS Classes
////    use prototypical inheritance
// function Vacation(destination,length) {
//     this.destination = destination;
//     this.length = length;
// }
// Vacation.prototype.print = function() {
//     console.log(this.destination + " | " + this.length + " days");
// };
// const maui = new Vacation("Maui",7)
// maui.print()

class Vacation {
    constructor(destination, length) {
        this.destination = destination;
        this.length = length;
    }
    print() {
        console.log(this.destination + " | " + this.length + " days");
    }
}
const trip = new Vacation("Chile",14)

class Expedition extends Vacation {
    constructor(destination,length,gear) {
        super(destination,length);
        this.gear = gear;
    }
    print() {
        super.print()
        console.log(`Bring your ${this.gear.join(" and your ")}`)
    }
}
const trip = new Expedition("Mt.Fuji", 3 [
    "sunglasses",
    "prayer flags",
    "camera"
]);
trip.print()

//// ES6 Modules
//// module: piece of reusable code that can be incorporated into other js files without causing variable collisions
export const print=(message) => log(message, new Date())
export const log=(message, timestamp) => console.log(`${timestamp.toString()}: ${message}`)
// export a specific expedition for example
export default new Expedition("Mt. Killamanjaro", 2, ["water", "snack"]);
// import to consume modules. multiple exports allows for object destructuring
// export default is imported as a single variable
import { print, log } from "./text-helpers";
import freel from "./mt-freel";
print("printing a message");
log("logging a message");
freel.print();
// can scope module variables same as in python using 'as' keyword
import { print as p, log as l } from "./text-helpers";
// can import everything
import * as fns from "./text-helpers";