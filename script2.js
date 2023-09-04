let cy = cytoscape({
    container: document.getElementById('cy'), // container to render in

//     elements: [ // list of graph elements to start with
//     { // node a
//       data: { id: 'a' }
//     },
//     { // node b
//       data: { id: 'b' }
//     },
//     { // edge ab
//       data: { id: 'ab', source: 'a', target: 'b' }
//     }
//   ],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'shape': 'ellipse',
        'width': 60,  // Set the desired width of the rectangle
        'height': 30, // Set the desired height of the rectangle
        'color': 'white',
        'background-color': 'black', // Set the desired background color
        'border-color': 'teal', // Set the desired border color
        'border-width': 2, // Set the desired border width
        'label': 'data(label)', // Set the node's label to its ID
        'text-valign': 'center', // Center the label vertically
        'text-halign': 'center' // Center the label horizontally
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'label': 'data(label)',
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    }
  ],

//   layout: {
//     name: 'grid',
//     rows: 1
//   }
  layout: {
    name: 'breadthfirst',
    fit: true, // whether to fit the viewport to the graph
    directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
    padding: 30, // padding on fit
    circle: false, // put depths in concentric circles if true, put depths top down if false
    grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
    spacingFactor: 0.5, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    roots: undefined, // the roots of the trees
    depthSort: undefined, // a sorting function to order nodes at equal depth. e.g. function(a, b){ return a.data('weight') - b.data('weight') }
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled,
    animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position ){ return position; },
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

    isValid(){
        let missionaries = this.state[0];
        let canniabls = this.state[1];
        let boat = this.state[2];

        if(missionaries < 0 || missionaries > 3){
            return false;
        }
        
        if(canniabls < 0 || canniabls > 3){
            return false;
        }
        
        if(boat > 1 || boat < 0){
            return false;
        }

        return true;
    }

    generateChild(){
        let children = [];
        let depth = this.depth + 1;
        let op = -1;
        if(this.state[2] == 0){
            op = 1;
        }

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
              let newState = [...this.state];
              newState[0] = newState[0] + op * x;
              newState[1] = newState[1] + op * y;
              newState[2] = newState[2] + op * 1;
              let action = [x, y, op];
              let newNode = new Node(newState, this, action, depth);
              if( x + y >= 1 && x + y <= 2){
                children.push(newNode);
              }
            }
        }

        return children;
    }
}

class Queue {
    constructor() {
      this.items = [];
    }
  
    enqueue(item) {
      this.items.push(item);
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items.shift();
    }
  
    front() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items[0];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    size() {
      return this.items.length;
    }
  
    clear() {
      this.items = [];
    }
}

function subtractArrays(array1, array2) {
    const result = [];
  
    for (let i = 0; i < array1.length; i++) {
      const subtractedValue = array1[i] - array2[i];
      result.push(subtractedValue);
    }
  
    return result;
}

function isSubArrayPresent(first, second) {
    for (let i = 0; i < first.length; i++) {
      const subArray = first[i];
  
      if (subArray.length === second.length) {
        let isMatch = true;
  
        for (let j = 0; j < subArray.length; j++) {
          if (subArray[j] !== second[j]) {
            isMatch = false;
            break;
          }
        }
  
        if (isMatch) {
          return true;
        }
      }
    }
  
    return false;
}

let nodesList = [];
let edgesList = [];

function bfs(initialState){
    startNode = new Node(initialState, null, null, 0);
    
    if (startNode.isGoalState()){
      return;
    }
    
    let q = new Queue();
    q.enqueue(startNode);
    let explored = [];
    let killed = [];
    while(!q.isEmpty()){
        node = q.dequeue();
        


        let newNodeData = {
            group: 'nodes',
            data: {
              id: String(node.depth) + String(node.state),
              label: String(node.state),
            },
        };
        
        nodesList.push(newNodeData);



        if(node.parent){
            let diff = subtractArrays(node.parent.state, node.state);
            if(node.parent.state[2] == 0){
                diff[0] = -diff[0];
                diff[1] = -diff[1];
            }
            let newEdgeData = {
                group: 'edges',
                data: {
                  id: String(Math.random()) + String(diff),
                  source: String(node.parent.depth) + String(node.parent.state), // ID of the source node
                  target: String(node.depth) + String(node.state), // ID of the target node
                  label: String(diff),
                }
            };

            edgesList.push(newEdgeData);
        }

        let children = node.generateChild();
        console.log(children);
        if(!node.isKilled()){
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                console.log("explored");
                console.log(explored);
                
                console.log("child");
                console.log(child.state);

                console.log(isSubArrayPresent(explored,child.state));
                
                if(!isSubArrayPresent(explored,child.state)){
                    if(child.isGoalState()){

                        let newNodeData = {
                            group: 'nodes',
                            data: {
                              id: String(child.depth) + String(child.state),
                              label: String(child.state)
                            },
                        };
                
                        nodesList.push(newNodeData);

                        let diff = subtractArrays(node.parent.state, node.state);
                        if(node.parent.state[2] == 0){
                            diff[0] = -diff[0];
                            diff[1] = -diff[1];
                        }

                        let newEdgeData = {
                            group: 'edges',
                            data: {
                              id: String(Math.random()) + String(diff),
                              source: String(child.parent.depth) + String(child.parent.state), // ID of the source node
                              target: String(child.depth) + String(child.state), // ID of the target node
                              label: String(diff),
                            }
                        };
                        try{
                            edgesList.push(newEdgeData);
                        }catch(e){
                            console.log(e);
                        }
                        
                        return;
                    }
                    if(child.isValid()){
                        q.enqueue(child);
                        explored.push(child.state);
                    }
                }
            }
        }else{
            killed.push(node.state);
        }
    }
    console.log("returned")
    return;
}

