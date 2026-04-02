const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Serve frontend
app.use(express.static('frontend'));

// ✅ Default quiz data
let quizzes = [{
    questions: [
        {
            question: "2 + 2 = ?",
            options: ["1", "2", "3", "4"],
            correct: "4"
        },
        {
            question: "Capital of India?",
            options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
            correct: "Delhi"
        }
    ]
}];


// ==============================
// ADD QUIZ
// ==============================
app.post('/add-quiz', (req, res) => {
    quizzes.push(req.body);
    res.json({ message: "Quiz Added Successfully" });
});


// ==============================
// GET QUIZ
// ==============================
app.get('/quiz', (req, res) => {
    if (quizzes.length === 0) {
        return res.json({ message: "No quiz available" });
    }
    res.json(quizzes[0]);
});


// ==============================
// SUBMIT QUIZ
// ==============================
app.post('/submit', (req, res) => {

    if (quizzes.length === 0) {
        return res.json({ message: "No quiz available" });
    }

    let answers = req.body.answers;

    if (!answers) {
        return res.json({ message: "No answers provided" });
    }

    let score = 0;

    quizzes[0].questions.forEach((q, i) => {
        if (q.correct === answers[i]) {
            score++;
        }
    });

    res.json({ score });
});


// ==============================
// RESULT (NEW in v3)
// ==============================
app.post('/result', (req, res) => {

    if (quizzes.length === 0) {
        return res.json({ message: "No quiz available" });
    }

    let score = req.body.score;
    let total = quizzes[0].questions.length;

    let percentage = ((score / total) * 100).toFixed(2);

    res.json({
        score,
        total,
        percentage: percentage + "%"
    });
});


// ==============================
// SERVER START
// ==============================
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 v3 running on http://localhost:${PORT}`);
});