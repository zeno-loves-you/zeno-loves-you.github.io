document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.querySelector('.calendar');
    const zwergContainer = document.getElementById("zwerg-container");
    const numDoors = 24;

    const headImages = Array.from({ length: 24 }, (_, i) => `images/kopf${i + 1}.png`);
    const fonts = ['sans-serif', 'sans', 'inter'];
    const fontWeights = ['400', '500', '700', '900'];
    const colors = [
        'rgb(0, 0, 255)', 'rgb(50, 220, 0)', 'rgb(230, 70, 220)',
        'rgb(255, 115, 70)', 'rgb(0, 100, 0)', 'rgb(255, 87, 34)',
        'rgb(128, 0, 128)', 'rgb(255, 20, 147)', 'rgb(100, 149, 237)',
        'rgb(255, 69, 0)', 'rgb(50, 205, 50)', 'rgb(255, 105, 180)'
    ];
    const doorSize = 60;
    const positions = [];

    // Inhalte für jedes Türchen
    const doorContents = [
        { title: "Tag 1", message: "Ho ho ho, meine Liebe, die Weihnachtszeit hat an angefangen. Ich hoffe, dass du viel Freude mit dem Kalender haben wirst. </br> & Wie startet man besser in die Weihnachtszeit, als mit der richtigen musikalischen Untermalung? <3 </br> In Liebe Z", link: "https://www.youtube.com/watch?v=yXQViqx6GMY"},
        { title: "Tag 2", message: "Ho ho ho, meine Liebe, heute gibt es was in Person! </br> Hier ein Tipp: Gewürze sind entscheiden für den charakteristischen Geschmack. Dazu gehören Zimt, Nelken, Muskatnuss, Kardamom, Ingwer und Piment. <br/> Kannst du erraten, was es ist? <br/> Bis später :-*" },
        { title: "Tag 3", message: "Ho ho ho, meine Liebe, heute gibt es eine kleine Bastelaufgabe. Wir wollen ja eine weihnachtliche Deko zu Hause haben.", link: "https://youtu.be/jc22gvF4spk?si=u_zDxRmENhKfitVp"},
        { title: "Tag 4", message: "Ho ho ho, meine Liebe, heute gibt es ein weiteres Rätsel. Diesmal in Audioform. Viel Spaß damit :-*", audio: "images/ich_liebe_dich_morse.mp3"  },
        { title: "Tag 5", message: "Ho ho ho, meine Liebe, viel Spaß in Brüsel und Amsti. Zur Stärkung für deine lange Anreise: Ein paar Vitamine. :-*" },
        { title: "Tag 6", message: "Ho ho ho, meine Liebe, habe ne gute Zeit mit deinen Freundinnen :-) </br> Deine Drinks gehen heute auf mich, lass es dir gut gehen :-*" },
        { title: "Tag 7", message: "Ho ho ho, meine Liebe,so ein Party Abend ganz schon mal anstrengend sein. Deswegen solltest du ordentlich Frühstücken. Ein Kaffee und ein Croissant gehen auf mich :-* PS:'Der Weg ist das Ziel' lol." },
        { title: "Tag 8", message: "Ho ho ho, meine Liebe, ich hoffe du hast heute einen schönen Tag in Amsterdam. Dicker Knutscher von mir.& sorry, hoffentlich funktioniert es jetzt. :-*", image: "images/knutsch.jpg" },
        { title: "Tag 9", message: "Ho ho ho, meine Liebe, ich freue mich schon dich heute wieder zu sehen! Hast du ne Idee, woher das Bild kommt? Heute backen wir!", image: "images/zimtL.jpg", image: "images/zimtR.jpg" },
        { title: "Tag 10", message: "Ho ho ho, meine Liebe, heute keine Geschenk, sondern Frühsport. Ab auf die Yoga Matte und wir strechten uns zusammen." },
        { title: "Tag 11", message: "Weihnachtsquiz", action: startQuiz },
        { title: "Tag 12", message: "Ho ho ho, meine Liebe, wir haben viel drüber gesprochen, es aber nie gemacht. Heute geht es ins Kino. Juhuuuuuu", link: "https://www.yorck.de/en/films/the-outrun?sort=Popularity&date=2024-12-12&tab=daily&sessionsExpanded=false&film=" },
        { title: "Tag 13", message: "Memory", action: startMemory },
        { title: "Tag 14", message: "Ho ho ho, meine Liebe, heute ist Samstag. Samstag bedeutet Party. Dein erstes Getränk heute Abend geht auf mich. :-*" },
        { title: "Tag 15", message: "SchnickSchnackSchnuck", action: schnickSchnackSchnuck },
        { title: "Tag 16", message: "Heute gibts ein kleines Puzzle.", action: startTreeGame },
        { title: "Tag 17", message: "Ho ho ho, meine Liebe, der erste Glühwein heute Abend geht auf mich :-* Bis später :-)" },
        { title: "Tag 18", message: "Ho ho ho, meine Liebe, wir holen uns jetzt einen leckeren Kaffee. Aufstehen und ab geht's :-*" },
        { title: "Tag 19", message: "Ho ho ho, meine Liebe, hier ein Rätsel... Hohl in der Mitte, doch außen ganz fein, </br> in Silber gewickelt, ein echter Festtagsschrein. </br> Mit Glöckchen und Lächeln, ganz wunderbar, </br> ich bin das Highlight vom Weihnachtsjahr. </br> Was bin ich?" },
        { title: "Tag 20", message: "Ho ho ho, meine Liebe, glaubst du, dass du mit Lindor richtig liegst? Vllt trifft noch was anderes zu. :-*" },
        { title: "Tag 21", message: "Ho ho ho, meine Liebe, heute gibt es nichts, aber was hat sich an deinem Kalender geändert und wo hast du das schon mal gesehen?" },
        { title: "Tag 22", message: "Ho ho ho, meine Liebe, ein weiteres Rätsel", action: startCrossword },
        { title: "Tag 23", message: "Heute ist ein schöner Tag für einen heißen Punsch." },
        { title: "Tag 24", message: "Frohe Weihnachten! Genieße den Tag mit deinen Liebsten." }
    ];

    // Helferfunktionen
    const getRandomStyle = () => ({
        fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
        fontWeight: fontWeights[Math.floor(Math.random() * fontWeights.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
    });

    const applyRandomStyleToElement = (element, text) => {
        element.innerHTML = '';
        text.split('').forEach((char) => {
            const span = document.createElement('span');
            Object.assign(span.style, getRandomStyle());
            span.style.display = 'inline-block';
            span.innerText = char;
            element.appendChild(span);
        });
    };

    const generateRandomPosition = () => ({
        top: Math.random() * (window.innerHeight - 2 * doorSize),
        left: Math.random() * (window.innerWidth - 2 * doorSize)
    });

    const isPositionValid = (newPos) =>
        positions.every((pos) => {
            const distance = Math.hypot(newPos.top - pos.top, newPos.left - pos.left);
            return distance >= doorSize * 1.5;
        });

    // Hauptfunktionen
    const createDoor = (day, imageUrl) => {
        const door = document.createElement("div");
        door.classList.add("door");

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = `Türchen ${day}`;
        img.style.width = img.style.height = '120%';
        img.style.borderRadius = '50%';
        door.appendChild(img);

        const number = document.createElement("span");
        number.classList.add("door-number");
        applyRandomStyleToElement(number, day.toString());
        door.appendChild(number);

        // Flügel hinzufügen
        const leftWing = document.createElement("div");
        leftWing.classList.add("wing", "left-wing");
        door.appendChild(leftWing);

        const rightWing = document.createElement("div");
        rightWing.classList.add("wing", "right-wing");
        door.appendChild(rightWing);

        door.style.animation = `randomMove ${Math.random() * 20 + 20}s ease-in-out infinite alternate`;

        door.onclick = () => openDoor(day);

        return door;
    };

    const openDoor = (day) => {
        const today = new Date().getDate();
        if (today >= day) {
            const content = doorContents[day - 1];
            const media = {
                image: content.image || null,
                video: content.video || null,
                audio: content.audio || null,
                link: content.link || null
            };
            if (content.action) {
                content.action(); // Führt die Aktion aus, wenn definiert
            } else {
                showPopup(content.title, content.message, media);
            }
        } else {
            alert(`Türchen ${day} kann erst am ${day}. Dezember geöffnet werden.`);
        }
    };

const showPopup = (title, content, media) => {
        const popup = document.getElementById("popup");
        const popupInnerContent = document.getElementById("popup-inner-content");

        // Erstelle HTML für Medieninhalte
        let mediaHTML = '';
        if (media.image) {
            mediaHTML += `<img src="${media.image}" alt="Popup Image" style="max-width: 100%; max-height: 300px; display: block; margin: 10px auto;">`;
        }
        if (media.audio) {
            mediaHTML += `
                <audio controls style="display: block; margin: 10px auto;">
                    <source src="${media.audio}" type="audio/mpeg">
                    Dein Browser unterstützt das Audio-Element nicht.
                </audio>`;
        }
        if (media.video) {
            mediaHTML += `
                <video controls style="max-width: 100%; max-height: 300px; display: block; margin: 10px auto;">
                 <source src="${media.video}" type="video/mp4">
                 Dein Browser unterstützt das Video-Element nicht.
                </video>`;
        }
        if (media.link) {
            mediaHTML += `<a href="${media.link}" target="_blank" style="color: blue; text-decoration: underline; display: block; margin-top: 10px;">Hier klicken für den Film</a>`;
        }

        // Setze den Pop-up-Inhalt
        popupInnerContent.innerHTML = `
            <h2>${title}</h2>
            <p>${content}</p>
            ${mediaHTML}
        `;
    
        applyRandomStyleToElement(popupInnerContent.querySelector('h2'), title);

        popup.style.display = "flex";
    };

    const closePopup = () => {
        document.getElementById("popup").style.display = "none";
    };

    // Steuerung: Zwerge aktivieren oder deaktivieren
    const showZwerge = true; // Ändere auf `true`, um die Zwerge zu aktivieren

    // Funktion zur Zwerg-Erstellung
    const createZwerg = () => {
        const zwerg = document.createElement("img");
        zwerg.src = "images/zwerg.png"; // Pfad zum Zwerg-Bild
        zwerg.classList.add("zwerg");
        zwerg.style.transform = "scaleX(-1)";
        document.getElementById("zwerg-container").appendChild(zwerg);

        setTimeout(() => zwerg.remove(), 15000); // Entfernt den Zwerg nach 15 Sekunden
    };

    const createSnowflake = () => {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerText = '❄';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(snowflake);
        setTimeout(() => snowflake.remove(), 5000);
    };

    // Kalender erstellen
    for (let day = 1; day <= numDoors; day++) {
        let position;
        do {
            position = generateRandomPosition();
        } while (!isPositionValid(position));
        positions.push(position);

        const door = createDoor(day, headImages[day - 1]);
        Object.assign(door.style, { position: 'absolute', top: `${position.top}px`, left: `${position.left}px` });
        calendar.appendChild(door);
    }

    // Initialisierungen
    applyRandomStyleToElement(document.querySelector('.title'), document.querySelector('.title').innerText);
    // Starte die Zwerg-Animation nur, wenn aktiviert
    if (showZwerge) {
        setInterval(createZwerg, 3000);
        }
    setInterval(createSnowflake, 300);

    // Event Listener
    document.querySelector(".close-btn").addEventListener("click", closePopup);
    window.addEventListener("click", (event) => {
        if (event.target === document.getElementById("popup")) closePopup();
    });
});
    window.onload = function () {
    let password = prompt("Du bist meine (Kurzform, Großbuchstaben):");
    if (password !== "RP") {
        alert("Falsches Passwort! Versuchs nochmal.");
        document.body.innerHTML = ""; // Verhindert Zugriff
    }
const backgroundImage = new Image();
    backgroundImage.src = 'images/winter-background.jpg';
    backgroundImage.onload = () => console.log('Hintergrundbild geladen!');
    backgroundImage.onerror = () => console.error('Hintergrundbild konnte nicht geladen werden!');
};

