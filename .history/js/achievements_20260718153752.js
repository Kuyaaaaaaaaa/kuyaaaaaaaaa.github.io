function createAllAchievements() {
    const achievements = [];
    for (let i = 1; i <= 100; i++) {
        achievements.push(createAchievement(i));
    }
    return achievements;
}

function createAchievement(id) {
    return {
        id: id,
        name: achievementNames[id - 1] || "Achievement " + id,
        description: achievementDescriptions[id - 1] || "Description for Achievement " + id,
        requirement: achievementRequirements[id - 1] || function () { return false; },
        unlocked: false
    };
}

const achievementNames = [
    "Developer, I Hate You",
    "Well Deserved",
    ":3",
    "4 i in range",
    "Alphabetical Order",
    "Because 789",
    "Seven Leaf Clover",
    "Offbrand Infinity",
    "Nein",
    "307 orders of magnitude to go",
    "7",
    "?net sulp enin s'tahW",
    "Squeeze it out",
    "We broke the 9th wall, and it's peaceful here.",
    "The alpha is here"
];

const achievementDescriptions = [
    "Unlock your first generator.",
    "Unlock your second generator.",
    "Unlock your third generator.",
    "Unlock your fourth generator.",
    "Unlock your fifth generator.",
    "Unlock your sixth generator.",
    "Unlock your seventh generator.",
    "Unlock your eighth generator.",
    "Unlock your ninth generator.",
    "Unlock your tenth generator.",
    "Unlock your eleventh generator.",
    "Unlock your twelfth generator.",
    "Do your first compressed energy reset.",
    "Upgrade your ninth generator exactly 9 times.",
    "Have one thousand concurrent alpha."
];

const achievementRequirements = [
    function () {
        return player.dimensions[0].bought >= 1;
    },
    function () {
        return player.dimensions[1].bought >= 1;
    },
    function () {
        return player.dimensions[2].bought >= 1;
    },
        function () {
        return player.dimensions[3].bought >= 1;
    },
    function () {
        return player.dimensions[4].bought >= 1;
    },
    function () {
        return player.dimensions[5].bought >= 1;
    },
        function () {
        return player.dimensions[6].bought >= 1;
    },
    function () {
        return player.dimensions[7].bought >= 1;
    },
    function () {
        return player.dimensions[8].bought >= 1;
    },
        function () {
        return player.dimensions[9].bought >= 1;
    },
    function () {
        return player.dimensions[10].bought >= 1;
    },
    function () {
        return player.dimensions[11].bought >= 1;
    },
    function () {
        return player.compressedEnergy.gte(0);
    },
    function () {
        return player.dimensions[8].bought === 9;
    },
    function () {
        return player.alpha.gte(1000);
    }
];

function checkAchievements() {
    achievements[0].forEach(achievement => {
        if (!achievement.unlocked && achievement.requirement()) {
            achievement.unlocked = true;
            document.getElementById("unlockedSign" + achievement.id).textContent = "✔"
        }
    });
}