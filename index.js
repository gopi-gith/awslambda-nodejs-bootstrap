exports.handler = function (event, context){
    var message = "Hello World!";
    console.log(message);
    context.succeed(message);
};