let quizData = [
    {
        "question": "What is the correct syntax to print a message in Python?",
        "options": ["echo 'Hello, World!'", "console.log('Hello, World!')", "print('Hello, World!')", "printf('Hello, World!')"],
        "correct": "print('Hello, World!')",
        "type": "radio"
    },
    {
        "question": "Which of the following are valid variable names in JavaScript?",
        "options": ["2names", "_name", "first-name", "first_name"],
        "correct": ["_name", "first_name"],
        "type": "checkbox"
    },
    {
        "question": "What is the output of 2 + 2 in JavaScript?",
        "correct": "4",
        "type": "text"
    },
    {
        "question": "Which language is primarily used for web development?",
        "options": ["Python", "Java", "HTML", "C++"],
        "correct": "HTML",
        "type": "dropdown"
    },
    {
        "question": "Which HTML tag is used to define an unordered list?",
        "options": ["<ol>", "<ul>", "<li>", "<list>"],
        "correct": "<ul>",
        "type": "radio"
    },
    {
        "question": "Which of the following are JavaScript data types?",
        "options": ["String", "Number", "Boolean", "All of the above"],
        "correct": "All of the above",
        "type": "radio"
    },
    {
        "question": "What does CSS stand for?",
        "options": ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
        "correct": "Cascading Style Sheets",
        "type": "radio"
    },
    {
        "question": "Which of the following are semantic HTML elements?",
        "options": ["<div>", "<header>", "<span>", "<footer>"],
        "correct": ["<header>", "<footer>"],
        "type": "checkbox"
    },
    {
        "question": "What is the output of 'Hello' + ' ' + 'World' in JavaScript?",
        "correct": "Hello World",
        "type": "text"
    },
    {
        "question": "Which property is used to change the background color in CSS?",
        "options": ["color", "bgcolor", "background-color", "background"],
        "correct": "background-color",
        "type": "radio"
    },
    {
        "question": "Which of the following is a JavaScript framework?",
        "options": ["React", "Django", "Flask", "Ruby on Rails"],
        "correct": "React",
        "type": "radio"
    },
    {
        "question": "How do you add a comment in a CSS file?",
        "correct": "/* This is a comment */",
        "type": "text"
    },
    {
        "question": "Which of the following is a block-level element in HTML?",
        "options": ["<span>", "<div>", "<a>", "<img>"],
        "correct": "<div>",
        "type": "radio"
    },
    {
        "question": "What does SQL stand for?",
        "options": ["Structured Query Language", "Simple Query Language", "Structured Question Language", "Short Query Language"],
        "correct": "Structured Query Language",
        "type": "radio"
    },
    {
        "question": "Which of the following are CSS frameworks?",
        "options": ["Bootstrap", "Foundation", "Bulma", "All of the above"],
        "correct": "All of the above",
        "type": "radio"
    },
    {
        "question": "What is the purpose of the 'alt' attribute in an <img> tag?",
        "options": ["To specify the URL of the image", "To specify alternate text for the image", "To style the image", "To specify the width of the image"],
        "correct": "To specify alternate text for the image",
        "type": "radio"
    },
    {
        "question": "Which of the following are JavaScript loop structures?",
        "options": ["for", "while", "do-while", "All of the above"],
        "correct": "All of the above",
        "type": "radio"
    },
    {
        "question": "What is the default port number for HTTP?",
        "correct": "80",
        "type": "text"
    },
    {
        "question": "Which of the following is a backend programming language?",
        "options": ["HTML", "CSS", "JavaScript", "Python"],
        "correct": "Python",
        "type": "radio"
    },
    {
        "question": "How do you define a function in JavaScript?",
        "correct": "function myFunction() {}",
        "type": "text"
    }
];

let currentPage = 0;
const questionsPerPage = 5;
const totalQuestions = quizData.length;

function displayQuestions() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    const questionsToDisplay = quizData.slice(start, end);

    questionsToDisplay.forEach((data, index) => {
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question-container');

        const questionElement = document.createElement('p');
        questionElement.innerText = data.question;
        questionContainer.appendChild(questionElement);

        if (data.type === 'radio' || data.type === 'checkbox') {
            data.options.forEach(option => {
                const optionWrapper = document.createElement('div');
                optionWrapper.classList.add('option-wrapper');

                const inputElement = document.createElement('input');
                inputElement.type = data.type;
                inputElement.name = `question${start + index}`;
                inputElement.value = option;

                const labelElement = document.createElement('label');
                labelElement.innerText = option;

                optionWrapper.appendChild(inputElement);
                optionWrapper.appendChild(labelElement);

                questionContainer.appendChild(optionWrapper);
            });
        } else if (data.type === 'text') {
            const inputElement = document.createElement('input');
            inputElement.type = 'text';
            inputElement.name = `question${start + index}`;
            questionContainer.appendChild(inputElement);
        } else if (data.type === 'dropdown') {
            const selectElement = document.createElement('select');
            selectElement.name = `question${start + index}`;

            data.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.innerText = option;
                selectElement.appendChild(optionElement);
            });

            questionContainer.appendChild(selectElement);
        }

        quizContainer.appendChild(questionContainer);
    });

    updatePaginationControls();
    updateSubmitButton();
}

function updatePaginationControls() {
    const prevButton = document.querySelector('.pagination-controls button:first-child');
    const nextButton = document.querySelector('.pagination-controls button:last-child');

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = (currentPage + 1) * questionsPerPage >= totalQuestions;
}

function updateSubmitButton() {
    const submitContainer = document.getElementById('submit-container');
    submitContainer.style.display = (currentPage + 1) * questionsPerPage >= totalQuestions ? 'flex' : 'none';
}

function showPrevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayQuestions();
    }
}

function showNextPage() {
    if ((currentPage + 1) * questionsPerPage < totalQuestions) {
        currentPage++;
        displayQuestions();
    }
}

function startTimer() {
    let timer = 600;
    const timerElement = document.getElementById('timer');
    const interval = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        timerElement.innerText = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timer <= 0) {
            clearInterval(interval);
            submitQuiz();
        }
        timer--;
    }, 1000);
}

function submitQuiz() {
    let score = 0;

    quizData.forEach((data, index) => {
        const questionName = `question${index}`;
        const selectedOptions = document.getElementsByName(questionName);

        if (data.type === 'radio' || data.type === 'dropdown') {
            selectedOptions.forEach(option => {
                if (option.checked || option.selected) {
                    if (option.value === data.correct) {
                        score++;
                    }
                }
            });
        } else if (data.type === 'checkbox') {
            const selectedValues = [];
            selectedOptions.forEach(option => {
                if (option.checked) {
                    selectedValues.push(option.value);
                }
            });
            if (arraysEqual(selectedValues, data.correct)) {
                score++;
            }
        } else if (data.type === 'text') {
            selectedOptions.forEach(option => {
                if (option.value.trim().toLowerCase() === data.correct.trim().toLowerCase()) {
                    score++;
                }
            });
        }
    });

    localStorage.setItem('quizScore', score);
    localStorage.setItem('totalQuestions', totalQuestions);

    window.location.href = 'score.html';
}

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
}

document.addEventListener('DOMContentLoaded', () => {
    displayQuestions();
    startTimer();
});
