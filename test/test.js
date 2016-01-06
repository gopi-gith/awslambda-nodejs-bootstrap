var lambda = require('../index.js');
describe("Lambda test suite", function() {
    beforeEach(function() {

    });
    it("Handler should return hello world!", function() {
        //Sample event
        var event = { 'key': 'value' };

        //Mock the context object
        var Context = function(){};
        Context.prototype.succeed = function (data){
            this.data = data;
        };

        var context = new Context();
        spyOn(context, "succeed").and.callThrough();

        lambda.handler(event,context);
        expect(context.succeed).toHaveBeenCalled();
        expect(context.data).toBe("Hello World!");
    });
});
