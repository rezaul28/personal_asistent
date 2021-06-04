const app = require("./server");
const config = require("config");
const PORT = config.get("DEV_BACKEND_PORT");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const DB_URL =config.get("DB_URL_DEV");
const mongoose = require('mongoose');


mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},async () => {
  console.log('db connected');
})

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Personal Assistant",
            description: "API Documentation",
            contact: {
                name: "Rezaul Karim"
            },
            servers: ["http://localhost:5000"]
        }
    },
    apis: ["./Routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(process.env.PORT || PORT, async () => {
    console.log("server started");
});