require('dotenv').config();
const axios = require('axios').default;

module.exports = {
	async getPrice(symbol) {
		let response;
		try {
			response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbol}`, {
				headers: {
					'X-CMC_PRO_API_KEY': process.env.CMC_KEY,
				},
			});
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and
				// an instance of http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		}
		if (response) {
			// eval is an unsafe method to execute code snippets in JavaScript, maybe there is better workaround
			return eval(`response.data.data.${symbol}[0]`);
		}
	},
};
