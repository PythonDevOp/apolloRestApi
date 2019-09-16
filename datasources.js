const { RESTDataSource } = require('apollo-datasource-rest');

class StockAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = 'https://api.iextrading.com/1.0';
    }

    async getStockPrice(symbol){
        return this.get(`/stock/${symbol}/price`);
    }

    async getCompanyData(symbol){
        return this.get(`/stock/${symbol}/company`)
    }

	async getStockLogo(symbol){
        return this.get(`/stock/${symbol}/logo`);
    }
}

module.exports = StockAPI;