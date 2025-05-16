const HEADER = document.getElementById("HEADER_REPLACE");

async function replaceHeader(page) {
    HEADER.innerHTML = await ((await fetch("/VFreePages/header.html")).text());
    try {
        document.getElementById(`${page}-button`).classList.add("active");
    } catch(err) {
        console.err(`There was an error setting the headers location! Please report this to @kokovt_ on discord`, err);
        return;
    }

}


async function changeLocation(page) {
    window.location.href = `/VFreePages/${page}.html`;
}