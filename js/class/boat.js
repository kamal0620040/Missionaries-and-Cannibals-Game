class Boat {
  side = 1; // 1 - left, 0 - right
  constructor(positionOne, positionTwo) {
    this.positionOne = positionOne;
    this.positionTwo = positionTwo;
  }

  isFull() {
    if (this.positionOne != null && this.positionTwo != null) {
      return true;
    }
    return false;
  }

  isEmpty() {
    if (this.positionOne == null && this.positionTwo == null) {
      return true;
    }
    return false;
  }

  moveRight() {
    if (this.side == 1) {
      const boat = document.querySelector(".boat");
      boat.classList.add("boat-right");
      boat.classList.remove("boat-left");
      this.side = 0;
    }
  }

  moveLeft() {
    if (this.side == 0) {
      const boat = document.querySelector(".boat");
      boat.classList.add("boat-left");
      boat.classList.remove("boat-right");
      this.side = 1;
    }
  }
}