const schnickSchnackSchnuck = () => {
    const choices = ['Stein', 'Papier', 'Schere'];
    const emojiMap = {
        Stein: '🪨',
        Papier: '📜',
        Schere: '✂️'
    };

    let userScore = 0;
    let computerScore = 0;

    const popupContent = document.getElementById("popup-inner-content");
    popupContent.innerHTML = `
        <h2>Schnick-Schnack-Schnuck</h2>
        <p>Spiel gegen den Zeno Computer! Wer zuerst 3 Punkte hat, gewinnt das Duell.</p>
        <div id="game-choices">
            <button class="game-choice" data-choice="Stein">${emojiMap.Stein}</button>
            <button class="game-choice" data-choice="Papier">${emojiMap.Papier}</button>
            <button class="game-choice" data-choice="Schere">${emojiMap.Schere}</button>
        </div>
        <p id="game-result"></p>
        <p>Punkte:</p>
        <p>Du: <span id="user-score">0</span> | Computer: <span id="computer-score">0</span></p>
    `;

    const updateScores = (userChoice, computerChoice, resultText) => {
        document.getElementById("game-result").innerText = `
            Du wählst: ${emojiMap[userChoice]} | Computer wählt: ${emojiMap[computerChoice]} \n ${resultText}
        `;
        document.getElementById("user-score").innerText = userScore;
        document.getElementById("computer-score").innerText = computerScore;

        if (userScore === 3 || computerScore === 3) {
            const winner = userScore === 3 ? "Herzlichen Glückwunsch! Du gewinnst und ich hole das Frühstück" : "Der Computer gewinnt. Viel Glück beim nächsten Mal!";
            document.getElementById("game-result").innerText = winner;
            document.getElementById("game-choices").style.display = "none"; // Deaktiviert Buttons
        }
    };

    document.querySelectorAll(".game-choice").forEach(button => {
        button.addEventListener("click", () => {
            if (userScore < 3 && computerScore < 3) {
                const userChoice = button.dataset.choice;
                const computerChoice = choices[Math.floor(Math.random() * choices.length)];
                let resultText = '';

                if (userChoice === computerChoice) {
                    resultText = "Unentschieden!";
                } else if (
                    (userChoice === 'Stein' && computerChoice === 'Schere') ||
                    (userChoice === 'Papier' && computerChoice === 'Stein') ||
                    (userChoice === 'Schere' && computerChoice === 'Papier')
                ) {
                    resultText = "Du gewinnst diese Runde!";
                    userScore++;
                } else {
                    resultText = "Ich gewinne diese Runde!";
                    computerScore++;
                }

                updateScores(userChoice, computerChoice, resultText);
            }
        });
    });

    document.getElementById("popup").style.display = "flex";
};


