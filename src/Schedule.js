import React, {Component} from "react";
import "./Schedule.css";

export default class Schedule extends Component{
    constructor(props){
        super(props);
        this.state={showStatus: "d-none"}
    }

    handleOnClick=()=>{
        this.setState((prevState)=>({
            showStatus: !prevState.showStatus
        }))
    }

    render(){
        var schedule="";
        if (this.props.placeSchedule){
            const open=this.props.placeSchedule.weekday_text.map((hours, index)=>{
                return(
                    <div className="row" key={index}>
                        {hours}
                    </div>
                );
            })
            schedule=
                <div className="row">
                    <div id="schedule" className="col-4 text-center"><a className="text-decoration-none text-white font-weight-bold hover" href="#schedule" onClick={this.handleOnClick}>Horario</a></div>
                    <div className={"col-8 "+(this.state.showStatus ? "d-none" : "d-block")}>{open}</div>
                </div>
        }
        else{
            schedule=
                <div className="row">
                    <div className="font-weight-bolder">No se encuentraron resultados de horarios disponibles</div>
                </div>
        }

        return(
            <div className="m-2 mt-4 p-3 bg-dark shadow rounded text-white">
                {schedule}
            </div>
        )
    }
}