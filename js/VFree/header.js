const HEADER = document.getElementById("HEADER_REPLACE");

async function replaceHeader(page) {
    let oauth_import = document.createElement("script");
    oauth_import.src="/js/discord/auth.js"
    document.head.appendChild(oauth_import);

    HEADER.innerHTML = await ((await fetch("/VFreePages/header.html")).text());
    try {
        if(!page) return;
        document.getElementById(`${page}-button`).classList.add("active");
    } catch(err) {
        console.error(`There was an error setting the headers location! Please report this to @kokovt_ on discord`, err);
        return;
    }

}


async function discordButton() {
    let myCookie = getCookie("discordtoken");
    console.log(myCookie);
    if(myCookie) return await makeUserMenu();
    
    let refreshCookie = getCookie("refreshtoken");
    
    if(refreshCookie) {
        // Refresh the cookie and then do things.
        return;
    }
}

async function changeLocation(page) {
    window.location.href = `/VFreePages/${page}.html`;
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

async function makeUserMenu() {
    let token = getCookie("discordtoken").split(";")[0];
    console.log(token);

    let userData = await ( await fetch('https://discordapp.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).json();

    console.log(userData);
}

discordButton();