const startQuiz = () => {
    let currentQuestionIndex = 0;
    let userScore = 0;

    const popupContent = document.getElementById("popup-inner-content");

    const showQuestion = () => {
        const question = quizQuestions[currentQuestionIndex];

        popupContent.innerHTML = `
            <h2>Tatsächlich... Liebe - Antonia's Quiz</h2>
            <p>${question.question}</p>
            <div id="quiz-choices">
                ${question.options.map((option, index) => `
                    <button class="quiz-choice" data-answer="${String.fromCharCode(65 + index)}">${option}</button>
                `).join('')}
            </div>
            <p id="quiz-result"></p>
            <p>Punktestand:</p>
            <p>Du: <span id="user-score">0</span></p>
        `;

        document.querySelectorAll(".quiz-choice").forEach(button => {
            button.addEventListener("click", (event) => {
                const selectedAnswer = event.target.getAttribute("data-answer");
                handleAnswer(selectedAnswer);
            });
        });
    };

    const handleAnswer = (selectedAnswer) => {
        const question = quizQuestions[currentQuestionIndex];
        const resultElement = document.getElementById("quiz-result");

        if (selectedAnswer === question.answer) {
            userScore++;
            resultElement.innerText = "Richtig! 🎉";
        } else {
            resultElement.innerText = "Falsch! 😞";
        }

        document.getElementById("user-score").innerText = userScore;

        // Nächste Frage oder Quiz beenden
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            setTimeout(showQuestion, 1000); // Zeigt nächste Frage nach 1 Sekunde
        } else {
            setTimeout(endQuiz, 1000); // Beendet das Quiz nach 1 Sekunde
        }
    };

    const endQuiz = () => {
        popupContent.innerHTML = `
            <h2>🎉 Quiz beendet!</h2>
            <p>Deine Punkte: ${userScore} von ${quizQuestions.length}</p>
        `;
        document.getElementById("popup").style.display = "flex";
    };

    showQuestion();
    document.getElementById("popup").style.display = "flex";
};

