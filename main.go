// main.go
/*
	This Go program start a server in the port 8081 
	and serves static files in the "./public" directory.
*/
package main

import (
	"fmt"
	"log"
	"net/http"
)

// port is the TCP port number the HTTP server listens on.
var port = 8081

//  main
/*
	This function import the documents in the "./public" directory,
	create the endpoint "/", start the port 8081 and serve the files.
*/
func main() {
	// Create a file server handler to serve files from the "public" directory.
	fs := http.FileServer(http.Dir("./public"))

	// Register the file server handler to handle requests to the root URL path.
	http.Handle("/", fs)

	// Log that the server is starting.
	log.Printf("Starting server on :%d\n", port)

	// Start the HTTP server on the specified port.
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)

	// If the server fails to start, log the error and exit.
	if err != nil {
		log.Fatal(err)
	}
}
