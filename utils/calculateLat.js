/**
 * Created by liyan on 16/3/3.
 */

"use strict";

function binarySearch(f, e, m, n) {
    const start = Date.now();
    if (f(m) * f(n) > 0) {
        console.log('no!');
    }
    let i = 0;
    let r;
    while (Math.abs(m - n) > e) {
        r = (m + n) / 2;
        if (Math.abs(f(r)) < e) break;
        if (f(m) * f(r) <= 0) {
            n = r;
        } else {
            m = r;
        }
        i++;
    }
    console.log(`cost ${i} times, ${(Date.now() - start)} ms`);
    return r;
}

function newTon(f, g, e, m, n) {
    const start = Date.now();
    if (f(m) * f(n) > 0) {
        console.log('no!');
    }
    let i = 0;
    let x = m;
    while (Math.abs(f(x)) > e) {
        x = x - f(x) / g(x);
        i++;
    }
    console.log(`cost ${i} times, ${(Date.now() - start)} ms`);
    return x;
}

const f = x => 2 * x * x * x - 4 * x * x + 3 * x - 6;
const r1 = binarySearch(f, 1E-9, 1, 30);
console.log(r1, f(r1));

const f2 = x => 2 * x * x * x - 4 * x * x + 3 * x - 6;
const g2 = x => 6 * x * x  - 8 * x  + 3;

const r2 = newTon(f2, g2, 1E-9, 1, 30);
console.log(r2, f(r2));

const mercator = lat => Math.log(Math.tan((45 + lat / 2) / 180 * Math.PI));
const g = lat => mercator(lat) + mercator(lat + 54) - 2 * mercator(35);
const r3 = binarySearch(g, 1E-9, 35-54,  35 + 54);
console.log(r3, g(r3));

function rad(d) {
    return d * Math.PI / 180.0;
}
const g1 = lat => 1 / (2 * Math.tan(rad(45 + lat / 2)) * Math.cos(rad(lat / 2 + 45)) * Math.cos(rad(lat / 2)));
const g3 = lat => g1(lat) + g1(lat + 54);
const r4 = newTon(g, g3, 1E-9, 35-54,  35 + 54);
console.log(r4, g(r4));

export function calculateLat(cLat, latDelta) {
    const g = lat => mercator(lat) + mercator(lat + latDelta) - 2 * mercator(cLat);
    const sLat = binarySearch(g, 1E-6, -90, 90 - latDelta);
    return {nLat: sLat + latDelta, sLat}
}

