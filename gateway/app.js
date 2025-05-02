import exppress from 'express';
import expressProxy from 'express-http-proxy';

const app = exppress();

app.use('/user', expressProxy('http://localhost:5001'));
app.use('/captain', expressProxy('http://localhost:5002'));
app.use('/ride', expressProxy('http://localhost:5003'));


app.listen(5000, () => {
    console.log(`🚀 Gateway service running at http://localhost:${5000}`);
});