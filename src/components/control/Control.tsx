import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "../../store";
import { movePlayer } from "../../store/actions";
import { Direction } from "../../model/direction";

interface ControlProps {
  move: (direction: Direction) => void;
}

function Control({ move }: ControlProps) {
  return (
    <>
      <button onClick={() => move(Direction.UP)} />
      <button onClick={() => move(Direction.LEFT)} />
      <button onClick={() => move(Direction.RIGHT)} />
      <button onClick={() => move(Direction.DOWN)} />
    </>
  )};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  move: (direction: Direction) => {
    dispatch(movePlayer(direction));
  },
});

export default connect(null, mapDispatchToProps)(Control);
