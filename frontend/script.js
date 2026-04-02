let answers = [];

function loadQuiz() {
    fetch('/quiz')
    .then(res => res.json())
    .then(data => {

        // ✅ safety check
        if (!data.questions) {
            document.getElementById("quiz").innerHTML = "No quiz available";
            return;
        }

        let html = "";

        data.questions.forEach((q, i) => {
            html += `<p>${q.question}</p>`;

            q.options.forEach(opt => {
                html += `
                <input type="radio" name="q${i}" value="${opt}"
                onclick="answers[${i}]='${opt}'"> ${opt}<br>
                `;
            });
        });

        document.getElementById("quiz").innerHTML = html;
    })
    .catch(err => {
        console.log("Error loading quiz:", err);
    });
}


// ✅ FIXED submit (v3)
function submitQuiz() {

    fetch('/submit', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
    })
    .then(res => res.json())
    .then(data => {

        // 👉 call result API
        fetch('/result', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score: data.score })
        })
        .then(res => res.json())
        .then(result => {
            document.getElementById("result").innerText =
                `Score: ${result.score}/${result.total} (${result.percentage})`;
        });

    })
    .catch(err => {
        console.log("Error submitting quiz:", err);
    });
}