document.getElementById('check-btn').addEventListener('click', function () {
    const phoneNumber = document.getElementById('user-input').value;
    // Menghapus spasi
    const numberWithoutSpaces = phoneNumber.split(' ').join('');

    if (numberWithoutSpaces === '') {
        alert('Please provide a phone number');
        return;
    }

    const isValid = validatePhoneNumber(numberWithoutSpaces);
    if (isValid) {
        document.getElementById('results-div').innerHTML += `<p class="results-text">Valid US number: ${phoneNumber}</p>`;
    } else {
        document.getElementById('results-div').innerHTML += `<p class="results-text">Invalid US number: ${phoneNumber}</p>`;
    }
});

document.getElementById('clear-btn').addEventListener('click', function () {
    document.getElementById('results-div').innerHTML = '';
    document.getElementById('user-input').value = '';
});

function validatePhoneNumber(phoneNumber) {
    // Cek panjang nomor
    if (phoneNumber.length < 10 || phoneNumber.length > 14) return false;

    // Cek apakah nomor diawali dengan 1-
    if (phoneNumber.startsWith('1-')) return false;

    // cek apakah ada tanda kurung 1 saja atau tanpa ke 2 nya
    const hasOpenParenthesis = phoneNumber.includes('(');
    const hasCloseParenthesis = phoneNumber.includes(')');

    if (phoneNumber.startsWith('(') && phoneNumber.endsWith(')')) return false;

    if (!((!hasOpenParenthesis && !hasCloseParenthesis) || (hasOpenParenthesis && hasCloseParenthesis && phoneNumber.indexOf(')') > phoneNumber.indexOf('(')))) return false;

    // Cek apakah nomor diawali dengan 1
    if (phoneNumber.startsWith('1') && phoneNumber.length >= 11) {
        phoneNumber = phoneNumber.slice(1);
    }

    // Menghapus tanda kurung
    let numbers = phoneNumber.replace(/[()]/g, '-');

    // Cek apakah nomor diawali dengan 1
    if (numbers.startsWith('-')) {
        numbers = numbers.slice(1);
    }

    let digits = numbers.split('-');
    if (digits[0].length !== 3 && digits[0].length !== 10) return false;
    if ((digits[1] && digits[1].length !== 3) && digits[0].length !== 10) return false;
    if ((digits[2] && digits[2].length !== 4) && digits[0].length !== 10) return false;
    digits = digits.join('');

    // cek apakah digits berupa angka
    if (Number(digits) != digits) return false;


    // jika panjang digit tidak sama dengan 10
    if (digits.length !== 10) return false;


    return true;
}
