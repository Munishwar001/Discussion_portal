// Show question form
let btn = document.getElementById("btn");
let div4 = document.querySelector(".div4");
let div5 = document.querySelector(".div5")
let resolvebtn = document.querySelector(".resolve");
let targetId;

btn.addEventListener("click", function () {
    div4.style.display = "block";
    div5.style.display = "none";
});

// Initialize local storage data
let localarr = JSON.parse(localStorage.getItem("data")) || [];
let count = JSON.parse(localStorage.getItem("count")) || 0;
let likeId = JSON.parse(localStorage.getItem("likeId")) || 0;

// Handle submit button click
let submit = document.querySelector("#submit");
let ul = document.querySelector("ul");
let inp = document.querySelector("#inpt");
let text = document.querySelector("textarea");
let p1 = document.querySelector(".p1");
let p2 = document.querySelector(".p2");

submit.addEventListener("click", function () {
    if (inp.value === "" || text.value === "") {
        alert("PLEASE FILL THE INPUT");
        return;
    }

    let li = document.createElement("li");
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    let star = document.createElement("div");
    let i = document.createElement("i");
    i.classList.add("fa-solid", "fa-star");
    i.style.color = "black";
    star.appendChild(i);
    li.appendChild(h1);
    li.appendChild(p);
    li.appendChild(star);
    ul.appendChild(li);

    h1.innerHTML = inp.value;
    p.innerHTML = text.value;
    li.id = count;
    ++count;

    const obj = {
        id: count,
        subject: h1.innerHTML,
        text: p.innerHTML,
        response: [],
        true: 0,
    };

    localStorage.setItem("count", count);
    localarr.push(obj);
    updateLocalStorage();
    i.addEventListener("click", function (event) {
        event.stopPropagation();
        let targetElement = event.target;
        localarr.forEach(el => {
            if (el.id == li.id) {
                el.true = (el.true == 1) ? 0 : 1;
                targetElement.style.color = (el.true == 1) ? "yellow" : "black";
                updateLocalStorage();
                sort();
            }
        });
    });

    li.addEventListener("click", function () {
        div4.style.display = "none";
        div5.style.display = "block";
        div5.id = li.id;
        p1.innerHTML = h1.innerHTML;
        p2.innerHTML = p.innerHTML;
        let resData = JSON.parse(localStorage.getItem("data")) || [];
        let res1 = resData.find(el => el.id == li.id)?.response || [];
        document.querySelector("#ul").innerHTML = '';
        res1.sort((a, b) => b.like - a.like);
        res1.forEach(e2 => addResponseToDOM(e2));
    });
});

// On page load, add dynamic elements
window.onload = function () {
    let load = JSON.parse(localStorage.getItem("data")) || [];
    load.forEach(element => addDynamicElement(element));
}

// Add dynamic element to DOM
function addDynamicElement(element) {
    let li = document.createElement("li");
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    let star = document.createElement("div");
    let i = document.createElement("i");
    i.classList.add("fa-solid", "fa-star");
    i.style.color = element.true == 1 ? "yellow" : "black";
    star.appendChild(i);
    li.appendChild(h1);
    li.appendChild(p);
    li.appendChild(star);
    ul.appendChild(li);

    h1.innerHTML = element.subject;
    p.innerHTML = element.text;
    li.id = element.id;

    i.addEventListener("click", function (event) {
        event.stopPropagation();
        let targetElement = event.target;
        localarr.forEach(el => {
            if (el.id == li.id) {
                el.true = (el.true == 1) ? 0 : 1;
                targetElement.style.color = (el.true == 1) ? "yellow" : "black";
                updateLocalStorage();
                sort();
            }
        });
    });

    li.addEventListener("click", function () {
        div4.style.display = "none";
        div5.style.display = "block";
        div5.id = li.id;
        p1.innerHTML = h1.innerHTML;
        p2.innerHTML = p.innerHTML;
        let resData = JSON.parse(localStorage.getItem("data")) || [];
        let res1 = resData.find(el => el.id == li.id)?.response || [];
        document.querySelector("#ul").innerHTML = '';
        res1.sort((a, b) => b.like - a.like);
        res1.forEach(e2 => addResponseToDOM(e2));
        resolvebtn.addEventListener("click", function () {
            let resolveArr = JSON.parse(localStorage.getItem("data")) || [];
            console.log(resolveArr);
            let openedId = div5.id;
            console.log(openedId);
            console.log(resolveArr);
            console.log(openedId);
            let questionIndex = resolveArr.findIndex(element => element.id == openedId);
            console.log(questionIndex);
            if (questionIndex !== -1) {
                alert("Question Resolved");
                // Remove the question from the localarr array
                localarr.splice(questionIndex, 1);
                updateLocalStorage();

                let liToRemove = document.getElementById(openedId);
                if (liToRemove) {
                    liToRemove.remove();
                }

                div4.style.display = "block";
                div5.style.display = "none";
            }
        });
    });
}

