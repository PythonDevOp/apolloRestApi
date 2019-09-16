const http = require('http');
const express = require('express');
let cors = require('cors')

const { ApolloServer, gql, PubSub } = require('apollo-server-express');
const uuidv4 = require('uuid/v4');

const StockAPI = require("./datasources");

const PORT = 4000;
const app = express();
app.use(cors())

/* Work on this */
const typeDefs = gql`
    type Query{
        company(symbol: String!): Company
        price(symbol: String!): Price
        portfolio: [Company]!
    }
    type Company {
        symbol: String
        companyName: String
        description: String
        industry: String
        sector: String
        tags: [String]
        url: Logo
        price: Price
    }

    input CompanyInput{
        symbol: String
        companyName: String
        description: String
        industry: String
        sector: String
        tags: [String]
        url: LogoInput
        price: PriceInput
    }

    type Logo {
        url: String
    }

    input LogoInput{
        url: String
    }

    type Peer {
        peerName: String
    }
    
    type Price {
        price: String
    }

    input PriceInput{
        price: String
    }

    type Portfolio {
        companies: [Company]
    }

    type Mutation{
        addStock(input: CompanyInput): Company
    }
`;

//    type Mutation{
//        addStock(
//        	symbol: String,
//        	companyName: String,
//            description: String,
//            url: String
//        	industry: String,
//        	sector: String,
//        	price: String
//        ): Company
//    }

//mutation addStock($input:CompanyInput){
//  addStock(input: $input){
//    symbol
//  }
//}


const portfolio = [
    {
        id: uuidv4(),
        companyName: "Great Co",
        symbol: "GCO",
        description:" Its the best",
        industry: "Everything",
        sector: "Retail",
        tags: ["Awesome", "Super", "Low Cost Leader"]
    }
]

const resolvers = {
    Query:{
        company: async(root, {symbol}, {dataSources}) =>{
            return dataSources.stockAPI.getCompanyData(symbol)
        },

        portfolio: () =>{
            return portfolio;
        }
    },
     //nested resolver - executes when asked for
    Company:{
        price: async(company, args, {dataSources}) =>{
            return {'price': dataSources.stockAPI.getStockPrice(company.symbol)}
        },

        url: async(company, args, {dataSources}) =>{
            return dataSources.stockAPI.getStockLogo(company.symbol)
        }

    },

    Mutation:{
        addStock: async (root, {input}) =>{
            portfolio.push(input);
            return input
    }

//        addStock: (root, args) =>{
//            const stockPick = {
//                id          : uuidv4(),
//				  symbol	  : args.symbol,
//                companyName : args.companyName,
//                description : args.description,
//                url         : args.url,
//                industry    : args.industry,
//                sector      : args.sector,
//                tags        : args.tags,
//				  price		  : args.price
//            };
//            portfolio.push(stockPick);
//            return stockPick
//        }
    }
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () =>{
		return {
			stockAPI : new StockAPI()
		}
	}

});

server.applyMiddleware({app})

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})