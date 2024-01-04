function showModel() {
  model.classList.remove("hidden");
}

// It coprate Boat and Game class
function mainFunction() {
  let g = new Game();
  submitBtn.addEventListener("click", () => {
    g.applyAction(inputField.value);
    inputField.value = "";
  });
  playAgainBtn.addEventListener("click", () => {
    g.resetGame();
  });
}

mainFunction();

// Array of node IDs to highlight
var nodeListToHighlight = ["03,3,1"];

// Iterate over the node IDs and highlight the corresponding nodes
nodeListToHighlight.forEach(function (nodeId) {
  var node = cy.getElementById(nodeId);
  if (node) {
    node.addClass("highlighted");
  }
});
