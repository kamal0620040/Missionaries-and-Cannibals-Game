let cy = cytoscape({
    container: document.getElementById('cy'), // container to render in

    elements: [ // list of graph elements to start with
    { // node a
      data: { id: 'a' }
    },
    { // node b
      data: { id: 'b' }
    },
    { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    }
  ],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'shape': 'rectangle',
        'width': 60,  // Set the desired width of the rectangle
        'height': 30, // Set the desired height of the rectangle
        'background-color': 'lightblue', // Set the desired background color
        'border-color': 'blue', // Set the desired border color
        'border-width': 2, // Set the desired border width
        'label': 'data(id)', // Set the node's label to its ID
        'text-valign': 'center', // Center the label vertically
        'text-halign': 'center' // Center the label horizontally
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    }
  ],

  layout: {
    name: 'grid',
    rows: 1
  }
});

function checkSameContent(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false; // Arrays have different lengths
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
        return false; // Elements at index i are different
        }
    }

    return true; // Arrays have the same content
}
  
class Node{
    goalState = [0, 0, 0];

    constructor(state, parent, action, depth){
        this.parent = parent;
        this.state = state;
        this.action = action;
        this.depth = depth;
    }
    
    isKilled(){
        const missionaries = this.state[0];
        const canniabls = this.state[1];
    
        if(missionaries < canniabls && missionaries > 0){
            return true;
        }

        if(missionaries > canniabls && missionaries < 3){
            return true;
        } 
        
        return false;
    }

    isGoalState(){
        if(checkSameContent(this.state, this.goalState)){
            return true;
        }
        return false;
    }

}


function main(){
    let initial_state = [3, 3, 1];
    const n1 = new Node([0, 0, 0], null, null, 1);
    console.log(n1.isGoalState());
    console.log(n1.isKilled());
}

main();