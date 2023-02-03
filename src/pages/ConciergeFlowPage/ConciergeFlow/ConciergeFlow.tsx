import React from "react";
import ConciergeTabs from "./ConciergeTabs";
import "./conciergeFlow.scss";
// import Discovery from "../../Discovery/Discovery";
import MovingImage from "../../../Assets/images/ConciergeFlow/Moving.svg";
import WorkflowButton from "../WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CommonAction from '../../../store/common/actions';
// import MoversStep1 from "../../Movers/MoversStep1";
// import MoversStep2 from "../../Movers/MoversStep2";
// import MoversStep3 from "../../Movers/MoversStep3";
// import MoversStep4 from "../../Movers/MoversStep4";
// import MoversStep5 from "../../Movers/MoversStep5";
// import InsuranceStep1 from "../../Insurance/InsuranceStep1";
// import InsuranceStep2 from "../../Insurance/InsuranceStep2";
// import InsuranceStep3 from "../../Insurance/InsuranceStep3";
// import InsuranceStep4 from "../../Insurance/InsuranceStep4";
// import InsuranceStep5 from "../../Insurance/InsuranceStep5";
// import InsuranceStep6 from "../../Insurance/InsuranceStep6";
// import SecurityStep1 from "../../Security/SecurityStep1";
// import SecurityStep2 from "../../Security/SecurityStep2";
// import SecurityStep3 from "../../Security/SecurityStep3";
// import InternetStep1 from "../../InternetAndCable/InternetStep1";
// import InternetStep2 from "../../InternetAndCable/InternetStep2";
// import InternetStep3 from "../../InternetAndCable/InternetStep3";
// import InternetStep4 from "../../InternetAndCable/InternetStep4";
// import InternetStep5 from "../../InternetAndCable/InternetStep5";
// import InternetStep6 from "../../InternetAndCable/InternetStep6";

type InitialProps = {
  history: any;
  commonState ? : any;
commonAction?:any
};

type InitialState = {
  tabName: string;
  tabId: number;
  destinationZip:string;
  destination_full_address:string;
  // moversStepActive: number;
  // moversStepTotal: number;
  // insuranceStepActive: number;
  // insuranceStepTotal: number;
  // securityStepActive: number;
  // securityStepTotal: number;
  // internetStepActive: number;
  // internetStepTotal: number;
};

class ConciergeFlow extends React.Component<InitialProps, InitialState> {
  state: InitialState = {
    tabName: "",
    destinationZip:'',
    destination_full_address:'',
    tabId: 0,
    // moversStepActive: 1,
    // moversStepTotal: 5,
    // insuranceStepActive: 1,
    // insuranceStepTotal: 6,
    // securityStepActive: 1,
    // securityStepTotal: 3,
    // internetStepActive: 1,
    // internetStepTotal: 6,
  };

  componentDidMount(){

    if (
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move.length > 0 &&
      this.props.commonState.move[0]
  ) {
      const data =
          this.props.commonState &&
          this.props.commonState.move &&
          this.props.commonState.move.length > 0 &&
          this.props.commonState.move[0];
      const dest: any = data && data.destination;
      this.setState({
          destinationZip: dest && dest.zip_code,
          destination_full_address: data && data.destination_full_address,
          
      });
  }

}

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    // if (prev.moveAddress !== cur.moveAddress && cur.moveAddress) {
    //     this.props.commonAction.moveGet();
    // }

