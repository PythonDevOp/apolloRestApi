const { RESTDataSource } = require('apollo-datasource-rest');

class StockAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = 'https://sandbox.iexapis.com/v1';
    }

    async getStockPrice(symbol){
        return this.get(`/stock/${symbol}/price?token=${process.env.IEX_TOKEN}`);
    }

    async getCompanyData(symbol){
        return this.get(`/stock/${symbol}/company?token=${process.env.IEX_TOKEN}`)
    }

	async getStockLogo(symbol){
        return this.get(`/stock/${symbol}/logo?token=${process.env.IEX_TOKEN}`);
    }
}

module.exports = StockAPI;