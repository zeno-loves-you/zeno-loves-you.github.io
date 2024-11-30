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
        { title: "Tag 3", message: "Ho ho ho, meine Liebe, heute gibt es ein Rezept: ." },
        { title: "Tag 4", message: "Zeit für eine kleine Auszeit – mach es dir gemütlich!" },
        { title: "Tag 5", message: "Ein Stern für deinen Tag – strahle heute besonders hell!" },
        { title: "Tag 6", message: "Der Nikolaus hat dir eine kleine Freude hinterlassen." },
        { title: "Tag 7", message: "Lass dich inspirieren – ein Zitat: 'Der Weg ist das Ziel'." },
        { title: "Tag 8", message: "Ein warmes Getränk macht den Winter gleich viel schöner." },
        { title: "Tag 9", message: "Heute wartet ein kleines Rätsel auf dich: Was hat Flügel, aber fliegt nicht? (Antwort: Ein Türchen!)" },
        { title: "Tag 10", message: "Ein Lächeln ist das schönste Geschenk – schenk es heute jemandem." },
        { title: "Tag 11", message: "Eine kleine Überraschung erwartet dich bald!" },
        { title: "Tag 12", message: "Halbzeit bis Weihnachten – freu dich auf die zweite Hälfte!" },
        { title: "Tag 13", message: "Ein warmer Schal und gute Gedanken für den kalten Winter." },
        { title: "Tag 14", message: "Heute ist ein perfekter Tag, um an jemanden zu denken, den du magst." },
        { title: "Tag 15", message: "Schmücke dein Zuhause mit etwas Festlichem – es ist fast so weit!" },
        { title: "Tag 16", message: "Ein Winterspaziergang macht den Kopf frei und das Herz warm." },
        { title: "Tag 17", message: "Zeit für Kekse! Backe heute ein paar Plätzchen." },
        { title: "Tag 18", message: "Ein kleines Gedicht für dich: 'Im Winter ist es kalt und klar, doch Weihnachten ist wunderbar.'" },
        { title: "Tag 19", message: "Zünde heute eine Kerze an und genieße die Ruhe." },
        { title: "Tag 20", message: "Nur noch vier Tage bis Weihnachten! Die Vorfreude steigt." },
        { title: "Tag 21", message: "Ein Tannenzweig und der Duft von Weihnachten füllen den Raum." },
        { title: "Tag 22", message: "Ein Weihnachtslied hebt die Stimmung – summ oder sing mit!" },
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
            const content = doorContents[day - 1]; // Hole Inhalt basierend auf Türnummer
            const media = {
                image: content.image || null,
                video: content.video || null,
                audio: content.audio || null,
                link: content.link || null // Fügt den Link hinzu, falls vorhanden
            };
            showPopup(content.title, content.message, media);
        } else {
            alert(`Türchen ${day} kann erst am ${day}. Dezember geöffnet werden.`);
        }
    };

    const showPopup = (title, content, media) => {
        const popup = document.getElementById("popup");
        const popupInnerContent = document.getElementById("popup-inner-content");
        
            // HTML für den Link hinzufügen, wenn er existiert
        const linkHTML = media.link 
        ? `<a href="${media.link}" target="_blank" style="color: blue; text-decoration: underline; display: block; margin-top: 10px;">Nr. 1 Weihnachtshit</a>` 
        : '';

        
        popupInnerContent.innerHTML = `
        <h2>${title}</h2>
        <p>${content}</p>
        ${media.image ? `<img src="${media.image}" style="max-width: 100%; max-height: 300px; display: block; margin: 10px auto;" />` : ''}
        ${linkHTML}
    `;
        applyRandomStyleToElement(popupInnerContent.querySelector('h2'), title);

        popup.style.display = "flex";
    };

    const closePopup = () => {
        document.getElementById("popup").style.display = "none";
    };

    const createZwerg = () => {
        const zwerg = document.createElement("img");
        zwerg.src = "images/zwerg.png";
        zwerg.classList.add("zwerg");
        zwerg.style.transform = "scaleX(-1)";
        zwergContainer.appendChild(zwerg);
        setTimeout(() => zwerg.remove(), 15000);
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
    setInterval(createZwerg, 3000);
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

