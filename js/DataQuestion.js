const quizdisplay = document.getElementById("display");
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let wrapper = document.getElementById("wrapper");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//pertanyaan dan jawaban beserta kunci jawabannya
const quizArray = [
	{
		id: "0",
		question: "Apa yang dimaksud dengan ETL dalam konteks Data Analytics?",
		options: ["Extract, Transfer, Load", "Explore, Transform, Load", "Extract, Transform, Load", "Explore, Transfer, Load"],
		correct: "Extract, Transfer, Load"
	},
	{
		id: "1",
		question: "Manakah dari berikut yang bukan merupakan tipe analisis data?",
		options: ["Descriptive", " Predictive", "Sensory", "Prescriptive"],
		correct: "Sensory"
	},
	{
		id: "2",
		question: "Apa tujuan dari teknik regresi dalam analisis data?",
		options: ["Memprediksi nilai dari variabel tergantung berdasarkan variabel independen", "Mengelompokkan data menjadi beberapa kelompok berdasarkan karakteristiknya", " Menghitung rata-rata dari suatu kumpulan data", "Membuat grafik untuk memvisualisasikan data"],
		correct: "Memprediksi nilai dari variabel tergantung berdasarkan variabel independen"
	},
	{
		id: "3",
		question: "Apa yang dimaksud dengan outlier dalam analisis data?",
		options: ["Data yang berada di tengah-tengah distribusi", "Data yang memiliki nilai ekstrim yang berbeda dari mayoritas data", "Data yang tidak memiliki nilai", "Data yang memiliki unit pengukuran yang salah"],
		correct: "Data yang memiliki nilai ekstrim yang berbeda dari mayoritas data"
	},
	{
		id: "4",
		question: "Metode apa yang digunakan untuk menggabungkan data dari berbagai sumber menjadi satu set data yang lengkap?",
		options: ["Data Merging", "Data Wrangling", "Data Integration", "Data Aggregation"],
		correct: "Data Integration"
	}
];

// fungsi untuk mengulang quiz
restart.addEventListener("click", () => {
	inital(); //call initial function
	wrapper.classList.remove("hide");
	scoreContainer.classList.add("hide");
});

// button untuk melanjutkan ke soal berikutnnya
nextBtn.addEventListener(
	"click",
	(displayNext = () => {
		//increment untuk perhitungan soal
		questionCount += 1;
		//percabangan pada pertanyaan terakhir
		if (questionCount == quizArray.length) {
			//Jika soal terakhir telah dijawab
			wrapper.classList.add("hide");
			scoreContainer.classList.remove("hide");
			// tampilkan nilai akhir
			userScore.innerHTML =
				"Nilai anda " + scoreCount + " dari " + questionCount;
		} else {
			//display untuk soal keberapa
			countOfQuestion.innerHTML =
				questionCount + 1 + " dari " + quizArray.length + " Pertanyaan";
			//display Quiz
			quizDisplay(questionCount);
			//interval waktu mulai dari 15 detik
			count = 16;
			//mereset interval waktu ketika lanjut ke pertanyaan berikutnya
			clearInterval(countdown);
			//menampilkan waktu berjalan
			timerDisplay();
		}
	})
);

// interval waktu
const timerDisplay = () => {
	countdown = setInterval(() => {
		count--;
		timeLeft.innerHTML = `${count}s`;
		if (count == 0) {
			//jika waktu telah habis lanjut ke pertanyaan berikutnya
			clearInterval(countdown);
			displayNext();
		}
	}, 1000);
};

//display quiz
const quizDisplay = (questionCount) => {
	let quizCards = document.querySelectorAll(".container_mid");
	quizCards.forEach((card) => {
		card.classList.add("hide");
	});
	quizCards[questionCount].classList.remove("hide");
};

// Quiz creation
function quizCreator() {
	quizArray.sort(() => Math.random() - 0.5);
	//generate quiz
	for (let i of quizArray) {
		i.options.sort(() => Math.random() - 0.5);
		let div = document.createElement("div");
		div.classList.add("container_mid", "hide");
		countOfQuestion.innerHTML = 1 + " dari " + quizArray.length + " Pertanyaan";
		//pertanyaan
		let question_DIV = document.createElement("p");
		question_DIV.classList.add("question");
		question_DIV.innerHTML = i.question;
		div.appendChild(question_DIV);
		//opsi jawaban
		div.innerHTML += `
		<button class="option-div" onclick="checker(this)">${i.options[0]}</button>
		<button class="option-div" onclick="checker(this)">${i.options[1]}</button>
		<button class="option-div" onclick="checker(this)">${i.options[2]}</button>
		<button class="option-div" onclick="checker(this)">${i.options[3]}</button>
		`;
		quizContainer.appendChild(div);
	}
}

// mengecek pertanyaan benar atau tidak
function checker(userOption) {
	let userSolution = userOption.innerText;
	let question = document.getElementsByClassName("container_mid")[questionCount];
	let options = question.querySelectorAll(".option-div");
	//jika penggunna mengclick jawaban benar
	if (userSolution === quizArray[questionCount].correct) {
		//background warna hijau pada jawaban yang benar
		userOption.classList.add("correct");
		scoreCount++;
	} else {
		//background warna merah ketika jawaban salah
		userOption.classList.add("inCorrect");
		//fungsi untuk membuat jawaban dengan background hijau benar
		options.forEach((element) => {
			if (element.innerText == quizArray[questionCount].correct) {
				element.classList.add("correct");
			}
		});
	}
	//reset interval waktu
	clearInterval(countdown);
	//disabled semua jawaban
	options.forEach((element) => {
		element.disabled = true;
	});
}
//inisialisasi variabel dan fungsi
function inital() {
	quizContainer.innerHTML = "";
	questionCount = 0;
	scoreCount = 0;
	clearInterval(countdown);
	count = 16;
	timerDisplay();
	quizCreator();
	quizDisplay(questionCount);
}
//fungsi start button
startButton.addEventListener("click", () => {
	startScreen.classList.add("hide");
	wrapper.classList.remove("hide");
	inital();
});

window.onload = () => {
	startScreen.classList.remove("hide");
	wrapper.classList.add("hide");
};
