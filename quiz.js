const questionsAndAnswers = [
    {
        options: ["UNIX", "MS-DOS", "Linux", "Mac OS", "Windows"],
        answer: "UNIX",
        question: "Qual sistema operacional foi desenvolvido pela AT&T Bell Labs em 1969?",
     },
     {
         options: ["Apple DOS", "BSD", "Windows 1.0", "Atari DOS", "86-DOS"],
         answer: "BSD",
         question: "Qual foi o primeiro descendente do UNIX lançado em 1977?",
      },
    
      {
         options: ["Apple DOS", "Atari DOS", "Apple SOS", "Xenix", "Pilot"],
         answer: "Apple DOS",
         question: "Qual foi o primeiro sistema operacional da Apple para o Apple II, lançado em 1978?",
     },
     {
         options: ["Windows 1.0", "MS-DOS", "86-DOS", "Atari DOS", "Apple SOS"],
         answer: "86-DOS",
         question: "Qual sistema operacional desenvolvido pela Seattle Computer Products foi transformado no MS-DOS pela Microsoft?",
     },
     {
         options: ["Pilot", "SunOS", "Apple ProDOS", "Xenix", "Apple SOS"],
         answer: "SunOS",
         question: "Qual sistema operacional baseado no BSD foi desenvolvido pela Sun Microsystems em 1982?",
     },
     {
         options: ["System 7", "Mac OS", "Lisa OS", "Rhapsody", "NeXTSTEP"],
         answer: "NeXTSTEP",
         question: "Qual sistema operacional desenvolvido pela NeXT de Steve Jobs foi precursor do OS X?",
     },
     {
         options: ["Windows 95", "Windows XP", "Windows 3.0", "Windows ME", "Windows 7"],
         answer: "Windows 3.0",
         question: "Qual versão do Windows trouxe melhorias no suporte de hardware e compatibilidade com processadores Intel 8086/8088, 80286 e 80386?",
     },
     {
         options: ["Debian", "Ubuntu", "Slackware", "FreeBSD", "NetBSD"],
         answer: "Slackware",
         question: "Qual versão do Linux lançada em 1993 se destacou por sua facilidade de uso com scripts e sua enorme base de dados?",
     },
     {
         options: ["Windows 2000", "Windows ME", "Windows 98", "Windows Vista", "Windows 8"],
         answer: "Windows ME",
         question: "Qual sistema operacional da Microsoft, lançado em 2000, é conhecido por sua grande quantidade de bugs e baixo desempenho?",
     },
     {
         options: ["Android", "iOS", "Windows Phone", "Firefox OS", "Ubuntu Touch"],
         answer: "iOS",
         question: "Qual sistema operacional móvel foi lançado pela Apple em 2007, revolucionando o mercado de smartphones?",
     }
];

let questionNumber = 0;
let score = 0;

const quizContainer = document.querySelector(".opcoesPerguntas");
const sendButton = document.querySelector("#send");
const verificacao = document.querySelector(".verificacao");
const perguntas = document.querySelector("#perguntas");
const nextButton = document.querySelector("#next");
const restartButton = document.querySelector("#restart");

const buildQuestionStructure = (question, options) => {
    let questionStructure = `
        <p class="question">${question}</p>
    `;
    let optionsStructure = ``;

    for (const [i, option] of options.entries()) {
        optionsStructure += `
            <div class="answer">
                <input type="radio" id=question${i} value="${option}" name="answer">
                <label for="question${i}">${option}</label>
            </div>
        `;
    }

    return questionStructure + optionsStructure;
};

const toggleButtonState = (isDisabled) => {
    sendButton.style.opacity = isDisabled ? 0.5 : 1;
    sendButton.disabled = isDisabled;
};

const buildQuiz = () => {
    toggleButtonState(false);
    verificacao.style.display = "none";
    quizContainer.innerHTML = buildQuestionStructure(questionsAndAnswers[questionNumber].question, questionsAndAnswers[questionNumber].options);
};

const resetQuiz = () => {
    questionNumber = 0;
    score = 0;
    sendButton.style.display = "inline-block";
    restartButton.style.display = "none";
    buildQuiz();
};

buildQuiz();

sendButton.addEventListener("click", () => {
    const currentAnswer = questionsAndAnswers[questionNumber].answer;
    const selectedOption = document.querySelector('input[name="answer"]:checked + label').textContent;

    toggleButtonState(true);

    if (currentAnswer === selectedOption) {
        score++;
        verificacao.style.display = "block";
        perguntas.style.background = "#32cd32";
        perguntas.textContent = `That is correct. The answer is ${currentAnswer}.`;
    } else {
        verificacao.style.display = "block";
        perguntas.style.background = "#ED4337";
        perguntas.textContent = `That is incorrect. The answer is ${currentAnswer}.`;
    }
});

nextButton.addEventListener("click", () => {
    if (questionNumber < questionsAndAnswers.length - 1) {
        questionNumber++;
        buildQuiz();
    } else {
        verificacao.style.display = "none";
        sendButton.style.display = "none";
        restartButton.style.display = "block";
        quizContainer.innerHTML = `<p>Quiz finished! Your score was: ${score}/${questionsAndAnswers.length}</p>`;
    }
});

restartButton.addEventListener("click", resetQuiz);




