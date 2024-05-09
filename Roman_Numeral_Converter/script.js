// data romawi
const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
];

// menambahkan data ke table
const tbody = document.querySelector('table tbody');
romanNumerals.forEach(romanNumeral => {
    const row = document.createElement('tr');
    const numeralCell = document.createElement('td');
    const valueCell = document.createElement('td');

    numeralCell.textContent = romanNumeral.numeral;
    valueCell.textContent = romanNumeral.value;

    row.appendChild(numeralCell);
    row.appendChild(valueCell);
    tbody.appendChild(row);
});

// menambahkan event listener
document.getElementById('convert-btn').addEventListener('click', function () {
    const numberInput = document.getElementById('number').value.trim();

    if (numberInput === '') {
        document.getElementById('output').innerText = 'Please enter a valid number';
    } else {
        const number = parseInt(numberInput);
        if (isNaN(number) || number < 1) {
            document.getElementById('output').innerText = 'Please enter a number greater than or equal to 1';
        } else if (number >= 4000) {
            document.getElementById('output').innerText = 'Please enter a number less than or equal to 3999';
        } else {
            document.getElementById('output').innerText = convertToRoman(number);
        }
    }
});

// fungsi convertToRoman digunakan untuk mengonversi angka ke romawi
function convertToRoman(num) {
    let result = '';
    for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= romanNumerals[i].value) {
            result += romanNumerals[i].numeral;
            num -= romanNumerals[i].value;
        }
    }
    return result;
}
