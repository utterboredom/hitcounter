class MockData {
    #ipList = [];

    constructor(itemCount = 100) {
        this.generate(itemCount);
    }

    // generates a random ip rudimentary ip string
    // @Returns - randomly generated ip string
    generateRandomIp() {
        const elem1 = Math.floor(Math.random() * 255);
        const elem2 = Math.floor(Math.random() * 255);
        const elem3 = Math.floor(Math.random() * 255);
        return (`${elem1}.${elem2}.${elem3}`)
    }

    // quick and dirty ip generation.  
    //
    // @Param itemCount - number of items to generate
    // @Param createDupes - whether to enforce duplicate ip creation
    // @Param dupeRate - how often to create duplicates
    // @Retuns array of ip's generated
    generate(itemCount, createDupes = true, dupeRate = 3) {
        this.#ipList = [];

        for(let i = 0; i< itemCount; i++){
            
            if(createDupes && i % dupeRate == 0 && this.#ipList.length > dupeRate) {
                const existingIp = this.#ipList[Math.floor(Math.random() * i)];
                this.#ipList.push(existingIp);
            } 
            
            else {
                this.#ipList.push(this.generateRandomIp());
            }

        }

        return this.#ipList;

    }

    get() {
        return this.#ipList;
    }

    
}

module.exports = MockData;