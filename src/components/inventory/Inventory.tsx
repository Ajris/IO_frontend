import React from 'react';
import ItemView, {ItemProps} from "./Item";
import RootState from "../../store/rootState";
import { connect } from "react-redux";

const Inventory = (itemProps: ItemProps[]) => {
    return (
        <div className="inventory">
            Inventory
            {/* {Array.from(itemProps).forEach(item => <ItemView {...item}/>)} */}
            {/*{itemProps.forEach(item => <ItemView {...item}/>)}*/}
            <ItemView {...itemProps[0]}/>
        </div>
    )
};

const mapStateToProps = ({ inventoryItems }: RootState) => ({
    itemProps: inventoryItems
  });
  
export default connect(mapStateToProps)(Inventory);
