replaceHeader("talents");

const TALENT_HOLDER = document.getElementById("talent-holder");

let talents = [{
    "talent": {
        "streamer_name": "Koko",
        "translation": "ここ",
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
    }
}]

async function generatePage() {
    for (let i = 0; i < talents.length; i++) {
        let holder_element = document.createElement("div");
        let name_element = document.createElement("p");
        let translation_element = document.createElement("p");
        let header_element = document.createElement("p");
        let img_element = document.createElement("img");
        let more_info_button = document.createElement("button");

        holder_element.style.width = "300px";
        holder_element.style.borderRadius = "4px";
        holder_element.style.backgroundColor = "#242323";

        img_element.src = talents[i].talent.model_images[talents[i].talent.discord_image_index];
        header_element.textContent = talents[i].talent.header_text;
        translation_element.textContent = talents[i].talent.translation;
        name_element.textContent = talents[i].talent.streamer_name;
        img_element.width = 300;

        more_info_button.style.border = "none";
        more_info_button.style.backgroundColor = "#4B9CDF";
        more_info_button.style.borderRadius = "100px";
        more_info_button.style.position = "relative";
        more_info_button.style.left = "50%";
        more_info_button.style.transform = "translate(-50%, -50%)"
        more_info_button.style.width = "95%";
        more_info_button.textContent = "More info";

        more_info_button.addEventListener("mouseover", () => {
            more_info_button.style.backgroundColor = "#7ECCF2";
        });

        more_info_button.addEventListener("mouseout", () => {
            more_info_button.style.backgroundColor = "#4B9CDF";
        });

        more_info_button.addEventListener("mousedown", () => {
            more_info_button.style.backgroundColor = "white";
        });

        more_info_button.addEventListener("mouseup", () => {
            more_info_button.style.backgroundColor = "#4B9CDF";
        });

        holder_element.appendChild(img_element);
        holder_element.appendChild(name_element);
        holder_element.appendChild(translation_element);
        holder_element.appendChild(header_element);
        holder_element.append(more_info_button);

        TALENT_HOLDER.appendChild(holder_element);
    }
}

async function callAPI() {
    // For now this will just pull koko from the DB since thats the only one I have added.
    try { 
        const KOKO_DATA_STRING = await (await fetch("http://localhost:3000/VFreeTalents/getTalent?talent=Koko")).text();
        const KOKO_DATA = JSON.parse(KOKO_DATA_STRING);
        talents = [];
        for(let i = 0; i < 20; i++) {
            talents.push(KOKO_DATA);
        }
        generatePage();
        return;
    } catch(err) {
        // If its a network error right now, it doesn't matter because well... Im still locally hosting it.
        if(!(err instanceof TypeError)) {
            console.error("There was an error! Please report this to kokovt_ \n", err);
        } 
        generatePage();
        return;
    }
}




callAPI();