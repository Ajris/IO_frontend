import React from "react";
import { connect } from "react-redux";
import MapRow from "./MapRow";
import { Tile } from "../../model/tile";
import RootState from "../../store/rootState";

interface MapProps {
  gameMap: Tile[][]
}

const Map = ({ gameMap }: MapProps) => {
    return (
    <div className="map">
      {gameMap.map(row => <MapRow tiles={row} />)}
    </div>
    )
}

const mapStateToProps = ({ gameMap }: RootState) => ({
  gameMap: gameMap
});

export default connect(mapStateToProps)(Map);
