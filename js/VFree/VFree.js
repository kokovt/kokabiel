replaceHeader("");

let talents = [{
    "talent": {
        "streamer_name": "Koko",
        "translation": "ここ",
        "birthday": -5036230804000,
        "header_text": "The fallen angel searching for redemption.",
        "description": "Koko was a angel in days of yore; and she was very interested in the stars.\nShe went around teaching about the constellations to anyone she could find.\n After [REDACTED], gods light was stripped from her and she was banished from heaven.\nAfter years of recollection, and searching for redemption, shes decided to settle down and run a coffee shop with Tofee and Tango, trying to help anyone she can, hoping that some day she can redeem herself.",
        "links": [
            {
                "name": "twitch",
                "link": "https://twitch.tv/kokofee_"
            }, {
                "name": "youtube",
                "link": "https://www.youtube.com/@kokofeetv"
            }, {
                "name": "x",
                "link": "https://www.x.com/_kokovt"
            }, {
                "name": "github",
                "link": "https://github.com/kokovt"
            }
        ],
        "model_images": [
            "https://cdn.discordapp.com/attachments/1369568824533323807/1369954553071669319/Screenshot_2025-05-08_022939.png?ex=68284919&is=6826f799&hm=0795bf23d7974ad71feb821005c9d1c274912441e9ab0ada65cb35744424ac4d&",
            "https://cdn.discordapp.com/attachments/1369568824533323807/1369578088400425072/image.png?ex=68283bfd&is=6826ea7d&hm=e0a2c1adbef9a54037d41b489d94386ced88fd3da9843a211d569f01c30cca4a&"
        ],
        "schedule": [
            {
                "day": 1747238400000,
                "length": 10800000,
                "reoccuring": true
            }
        ],
        "discord_image_index": 0
    },
    "verified": true // This will be important when I open registration
}, { "talent": { "streamer_name": "Toffeechino", "header_text": "Have a cup o Toffeechino", "description": "Your local fuzzy barista named Toffee. Full of espresso and ready to unleash chaos! ", "links": [{ "name": "twitch", "link": "https://twitch.tv/kokofee_" }, { "name": "youtube", "link": "https://www.youtube.com/@kokofeetv" }], "model_images": ["https://cdn.discordapp.com/attachments/1329325688762798144/1373125172244123781/VRChat_2025-02-12_00-43-01.png?ex=682945f8&is=6827f478&hm=c34088d696e7983187951fa3be5d688e5e080b85513d8e4adc240e8c77932cc1&"], "discord_image_index": 0 }, "verified": true }]

const TALENT_HOLDER = document.getElementById("talents");

async function generatePage() {
    for (let i = 0; i < talents.length; i++) {
        let holder_element = document.createElement("div");
        let name_element = document.createElement("p");
        let translation_element = document.createElement("p");
        let header_element = document.createElement("p");
        let img_element = document.createElement("img");
        let more_info_button = document.createElement("button");

        holder_element.style.position = "relative";

        holder_element.style.width = "300px";
        holder_element.style.height = "450px";
        holder_element.style.borderRadius = "4px";
        holder_element.style.backgroundColor = "#242323";

        img_element.src = talents[i].talent.model_images[talents[i].talent.discord_image_index];
        header_element.textContent = talents[i].talent.header_text || " ";
        translation_element.textContent = talents[i].talent.translation || " ";
        name_element.textContent = talents[i].talent.streamer_name || " ";

        let img_holder = document.createElement("div");
        img_holder.style.height = "300px";
        img_holder.style.display = "flex";
        img_holder.style.justifyContent = "center";
        img_holder.style.alignItems = "center";
        img_element.width = 300;

        img_holder.appendChild(img_element);

        holder_element.appendChild(img_holder);
        holder_element.appendChild(name_element);
        holder_element.appendChild(translation_element);
        holder_element.appendChild(header_element);

        TALENT_HOLDER.appendChild(holder_element);
    }
}

async function callAPI() {
    // For now this will just pull koko from the DB since thats the only one I have added.
    try {
        const KOKO_DATA_STRING = await (await fetch("http://localhost:3000/VFreeTalents/getTalent?talent=Koko")).text();
        const KOKO_DATA = JSON.parse(KOKO_DATA_STRING);
        const TOFFEE_DATA_STRING = await (await fetch("http://localhost:3000/VFreeTalents/getTalent?talent=Toffeechino")).text();
        const TOFFEE_DATA = JSON.parse(TOFFEE_DATA_STRING);
        talents = [];
        talents.push(KOKO_DATA);
        talents.push(TOFFEE_DATA);
        generatePage();
        return;
    } catch (err) {
        // If its a network error right now, it doesn't matter because well... Im still locally hosting it.
        if (!(err instanceof TypeError)) {
            console.error("There was an error! Please report this to kokovt_ \n", err);
        }
        generatePage();
        return;
    }
}


callAPI();