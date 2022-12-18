const app = require('./app');
const ConnectDatabase = require('./configs/database');
const Port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: './Backend/configs/config.env' });
}

// Uncaught Error Handler
process.on('uncaughtException', (error) => {
    console.log({ eror: error.message, message: "Server Shutdown due to Uncaught error" });
    process.exit(1);
})

// Database Connection
ConnectDatabase();

const server = app.listen(Port, () => {
    console.log(`Listening to the port ${Port}`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error1: ${err.message}`);
    console.log(`Closing the server due to unhandledPromiseRejection`);
    server.close(() => {
        process.exit(1);
    });
})





