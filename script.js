// Helper: Update slider values dynamically
const updateSliderValue = (id, displayId) => {
    const slider = document.getElementById(id);
    const display = document.getElementById(displayId);
    slider.addEventListener("input", () => {
        display.textContent = slider.value;
    });
};

// Initialize sliders
updateSliderValue("project-size", "project-size-value");
updateSliderValue("project-duration", "project-duration-value");
updateSliderValue("team-size", "team-size-value");
updateSliderValue("complexity", "complexity-value");
updateSliderValue("reliability", "reliability-value");
updateSliderValue("database-size", "database-size-value");
updateSliderValue("team-cohesion", "team-cohesion-value");
updateSliderValue("developer-experience", "developer-experience-value");
updateSliderValue("software-tools", "software-tools-value");

// COCOMO Calculation Function
function calculateCOCOMO(inputs) {
    // Base effort estimation formula (customizable)
    const {
        projectSize,
        projectDuration,
        teamSize,
        complexity,
        reliability,
        databaseSize,
        teamCohesion,
        developerExperience,
        softwareTools,
    } = inputs;

    const effort =
        (projectSize / 1000) *
        (complexity * reliability) *
        (teamSize / teamCohesion) *
        (1 + 0.1 * (5 - developerExperience)) *
        (1 + 0.05 * (5 - softwareTools));

    const time = projectDuration + effort / teamSize; // Example custom formula
    const cost = effort * 160 * 50; // Assuming $50/hour rate and 160 hours per month

    return {
        effort: effort.toFixed(2),
        time: time.toFixed(2),
        cost: cost.toFixed(2),
    };
}

// Event Listener for Form Submission
document.getElementById("estimation-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Gather inputs
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

    // Perform calculation
    const result = calculateCOCOMO(inputs);

    // Display results
    document.getElementById("effort").textContent = result.effort;
    document.getElementById("time").textContent = result.time;
    document.getElementById("cost").textContent = result.cost;
});
