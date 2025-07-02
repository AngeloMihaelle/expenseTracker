# Expense Tracker

A simple web application to record and view your daily expenses. This project includes a Go backend and a minimal frontend using HTML, CSS, and JavaScript.

## 🚀 Features

- Add expenses through a web form.
- Dynamically view registered expenses.
- Clean and responsive interface.
- Go backend for handling requests and storing data.

## 🧱 Project Structure

```
expenseTracker/
│
├── go.mod             # Go module definition
├── main.go            # Main Go server
└── public/
    ├── index.html     # Main web page
    ├── app.js         # Frontend logic
    └── styles.css     # Visual styles
```

## ⚙️ Requirements

- Go 1.18 or higher
- Modern web browser (Chrome, Firefox, etc.)

## ▶️ How to Run

1. Clone this repository or download the files.
2. Navigate to the project folder:
   ```bash
   cd expenseTracker
   ```
3. Run the server:
   ```bash
   go run main.go
   ```
4. Open your browser at: [http://localhost:8080](http://localhost:8080)

## 📂 Notes

- Currently, data is stored in memory (not persistent).
- This is a basic version that can be expanded to include database integration or user authentication.

## 🛠️ Author

- Project developed for educational purposes.
