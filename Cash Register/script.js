let price = 3.26;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// menampilkan price
const paraPrice = document.querySelector('p span');
paraPrice.textContent = '$' + price.toFixed(2);

// menambahkan data ke table
const tbody = document.querySelector('table tbody');
createUpdateTable(cid)
function createUpdateTable(cid) {
    tbody.innerHTML = '';
    cid.forEach(cash => {
        const row = document.createElement('tr');
        const numeralCell = document.createElement('td');
        const valueCell = document.createElement('td');

        numeralCell.textContent = '$' + cash[0];
        valueCell.textContent = '$' + cash[1];

        row.appendChild(numeralCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
    });
}

function checkCashRegister(price, cash, cid) {
    let changeDue = cash - price;
    const totalCID = cid.reduce((acc, curr) => acc + curr[1], 0);

    if (changeDue > Number(totalCID.toFixed(2))) {
        return "INSUFFICIENT_FUNDS";
    } else {
        const changeArray = [];
        cid = cid.reverse();

        const currencyUnit = {
            "PENNY": 0.01,
            "NICKEL": 0.05,
            "DIME": 0.1,
            "QUARTER": 0.25,
            "ONE": 1,
            "FIVE": 5,
            "TEN": 10,
            "TWENTY": 20,
            "ONE HUNDRED": 100
        };

        for (let i = 0; i < cid.length; i++) {
            const currency = cid[i][0];
            const unitValue = currencyUnit[currency];
            let amountAvailable = cid[i][1];
            let amountToReturn = 0;

            while (changeDue >= unitValue && amountAvailable > 0) {
                changeDue -= unitValue;
                changeDue = changeDue.toFixed(2);
                amountAvailable -= unitValue;
                amountToReturn += unitValue;
            }

            if (amountToReturn > 0) {
                changeArray.push([currency, amountToReturn]);
            }
        }
        cid = cid.reverse();

        if (changeDue > 0) {
            return "INSUFFICIENT_FUNDS";
        } else {
            // Mengurangi jumlah uang yang dikembalikan dari cid
            changeArray.forEach(item => {
                const currency = item[0];
                const amount = item[1];

                for (let i = 0; i < cid.length; i++) {
                    if (cid[i][0] === currency) {
                        cid[i][1] -= amount;
                        cid[i][1] = parseFloat(cid[i][1].toFixed(2)); // Mencegah masalah presisi floating point
                        break;
                    }
                }
            });

            return changeArray;
        }
    }
}

document.getElementById("purchase-btn").addEventListener("click", function () {
    const cash = parseFloat(document.getElementById("cash").value);
    document.getElementById("cash").value = "";
    if (!cash) return false;
    if (cash < price) return alert("Customer does not have enough money to purchase the item");
    const changeResult = checkCashRegister(price, cash, cid);

    let changeDueElement = document.getElementById("change-due");
    if (cash === price) {
        changeDueElement.innerHTML = "<p>No change due - customer paid with exact cash</p>";
    } else if (changeResult === "INSUFFICIENT_FUNDS") {
        changeDueElement.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    } else {
        let changeMessage;
        // Cek apakah semua nilai di dalam cid sudah 0
        const allZeros = cid.every(cash => cash[1] === 0);
        if (allZeros) {
            changeMessage = "<h4>Status: CLOSED</h4>";
        } else {
            changeMessage = "<h4>Status: OPEN</h4>";
        }
        changeResult.forEach(item => {
            changeMessage += `<p>${item[0]}: $${item[1].toFixed(2)}</p>`;
        });
        createUpdateTable(cid);
        changeDueElement.innerHTML = changeMessage;
    }
});
