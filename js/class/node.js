class Node {
  goalState = [0, 0, 0];

  constructor(state, parent, action, depth) {
    this.parent = parent;
    this.state = state;
    this.action = action;
    this.depth = depth;
  }

  isKilled() {
    const missionaries = this.state[0];
    const canniabls = this.state[1];

    if (missionaries < canniabls && missionaries > 0) {
      return true;
    }

    if (missionaries > canniabls && missionaries < 3) {
      return true;
    }

    return false;
  }

  isGoalState() {
    if (checkSameContent(this.state, this.goalState)) {
      return true;
    }
    return false;
  }

  isValid() {
    let missionaries = this.state[0];
    let canniabls = this.state[1];
    let boat = this.state[2];

    if (missionaries < 0 || missionaries > 3) {
      return false;
    }

    if (canniabls < 0 || canniabls > 3) {
      return false;
    }

    if (boat > 1 || boat < 0) {
      return false;
    }

    return true;
  }

  generateChild() {
    let children = [];
    let depth = this.depth + 1;
    let op = -1;
    if (this.state[2] == 0) {
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
        if (x + y >= 1 && x + y <= 2) {
          children.push(newNode);
        }
      }
    }

    return children;
  }
}