function addResponseToDOM(response) {
    let containerDiv = document.createElement("div");
    let containerDivLike = document.createElement("div");
    let containerDivDis = document.createElement("div");
    let plike = document.createElement("p");
    let pDis = document.createElement("p");
    containerDiv.classList.add("containerDiv");
    containerDiv.append(containerDivLike, containerDivDis);
    containerDivLike.classList.add("containerDivLike");
    containerDivDis.classList.add("containerDivDis");
    let item1 = document.createElement("i");
    let item2 = document.createElement("i");
    item1.classList.add("fa-regular", "fa-thumbs-up");
    item2.classList.add("fa-regular", "fa-thumbs-down");
    containerDivLike.append(item1, plike);
    containerDivDis.append(item2, pDis);
    plike.innerText = response.like || 0;
    pDis.innerText = response.dislike || 0;

    item1.addEventListener("click", function () {
        response.like++;
        plike.innerText = response.like;
        updateLocalStorage();
    });

    item2.addEventListener("click", function () {
        response.dislike++;
        pDis.innerText = response.dislike;
        updateLocalStorage();
    });

    let resBlock = document.getElementById("div6");
    let li = document.createElement("li");
    let ul = document.querySelector("#ul");
    ul.appendChild(li);
    let h2 = document.createElement("h2");
    h2.innerHTML = response.name;
    li.appendChild(h2);
    let p = document.createElement("p");
    p.innerHTML = response.resComment;
    li.appendChild(p);
    li.appendChild(containerDiv);
    resBlock.style.display = "block";
}

// Adding responses
let resInp = document.getElementById("inpt2");
let resTxt = document.getElementById("textarea");
let resBtn = document.getElementById("submit2");

resBtn.addEventListener("click", function () {
    if (resInp.value === "" || resTxt.value === "") {
        alert("PLEASE FILL THE INPUT");
        return;
    }

    let responseId = ++likeId;
    const resObj = {
        id: responseId,
        name: resInp.value,
        resComment: resTxt.value,
        like: 0,
        dislike: 0
    };

    let openedId = div5.id;
    let question = localarr.find(element => element.id == openedId);
    question.response.push(resObj);
    updateLocalStorage();

    addResponseToDOM(resObj);
});

function updateLocalStorage() {
    localStorage.setItem("data", JSON.stringify(localarr));
}

function sort() {
    localarr.sort((a, b) => b.true - a.true);
    ul.innerHTML = "";
    localarr.forEach(element => addDynamicElement(element));
}

// Search functionality
let search = document.querySelector(".search");
search.addEventListener('input', (event) => {
    let searchValue = event.target.value.toLowerCase();
    ul.innerHTML = "";

    localarr.forEach(el => {
        if (el.subject.toLowerCase().includes(searchValue) || el.text.toLowerCase().includes(searchValue)) {
            addDynamicElement(el); 
        }
    });
});
resolvebtn.addEventListener("click", function () {
    let resolveArr = JSON.parse(localStorage.getItem("data")) || [];
    console.log(resolveArr);
    let openedId = div5.id;
    console.log(openedId);
    console.log(resolveArr);
    console.log(openedId);
    let questionIndex = resolveArr.findIndex(element => element.id == openedId);
    console.log(questionIndex);
    if (questionIndex !== -1) {
        alert("Question Resolved");
        // Remove the question from the localarr array
        localarr.splice(questionIndex, 1);
        updateLocalStorage();

        let liToRemove = document.getElementById(openedId);
        if (liToRemove) {
            liToRemove.remove();
        }

        div4.style.display = "block";
        div5.style.display = "none";
    }
});