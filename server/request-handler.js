var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

var template = {results: []}; // chunk.toString()

var requestHandler = function(request, response) {
  
  console.log("Serving request type " + request.method + " for url " + request.url + ' header details ' , request );

  var statusCode;

  // TODO: changed .url from /send to /classes/messages to make test pass
  if( request.url !== '/classes/messages' ){
    statusCode = 404;
  } else if( request.method === 'POST' && request.url === '/classes/messages' ){
    statusCode = 201;
    // messages.push()
  } else if (request.method === 'GET' && request.url === '/classes/messages' ){
    statusCode = 200;
  }
  // add options

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);
  // testing - response.setEncoding('utf8');
  
  request.on("data", function(chunk){
    var chnk = JSON.parse(chunk.toString());
    template.results.push(chnk);
  });
  console.log(template);
  request.on("end", function() {
    console.log(JSON.stringify(template));
    response.end(JSON.stringify(template));
  });
};


exports.requestHandler = requestHandler;