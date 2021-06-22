
# About

This is a demo hit tracker that takes in ip addresses
and stores them in memory, tracking the top 100 hits.

## Installation

```bash
git clone https://github.com/utterboredom/hitcounter.git
cd hitcounter
npm install
```
## Usage
Include the ipTracker in your code<br />
```const IPTrack = require('./ipTracker');```<br />

Create a new tracking object<br />
```const ipTracker = new IPTrack()``` <br />

Update the ip tracker with a new ip <br />
```ipTracker.request_handled(ip) ``` <br />

Get the top 100 hits <br />
```ipTracker.top()``` <br />

Clear the tracker <br />
```ipTracker.clear()``` <br />

## Demo Server


start server
```bash
npm run start
```

Update the number of hits with your local ip to see increment <br />
```localhost:3000```

Get the number of hits without incrementing <br />
```localhost:3000/api/hits```

Just for testing - will clear the ip list <br />
```localhost:3000/api/clear```

Generates a new set of IP's for testing purposes.  By default 1000 are generated if count is not included <br />
```localhost:3000/api/generate?count={count}``` <br />

## License
[MIT](https://choosealicense.com/licenses/mit/)