const quizQuestions = [
    {
        question: "Wer ist Premierminister im Film?",
        options: ["A) Hugh Grant", "B) Colin Firth", "C) Alan Rickman", "D) Liam Neeson"],
        answer: "A"
    },
    {
        question: "Welches Lied singt Sam, um das Herz seiner Mitschülerin Joanna zu gewinnen?",
        options: ["A) Last Christmas", "B) All I Want for Christmas Is You", "C) Jingle Bell Rock", "D) White Christmas"],
        answer: "B"
    },
    {
        question: "Mit welchem Satz gesteht Mark Juliet seine Liebe?",
        options: ["A) 'To me, you are perfect.'", "B) 'You light up my world like nobody else.'", "C) 'You're the one that I want.'", "D) 'You're my Christmas miracle.'"],
        answer: "A"
    }
];

const startMemory = () => {
    const symbols = ["🎄", "🎅", "❄️", "🎁", "🦌", "🌟", "🍪", "☕"];
    const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    const popupContent = document.getElementById("popup-inner-content");

    popupContent.innerHTML = `
        <h2>🎅 Memory - Schwierigkeit: Hard</h2>
        <div id="memory-grid"></div>
        <p id="memory-result"></p>
    `;

    const memoryGrid = document.getElementById("memory-grid");
    memoryGrid.style.display = "grid";
    memoryGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
    memoryGrid.style.gap = "10px";

    shuffledSymbols.forEach((symbol, index) => {
        const card = document.createElement("button");
        card.className = "memory-card";
        card.dataset.symbol = symbol;
        card.innerText = "?";
        memoryGrid.appendChild(card);
    });

    let firstCard = null;
    let secondCard = null;
    let pairsFound = 0;

    const checkMatch = () => {
        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            pairsFound++;
            firstCard = null;
            secondCard = null;
            if (pairsFound === symbols.length) {
                document.getElementById("memory-result").innerText = "🎉 Super! Du bist die tollste Freundin";
            }
        } else {
            setTimeout(() => {
                firstCard.innerText = "?";
                secondCard.innerText = "?";
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
    };

    document.querySelectorAll(".memory-card").forEach((card) => {
        card.addEventListener("click", () => {
            if (!firstCard) {
                firstCard = card;
                card.innerText = card.dataset.symbol;
            } else if (!secondCard && card !== firstCard) {
                secondCard = card;
                card.innerText = card.dataset.symbol;
                checkMatch();
            }
        });
    });

    document.getElementById("popup").style.display = "flex";
};

const startTreeGame = () => {
    // Entferne vorhandenen Popup-Inhalt
    const popupContent = document.getElementById("popup-inner-content");
    popupContent.innerHTML = "";

    // Weihnachtsbaum-Container erstellen
    const treeContainer = document.createElement("div");
    treeContainer.id = "tree-container";
    treeContainer.style.position = "relative";
    treeContainer.style.width = "300px";
    treeContainer.style.height = "400px";
    treeContainer.style.margin = "50px auto";
    popupContent.appendChild(treeContainer);

    // Formen und Drop-Zonen für den Weihnachtsbaum definieren
    const TREE_SHAPE = [
        { id: "triangle1", type: "triangle", color: "#2ecc71", width: 50, height: 50 },
        { id: "triangle2", type: "triangle", color: "#27ae60", width: 100, height: 70 },
        { id: "triangle3", type: "triangle", color: "#1e8449", width: 150, height: 100 },
        { id: "square", type: "square", color: "#8b4513", width: 50, height: 50 } // Stamm des Baums
    ];

    const DROP_ZONES = [
        { id: "zone-triangle1", top: "20px", left: "125px", width: 50, height: 50 },
        { id: "zone-triangle2", top: "90px", left: "100px", width: 100, height: 70 },
        { id: "zone-triangle3", top: "180px", left: "75px", width: 150, height: 100 },
        { id: "zone-square", top: "300px", left: "125px", width: 50, height: 50 }
    ];

    // Drop-Zonen erstellen
    DROP_ZONES.forEach(zone => {
        const dropZone = document.createElement("div");
        dropZone.id = zone.id;
        dropZone.className = "drop-zone";
        dropZone.style.position = "absolute";
        dropZone.style.top = zone.top;
        dropZone.style.left = zone.left;
        dropZone.style.width = `${zone.width}px`;
        dropZone.style.height = `${zone.height}px`;
        dropZone.style.border = "2px dashed #ccc";
        dropZone.style.pointerEvents = "none";
        treeContainer.appendChild(dropZone);
    });

    // Teil-Container erstellen
    const partContainer = document.createElement("div");
    partContainer.id = "part-container";
    partContainer.style.display = "flex";
    partContainer.style.justifyContent = "center";
    partContainer.style.marginTop = "20px";
    popupContent.appendChild(partContainer);

    // Formen erstellen
    TREE_SHAPE.forEach(part => {
        const partElement = document.createElement("div");
        partElement.id = part.id;
        partElement.className = "part";
        partElement.style.margin = "10px";
        partElement.style.cursor = "grab";
        partElement.draggable = true;

        if (part.type === "triangle") {
            partElement.style.width = "0";
            partElement.style.height = "0";
            partElement.style.borderLeft = `${part.width / 2}px solid transparent`;
            partElement.style.borderRight = `${part.width / 2}px solid transparent`;
            partElement.style.borderBottom = `${part.height}px solid ${part.color}`;
        } else if (part.type === "square") {
            partElement.style.width = `${part.width}px`;
            partElement.style.height = `${part.height}px`;
            partElement.style.backgroundColor = part.color;
        }

        partElement.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", part.id);
        });

        partContainer.appendChild(partElement);
    });

    // Drag-and-Drop-Funktionen für den Baum
    treeContainer.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    treeContainer.addEventListener("drop", (event) => {
        event.preventDefault();
        const partId = event.dataTransfer.getData("text");
        const partElement = document.getElementById(partId);

        const dropZone = Array.from(treeContainer.children).find(zone =>
            zone.id === `zone-${partId}`
        );

        // Verhindert falsche Platzierung
        const validPlacement = dropZone && dropZone.id === `zone-${partId}`;
        if (validPlacement && !dropZone.hasChildNodes()) {
            dropZone.appendChild(partElement);
            partElement.style.position = "absolute";
            partElement.style.top = "0";
            partElement.style.left = "0";
            partElement.style.cursor = "default";
            partElement.draggable = false;

            // Feedback bei Erfolg
            dropZone.classList.add("correct");
            partElement.style.animation = "pop 0.3s ease-in-out";

            // Überprüfung, ob alle Teile platziert wurden
            if (Array.from(treeContainer.children).every(zone => zone.hasChildNodes())) {
                setTimeout(() => {
                    alert("🎉 Easy Peasy für dich:-* Sorry für das doofe Türchen! 🎄");
                }, 100);
            }
        } else {
            // Feedback bei Fehler
            if (dropZone) {
                dropZone.classList.add("incorrect");
                setTimeout(() => dropZone.classList.remove("incorrect"), 500);
            }
            alert("❌ Falscher Platz! Versuche es erneut.");
        }
    });

    // CSS-Animationen hinzufügen
    const style = document.createElement("style");
    style.textContent = `
        @keyframes pop {
            0% { transform: scale(0.8); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Popup sichtbar machen
    document.getElementById("popup").style.display = "flex";
};

const startCrossword = () => {
    const popupContent = document.getElementById("popup-inner-content");
    popupContent.innerHTML = "";

    const crosswordContainer = document.createElement("div");
    crosswordContainer.id = "crossword-container";

    const crosswordGrid = document.createElement("div");
    crosswordGrid.id = "crossword-grid";

    const crossword = [
        // WHIPPEDBUTTER (horizontal, teilt das W mit WEIHNACHTEN)
        { x: 0, y: 0, letter: "W", question: "Was ist süß, salzig und fluffig?" },
        { x: 1, y: 0, letter: "H" },
        { x: 2, y: 0, letter: "I" },
        { x: 3, y: 0, letter: "P" },
        { x: 4, y: 0, letter: "P" },
        { x: 5, y: 0, letter: "E" },
        { x: 6, y: 0, letter: "D" },
        { x: 7, y: 0, letter: "B" },
        { x: 8, y: 0, letter: "U" },
        { x: 9, y: 0, letter: "T", highlight: true },
        { x: 10, y: 0, letter: "T" },
        { x: 11, y: 0, letter: "E" },
        { x: 12, y: 0, letter: "R" },
    
        // WEIHNACHTEN (vertikal, teilt das W mit WHIPPEDBUTTER)
        { x: 0, y: 0, letter: "W" },
        { x: 0, y: 1, letter: "E", question: "Am 24.12 ist?" },
        { x: 0, y: 2, letter: "I" },
        { x: 0, y: 3, letter: "H" },
        { x: 0, y: 4, letter: "N", highlight: true },
        { x: 0, y: 5, letter: "A" },
        { x: 0, y: 6, letter: "C" },
        { x: 0, y: 7, letter: "H" },
        { x: 0, y: 8, letter: "T" },
        { x: 0, y: 9, letter: "E" },
        { x: 0, y: 10, letter: "N" },
    
        // ROTARY (horizontal, keine Verbindung zu ABSEITS)
        { x: 12, y: 0, letter: "R"},
        { x: 12, y: 1, letter: "O", question: "In welchem Club ist deine Mutter?", highlight: true },
        { x: 12, y: 2, letter: "T" },
        { x: 12, y: 3, letter: "A" },
        { x: 12, y: 4, letter: "R" },
        { x: 12, y: 5, letter: "Y" },

        // ABSEITS (vertikal, teilt das I mit ACHTZIGEURO)
        { x: 5, y: 8, letter: "P", question: "Ich bin dein..." },
        { x: 6, y: 8, letter: "U" },
        { x: 7, y: 8, letter: "P" },
        { x: 8, y: 8, letter: "I", highlight: true },
    
        // ITALIEN (vertikal, keine Verbindung zum N von WEIHNACHTEN)
        { x: 8, y: 4, letter: "I", question: "Wo waren wir im Urlaub?" },
        { x: 8, y: 5, letter: "T" },
        { x: 8, y: 6, letter: "A" },
        { x: 8, y: 7, letter: "L" },
        { x: 8, y: 8, letter: "I" },
        { x: 8, y: 9, letter: "E" },
        { x: 8, y: 10, letter: "N", highlight: true },
    
        // ACHTZIGEURO (horizontal)
        { x: 3, y: 4, letter: "A", question: "Wie viel kostet ein Gramm Gold?", highlight: true },
        { x: 4, y: 4, letter: "C" },
        { x: 5, y: 4, letter: "H" },
        { x: 6, y: 4, letter: "T" },
        { x: 7, y: 4, letter: "Z" },
        { x: 8, y: 4, letter: "I" },
        { x: 9, y: 4, letter: "G" },
        { x: 10, y: 4, letter: "E" },
        { x: 11, y: 4, letter: "U" },
        { x: 12, y: 4, letter: "R" },
        { x: 13, y: 4, letter: "O" },
    
        // PASTA (horizontal, teilt das P mit WHIPPEDBUTTER und das A mit ACHTZIGEURO)
        { x: 3, y: 3, letter: "P", question: "Käse, Speck, Eier. Was fehlt?" },
        { x: 3, y: 4, letter: "A" },
        { x: 3, y: 5, letter: "S" },
        { x: 3, y: 6, letter: "T" },
        { x: 3, y: 7, letter: "A", highlight: true },

        
    ];
    

    // Rastergröße dynamisch berechnen
    const gridWidth = Math.max(...crossword.map(l => l.x)) + 1;
    const gridHeight = Math.max(...crossword.map(l => l.y)) + 1;

    crosswordGrid.style.gridTemplateColumns = `repeat(${gridWidth}, 40px)`;
    crosswordGrid.style.gridTemplateRows = `repeat(${gridHeight}, 40px)`;

    // Raster erstellen
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const cell = document.createElement("div");
            cell.className = "crossword-cell";

            const letter = crossword.find(l => l.x === x && l.y === y);
            if (letter) {
                cell.dataset.active = "true";

                const input = document.createElement("input");
                input.maxLength = 1;
                input.dataset.correct = letter.letter.toUpperCase();
                cell.appendChild(input);

                if (letter.highlight) {
                    cell.classList.add("highlight-cell");
                }

                if (letter.question) {
                    input.addEventListener("focus", () => {
                        const questionBox = document.getElementById("crossword-question");
                        questionBox.innerText = letter.question;
                    });
                }
            } else {
                cell.style.backgroundColor = "#e0e0e0";
                cell.style.pointerEvents = "none";
            }

            crosswordGrid.appendChild(cell);
        }
    }

    crosswordContainer.appendChild(crosswordGrid);

    // Frage-Anzeige
    const questionBox = document.createElement("div");
    questionBox.id = "crossword-question";
    questionBox.innerText = "Wähle ein Feld, um die Frage zu sehen.";
    crosswordContainer.appendChild(questionBox);
    
    // Eingabefeld für das fertige Wort
    const finalWordContainer = document.createElement("div");
    finalWordContainer.id = "final-word-container";
    finalWordContainer.style.marginTop = "20px";
    finalWordContainer.style.textAlign = "center";

    const finalWordLabel = document.createElement("label");
    finalWordLabel.innerText = "Trage das fertige Wort ein:";
    finalWordLabel.style.marginRight = "10px";

    const finalWordInput = document.createElement("input");
    finalWordInput.type = "text";
    finalWordInput.maxLength = 7; // Länge von "ANTONIA"
    finalWordInput.id = "final-word-input";

    const submitButton = document.createElement("button");
    submitButton.innerText = "Überprüfen";
    submitButton.id = "submit-final-word";
    submitButton.style.marginLeft = "10px";

    // Überprüfung der Eingabe
    submitButton.addEventListener("click", () => {
        const userWord = finalWordInput.value.toUpperCase();
        const resultBox = document.getElementById("result");
        if (userWord === "ANTONIA") {
            resultBox.innerText = "🎉 Glückwunsch! Du hast das richtige Wort gefunden: ANTONIA!";
            resultBox.style.color = "green";
        } else {
            resultBox.innerText = "❌ Das ist nicht korrekt. Versuche es nochmal!";
            resultBox.style.color = "red";
        }
    });

    finalWordContainer.appendChild(finalWordLabel);
    finalWordContainer.appendChild(finalWordInput);
    finalWordContainer.appendChild(submitButton);
    crosswordContainer.appendChild(finalWordContainer);

    // Ergebnis-Anzeige
    const result = document.createElement("div");
    result.id = "result";
    result.style.marginTop = "10px";
    result.style.textAlign = "center";
    crosswordContainer.appendChild(result);

    popupContent.appendChild(crosswordContainer);
    document.getElementById("popup").style.display = "flex";
};

document.addEventListener("keydown", (event) => {
    if (event.key === " ") { // Leertaste erkannt
        event.preventDefault(); // Verhindert das Scrollen der Seite
        const activeElement = document.activeElement;

        // Überprüfen, ob der Fokus in einem Kreuzworträtsel-Eingabefeld ist
        if (activeElement.tagName === "INPUT" && activeElement.parentElement.classList.contains("crossword-cell")) {
            // Finde das nächste aktive Eingabefeld
            const allInputs = Array.from(document.querySelectorAll(".crossword-cell[data-active='true'] input"));
            const currentIndex = allInputs.indexOf(activeElement);
            if (currentIndex >= 0 && currentIndex < allInputs.length - 1) {
                allInputs[currentIndex + 1].focus(); // Fokus auf das nächste Eingabefeld setzen
            } else if (currentIndex === allInputs.length - 1) {
                // Wenn es das letzte Feld ist, Fokus auf das erste setzen
                allInputs[0].focus();
            }
        }
    }
});

