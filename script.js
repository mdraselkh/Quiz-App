const questions=[
   {
   question: "Which is the largest animal in the world?",
   answers:[
            {text:"Shark", correct:false},
            {text:"Blue Whale", correct:true},
            {text:"Elephant", correct:false},
            {text:"Giraffe", correct:false},
          ]
   },
   {
   question: "Which is the largest desert in the world?",
   answers:[
            {text:"Kalahari", correct:false},
            {text:"Gobi", correct:false},
            {text:"Sahara", correct:false},
            {text:"Antarctica", correct:true},
            ]
   },
   {
   question: "Which is the smallest continent in the world?",
   answers:[
            {text:"Asia", correct:false},
            {text:"Australia", correct:true},
            {text:"Arctic", correct:false},
            {text:"Africa", correct:false},
         ]
   },
   {
   question: "Which is the smallest country in the world?",
   answers:[
            {text:"Vatican City", correct:true},
            {text:"Bhutan", correct:false},
            {text:"Nepal", correct:false},
            {text:"Shri Lanka", correct:false},
         ]
   }
];

const queselement=document.getElementById("question");
const ansbtn=document.getElementById("answer");
const nextbtn=document.getElementById("next-btn");

let currentQuesIndex=0;
let score=0;

function startQuiz(){
   currentQuesIndex=0;
   score=0;
   nextbtn.innerHTML="Next";
   showQuestion();

}

function showQuestion(){
   resetState();
   let currentQues=questions[currentQuesIndex];
   let questionNo= currentQuesIndex+1;
   queselement.innerHTML=questionNo+". "+currentQues.question;

   currentQues.answers.forEach(answer=>{
      const button=document.createElement("button");
      button.innerHTML=answer.text;
      button.classList.add("btn");
      ansbtn.appendChild(button);

      if(answer.correct){
         button.dataset.correct=answer.correct;
      }
      
      button.addEventListener("click", selecAns);
   });
}

function resetState(){
   nextbtn.style.display="none";
   while(ansbtn.firstChild){
      ansbtn.removeChild(ansbtn.firstChild);
   }

}

function selecAns(e){
   const selectbtn=e.target;
   const isCorrect= selectbtn.dataset.correct==="true";
   if(isCorrect){
      selectbtn.classList.add("correct");
      score++;
   }else{
      selectbtn.classList.add("incorrect");
   }
   Array.from(ansbtn.children).forEach(button=>{
     if(button.dataset.correct==="true"){
      button.classList.add("correct");
     }
     button.disabled=true;
   });
   nextbtn.style.display="block";
}

function showScore(){
   resetState();
   queselement.innerHTML=`You scored ${score} out of ${questions.length}!`;
   nextbtn.innerHTML="Play Again";
   nextbtn.style.display="block";
}

function handlenextbtn(){
   currentQuesIndex++;
   if(currentQuesIndex<questions.length){
      showQuestion();
    }else{
      showScore();
    }

}

nextbtn.addEventListener("click",()=>{
  if(currentQuesIndex<questions.length){
    handlenextbtn();
  }else{
   startQuiz();
  }
});

startQuiz();

