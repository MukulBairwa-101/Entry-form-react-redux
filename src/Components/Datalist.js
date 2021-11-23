import React, { Component } from "react";
import Form from "./Form";
import { GrFormEdit, MdDelete } from "react-icons/all";
import { connect } from "react-redux";
import * as actions from "../actions/formActions";
import { bindActionCreators } from "redux";
import { GoSearch } from "react-icons/all";
import "../Styles/Datalist.scss";

class Datalist extends Component {
  state = {
    filter: "",
    searchTerm:false,
    calculatedAmount: "",
    currentData: this.props.list,
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.searchTerm) {
      return {
        calculatedAmount: props.list.reduce(function (accumulator, item) {
          return parseInt(accumulator) + parseInt(item.amount);
        }, 0),
        currentData: props.list,
      };
    }
    return null;
  }

  handleEdit = (index) => {
    this.props.updateDataIndex(index);
  };
  handleDelete = (index) => {
    this.props.deleteData(index);
  };

  onChange = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };
  onSearch = () => {
    const newData = this.state.currentData.filter(
      (data) => data.pcode === this.state.filter
    );

    this.setState({
      currentData: newData,
      calculatedAmount: newData.reduce(function (accumulator, item) {
        return parseInt(accumulator) + parseInt(item.amount);
      }, 0),
      searchTerm: true
    });
  };

  render() {
    // console.log("filer state", this.state.filter)
    // console.log(typeof this.state.calculatedAmount);
    return (
      <div className="list-container">
        <Form />
        <div className="search-box">
          <input
            type="text"
            autoComplete="off"
            placeholder="Search with Procedure code.."
            className="input"
            name="search"
            value={this.state.search}
            onChange={this.onChange}
          />
          <button type="submit" className="search-icon" onClick={this.onSearch}>
            <GoSearch />
          </button>
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

          {this.state.currentData &&
            this.state.currentData.map((item, index) => (
              <tr key={index} className="heading-row">
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    id={item.index}
                    name="checkbox"
                    value="item"
                  />
                </td>
                <td></td>
                <td>{`(${item.startService}) - (${item.endService})`}</td>
                <td>{item.pcode}</td>
                <td>{item.qty}</td>
                <td>{`${item.dpfirst},${item.dpsecond}`}</td>
                <td>{`${item.mdfirst},${item.mdsecond}`}</td>
                <td>{item.amount}</td>
                <td>
                  <button
                    onClick={() => this.handleEdit(index)}
                    className="data-btn"
                  >
                    <GrFormEdit className="edit" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(index)}
                    className="data-btn"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          <tr className="last-row">
            <td>TOTAL</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{this.state.calculatedAmount}</td>
          </tr>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateDataIndex: actions.updateIndex,
      deleteData: actions.Delete,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
