const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('frontend'));

let quizzes = [];

// Add Quiz
app.post('/add-quiz', (req, res) => {
    quizzes.push(req.body);
    res.json({ message: "Quiz Added Successfully" });
});

// Get Quiz
app.get('/quiz', (req, res) => {
    if (quizzes.length === 0) {
        return res.json({ message: "No quiz available" });
    }
    res.json(quizzes[0]);
});

app.listen(3000, () => {
    console.log("🚀 v1 running on http://localhost:3000");
});