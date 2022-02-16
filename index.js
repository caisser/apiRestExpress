const express = require('express');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middleware/error.handler');

const app = express();
const port = 3000;

app.use(express.json());
routerApi(app);
//Middleware siempre se usan luego de el routing
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App runing in http://localhost:${port}`);
});