    if (prev.move !== cur.move && cur.move && cur.move[0]) {
        this.setState({
         destinationZip:cur.move[0].destination && cur.move[0].destination.zip_code,
         destination_full_address:cur.move[0].destination_full_address
        });
    }
}

  tabHandler = (item: any) => {
  
    this.setState({
      tabName: item.name,
      tabId: item.id,
    });
  };

  // handleWorkflow = () => {
  //   if (this.state.tabName == "") {
  //     this.setState({ tabName: "Discovery", tabId: this.state.tabId + 1 });
  //   }
  //   if (this.state.tabName == "Discovery") {
  //     this.setState({ tabName: "Movers", tabId: this.state.tabId + 1 });
  //   }
  //   if (this.state.tabName == "Movers") {
  //     if (this.state.moversStepActive === this.state.moversStepTotal) {
  //       this.setState({
  //         tabName: "Insurance",
  //         tabId: this.state.tabId + 1,
  //         moversStepActive: this.state.moversStepActive,
  //       });
  //     } else {
  //       this.setState({
  //         tabName: "Movers",
  //         tabId: this.state.tabId,
  //         moversStepActive: this.state.moversStepActive + 1,
  //       });
  //     }
  //   }
  //   if (this.state.tabName == "Insurance") {
  //     if (this.state.insuranceStepActive === this.state.insuranceStepTotal) {
  //       this.setState({
  //         tabName: "Security",
  //         tabId: this.state.tabId + 1,
  //         insuranceStepActive: this.state.insuranceStepActive,
  //       });
  //     } else {
  //       this.setState({
  //         tabName: "Insurance",
  //         tabId: this.state.tabId,
  //         insuranceStepActive: this.state.insuranceStepActive + 1,
  //       });
  //     }
  //   }

  //   if (this.state.tabName == "Security") {
  //     if (this.state.securityStepActive === this.state.securityStepTotal) {
  //       this.setState({
  //         tabName: "Int/Cable",
  //         tabId: this.state.tabId + 1,
  //         securityStepActive: this.state.securityStepActive,
  //       });
  //     } else {
  //       this.setState({
  //         tabName: "Security",
  //         tabId: this.state.tabId,
  //         securityStepActive: this.state.securityStepActive + 1,
  //       });
  //     }
  //   }

  //   if (this.state.tabName == "Int/Cable") {
  //     if (this.state.internetStepActive === this.state.internetStepTotal) {
  //       this.setState({
  //         tabName: "Utilities",
  //         tabId: this.state.tabId + 1,
  //         internetStepActive: this.state.internetStepActive,
  //       });
  //     } else {
  //       this.setState({
  //         tabName: "Int/Cable",
  //         tabId: this.state.tabId,
  //         internetStepActive: this.state.internetStepActive + 1,
  //       });
  //     }
  //   }
  // };
  // handleNoShow = () => {
  //   if (this.state.tabName == "Discovery") {
  //     this.setState({ tabName: "", tabId: this.state.tabId - 1 });
  //   }
  //   if (this.state.tabName == "Movers") {
  //     if (this.state.moversStepActive === 1) {
  //       this.setState({
  //         tabName: "Discovery",
  //         tabId: this.state.tabId - 1,
  //         moversStepActive: this.state.moversStepActive,
  //       });
  //     } else {
  //       this.setState({
  //         tabName: "Movers",
  //         tabId: this.state.tabId,
  //         moversStepActive: this.state.moversStepActive - 1,
  //       });
  //     }
  //   }
  //   if (this.state.tabName == "Insurance") {
  //     if (this.state.insuranceStepActive === 1) {
  //       this.setState({
  //         tabName: "Movers",
  //         tabId: this.state.tabId - 1,
  //         insuranceStepActive: this.state.insuranceStepActive,
  //       });
  //     } else {
  //       this.setState({
  //         tabName: "Insurance",
  //         tabId: this.state.tabId,
  //         insuranceStepActive: this.state.insuranceStepActive - 1,
  //       });
  //     }
  //   }
  //   if (this.state.tabName == "Security") {
  //     if (this.state.securityStepActive === 1) {
  //       this.setState({
  //         tabName: "Insurance",
  //         tabId: this.state.tabId - 1,
  //         securityStepActive: this.state.securityStepActive,
  //       });
  //     } else {
  //       this.setState({
  //         tabName: "Security",
  //         tabId: this.state.tabId,
  //         securityStepActive: this.state.securityStepActive - 1,
  //       });
  //     }
  //   }
  //   if (this.state.tabName == "Int/Cable") {
  //     if (this.state.internetStepActive === 1) {
  //       this.setState({
  //         tabName: "Security",
  //         tabId: this.state.tabId - 1,
  //         internetStepActive: this.state.internetStepActive,
  //       });
  //     } else {
  //       this.setState({
  //         tabName: "Int/Cable",
  //         tabId: this.state.tabId,
  //         internetStepActive: this.state.internetStepActive - 1,
  //       });
  //     }
  //   }
  // };

  render() {
    let userType:string=''
    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.user &&
      this.props.commonState.user.user_type ) {
  userType = this.props.commonState.user.user_type;
 
    }


    const rowData=this.props && this.props.history && this.props.history.location && this.props.history.location.state
   
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            tabHandler={this.tabHandler}
            tabName={this.state.tabName}
            tabId={this.state.tabId}
            history={this.props.history}
            rowData={rowData}
           
          />
        </div>
        <div className="">
          <div className="">
            {this.state.tabName == "" ? (
              <div className="conciergeImageDiv">
                <img src={MovingImage} className="conciergeImage" />
              </div>
            ) : null}
            {/* {this.state.tabName == "Discovery" ? (
              // <Discovery />
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/discovery",
               
              })
            ) : this.state.tabName == "Movers" ? (
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/moversstep1",
               
              })
            ) : this.state.tabName == "Insurance" ? (
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/internetstep1",
               
              })
            ) : this.state.tabName == "Security" ? (
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/securitystep1",
               
              })
            ) : this.state.tabName == "Int/Cable" ? (
              this.props.history.push({
                pathname: "/dashboard/concierge/workflow/internetstep1",
               
              })
            ) :null } */}
          </div>
          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={
                this.state.tabName === "" || this.state.tabName === "Discovery"
                  ? "No-show"
                  : "Back"
              }
              buttonText2={
                this.state.tabName === "" || this.state.tabName === "Discovery"
                  ? "Start workflow"
                  : "Next"
              }
              buttonStartLogo1={
                this.state.tabName === "" ||
                this.state.tabName === "Discovery" ? (
                  ""
                ) : (
                  <ArrowBackIcon />
                )
              }
              buttonStartLogo2={<ArrowForwardIcon />}
              ButtonOnClick1={()=> this.props.history.push({
                pathname: "/dashboard/concierge/workflow",
              })}
              ButtonOnClick2={ () => this.props.history.push({
                pathname: "/dashboard/concierge/workflow/discovery",
              })}
            button2Disabled={!(this.state.destinationZip && this.state.destination_full_address) ? true : userType=='Home Security Expert'? true : false}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
      commonAction: bindActionCreators(CommonAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConciergeFlow);
