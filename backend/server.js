const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// ✅ FIXED path for Docker + local
app.use(express.static('frontend'));

let quizzes = [{
  questions: [
    { question: "2+2?", options: ["1","2","3","4"], correct: "4" },
    { question: "Capital of India?", options: ["Delhi","Mumbai","Chennai","Kolkata"], correct: "Delhi" }
  ]
}];

// Get Quiz
app.get('/quiz', (req,res)=>res.json(quizzes[0]));

// Submit Quiz
app.post('/submit',(req,res)=>{
  let score=0;
  req.body.answers.forEach((ans,i)=>{
    if(quizzes[0].questions[i].correct===ans) score++;
  });
  res.json({score});
});

// ✅ FIXED PORT (IMPORTANT)
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});