document.addEventListener('DOMContentLoaded', () => {
    const tokenNameElement = document.getElementById('token-name');
    const marketCapElement = document.getElementById('market-cap');
    const currentPriceElement = document.getElementById('current-price');
    const currentWorthElement = document.getElementById('current-worth');

    const soldAmount = 60000000; // 60 million tokens

    async function fetchTokenData() {
        try {
            const response = await fetch('https://api.dexscreener.io/latest/dex/tokens/<TOKEN_ADDRESS>');
            const data = await response.json();
            const tokenData = data.pairs[0];

            tokenNameElement.textContent = tokenData.baseToken.name;
            marketCapElement.textContent = `$${(tokenData.marketCap / 1e6).toFixed(2)}M`;
            currentPriceElement.textContent = `$${tokenData.priceUsd}`;

            const currentPrice = parseFloat(tokenData.priceUsd);
            const currentWorth = (soldAmount * currentPrice).toFixed(2);
            currentWorthElement.textContent = `$${currentWorth}`;
        } catch (error) {
            console.error('Error fetching token data:', error);
        }
    }

    fetchTokenData();
});
