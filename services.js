const Express = require('express');
const IPTrack = require('./ipTracker');
const MockData = require('./mockData');

const app = new Express();

const port = 3000;
app.set('trust proxy', true);

const ipTracker = new IPTrack();

/*** 
 * Generate some mock ip addresses for testing purposes
 * since this is just a demo.
***/

const mockData = new MockData();

mockData.get().forEach(m => {
    ipTracker.request_handled(m);
})

// End Mock Data

app.get("/", (req, res) => {
    // Collects the ip of the user hitting the service - also returns
    // a count of hits because this is a demo
    ipTracker.request_handled(req.ip);
    res.send(ipTracker.top());
})

app.get("/api/hits", (req, res) => {
    // Gets list of hits without updating count
    res.send(ipTracker.top());
})

app.get("/api/clear", (req, res) => {
    // Just for demo reasons - would not
    // do it this way normally
    ipTracker.clear();
    res.send("count cleared");
})

app.get("/api/generate", (req, res) => {
    count = 1000;
    if(req.query.count) {
        count = req.query.count;
    }
    // Just for demo reasons - would not
    // do it this way normally
    ipTracker.clear();
    mockData.generate(count);
    mockData.get().forEach(m => {
        ipTracker.request_handled(m);
    })
    res.send(`generated ${count} items`);

})



app.listen(port, () => {
    console.log(`Starting services on port ${port}`);
});
