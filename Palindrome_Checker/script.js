document.getElementById('check-btn').addEventListener('click', function() {
    // ambil value, ubah ke lowercase 
    const inputValue = document.getElementById('text-input').value;
    // ubah ke lowercase dan timpa selain a-z/A-Z/0-9 menjadi string kosong ''
    const filterValue = inputValue.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    // di pisah, dibalik semua, lalu gabung lagi
    const reversedValue = filterValue.split('').reverse().join('');
    
    // pengecekannya
    if (filterValue === '') {
        alert('Please input a value');
    } else if (filterValue === reversedValue) {
        document.getElementById('result').innerText = `${inputValue} is a palindrome`;
    } else {
        document.getElementById('result').innerText = `${inputValue} is not a palindrome`;
    }
});
