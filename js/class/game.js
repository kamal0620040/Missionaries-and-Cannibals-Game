class Game {
  state = [3, 3, 1];
  goalState = [0, 0, 0];
  nodes = [this.state];
  constructor() {
    this.boat = new Boat(null, null);
  }

  isWinner() {
    if (checkSameContent(this.state, this.goalState)) {
      return true;
    }
    return false;
  }

  resetGame() {
    this.state = [3, 3, 1];
    this.boat.moveLeft();
    this.boat = new Boat(null, null);
    monstors.innerHTML = "";
    monstorsRight.innerHTML = "";
    mans.innerHTML = "";
    mansRight.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      monstors.innerHTML +=
        '<div class="monstor"><img src="assets/monstor.png" /></div>';
      mans.innerHTML += '<div class="man"><img src="assets/man.png" /></div>';
    }
    model.classList.add("hidden");
  }

  isGameOver() {
    const man = this.state[0];
    const monstor = this.state[1];

    if (man < monstor && man > 0) {
      return true;
    }

    if (man > monstor && man < 3) {
      return true;
    }

    return false;
  }

  updateState(oldState) {
    let [oldMan, oldMonstor, op] = [...oldState];
    let [currentMan, currentMonstor, currentBoat] = [...this.state];
    let newArray = [
      currentMan + op * 1 * oldMan,
      currentMonstor + op * 1 * oldMonstor,
      currentBoat + op * 1,
    ];
    this.state = [...newArray];
    this.nodes.push(this.state);
    // hightlight graph
    this.nodes.map(function (node, index) {
      var node = cy.getElementById(String(index) + String(node));
      if (node) {
        node.addClass("highlighted");
      }
    });
  }

  fillBoat(man, monstor, formSide) {
    if (man == 2) {
      positionOne.innerHTML = '<img src="assets/man.png" />';
      this.boat.positionOne = "man";
      positionTwo.innerHTML = '<img src="assets/man.png" />';
      this.boat.positionTwo = "man";

      if (formSide === "left") {
        let fistRemove = mans.children[0];
        let secondRemove = mans.children[1];
        mans.removeChild(fistRemove);
        mans.removeChild(secondRemove);
        this.updateState([man, monstor, -1]);
      } else if (formSide === "right") {
        let fistRemove = mansRight.children[0];
        let secondRemove = mansRight.children[1];
        mansRight.removeChild(fistRemove);
        mansRight.removeChild(secondRemove);
        this.updateState([man, monstor, 1]);
      }
    }
    if (monstor == 2) {
      positionOne.innerHTML = '<img src="assets/monstor.png" />';
      this.boat.positionOne = "monstor";
      positionTwo.innerHTML = '<img src="assets/monstor.png" />';
      this.boat.positionTwo = "monstor";

      if (formSide === "left") {
        let fistRemove = monstors.children[0];
        let secondRemove = monstors.children[1];
        monstors.removeChild(fistRemove);
        monstors.removeChild(secondRemove);
        this.updateState([man, monstor, -1]);
      } else if (formSide === "right") {
        let fistRemove = monstorsRight.children[0];
        let secondRemove = monstorsRight.children[1];
        monstorsRight.removeChild(fistRemove);
        monstorsRight.removeChild(secondRemove);
        this.updateState([man, monstor, 1]);
      }
    }

    if (man == 1 && monstor == 1) {
      positionOne.innerHTML = '<img src="assets/man.png" />';
      this.boat.positionOne = "man";
      positionTwo.innerHTML = '<img src="assets/monstor.png" />';
      this.boat.positionTwo = "monstor";

      if (formSide === "left") {
        let fistRemove = mans.children[0];
        let secondRemove = monstors.children[0];
        mans.removeChild(fistRemove);
        monstors.removeChild(secondRemove);
        this.updateState([man, monstor, -1]);
      } else if (formSide === "right") {
        let fistRemove = mansRight.children[0];
        let secondRemove = monstorsRight.children[0];
        mansRight.removeChild(fistRemove);
        monstorsRight.removeChild(secondRemove);
        this.updateState([man, monstor, 1]);
      }
    }

    if (man == 0 && monstor == 1) {
      // positionOne.innerHTML = '<img src="assets/man.png" />';
      // this.boat.positionOne = "man";
      positionTwo.innerHTML = '<img src="assets/monstor.png" />';
      this.boat.positionTwo = "monstor";

      if (formSide === "left") {
        // let fistRemove = mans.children[0];
        let secondRemove = monstors.children[0];
        // mans.removeChild(fistRemove);
        monstors.removeChild(secondRemove);
        this.updateState([man, monstor, -1]);
      } else if (formSide === "right") {
        // let fistRemove = mansRight.children[0];
        let secondRemove = monstorsRight.children[0];
        // mansRight.removeChild(fistRemove);
        monstorsRight.removeChild(secondRemove);
        this.updateState([man, monstor, 1]);
      }
    }

    if (man == 1 && monstor == 0) {
      positionOne.innerHTML = '<img src="assets/man.png" />';
      this.boat.positionOne = "man";
      // positionTwo.innerHTML = '<img src="assets/monstor.png" />';
      // this.boat.positionTwo = "monstor";

      if (formSide === "left") {
        let fistRemove = mans.children[0];
        // let secondRemove = monstors.children[0];
        mans.removeChild(fistRemove);
        // monstors.removeChild(secondRemove);
        this.updateState([man, monstor, -1]);
      } else if (formSide === "right") {
        let fistRemove = mansRight.children[0];
        // let secondRemove = monstorsRight.children[0];
        mansRight.removeChild(fistRemove);
        // monstorsRight.removeChild(secondRemove);
        this.updateState([man, monstor, 1]);
      }
    }
  }

  emptyBoat(direction) {
    if (this.boat.isEmpty()) {
      return;
    } else {
      if (direction === "right") {
        if (this.boat.positionOne === "man") {
          mansRight.innerHTML +=
            '<div class="man"><img src="assets/man.png" /></div>';
          this.boat.positionOne = null;
          positionOne.innerHTML = "";
        } else if (this.boat.positionOne === "monstor") {
          monstorsRight.innerHTML +=
            '<div class="monstor"><img src="assets/monstor.png" /></div>';
          this.boat.positionOne = null;
          positionOne.innerHTML = "";
        }
        if (this.boat.positionTwo === "man") {
          mansRight.innerHTML +=
            '<div class="man"><img src="assets/man.png" /></div>';
          this.boat.positionTwo = null;
          positionTwo.innerHTML = "";
        } else if (this.boat.positionTwo === "monstor") {
          monstorsRight.innerHTML +=
            '<div class="monstor"><img src="assets/monstor.png" /></div>';
          this.boat.positionTwo = null;
          positionTwo.innerHTML = "";
        }
      } else if (direction === "left") {
        if (this.boat.positionOne === "man") {
          mans.innerHTML +=
            '<div class="man"><img src="assets/man.png" /></div>';
          this.boat.positionOne = null;
          positionOne.innerHTML = "";
        } else if (this.boat.positionOne === "monstor") {
          monstors.innerHTML +=
            '<div class="monstor"><img src="assets/monstor.png" /></div>';
          this.boat.positionOne = null;
          positionOne.innerHTML = "";
        }
        if (this.boat.positionTwo === "man") {
          mans.innerHTML +=
            '<div class="man"><img src="assets/man.png" /></div>';
          this.boat.positionTwo = null;
          positionTwo.innerHTML = "";
        } else if (this.boat.positionTwo === "monstor") {
          monstors.innerHTML +=
            '<div class="monstor"><img src="assets/monstor.png" /></div>';
          this.boat.positionTwo = null;
          positionTwo.innerHTML = "";
        }
      }
    }
  }

  applyAction(action) {
    let [man, monstor, direction] = action.split(",");

    // move - right
    if (direction == 1) {
      if (this.boat.side == 0) {
        alert("The boat is already at right");
      } else {
        this.fillBoat(man, monstor, "left");
        setTimeout(() => {
          this.boat.moveRight();
          setTimeout(() => {
            this.emptyBoat("right");
            if (this.isGameOver()) {
              showModel();
            }
            if (this.isWinner()) {
              alert("YOU Win");
            }
          }, 1000);
        }, 1000);
      }
    } else if (direction == -1) {
      // move - left
      if (this.boat.side == 1) {
        alert("The boat is already at left");
      } else {
        this.fillBoat(man, monstor, "right");
        setTimeout(() => {
          this.boat.moveLeft();
          setTimeout(() => {
            this.emptyBoat("left");
            if (this.isGameOver()) {
              showModel();
            }
            if (this.isWinner()) {
              alert("YOU Win");
            }
          }, 1000);
        }, 1000);
      }
    }
  }
}
