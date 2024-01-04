let nodesList = [];
let edgesList = [];

function bfs(initialState) {
  startNode = new Node(initialState, null, null, 0);

  if (startNode.isGoalState()) {
    return;
  }

  let q = new Queue();
  q.enqueue(startNode);
  let explored = [[3, 3, 1]];
  let killed = [];
  while (!q.isEmpty()) {
    node = q.dequeue();

    let newNodeData = {
      group: "nodes",
      data: {
        id: String(node.depth) + String(node.state),
        label: String(node.state),
      },
    };

    nodesList.push(newNodeData);

    if (node.parent) {
      let diff = subtractArrays(node.parent.state, node.state);
      if (node.parent.state[2] == 0) {
        diff[0] = -diff[0];
        diff[1] = -diff[1];
      }
      let newEdgeData = {
        group: "edges",
        data: {
          id: String(Math.random()) + String(diff),
          source: String(node.parent.depth) + String(node.parent.state), // ID of the source node
          target: String(node.depth) + String(node.state), // ID of the target node
          label: String(diff),
        },
      };

      edgesList.push(newEdgeData);
    }

    let children = node.generateChild();
    console.log(children);
    if (!node.isKilled()) {
      for (let i = 0; i < children.length; i++) {
        let child = children[i];

        if (!isSubArrayPresent(explored, child.state)) {
          if (child.isGoalState()) {
            let newNodeData = {
              group: "nodes",
              data: {
                id: String(child.depth) + String(child.state),
                label: String(child.state),
              },
            };

            nodesList.push(newNodeData);

            let diff = subtractArrays(child.parent.state, child.state);
            if (child.parent.state[2] == 0) {
              diff[0] = -diff[0];
              diff[1] = -diff[1];
            }

            let newEdgeData = {
              group: "edges",
              data: {
                id: String(Math.random()) + String(diff),
                source: String(child.parent.depth) + String(child.parent.state), // ID of the source node
                target: String(child.depth) + String(child.state), // ID of the target node
                label: String(diff),
              },
            };
            try {
              edgesList.push(newEdgeData);
            } catch (e) {
              console.log(e);
            }

            return;
          }
          if (child.isValid()) {
            q.enqueue(child);
            explored.push(child.state);
          }
        }
      }
    } else {
      killed.push(node.state);
    }
  }
  console.log("returned");
  return;
}

function dfs(initialState) {
  startNode = new Node(initialState, null, null, 0);

  if (startNode.isGoalState()) {
    return;
  }

  let q = new Stack();
  q.push(startNode);
  let explored = [[3, 3, 1]];
  let killed = [];
  while (!q.isEmpty()) {
    node = q.pop();

    let newNodeData = {
      group: "nodes",
      data: {
        id: String(node.depth) + String(node.state),
        label: String(node.state),
      },
    };

    nodesList.push(newNodeData);

    if (node.parent) {
      let diff = subtractArrays(node.parent.state, node.state);
      if (node.parent.state[2] == 0) {
        diff[0] = -diff[0];
        diff[1] = -diff[1];
      }
      let newEdgeData = {
        group: "edges",
        data: {
          id: String(Math.random()) + String(diff),
          source: String(node.parent.depth) + String(node.parent.state), // ID of the source node
          target: String(node.depth) + String(node.state), // ID of the target node
          label: String(diff),
        },
      };

      edgesList.push(newEdgeData);
    }

    let children = node.generateChild();
    console.log(children);
    if (!node.isKilled()) {
      for (let i = 0; i < children.length; i++) {
        let child = children[i];

        if (!isSubArrayPresent(explored, child.state)) {
          if (child.isGoalState()) {
            let newNodeData = {
              group: "nodes",
              data: {
                id: String(child.depth) + String(child.state),
                label: String(child.state),
              },
            };

            nodesList.push(newNodeData);

            let diff = subtractArrays(child.parent.state, child.state);
            if (child.parent.state[2] == 0) {
              diff[0] = -diff[0];
              diff[1] = -diff[1];
            }

            let newEdgeData = {
              group: "edges",
              data: {
                id: String(Math.random()) + String(diff),
                source: String(child.parent.depth) + String(child.parent.state), // ID of the source node
                target: String(child.depth) + String(child.state), // ID of the target node
                label: String(diff),
              },
            };
            try {
              edgesList.push(newEdgeData);
            } catch (e) {
              console.log(e);
            }

            return;
          }
          if (child.isValid()) {
            q.push(child);
            explored.push(child.state);
          }
        }
      }
    } else {
      killed.push(node.state);
    }
    console.log(q.items);
  }
  console.log("returned");
  return;
}

function main() {
  let initialState = [3, 3, 1];

  // Get the current URL
  const currentUrl = window.location.href;
  // Create a URL object with the current URL
  const url = new URL(currentUrl);
  // Get the value of the 'method' parameter
  const methodParam = url.searchParams.get("method");
  if (methodParam == "dfs") {
    dfs(initialState);
  } else {
    bfs(initialState);
  }

  console.log(nodesList);
  console.log(edgesList);

  generateGraph(nodesList, edgesList);

  // Define the CSS rule for the highlighted class
  cy.style()
    .selector(".highlighted")
    .style({
      "background-color": "red",
      "border-color": "red",
    })
    .update();
}

// const enlargeBtn = document.querySelector('.btn-enlarge');
enlargeBtn.addEventListener("click", () => {
  let currentWidth = document.getElementById("cy").offsetWidth; // Get current width in pixels
  let newWidth = currentWidth + 100; // Calculate new width
  console.log(newWidth);
  // Update the width of the div
  document.getElementById("cy").style.width = newWidth + "px";
  document.getElementById("cy").style.height = "90vh";
});

// const regenerateBtn = document.querySelector('.btn-truncate');
regenerateBtn.addEventListener("click", () => {
  let currentWidth = document.getElementById("cy").offsetWidth; // Get current width in pixels
  let newWidth = currentWidth - 100; // Calculate new width
  console.log(newWidth);
  // Update the width of the div
  document.getElementById("cy").style.width = newWidth + "px";
  document.getElementById("cy").style.height = "90vh";
});

// const startBtn = document.querySelector('.btn-start');
startBtn.addEventListener("click", () => {
  main();
});
