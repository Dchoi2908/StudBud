//Reference https://www.codingnepalweb.com/build-dictionary-app-html-javascript/ //
// Dictionary JS//
const wrapper = document.querySelector(".wrapper"), searchInput = wrapper.querySelector("input"), volume = wrapper.querySelector(".word i"), infoText = wrapper.querySelector(".info-text"), synonyms = wrapper.querySelector(".synonyms .list"), removeIcon = wrapper.querySelector(".search span");
let audio;
function data(result, word) {
    if (result.title) infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    else {
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0], phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio("https:" + result[0].phonetics[0].audio);
        if (definitions.synonyms[0] == undefined) synonyms.parentElement.style.display = "none";
        else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for(let i = 0; i < 5; i++){
                let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`;
                tag = i == 4 ? tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>` : tag;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
}
function search(word) {
    fetchApi(word);
    searchInput.value = word;
}
function fetchApi(word) {
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then((response)=>response.json()).then((result)=>data(result, word)).catch(()=>{
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    });
}
searchInput.addEventListener("keyup", (e)=>{
    let word = e.target.value.replace(/\s+/g, " ");
    if (e.key == "Enter" && word) fetchApi(word);
});
volume.addEventListener("click", ()=>{
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(()=>{
        volume.style.color = "#999";
    }, 800);
});
removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});
// Reference of JS to https://codepen.io/rajdgreat007/pen/edvZpx //
// Pomodoro JS //
var pomodoro = {
    started: false,
    minutes: 0,
    seconds: 0,
    fillerHeight: 0,
    fillerIncrement: 0,
    interval: null,
    minutesDom: null,
    secondsDom: null,
    fillerDom: null,
    init: function() {
        var self = this;
        this.minutesDom = document.querySelector("#minutes");
        this.secondsDom = document.querySelector("#seconds");
        this.fillerDom = document.querySelector("#filler");
        this.interval = setInterval(function() {
            self.intervalCallback.apply(self);
        }, 1000);
        document.querySelector("#study").onclick = function() {
            self.startWork.apply(self);
        };
        document.querySelector("#quickBreak").onclick = function() {
            self.startShortBreak.apply(self);
        };
        document.querySelector("#longBreak").onclick = function() {
            self.startLongBreak.apply(self);
        };
        document.querySelector("#reset").onclick = function() {
            self.stopTimer.apply(self);
        };
    },
    resetVariables: function(mins, secs, started) {
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;
        this.fillerIncrement = 200 / (this.minutes * 60);
        this.fillerHeight = 0;
    },
    startWork: function() {
        this.resetVariables(25, 0, true);
    },
    startShortBreak: function() {
        this.resetVariables(5, 0, true);
    },
    startLongBreak: function() {
        this.resetVariables(15, 0, true);
    },
    stopTimer: function() {
        this.resetVariables(25, 0, false);
        this.updateDom();
    },
    toDoubleDigit: function(num) {
        if (num < 10) return "0" + parseInt(num, 10);
        return num;
    },
    updateDom: function() {
        this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
        this.fillerHeight = this.fillerHeight + this.fillerIncrement;
        this.fillerDom.style.height = this.fillerHeight + "px";
    },
    intervalCallback: function() {
        if (!this.started) return false;
        if (this.seconds == 0) {
            if (this.minutes == 0) {
                this.timerComplete();
                return;
            }
            this.seconds = 59;
            this.minutes--;
        } else this.seconds--;
        this.updateDom();
    },
    timerComplete: function() {
        this.started = false;
        this.fillerHeight = 0;
    }
};
window.onload = function() {
    pomodoro.init();
};

//# sourceMappingURL=index.f3bd186e.js.map
