// const icons = document.querySelectorAll(".imgBox");
// const avatars = document.querySelectorAll(".contentBox");

const toggleActive = (evt) => {
    const iconsInner = document.querySelectorAll(".imgBox");
    const avatarsInner = document.querySelectorAll(".contentBox");
    iconsInner.forEach((icon) => {
        icon.className = "imgBox";
    });
    avatarsInner.forEach((avatar) => {
        avatar.className = "contentBox";
    });
    evt.currentTarget.classList.add("active");
    document
        .getElementById(evt.currentTarget.dataset.id)
        .classList.add("active");
};

const generateComponent = (images) => {
    const icon = document.querySelector(".icon");
    const content = document.querySelector(".content");

    let aantal = parseInt(window.localStorage.getItem("aantal") ?? 0);

    images.forEach((image, index) => {
        let html1 = `<div class="imgBox" style="--x:${
            aantal + index
        };" data-id="img${aantal + index}"><img src="${image}" alt="img${
            aantal + index
        }"></div>`;
        icon.innerHTML += html1;

        let html2 = `<div class="contentBox" id="img${
            aantal + index
        }"><div class="card"><div class="imageBox"><img src="${image}" alt="img${
            aantal + index
        }"></div><div class="textBox"><h2>Number ${
            aantal + index + 1
        }</h2><h4>Generated with AI</h4></div></div></div>`;
        content.innerHTML += html2;
    });

    const icons = document.querySelectorAll(".imgBox");
    icons.forEach((icon) => {
        icon.addEventListener("mouseenter", toggleActive);
        icon.style.setProperty("--aantal", aantal + images.length);
    });
    window.localStorage.setItem("aantal", aantal + images.length);
};

const generateImageRequest = async (prompt, num) => {
    try {
        const response = await fetch("/ai/image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
                num,
            }),
        });

        if (!response.ok) throw new Error("wehweh");

        const data = await response.json();
        const images = data.data.map((obj) => obj.url);
        generateComponent(images);
    } catch (err) {
        console.error(err);
    }
};

const onSubmit = (e) => {
    e.preventDefault();

    const prompt = document.querySelector("#prompt").value;
    const num = document.querySelector("#num").value;

    if (prompt === "") return;
    generateImageRequest(prompt, num);
};

document.forms[0].addEventListener("submit", onSubmit);
window.localStorage.setItem("aantal", 0);
// Styling voor component

// icons.forEach((icon) => {
//     icon.addEventListener("mouseenter", toggleActive);
// });
