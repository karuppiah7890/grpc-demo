package main

import (
	"context"
	"log"
	"net"

	"github.com/karuppiah7890/grpc-demo/addition"

	"google.golang.org/grpc"
)

type additionServer struct {
}

func (s *additionServer) Add(c context.Context, addRequest *addition.AddRequest) (*addition.AddResponse, error) {
	result := addRequest.Number + addRequest.AnotherNumber
	response := addition.AddResponse{
		Sum: int64(result),
	}
	return &response, nil
}

func newAddServer() *additionServer {
	return &additionServer{}
}

func main() {
	lis, err := net.Listen("tcp", "localhost:10000")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	grpcServer := grpc.NewServer()
	addition.RegisterAdditionServer(grpcServer, newAddServer())
	grpcServer.Serve(lis)
}
