# gRPC demo

Trying out gRPC with NodeJs gRPC client and Golang gRPC server

Goal : To create a simple gRPC server and client, where the client sends a single message while invoking the remote method, and server sends a single response. This is one of the types communications between a gRPC client and server - Unary RPC

Example taken to achieve the goal is : gRPC client sends two numbers (in a single message) to gRPC server and server sends the sum of the two numbers as response.

Below are the steps (at a high level) that I followed to code the demo

## Steps

1.  Get protoc binary [here](https://github.com/google/protobuf/releases) and install protoc compiler plugin for golang, using
    `$ go get -u github.com/golang/protobuf/protoc-gen-go`

2.  Create the `.proto` file with service definition and message types
3.  Generate source code from the `.proto` file for Golang using this command:

    `$ protoc -I addition addition/addition.proto --go_out=plugins=grpc:addition`

4.  Code the Go gRPC server's Addition service by implementing the service interface auto generated in step 2
5.  Code the NodeJs gRPC client by dynamically loading the `.proto` file and obtaining the client stub, then making calls to gRPC server

## Running the server and client

Note : You need golang, node and yarn installed for this. And the server runs at port `10000`. It's a hard coded port number in the code

To run the server, use this command

`$ go run grpc_server.go`

To run the client, first get the dependencies using this command

`$ yarn install`

Then to run the client, use this command (you can provide any two integer numbers as arguments)

`$ node grpc_client.js 10 20`

and you will get the output in the client side as

`The sum of 10 and 20 is 30`
