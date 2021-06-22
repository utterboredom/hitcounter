class IPTrack {
    #ipCountMap = null;
    #top100List = [];

    constructor() {
        this.#ipCountMap = new Map();
    }


    // public methods
    request_handled(ip) {
        // get a reference to ipCountMap property to avoid typing 'this'

        // check if ip exists in map and increment instances
        // otherwise add it.
        const ipCountMap = this.#ipCountMap;
        if(ipCountMap[ip]) {
            ipCountMap[ip] += 1;
        }
        else {
            ipCountMap[ip] = 1;
        }

        // update top 100 now async so that users requesting the top
        // don't need to wait for the calculation later

        this.#updateTop100(ip);
    }

    // @Returns - top 100 items in the list of stored ip addresses
    top100() {
        return this.#top100List.map(t => ( { id: t, count: this.#ipCountMap[t] } ));
    }

    // clears the stored item list and the top 100
    clear() {
        this.#ipCountMap = new Map();
        this.#top100List = [];
    }

    // private methods

    /** 
        updates the top 100 based on what is already existing.
        if the new IP isn't in the top 100 then add it so we can sort later
        and then select the top 100 from that list.  Since we aren't subtracting ips 
        from the list there is no reason to iterate through possibly millions of ips - just to check if
        the top100 has a new member and sort that list, dropping any at the bottom
        that are over the 100 limit.
    **/

    #updateTop100(lastIp) {
        //get a copy of the top 100
        const topCopy = [...this.#top100List];
        
        if(topCopy.indexOf(lastIp) === -1) {
            topCopy.push(lastIp);
        }

        // map the top 10 or 11 ips to their values
        this.#top100List = topCopy
            .map(ip => ({
                ip,
                count: this.#ipCountMap[ip]        
            }))
            // sort decending by count
            .sort((a, b) => a.count < b.count ? 1 : -1)
            // store only the ip addresses
            .map(a => a.ip)
            // return only the top 100
            .slice(0,99);
    
    }
    

}


module.exports = IPTrack;