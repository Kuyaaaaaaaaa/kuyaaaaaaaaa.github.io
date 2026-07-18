(function () {
    function openTab(tabName) {
        const pages = document.querySelectorAll(".tabPage");
        pages.forEach((page) => {
            page.style.display = "none";
        });

        const targetPage = document.getElementById(tabName);
        if (targetPage) {
            targetPage.style.display = "block";
        }
    }

    function openSubTab(group, page) {
        const subPages = document.querySelectorAll(`.subTabPage[data-group="${group}"]`);
        subPages.forEach((subPage) => {
            subPage.style.display = "none";
        });

        const targetPage = document.querySelector(`.subTabPage[data-group="${group}"][data-page="${page}"]`);
        if (targetPage) {
            targetPage.style.display = "block";
        }
    }

    const tabButtons = document.querySelectorAll(".tabButton");
    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openTab(button.dataset.tab);
        });
    });

    const subTabButtons = document.querySelectorAll(".subTabButton");
    subTabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openSubTab(button.dataset.group, button.dataset.page);
        });
    });

    openTab("dimensions");
    openSubTab("dimensionTabs", "dimensions");
})();
