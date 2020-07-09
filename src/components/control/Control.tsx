import { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "../../store";
import { movePlayer } from "../../store/actions";
import { Direction } from "../../model/direction";

interface ControlProps {
  move: (direction: Direction) => void;
}

const handleKeyDownWith = (callback: (direction: Direction) => void) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        callback(Direction.DOWN);
        break;
      case 'ArrowUp':
        callback(Direction.UP);
        break;
      case 'ArrowLeft':
        callback(Direction.LEFT);
        break;
      case 'ArrowRight':
        callback(Direction.RIGHT);
        break;
    }
  }
  return handleKeyDown;
}

const Control = ({ move }: ControlProps) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDownWith(move));
  });
  return null;
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  move: (direction: Direction) => {
    dispatch(movePlayer(direction));
  },
});

export default connect(null, mapDispatchToProps)(Control);
