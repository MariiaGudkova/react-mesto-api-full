const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { handleSimpleCors, handleСomplexCors } = require('./middlewares/handleCors');
require('dotenv').config();

const { PORT = 5000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const handleErros = require('./middlewares/handleErrors');

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(apiLimiter);
app.use(helmet());

app.use(handleSimpleCors);
app.use(handleСomplexCors);
app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleErros);

app.listen(PORT, () => {});
