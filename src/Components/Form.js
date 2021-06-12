import React, { Component } from 'react'
import { connect } from "react-redux"
import * as actions from "../actions/formActions";
import { bindActionCreators } from "redux"
import "../Styles/Form.scss";
import {IoAddCircleSharp,AiOutlineForm} from "react-icons/all"
class Form extends Component {
    state = {
        ...this.returnStateObject()
    }

    returnStateObject() {
        if (this.props.currentIndex == -1) {
            return {
                
                startService: "",
                endService: "",
                pcode: "",
                qty: "",
                place: "",
                dpfirst: "",
                dpsecond: "",
                dpthird: "",
                dpfourth: "",
                mdfirst: "",
                mdsecond: "",
                mdthird: "",
                mdfourth: "",
                ndc: "",
                ndcQty: "",
                amount: "",
                email: "",
                tel: ""
            
                }
        }
        else {
            return this.props.list[this.props.currentIndex]
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.currentIndex != this.props.currentIndex || prevProps.list.length != this.props.list.length)
            this.setState({ ...this.returnStateObject() })
    }
    inputEvent = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleAddButton = (e) => {
        e.preventDefault();
        if (this.props.currentIndex == -1) {
            this.props.insertData(this.state)
        }
        else {
            this.props.updateData(this.state)
        }
    }

    render() {
        return (
            <>
            <div className="header"><h3>Entry Form</h3></div>
            <div className="Form-wrapper">
                <h4 className="heading"> <AiOutlineForm />Detail  Information</h4>
                <form onSubmit={this.handleAddButton} autoComplete="off" className="form-container" >

                    <label className="inputlabel">
                        start of service :
                    <input type="date" className="data-filed" required value={this.state.startService} name="startService" onChange={this.inputEvent} />
                    </label>
                    <label className="inputlabel">
                        end of service:
                    <input type="date" className="data-filed" required value={this.state.endService} name="endService" onChange={this.inputEvent} />
                    </label>
                    <label className="inputlabel">
                        procedure code:
                    <input type="text" className="data-filed" value={this.state.pcode} name="pcode" onChange={this.inputEvent} required />
                    </label>
                    <label className="inputlabel">
                        Qty:
                    <input type="number" className="data-filed" value={this.state.qty} name="qty" onChange={this.inputEvent} required />
                    </label>
                    <label className="inputlabel">
                        place of service:
                    <input type="text" className="data-filed" value={this.state.place} name="place" onChange={this.inputEvent} required />
                    </label>
                    <label className="inputlabel">
                        NDC qty:
                    <input type="text" className="data-filed" value={this.state.ndcQty} name="ndcQty" onChange={this.inputEvent} />
                    </label >
                    <label className="inputlabel-f">
                        <h4>Diagnoisis Pointers</h4>
                        <div className="data-f">
                            <label className="input-f">
                                DP 1:
                             <input type="number" className="data-filed" value={this.state.dpfirst} name="dpfirst" onChange={this.inputEvent} required />
                            </label>
                            <label className="input-f">
                                DP 2:
                             <input type="number" className="data-filed" value={this.state.dpsecond} name="dpsecond" onChange={this.inputEvent} />
                            </label>
                            <label className="input-f">
                                DP 3:
                             <input type="number" className="data-filed" value={this.state.dpthird} name="dpthird" onChange={this.inputEvent} />
                            </label>

                            <label className="input-f">
                                DP 4:
                             <input type="number" className="data-filed" value={this.state.dpfourth} name="dpfourth" onChange={this.inputEvent} />
                            </label>
                        </div>


                    </label>

                    <label className="inputlabel-f">
                        <h4>Modifiers</h4>
                        <div className="data-f">
                            <label className="input-f">
                                MD1:
                    <input type="text" className="data-filed" value={this.state.mdfirst} name="mdfirst" onChange={this.inputEvent} />
                            </label>
                            <label className="input-f">
                                Md2:
                    <input type="text" className="data-filed" value={this.state.mdsecond} name="mdsecond" onChange={this.inputEvent} />
                            </label>
                            <label className="input-f">
                                Md3:
                    <input type="text" className="data-filed" value={this.state.mdthird} name="mdthird" onChange={this.inputEvent} />
                            </label>
                            <label className="input-f">
                                Md4:
                    <input type="text" className="data-filed" value={this.state.mdfourth} name="mdfourth" onChange={this.inputEvent} />
                            </label>
                        </div>

                    </label>
                    <label className="inputlabel">
                        NDC code:
                    <input type="text" className="data-filed" value={this.state.ndc} name="ndc" onChange={this.inputEvent} />
                    </label>
                   
                    <label className="inputlabel">
                        Provider email address:
                    <input type="email" className="data-filed" required value={this.state.email} name="email" onChange={this.inputEvent} />
                    </label>
                    <label className="inputlabel">
                        Provider Phone:
                    <input type="tel" className="data-filed" required value={this.state.tel} name="tel" onChange={this.inputEvent} />
                    </label>
                    
                    <label className="inputlabel">
                        Billing Amount:<br />
                    $<input type="tel" className="data-filed" required value={this.state.amount} name="amount" onChange={this.inputEvent} />
                    </label>
                    <div className="form-btn">
                    <button type="submit" className="btn" >Add<IoAddCircleSharp /></button>
                    </div>
                </form>
            </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.list,
        currentIndex: state.currentIndex
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        insertData: actions.insert,
        updateData: actions.update
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Form);