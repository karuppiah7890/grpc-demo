const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/addition/addition.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const packageDescriptor = grpc.loadPackageDefinition(packageDefinition);
const addition = packageDescriptor.addition;

const stub = new addition.Addition(
  'localhost:10000',
  grpc.credentials.createInsecure()
);

const addRequest = {
  number: process.argv[2] || 0,
  anotherNumber: process.argv[3] || 0
};

stub.Add(addRequest, function(err, response) {
  if (err) {
    console.error(err);
  } else {
    console.log(
      `The sum of ${addRequest.number} and ${addRequest.anotherNumber} is ${
        response.sum
      }`
    );
  }
});
