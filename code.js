import { data1, data2, data3 } from './input.js';
// Function to decode a value from a given base to decimal
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Function to perform Lagrange interpolation and find the constant term
function lagrangeInterpolation(points) {
    let c = 0;
    const k = points.length;

    for (let i = 0; i < k; i++) {
        let xi = points[i][0];
        let yi = points[i][1];

        let li = 1;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j][0];
                li *= (0 - xj) / (xi - xj);
            }
        }
        c += yi * li;
    }
    return Math.round(c);
}
// Main function to read JSON input and calculate the constant term
function findConstantTerm(data) {
    const n = data.keys.n;
    const k = data.keys.k;
    // Decode the points
    const points = [];
    for (let i = 1; i <= n; i++) {
        if (data[i]) {
            const x = parseInt(i);
            const base = parseInt(data[i].base);
            const value = data[i].value;
            const y = decodeValue(base, value);
            points.push([x, y]);
        }
    }
    // Select the first k points for interpolation
    const selectedPoints = points.slice(0, k);
    // Calculate the constant term using Lagrange interpolation
    const constantTerm = lagrangeInterpolation(selectedPoints);
    console.log('Constant term (c):', constantTerm);
}
// Load data from JSON files
function loadDataAndCompute(data) {
    findConstantTerm(data);
}

loadDataAndCompute(data1);
loadDataAndCompute(data2);
// findConstantTerm(data3);