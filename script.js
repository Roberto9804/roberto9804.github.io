// MENU HAMBURGUESA (FUNCIONA EN TODAS LAS PÁGINAS)
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

fetch('data.json')
.then(response => response.json())
.then(data => {

    // FUNCIONES SEGURAS
    function setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    function setLink(id, text, href) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = text;
            el.href = href;
        }
    }

    function loadList(id, items) {
        const ul = document.getElementById(id);
        if (!ul || !items) return;

        items.forEach(item => {
            let li = document.createElement("li");
            li.innerHTML = `<a href="${item.file}" download>${item.name}</a>`;
            ul.appendChild(li);
        });
    }

    // TEXTOS
    setText("name", data.name);
    setText("intro", data.intro);
    setText("about-text", data.about);

    // CONTACTO
    setLink("email", data.contact?.email, "mailto:" + data.contact?.email);
    setLink("linkedin", data.contact?.linkedin, data.contact?.linkedin);
    setLink("github", data.contact?.github, data.contact?.github);

    // WORKS
    loadList("sale", data.works?.sale);
    loadList("data", data.works?.data);
    loadList("research", data.works?.research);

    // PAPERS
    const papersList = document.getElementById("papers-list");

    if (papersList && data.papers) {
        data.papers.forEach(paper => {
            const span = document.createElement("span");
            span.className = "reference-text";
            span.innerHTML = `— ${paper.authors} (${paper.year}). 
                <a href="${paper.url}" target="_blank">
                <strong>“${paper.title}”</strong></a>. 
                ${paper.journal}, ${paper.volume}: ${paper.pages}.`;
            papersList.appendChild(span);
        });
    }

    if (papersList && data.papers_next?.length > 0) {
        const ul = document.createElement("ul");
        ul.className = "reference-next-list";

        data.papers_next.forEach(next => {
            const li = document.createElement("li");
            li.textContent = next;
            ul.appendChild(li);
        });

        papersList.appendChild(ul);
    }

})
.catch(error => console.error("Error cargando data.json:", error));