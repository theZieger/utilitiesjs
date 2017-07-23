var utilities = require('../utilities.js');

describe('utilities.toObject', function() {
    describe('array of primitives toObject', function() {
        // test example from README.md
        var states = ['Sachsen', 'Sachsen-Anhalt', 'Berlin', 'Hamburg'];
        var statesObject = utilities.toObject(states);
        // end test example from README.md

        it("should be able to access object by index", function() {
            expect(statesObject[0]).toEqual('Sachsen');
        });

        it("should have 4 keys", function() {
            expect(Object.keys(statesObject).length).toEqual(4);
        });
    });

    describe('array of objects toObject', function() {
        // test example from README.md
        var news = [
            {
                id: 12001,
                headline: 'Tiger goes limp',
                subHeadline: 'Pulls out after 9 holes'
            },{
                id: 666,
                headline: 'Croc has beef with cow',
                subHeadline: ''
            },{
                id: 1337,
                headline: 'Germans wurst at penalties',
                subHeadline: 'New stats prove England are better from the spot'
            }
        ];
        var newsObject = utilities.toObject(news, 'id');
        // end test example from README.md

        it("should be able to access object by ID", function() {
            expect(newsObject[1337].headline).toEqual('Germans wurst at penalties');
        });

        it("should have 3 keys", function() {
            expect(Object.keys(newsObject).length).toEqual(3);
        });
    });
});
