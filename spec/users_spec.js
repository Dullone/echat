var users = require("../users/users.js");

describe("createUser", function(){
    beforeEach(function() {
         username = users.createUser();
    });

   
    it("returns the username created as string", function(){
        expect(username).toEqual(jasmine.any(String));
    });
    it("add the user to the array", function(){
        expect(users.all()).toContain(username);
    });
});

describe("removeUser", function(){
    beforeEach(function(){
        users.clear();
    });

    username = users.createUser();
    users.removeUser(username);
    it("array to be empty after removing users", function(){
        expect(users.all().length).toEqual(0);
    });

    it("should not contain user after removal", function(){
        user1 = users.createUser();
        user2 = users.createUser();
        users.removeUser(user1);
        expect(users.all()).not.toContain(user1);
        expect(users.all().length).toEqual(1);
    });
});

describe("clear", function(){
    it("should be empty after clear", function(){
        users.createUser();
        users.createUser();
        users.clear();
        expect(users.all().length).toEqual(0);
    })
});