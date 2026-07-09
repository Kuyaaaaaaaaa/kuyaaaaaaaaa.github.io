function openAPoopyTab(tabName) {

    const pages = document.querySelectorAll(".tabPage");

    for (const page of pages) {
        page.style.display = "none";
    }

    document.getElementById(tabName).style.display = "block";
}

const buttons = document.querySelectorAll(".tabButton");

for (const button of buttons) {

    button.addEventListener("click", function () {

        openAPoopyTab(button.dataset.tab);

    });

}
