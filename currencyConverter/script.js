document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amount = document.getElementById('amount');
    const result = document.getElementById('result');
    const form = document.getElementById('currency-form');

    
    const apiUrl = `https://open.exchangerate-api.com/v6/latest`;

    async function populateCurrencyOptions() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });
        } catch (error) {
            console.error('Error fetching currency data:', error);
        }
    }

    async function convertCurrency(event) {
        event.preventDefault();

        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        const amountValue = amount.value;

        if (!fromValue || !toValue || !amountValue) {
            result.textContent = 'Please fill in all fields.';
            return;
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const rate = data.rates[toValue] / data.rates[fromValue];
            const convertedAmount = (amountValue * rate).toFixed(2);
            result.textContent = `${amountValue} ${fromValue} = ${convertedAmount} ${toValue}`;
        } catch (error) {
            console.error('Error converting currency:', error);
            result.textContent = 'Error converting currency.';
        }
    }

    populateCurrencyOptions();
    form.addEventListener('submit', convertCurrency);
});
