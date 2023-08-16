const fruits = [

           { Fruit: 'Guava', 
               URL: './fruits/guava.webp',
                answers: [
                        {text: "Watermelon Lime", correct: false},
                        {text: "Guava", correct: true},
                        {text: "Papaya", correct: false},
                        {text: "Satsuma", correct: false}
        ]
     },
           { Fruit: 'FingerLime',
               URL: './fruits/fingerlime.jpeg', 
                answers: [
                    {text: "Acai Berries", correct: false},
                    {text: "Finger Lime", correct: true},
                    {text: "Jujube", correct: false},
                    {text: "Bubble Fruit", correct: false}
        ]
     },
           { Fruit: 'Mangosteen',
               URL: './fruits/mangosteen.jpeg',
                answers: [
                    {text: "Mangosteen", correct: true},
                    {text: "Cheese Fruit", correct: false},
                    {text: "Kumquat", correct: false},
                    {text: "Breadfruit", correct: false}
        ]
     }, 
           { Fruit: 'Durian',
               URL: './fruits/durian.webp',
                answers: [
                    {text: "Jackfruit", correct: false},
                    {text: "Vomit Fruit", correct: false},
                    {text: "Horned Melon", correct: false},
                    {text: "Durian", correct: true}
        ]
     },
           { Fruit: 'StarApple',
               URL: './fruits/starapple.jpeg',
                answers: [
                    {text: "Tacciola", correct: false},
                    {text: "Surinam Cherry", correct: false},
                    {text: "Star Apple", correct: true},
                    {text: "Jamberry", correct: false}
            ]
     },

           { Fruit: 'Rambutan',
               URL: './fruits/rambutan.jpeg',
                answers: [
                    {text: "Beard Fruit", correct: false},
                    {text: "Rambutan", correct: true},
                    {text: "Lilikoi", correct: false},
                    {text: "Spiked Berry", correct: false}
        ]
     },
           { Fruit: 'Jabuticaba',
               URL: './fruits/jabuticaba.webp',
                answers: [
                    {text: "Cloudberry", correct: false},
                    {text: "Lychee", correct: false},
                    {text: "Blueberry", correct: false},
                    {text: "Jabuticaba", correct: true}
        ]
     },
           { Fruit: 'HalaFruit',
               URL: './fruits/hala.jpeg',
                answers: [
                    {text: "Hala Fruit", correct: true},
                    {text: "Lava Fruit", correct: false},
                    {text: "Snakeskin Melon", correct: false},
                    {text: "Cracked Pear", correct: false}
        ]
     },    
           { Fruit: 'DragonFruit',
               URL: './fruits/dragonfruit.jpeg',
                answers: [
                    {text: "Cactus Pear", correct: false},
                    {text: "Monstera Deliciousa", correct: false},
                    {text: "Dragon Fruit", correct: true},
                    {text: "Medecano", correct: false}
            ]
     },
           { Fruit: 'Persimmon',
               URL: './fruits/persimmon.jpeg',
                answers: [
                    {text: "Orange Tomato", correct: false},
                    {text: "Persimmon", correct: true},
                    {text: "Upucando", correct: false},
                    {text: "Quince", correct: false}
            ]
     }
];


const question = document.getElementById('title');
const fruit = document.getElementById('fruit-img');
const answerButtons = document.querySelector('.answer-buttons');
const nextButton = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('prog-bar'); 
const count = document.getElementById('fruit-count');
const startCover = document.getElementById('start-cover');
const startButton = document.getElementById('start-btn');


let currentFruitIndex = 0; 
let score = 0; 



startButton.addEventListener('click', () => {
       startCover.remove(); 
});



function startQuiz() {
    currentFruitIndex = 0;
    score = 0; 
    nextButton.innerHTML = "next";
    progressBar.style.width = '10%'; 
    count.innerHTML = '1 / 10';
    showFruit();
}


function showFruit() {
    document.getElementById('title').innerHTML = '- What fruit is this? -';
    resetFruit();
    let currentFruit = fruits[currentFruitIndex];
    fruit.src = currentFruit.URL;

    currentFruit.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text; 
        button.classList.add('answer');
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}


function resetFruit() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
};



function selectAnswer(e) {
    const selectedAns = e.target;
    const isCorrect = selectedAns.dataset.correct === "true";
    if(isCorrect) {
        selectedAns.classList.add('correct');
        score++;
        
    } else {
        selectedAns.classList.add('incorrect');
        
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true; 
});
    nextButton.style.display = "block";
}; 



function showScore() {
    fruit.src = './fruits/cat.webp';
    document.querySelector('.fruit-bg').classList.replace('fruit-bg', 'score-bg');
    resetFruit(); 
    question.innerHTML = `You scored ${score} out of 10!`;
    nextButton.innerHTML = "Try Again"; 
    nextButton.style.display = "block";
};



function handleNextButton() {
    currentFruitIndex++;
    if(currentFruitIndex < fruits.length){
        progressBar.style.width =`${(currentFruitIndex + 1) * 10}%`;
        count.innerHTML = `${(currentFruitIndex +1)} / 10`;
        showFruit();
    } else{
        showScore();
    }
};


nextButton.addEventListener('click', ()=> {
    if(currentFruitIndex < fruits.length){
        handleNextButton();
    }else{
        startQuiz();
        document.querySelector('.score-bg').classList.replace('score-bg', 'fruit-bg');
    }

});



startQuiz();