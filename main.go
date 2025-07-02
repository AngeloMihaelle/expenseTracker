// main.go
/*
	This Go program start a server in the port 8081 
	and serves static files in the "./public" directory.
*/
package main

import (
	"log"		// Import the log package for logging
	"net/http"	// Import the net/http package for HTTP server functionality
)

//  main
/*
	This function import the documents in the "./public" directory,
	create the endpoint "/", start the port 8081 and serve the files.
*/
func main() {
	fs := http.FileServer(http.Dir("./public"))

	http.Handle("/", fs)
	log.Println("Starting server on :8081")

	err := http.ListenAndServe(":8081", nil)

	if err != nil {
		log.Fatal(err)
	}
}
