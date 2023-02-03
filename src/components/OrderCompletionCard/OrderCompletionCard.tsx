import React, { Component } from "react";
import "./OrderCompletionCard.scss";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import Button from "../atoms/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { type } from "os";

type initialProps = {
  OrderSaveHandler: any;
  installationDate?: any;
  handleSelect?: any;
  orderDetails?: any;
  onChangeOrderDetails?: any;
  orderError?: any;
  installationError?: any;
  id?: string;
  onImagePaste?: any;
  // anchorEl: any;
};

type initialState = {};

export class OrderCompletionCard extends Component<initialProps, initialState> {
  render() {
    return (
      <div className="OrderCompletionCardDiv">
        <div className="ConfirmationDetailsDiv">
          <span className="ConfirmationLabel">Enter Order Number</span>

          <CustomizedInput
            onChange={(e: any) => {
              this.props.onChangeOrderDetails(e);
            }}
            label="Enter order number…"
            value={this.props.orderDetails}
            error={this.props.orderError}
          />
          {this.props.orderError ? (
            <div className="error">Enter Valid Order Number</div>
          ) : null}
        </div>
        <div className="ConfirmationDetailsDiv">
          <span className="ConfirmationLabel">Enter installation date</span>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              // variant="inline"
              // ampm={true}
              label="Enter installation date…"
              value={this.props.installationDate}
              onChange={(e: any) => {
                this.props.handleSelect(e);
              }}
              // hidden
              InputLabelProps={{
                shrink: true,
              }}
              className="CustomDate"
              disablePast
              format="MM/dd/yyyy"
            />
          </MuiPickersUtilsProvider>

          {/* <CustomizedInput
            label="Enter installation date…"
            onChange={(e: any) => {
              this.props.handleSelect(e);
            }}
            value={this.props.installationDate}
            type="date"
            InputProps={{
              inputProps: { min: new Date().toLocaleString().split("T")[0] },
            }}
            InputLabelProps={{
              shrink: true,
            }}
            error={this.props.installationError}
          /> */}
        </div>
        <div className="ConfirmationDetailsDiv">
          <span className="ConfirmationLabel">
            Paste Confirmation Image Here
          </span>
          <div
            className="inputFileDiv"
            id={this.props.id}
            contentEditable="true"
            onPaste={(e: any) => {
              let currentTarget = document.querySelector(`#${this.props.id}`);
              if (e.clipboardData.files.length > 0) {
                // if (
                //   e.clipboardData.files[0].type.startWith(
                //     "image/"
                //   )
                // ) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(e.clipboardData.files[0]);
                fileReader.onload = () => {
                  if (currentTarget && currentTarget !== null) {
                    currentTarget.innerHTML = `<img src="${fileReader.result}" />`;
                  }
                  let name: string = "";
                  if (this.props.id === "internet1") {
                    name = "image";
                  } else if (this.props.id === "internet2") {
                    name = "image1";
                  } else if (this.props.id === "internet3") {
                    name = "image2";
                  }
                  this.props.onImagePaste(name, fileReader.result);

                  // this.setState({
                  //   electricityImage: fileReader.result,
                  // });
                };
                // }
              }
            }}
          >
            {/* {item.provider_type === "Electricity" ? (
                                  this.state.electricityImage ? (
                                    <img src={this.state.electricityImage} />
                                  ) : null
                                ) : this.state.gasImage ? (
                                  <img src={this.state.gasImage} />
                                ) : null} */}
          </div>
        </div>
        {/* {
          this.props.installationError ? <div className="error">
          Please Choose Installation Date
        </div> : null
        } */}
        <div className="OrderSaveButton">
          <Button onClick={this.props.OrderSaveHandler}>Save</Button>
        </div>
      </div>
    );
  }
}

export default OrderCompletionCard;
