let answers=[];
function loadQuiz(){
 fetch('/quiz').then(r=>r.json()).then(data=>{
  let html="";
  data.questions.forEach((q,i)=>{
    html+=`<p>${q.question}</p>`;
    q.options.forEach(opt=>{
      html+=`<input type='radio' name='q${i}' onclick="answers[${i}]='${opt}'"> ${opt}<br>`;
    });
  });
  document.getElementById("quiz").innerHTML=html;
 });
}
function submitQuiz(){
 fetch('/submit',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({answers})})
 .then(r=>r.json()).then(d=>{
  document.getElementById("result").innerText="Score: "+d.score;
 });
}