import express from 'express'
import morgan from 'morgan';
import proxy from 'express-http-proxy';

const app=express()

app.use(morgan('dev'));

app.get('/',proxy("http://localhost:5001"))
app.get('/product',proxy("http://localhost:5002"))

app.listen(5000, () => {
    console.log(`🚀 Server running at http://localhost:${5000}`);
  });