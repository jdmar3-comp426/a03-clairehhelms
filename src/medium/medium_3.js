import mpg_data from "./data/mpg_data.js";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
    let horsey = [];
    for (const x of car_data) {
        if ((x["horsepower"] >= minHorsepower) & (x["torque"] >= minTorque)) {
            horsey.push(x);
        }
    }
    return horsey.sort((a, b) => b.horsepower-a.horsepower);
}


/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
export function searchMpg(car_data, minCity, minHighway) {
    let vroom = [];
    for (const x of car_data) {
        if ((x["highway_mpg"] >= minHighway) & (x["city_mpg"] >= minCity)) {
            vroom.push(x);
        }
    }
    return vroom.sort((a, b) => b.highway_mpg-a.highway_mpg);
}


/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
export function searchName(car_data, searchTerm) {
    let matchy = [];
    for (const x of car_data) {
        if (x["id"].includes(searchTerm)) {
            matchy.push(x);
        }
    }
    return matchy.sort((a, b) => a.indexOf(searchTerm)-b.indexOf(searchTerm));
}


/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order.
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
export function searchByYear(car_data, years) {
    let birthday = [];
    for (const x of car_data) {
        if (years.includes(x["year"])) {
            birthday.push(x);
        }
    }
    return birthday.sort((a, b) => b.year-a.year);
}


console.log(searchByYear(mpg_data, [2010, 2011]));