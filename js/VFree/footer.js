const FOOTER = document.getElementById("FOOTER_REPLACE");

async function replaceFooter() {
    FOOTER.innerHTML = await ((await fetch("/VFreePages/footer.html")).text());
}

replaceFooter();