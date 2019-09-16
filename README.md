# apolloRest    

This is the backend for the [ngApolloApp](https://github.com/PythonDevOp/ngApolloApp). This must be running first before any data gets to the front end.

## Run
** Requires an api key from [IEX Trading](https://iextrading.com/developer/docs/) to run. I used the `sandbox`
API key, as the endpoints require payment for data.

The data will come back obfuscated as a result.

All done via the command line:
1) `npm install -g nodemon`
2)  Open the directory with `server.js` and type `npm install`
3)  Once packages are done running, type `IEX_TOKEN= <your sandbox token> npm run start`