import React, { Component } from 'react'
import Form from './Form'
import { GrFormEdit, MdDelete ,GoSearch} from "react-icons/all"
import { connect } from "react-redux"
import * as actions from "../actions/formActions";
import { bindActionCreators } from "redux"
import "../Styles/Datalist.scss";

class Datalist extends Component {

    handleEdit = (index) => {
        this.props.updateDataIndex(index)
    }
    handleDelete = (index) => {
        this.props.deleteData(index)
    }
    // onSearch=()=>{
    //  this.props.list.filter(pcode =>)   
    // }

    render() {
        return (
            <div className="list-container">
                <Form /> <hr />
                <div className="search-box">
                    <input type="text" placeholder="Search with Procedure code.." className="input" />
                    <button type="submit" className="search-icon"  ><GoSearch /></button>
                </div>
                <table className="table-box">

                    <tr className="heading-row">
                        <th></th>
                        <th>Line</th>
                        <th>Dates of Service</th>
                        <th>Procedure code</th>
                        <th>Qty</th>
                        <th>Diagnosis Pointers</th>
                        <th>Modifiers</th>
                        <th>Billed Amount</th>

                    </tr>
                    
                       { this.props.list.map((item, index) => {
                            return (
                               <> 
                                <tr key={index} className="heading-row">
                                    <td> <input type="checkbox" id={item.index} name="checkbox" value="item" /></td>
                                    <td>{1}</td>
                                    <td>{`(${item.startService}) - (${item.endService})`}</td>
                                    <td>{item.pcode}</td>
                                    <td>{item.qty}</td>
                                    <td>{`${item.dpfirst},${item.dpsecond}`}</td>
                                    <td>{`${item.mdfirst},${item.mdsecond}`}</td>
                                    <td>{item.amount}</td>
                                    <td><button onClick={() => this.handleEdit(index)} className="data-btn" ><GrFormEdit className="edit" /></button></td>
                                    <td><button onClick={() => this.handleDelete(index)} className="data-btn" ><MdDelete /></button></td>
                                    
                                </tr>
                               
                                </>

                            )
                        })
                    }
                </table>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.list
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateDataIndex: actions.updateIndex,
        deleteData: actions.Delete

    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Datalist);