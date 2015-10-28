var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

var template = {results: []}; // chunk.toString()
var testMessage = {results: [{text: 'Test', username: 'TestName'}]};

var requestHandler = function(request, response) {
  
  console.log("Serving request type " + request.method + " for url " + request.url );

  var statusCode;

  if( request.method === 'OPTIONS' ){
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(null));
  } else if( request.method === 'POST' ){
    var data = '';
    request.on("data", function(chunk){
      data += chunk;
    });

    statusCode = 201;
    request.on("end", function(){
      template.results.push(JSON.parse(data));
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({results: [data]}));
    });

  } else if(request.method === 'GET' ){
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(template));
  }
};


exports.requestHandler = requestHandler;