const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/error.handler')


const app = express();
const port = 3000;

app.use(express.json());
routerApi(app);

app.use(logErrors); //Middleware siempre se usan luego de el routing
app.use(boomErrorHandler);
app.use(errorHandler);


// app.get('/', (req, res) => {
//   res.send('Hola mi server en express');
// });

// app.get('/nueva-ruta', (req, res) => {
//   res.send('Hola, soy una nueva ruta');
// });


app.listen(port, () => {
  console.log('Mi port' +  port);
});