function main(){
    let initialState = [3, 3, 1];
    
    bfs(initialState);
    

    console.log(nodesList);
    console.log(edgesList);

    let options = {
        name: 'breadthfirst',
        fit: true, // whether to fit the viewport to the graph
        directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
        padding: 30, // padding on fit
        circle: false, // put depths in concentric circles if true, put depths top down if false
        grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
        spacingFactor: 1.3, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        roots: undefined, // the roots of the trees
        depthSort: undefined, // a sorting function to order nodes at equal depth. e.g. function(a, b){ return a.data('weight') - b.data('weight') }
        animate: true, // whether to transition the node positions
        animationDuration: 1000, // duration of animation in ms if enabled
        animationEasing: "ease-in", // easing of animation if enabled,
        animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined, // callback on layoutready
        stop: undefined, // callback on layoutstop
        transform: function (node, position ){ return position; },
    };
    
    function generateGraph(nodes, edges) {
        var smallDelay = 10; // Delay between each node addition (in milliseconds)
        var delay = 10; // Delay between each node addition (in milliseconds)
        var i = 0;
      
        // Add nodes to the graph with a delay
        function addNodeWithDelay() {
          if (i < nodes.length) {
            cy.add({...nodes[i],style: { visibility: 'hidden' }});
            i++;
            setTimeout(addNodeWithDelay, smallDelay);
          } else {
            // All nodes added, now add the edges
            setTimeout(addEdgesWithDelay, delay);
          }
        }

        function addEdgesWithDelay() {
            var j = 0;
            function addEdgeWithDelay() {
                if (j < edges.length) {
                var edge = edges[j];
                cy.add(edge);
                
                let sourceNode = cy.getElementById(edge.data.source);
                let targetNode = cy.getElementById(edge.data.target);
                // console.log(edge.data.source);
                // console.log(targetNode);
                // console.log(sourceNode.isEdge())
                // console.log(targetNode.isEdge())
                if (sourceNode.connectedEdges().length > 0 || targetNode.connectedEdges().length > 0) {
                // If either source or target node is connected to an edge, make them visible
                    sourceNode.style('visibility', 'visible');
                    targetNode.style('visibility', 'visible');
                }

                j++;
                cy.layout(options).run();
                setTimeout(addEdgeWithDelay, 10);
            }else{

                // Highlight the path between node1 and node4
                // var sourceNodeId = '03,3,1';
                // var targetNodeId = '110,0,0';

                // // Check if the source and target nodes exist in the graph
                // var sourceNode = cy.getElementById(sourceNodeId);
                // var targetNode = cy.getElementById(targetNodeId);
                // if (!sourceNode || !targetNode) {
                // console.error('Source or target node does not exist.');
                // return;
                // }

                // // Get the shortest path between the source and target nodes
                // var aStar = cy.elements().aStar(sourceNode, targetNode, null, function(){}, true);
                // var path = aStar.path;
                // console.log(path);
                // // Highlight the path by adding a class to the elements
                // path.addClass('highlighted');

                // // Define the CSS rule for the highlighted class
                // cy.style()
                // .selector('.highlighted')
                // .style({
                //     'line-color': 'red',
                //     'target-arrow-color': 'red',
                //     'source-arrow-color': 'red',
                //     'background-color': 'red'
                // })
                // .update();

                // var aStar = cy.elements().aStar({ root: "#03,3,1", goal: "#110,0,0" });

                // aStar.path.select();


            }
        }
            addEdgeWithDelay();
        }
        // Start adding nodes with delay
        addNodeWithDelay();
    }
    generateGraph(nodesList, edgesList);


    // Define the CSS rule for the highlighted class
    cy.style()
    .selector('.highlighted')
    .style({
      'background-color': 'red',
      'border-color': 'red'
    })
    .update();
}

const enlargeBtn = document.querySelector('.btn-enlarge');
enlargeBtn.addEventListener('click',()=>{
  let cy = document.querySelector("#cy");
  cy.style.width = "50%";
  cy.style.height = "90vh";
})

main();