let cy = cytoscape({
  container: document.getElementById("cy"), // container to render in

  style: [
    // the stylesheet for the graph
    {
      selector: "node",
      style: {
        shape: "ellipse",
        width: 60, // Set the desired width of the rectangle
        height: 30, // Set the desired height of the rectangle
        color: "white",
        "background-color": "black", // Set the desired background color
        "border-color": "teal", // Set the desired border color
        "border-width": 2, // Set the desired border width
        label: "data(label)", // Set the node's label to its ID
        "text-valign": "center", // Center the label vertically
        "text-halign": "center", // Center the label horizontally
      },
    },

    {
      selector: "edge",
      style: {
        width: 3,
        label: "data(label)",
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
      },
    },
  ],

  //   layout: {
  //     name: 'grid',
  //     rows: 1
  //   }
  layout: {
    name: "breadthfirst",
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
    animateFilter: function (node, i) {
      return true;
    }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position) {
      return position;
    },
  },
});
