const objects = {

    "walking-house": {
        //image: "assets/walking-house.png",
        translation: "walkingHouse",

        details: [
            ["energy", "energyValue"],
            ["water", "waterValue"],
            ["navigation", "navigationValue"],
            ["communication", "communicationValue"]
        ]
    },

    "spider-robot": {
        image: "assets/spider-robot.png",
        translation: "spiderRobot",

        details: [
            ["purpose", "purposeValue"],
            ["control", "controlValue"],
            ["movement", "movementValue"]
        ]
    },

    "smart-center": {
        image: "assets/smart-center.png",
        translation: "smartCenter",

        details: [
            ["production", "productionValue"],
            ["medicine", "medicineValue"],
            ["research", "researchValue"],
            ["control", "controlValue"]
        ]
    },

    "berkut": {
        image: "assets/berkut.png",
        translation: "berkut",

        details: [
            ["purpose", "purposeValue"],
            ["sensors", "sensorsValue"],
            ["launch", "launchValue"]
        ]
    },

    "satellite": {
        image: "assets/satellite.png",
        translation: "satellite",

        details: [
            ["purpose", "purposeValue"],
            ["orbit", "orbitValue"],
            ["communication", "communicationValue"],
            ["navigation", "navigationValue"]
        ]
    }

};


// -------------------------
// Элементы страницы
// -------------------------

const objectButtons =
    document.querySelectorAll(".world-object");

const modal =
    document.getElementById("infoModal");

const overlay =
    document.getElementById("modalOverlay");

const closeButton =
    document.getElementById("modalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalCategory =
    document.getElementById("modalCategory");

const modalDescription =
    document.getElementById("modalDescription");

const modalImage =
    document.getElementById("modalImage");

const modalDetails =
    document.getElementById("modalDetails");

const briefInfoButton =
    document.getElementById("briefInfo");


// -------------------------
// Текущий язык
// -------------------------

let currentLanguage =
    localStorage.getItem("language") || "ru";


// -------------------------
// Текущий открытый объект
// -------------------------

let currentObjectId = null;


// -------------------------
// Открытие объекта
// -------------------------

function openObject(objectId) {

    const object = objects[objectId];

    if (!object) {
        console.error("Объект не найден:", objectId);
        return;
    }

    const languageData =
        translations[currentLanguage][object.translation];

    if (!languageData) {
        console.error(
            "Нет перевода:",
            object.translation,
            currentLanguage
        );
        return;
    }

    currentObjectId = objectId;


    // Заголовок
    modalTitle.textContent =
        languageData.title;


    // Категория
    modalCategory.textContent =
        languageData.category;


    // Описание
    modalDescription.textContent =
        languageData.description;


    // Изображение
    modalImage.src =
        object.image? object.image : languageData.image;

    modalImage.alt =
        languageData.title;


    // Характеристики
    modalDetails.innerHTML = "";


    object.details.forEach(detail => {

    const label =
        languageData[detail[0]];

    const value =
        languageData[detail[1]];

    const element =
        document.createElement("div");

    element.className = "detail";

    element.innerHTML = `
        <span class="detail-name">
            ${label}
        </span>

        <span class="detail-value">
            ${value}
        </span>
    `;

    modalDetails.appendChild(element);

});


    // Запоминаем активный объект
    objectButtons.forEach(button => {
        button.classList.remove("active");
    });

    const activeButton =
        document.querySelector(
            `[data-object="${objectId}"]`
        );

    if (activeButton) {
        activeButton.classList.add("active");
    }


    // Открываем модалку
    modal.classList.add("active");
    overlay.classList.add("active");

}


// -------------------------
// Клики по объектам
// -------------------------

objectButtons.forEach(button => {

    button.addEventListener("click", () => {

        const objectId =
            button.dataset.object;

        openObject(objectId);

    });

});


briefInfoButton.addEventListener("click", () => {
    briefInfoButton.classList.toggle("active");});

// -------------------------
// Закрытие модалки
// -------------------------

function closeModal() {

    modal.classList.remove("active");
    overlay.classList.remove("active");

    objectButtons.forEach(button => {
        button.classList.remove("active");
    });

    currentObjectId = null;
}


closeButton.addEventListener(
    "click",
    closeModal
);


overlay.addEventListener(
    "click",
    closeModal
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);


// -------------------------
// Переключение языка
// -------------------------

document
    .querySelectorAll("[data-lang]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const language =
                button.dataset.lang;

            if (!translations[language]) {
                return;
            }

            currentLanguage = language;

            localStorage.setItem(
                "language",
                currentLanguage
            );


            // Если модалка открыта,
            // сразу обновляем её содержимое

            if (currentObjectId) {

                openObject(
                    currentObjectId
                );

            }

        });

    });