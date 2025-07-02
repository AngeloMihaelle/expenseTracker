// Package main implements a simple web server that serves static files
// from the "./public" directory on a configurable port.
package main

import (
	"fmt"
	"log"
	"net/http"
)

// port is the TCP port number the HTTP server listens on.
var port = 8081

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
