document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container')
    const questionContainer = document.getElementById('question-container')
    const questionTextDisplay = document.getElementById('question-text')
    const choicesListDisplay = document.getElementById('choices-list')
    const nextBtn = document.getElementById('next-btn')
    const resultContainer = document.getElementById('result-container')
    const scoreDisplay = document.getElementById('score')
    const restartBtnDisplay = document.getElementById('restart-btn')
    const startBtnDisplay = document.getElementById('start-btn')
    
    
    const questions  = [
        {
            question:"What is the capital of France?",
            choices:["Berlin","Madrid","Paris","Rome"],
            answer:"Paris"
        },
        {
            question:"Which planet is known as the Red Planet?",
            choices:["Earth","Mars","Jupiter","Saturn"],
            answer:"Mars"
        },
        {
            question:"Who wrote 'To Kill a Mockingbird'?",
            choices:["Harper Lee","Mark Twain","Ernest Hemingway","F. Scott Fitzgerald"],
            answer:"Harper Lee"
        },
        {
            question:"What is the largest ocean on Earth?",
            choices:["Atlantic Ocean","Indian Ocean","Arctic Ocean","Pacific Ocean"],
            answer:"Pacific Ocean"
        },
        {
            question:"What is the chemical symbol for Gold?",
            choices:["Au","Ag","Gd","Go"],
            answer:"Au"
        } 
    ]

    let currentQuestionIndex = 0
    let score = 0

    startBtnDisplay.addEventListener('click', startQuiz)

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++
        if (currentQuestionIndex < questions.length) {
            showQuestion()
        } else {
            showResult()
        }
    })

    restartBtnDisplay.addEventListener('click', () => {
        currentQuestionIndex = 0
        score = 0
        restartBtnDisplay.classList.add('hidden')
        startQuiz()
    })

    function startQuiz(){
        startBtnDisplay.classList.add('hidden')
        resultContainer.classList.add('hidden')
        questionContainer.classList.remove('hidden')
        showQuestion()
    }

    function showQuestion(){
        nextBtn.classList.add('hidden')
        choicesListDisplay.dataset.answered = 'false'
        questionTextDisplay.textContent = questions[currentQuestionIndex].question
        choicesListDisplay.innerHTML = "" // clear previous choices

        questions[currentQuestionIndex].choices.forEach(choice => {
            const li = document.createElement('li')
            li.textContent = choice
            li.addEventListener('click', () => selectionAnswer(choice, li))
            choicesListDisplay.appendChild(li)
        })
    }

    function selectionAnswer(choice, liElement){
        // prevent multiple answers for the same question
        if (choicesListDisplay.dataset.answered === 'true') return
        choicesListDisplay.dataset.answered = 'true'

        const correctAnswer = questions[currentQuestionIndex].answer
        if (choice === correctAnswer){
            score++
            liElement.classList.add('correct')
        } else {
            liElement.classList.add('wrong')
            // highlight the correct choice
            Array.from(choicesListDisplay.children).forEach(child => {
                if (child.textContent === correctAnswer) child.classList.add('correct')
            })
        }
        nextBtn.classList.remove('hidden')
    }

    function showResult(){
        questionContainer.classList.add('hidden')
        resultContainer.classList.remove('hidden')
        scoreDisplay.textContent = `Your Score: ${score} / ${questions.length}`
        restartBtnDisplay.classList.remove('hidden')
    }

    // initial state
})