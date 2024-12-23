// Update slider values dynamically
const updateSliderValue = (id, displayId) => {
    const slider = document.getElementById(id);
    const display = document.getElementById(displayId);
    slider.addEventListener("input", () => {
        display.textContent = slider.value;
    });
};

// Initialize sliders
["project-size", "project-duration", "team-size", "complexity", "reliability", 
 "database-size", "team-cohesion", "developer-experience", "software-tools"]
.forEach((id) => updateSliderValue(id, `${id}-value`));

// COCOMO Calculation Function
function calculateCOCOMO(inputs) {
    const { projectSize, projectDuration, teamSize, complexity, reliability, 
            databaseSize, teamCohesion, developerExperience, softwareTools } = inputs;

    const effort = 
        (projectSize / 1000) *
        (complexity * reliability) *
        (teamSize / teamCohesion) *
        (1 + 0.1 * (5 - developerExperience)) *
        (1 + 0.05 * (5 - softwareTools));

    const time = projectDuration + effort / teamSize;
    const cost = effort * 160 * 500; // Assuming ₦500/hour and 160 hours/month

    return {
        effort: effort.toFixed(2),
        time: time.toFixed(2),
        cost: cost.toFixed(2),
    };
}

// Event Listener for Form Submission
document.getElementById("estimation-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const inputs = {
        projectSize: parseInt(document.getElementById("project-size").value),
        projectDuration: parseInt(document.getElementById("project-duration").value),
        teamSize: parseInt(document.getElementById("team-size").value),
        complexity: parseInt(document.getElementById("complexity").value),
        reliability: parseInt(document.getElementById("reliability").value),
        databaseSize: parseInt(document.getElementById("database-size").value),
        teamCohesion: parseInt(document.getElementById("team-cohesion").value),
        developerExperience: parseInt(document.getElementById("developer-experience").value),
        softwareTools: parseInt(document.getElementById("software-tools").value),
    };

    const result = calculateCOCOMO(inputs);

    document.getElementById("effort").textContent = result.effort;
    document.getElementById("time").textContent = result.time;
    document.getElementById("cost").textContent = result.cost;
});
