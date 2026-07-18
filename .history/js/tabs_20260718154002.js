function openAPoopyTab(tabName) {
    const pages = document.querySelectorAll(".tabPage");

    for (const page of pages) {
        page.style.display = "none";
    }

    const targetPage = document.getElementById(tabName);
    if (targetPage) {
        targetPage.style.display = "block";
    }
}

const tabButtons = document.querySelectorAll(".tabButton");

for (const button of tabButtons) {
    button.addEventListener("click", function () {
        openAPoopyTab(button.dataset.tab);
    });
}

function openAPoopySubTab(group, page) {
    const subPages = document.querySelectorAll(".subTabPage[data-group='" + group + "']");

    for (const pageElement of subPages) {
        pageElement.style.display = "none";
    }

    const targetPage = document.getElementById(page + "SubPage");
    if (targetPage) {
        targetPage.style.display = "block";
    }
}

const subTabButtons = document.querySelectorAll(".subTabButton");

for (const button of subTabButtons) {
    button.addEventListener("click", function () {
        openAPoopySubTab(button.dataset.group, button.dataset.page);
    });
}

openAPoopyTab("dimensions");
openAPoopySubTab("dimensionTabs", "dimensions");