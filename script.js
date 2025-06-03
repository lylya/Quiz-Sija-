const questions = [
	{
		question:
			"Perangkat keras yang berfungsi sebagai otak dari komputer adalah...",
		answers: [
			{ text: "RAM", correct: false },
			{ text: "Hard Disk", correct: false },
			{ text: "CPU", correct: true },
			{ text: "Monitor", correct: false },
		],
	},
	{
		question:
			"Perangkat lunak yang berfungsi untuk mengendalikan seluruh operasi komputer disebut...",
		answers: [
			{ text: "Aplikasi", correct: false },
			{ text: "Sistem Operasi", correct: true },
			{ text: "Driver", correct: false },
			{ text: "Utility", correct: false },
		],
	},
	{
		question:
			"Jenis jaringan yang mencakup area geografis yang luas, seperti antar negara, disebut...",
		answers: [
			{ text: "WAN", correct: true },
			{ text: "MAN", correct: false },
			{ text: "LAN", correct: false },
			{ text: "PAN", correct: false },
		],
	},
	{
		question:
			"Perangkat jaringan yang berfungsi untuk menghubungkan dua jaringan yang berbeda dan meneruskan data berdasarkan alamat IP adalah...",
		answers: [
			{ text: "Switch", correct: false },
			{ text: "Hub", correct: false },
			{ text: "Router", correct: true },
			{ text: "Repeater", correct: false },
		],
	},
	{
		question:
			"Dalam analisis sistem informasi, tahap pertama yang harus dilakukan adalah...",
		answers: [
			{ text: "Desain sistem", correct: false },
			{ text: "Evaluasi sistem", correct: false },
			{ text: "Pengumpulan data", correct: true },
			{ text: "Implementasi sistem", correct: false },
		],
	},
	{
		question:
			"Bahasa pemrograman yang umum digunakan untuk pengembangan web sisi klien adalah...",
		answers: [
			{ text: "PHP", correct: false },
			{ text: "JavaScript", correct: true },
			{ text: "Python", correct: false },
			{ text: "CSS", correct: false },
		],
	},
	{
		question: "IP address versi 4 terdiri dari...",
		answers: [
			{ text: "8 bit", correct: false },
			{ text: "16 bit", correct: false },
			{ text: "32 bit", correct: true },
			{ text: "64 bit", correct: false },
		],
	},
	{
		question:
			"Perangkat lunak yang digunakan untuk merancang antarmuka pengguna aplikasi disebut...",
		answers: [
			{ text: "UI Designer", correct: true },
			{ text: "Firewall", correct: false },
			{ text: "Text Editor", correct: false },
			{ text: "Compiler", correct: false },
		],
	},
	{
		question: "Tujuan dari subnetting dalam jaringan komputer adalah...",
		answers: [
			{ text: "Mempercepat koneksi internet", correct: false },
			{ text: "Menghapus IP Address", correct: false },
			{
				text: "Membagi jaringan besar menjadi jaringan yang lebih kecil ",
				correct: true,
			},
			{ text: "Mendeteksi virus", correct: false },
		],
	},
	{
		question: "Port standar untuk layanan HTTP adalah...",
		answers: [
			{ text: "20", correct: false },
			{ text: "443", correct: false },
			{ text: "21", correct: false },
			{ text: "80", correct: true },
		],
	},
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion() {
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

	currentQuestion.answers.forEach((answer) => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}

function resetState() {
	nextButton.style.display = "none";
	while (answerButtons.firstElementChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e) {
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if (isCorrect) {
		selectedBtn.classList.add("correct");
		score++;
	} else {
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach((button) => {
		if (button.dataset.corret === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore() {
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";
}
function handleNextButton() {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
	} else {
		showScore();
	}
}

nextButton.addEventListener("click", () => {
	if (currentQuestionIndex < questions.length) {
		handleNextButton();
	} else {
		startQuiz();
	}
});

startQuiz();

document.getElementById("login-btn").addEventListener("click", function () {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	if (username === "admin" && password === "1234") {
		document.getElementById("login-container").style.display = "none";
		document.getElementById("quiz-container").style.display = "block";
		startQuiz();
	} else {
		document.getElementById("login-error").style.display = "block";
	}
});
