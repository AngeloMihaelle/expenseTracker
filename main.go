// Package main implements a simple web server that serves static files
// from the "./public" directory on port 8081.
package main

import (
	"log"
	"net/http"
)

func main() {
	// Create a file server handler to serve files from the "public" directory.
	fs := http.FileServer(http.Dir("./public"))

	// Register the file server handler to handle requests to the root URL path.
	http.Handle("/", fs)

	// Log that the server is starting.
	log.Println("Starting server on :8081")

	// Start the HTTP server on port 8081.
	err := http.ListenAndServe(":8081", nil)

	// If the server fails to start, log the error and exit.
	if err != nil {
		log.Fatal(err)
	}
}
