import React from 'react';
import ItemView, {ItemProps} from "./Item";
import RootState from "../../store/rootState";
import { connect } from "react-redux";


const Inventory = (itemProps: ItemProps[]) => {
    return (
        <div className="inventory">
            Inventory
            {/*{itemProps.map(item => (*/}
            {/*    <ItemView {...item}/>*/}
            {/*))}*/}
            <ItemView {...itemProps[0]}/>
        </div>
    )
};

const mapStateToProps = ({ items }: RootState) => ({
    itemProps: items.inventoryItems
  });
  
export default connect(mapStateToProps)(Inventory);
