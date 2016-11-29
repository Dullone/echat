var randomName = require("../utility/randomName.js");

describe("RandomUserName", function(){
    it("returns a random username string", function(){
        var names = [];
        expect(randomName.randomUserName(names)).toEqual(jasmine.stringMatching(/^user[0-9]+$/));
    });
});