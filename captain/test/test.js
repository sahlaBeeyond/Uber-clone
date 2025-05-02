import autocannon from 'autocannon';

const runTest = () => {
    autocannon({
        url: 'http://localhost:5000',
        duration: 30
    }, (err, res) => {
        if (err) {
            console.error('Error during the test:', err);
        } else {
            console.log('Number results:', res.requests.total);
            console.log('Total time taken:', res.duration, 'ms');
        }
    });
};

runTest();