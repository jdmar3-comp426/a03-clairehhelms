import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: getAvg(mpg_data),
    allYearStats: getStatistics(getYears(mpg_data)),
    ratioHybrids: getRatio(mpg_data),
};

export function getAvg(object) {
    let d = {"city": 0, "highway": 0}
    for (const x of object) {
        for (const [k, value] of Object.entries(x)) {
            if (k === "city_mpg") {
                d["city"] += (value);
            }
            else if (k === "highway_mpg") {
                d["highway"] += value;
            }
        }
    }
    d["city"] = d["city"]/(object.length);
    d["highway"] = d["highway"]/(object.length);
    return d;
};

export function getYears(object) {
    let arr = [];
    for (const x of object) {
        for (const [k, value] of Object.entries(x)) {
            if (k === "year") {
                arr.push(value);
            }
        }
    }
    return arr;
};

export function getRatio(object) {
    let hybrids = 0;
    let nonhybrids = 0;
    for (const x of object) {
        for (const [key, value] of Object.entries(x)) {
            if (key === "hybrid") {
                if (value === false) {
                    nonhybrids++;
                }
                else {
                    hybrids++;
                }
            }
        }
    }
    return (hybrids/nonhybrids)
};

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: hybridz(mpg_data),
    avgMpgByYearAndHybrid: getit(mpg_data)
};

export function hybridz(object) {
    let a = [];
    let b = {};
    const make_list = [];
    for (const x of object) {
        if (x["hybrid"] == true) {
            if (make_list.includes(x["make"])) {   
                b[x["make"]].push(x["id"]);
            }
            else {
                b[x["make"]] = [x["id"]];
                make_list.push([x["make"]][0]);
            }
        }
    }
    for (const ent in b) {
        a.push({"make": ent, "hybrids": b[ent]});
    }
    a.sort((a, b) => b.hybrids.length-a.hybrids.length);
    return a;
};

export function getit(object) {
    let years_list = [];
    let years = {};

    for (const x of object) {
        if (!years_list.includes(x["year"])) {
            years_list.push(x["year"]);
        }
    }
    for (const y of years_list) {
        let hybrids = object.filter(car => car.year == y && car.hybrid == true);
        let nothyb = object.filter(car => car.year == y && car.hybrid == false);
        years[y] = {
            hybrid: {
                city: hybrids.reduce((p, c) => p + c.city_mpg, 0) / hybrids.length,
                highway: hybrids.reduce((p, c) => p + c.highway_mpg, 0) / hybrids.length
            },
            notHybrid: {
                city: nothyb.reduce((p, c) => p + c.city_mpg, 0) / nothyb.length,
                highway: nothyb.reduce((p, c) => p + c.highway_mpg, 0) / nothyb.length
            }
        }
    }
    return years;
};