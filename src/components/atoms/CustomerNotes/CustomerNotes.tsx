import React, { Component } from "react";
import "./CustomerNotes.scss";
import NotesImg from "../../../Assets/images/Leftcolumn/CustomerNotes.svg";

type initialProps = {
  day: any;
  date: any;
  notes: any;
};

export class CustomerNotes extends Component<initialProps> {
  render() {
    return (
      <div className="CustomerNotesCard">
        <div className="CustomerCardContent">
          <img src={NotesImg} className="NotesImg" />
          <div className="DateWrap">
            <div className="DateContent">{this.props.day}</div>
            <div className="DateContent">{this.props.date}</div>
          </div>
        </div>
        <div className="CustomerNotes">{this.props.notes}</div>
      </div>
    );
  }
}

export default CustomerNotes;
