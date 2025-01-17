const start_btn = document.querySelector(".start_btn");
// info box
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".exit");
const continue_btn = document.querySelector(".continue");
// quiz box
const quiz_box = document.querySelector(".quiz_box");
const timeText = document.querySelector(".time_left_txt");
const timeCount = document.querySelector(".timer_sec");
const timerline = document.querySelector(".timer_line");
const que_text = document.querySelector(".que_text");
const option_list = document.querySelector(".option_list");
const total_que = document.querySelector(".total_que");
const next_btn = document.querySelector(".next_btn");
// result box
const result_box = document.querySelector(".result_box");
const replay_btn = document.querySelector(".replay");
const quit_btn = document.querySelector(".quit");

let que_index = 0;
let que_numb = 1;
let timeValue = 15;
let userScore = 0;
let widthValue = 0;
let counter;
let counterLine;

// if start btn is clicked
start_btn.addEventListener("click", function () {
    info_box.classList.add("activeInfo");
});

// if exit button in rules box is clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
};

// if continue btn is pressed in rules box
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    startTimer(timeValue);
    startTimerline(widthValue);
    showQuestion(que_index);
    quesCounter(que_numb);
};

// next button is clicked
next_btn.onclick = () => {
    if (que_numb < questions.length) { //if question number is less than total questions
        que_numb++;
        que_index++;
        showQuestion(que_index);
        quesCounter(que_numb);
        startTimer(timeValue);
        startTimerline(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    } else {

        showResult();
    }
};

// if replay button is clicked
replay_btn.onclick = () => {
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    clearInterval(counter);
    clearInterval(counterLine);
    timeValue = 15;
    widthValue = 0;
    que_index = 0;
    que_numb = 1;
    startTimer(timeValue);
    startTimerline(widthValue);
    showQuestion(que_index);
    quesCounter(que_numb);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
};

//if quit button is clicked
quit_btn.onclick = () => {
    window.location.reload();
};

// ****** FUNCTIONS ******

function showQuestion(index) {
    let que_tag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
    let option_tag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = document.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "selectedOption(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function selectedOption(userSelection) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = userSelection.textContent;
    let correctAns = questions[que_index].answer;
    const allOptions = option_list.children.length; //all 4 options will be slected
    //if user selected the correct answer
    if (userAns === correctAns) {
        userScore++;
        userSelection.classList.add("correct");
        userSelection.insertAdjacentHTML("beforeend", tickIconTag);
    } //if user selected wrong answer
    else {
        userSelection.classList.add("incorrect"); // if option is incorrect add incorrect class
        userSelection.insertAdjacentHTML("beforeend", crossIconTag); // add wrong icon to option
        // show correct answer when wrong option selected
        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                //if there is an option which is matched to an array answer
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disable all options
    }

    next_btn.classList.add("show");
}

function quesCounter(qsNo) {
    let totalQueCountTag = `<span><p>${qsNo} of ${questions.length} questions</p></span>`;
    total_que.innerHTML = totalQueCountTag;
}

function showResult() {
    start_btn.classList.remove("active");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = document.querySelector(".score_text");
    if (userScore > 3) {
        let scoreTag = `<span>and congrats! 🎉, You got ${userScore} out of ${questions.length}</span>`;
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 1) {
        let scoreTag = `<span>and nice 😎, You got ${userScore} out of ${questions.length}</span>`;
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = `<span>and sorry 😐, You got only ${userScore} out of ${questions.length}</span>`;
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        console.log(time)
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time Off";
            const allOptions = option_list.children.length;
            let correctAns = questions[que_index].answer;
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerline(widthVal) {
    counterLine = setInterval(timer, 29);
    function timer() {
        widthVal += 1;
        timerline.style.width = widthVal + "px";
        if (widthVal > 549) {
            clearInterval(counterLine);
        }
    }
}
