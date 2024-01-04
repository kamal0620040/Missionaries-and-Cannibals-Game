let options = {
  name: "breadthfirst",
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
  animateFilter: function (node, i) {
    return true;
  }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  ready: undefined, // callback on layoutready
  stop: undefined, // callback on layoutstop
  transform: function (node, position) {
    return position;
  },
};

function generateGraph(nodes, edges) {
  var smallDelay = 10; // Delay between each node addition (in milliseconds)
  var delay = 10; // Delay between each node addition (in milliseconds)
  var i = 0;

  // Add nodes to the graph with a delay
  function addNodeWithDelay() {
    if (i < nodes.length) {
      cy.add({ ...nodes[i], style: { visibility: "hidden" } });
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
        if (
          sourceNode.connectedEdges().length > 0 ||
          targetNode.connectedEdges().length > 0
        ) {
          // If either source or target node is connected to an edge, make them visible
          sourceNode.style("visibility", "visible");
          targetNode.style("visibility", "visible");
        }

        j++;
        cy.layout(options).run();
        setTimeout(addEdgeWithDelay, 1000);
      } else {
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
