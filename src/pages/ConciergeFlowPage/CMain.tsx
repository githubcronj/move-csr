import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TabsMain from "./CMainTab";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LeftPanel from "../../components/LeftPanel/LeftPanel";
import "./CMain.scss";
import ConciergeFlow from "./ConciergeFlow/ConciergeFlow";
import CreateIcon from "@material-ui/icons/Create";
import * as CommonAction from "../../store/common/actions";

type InitialProps = {
  history: any;
  commonAction: any;
  commonState: any;
};

type InitialState = {
  isLeftPanelOpen: boolean;
  moveData: any;
};

class CMain extends React.Component<InitialProps, InitialState> {
  state: InitialState = {
    isLeftPanelOpen: false,
    moveData: [],
  };

  componentDidMount() {
    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({ moveData: this.props.commonState.move });
    }
    // this.props.commonAction.moveGet();
  }

  componentDidUpdate(prevProps: any) {
    let prev: any = prevProps.commonState;
    let cur: any = this.props.commonState;
    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      this.setState({ moveData: this.props.commonState.move });
    }
  }
  //   public static getDerivedStateFromProps(nextProps: InitialProps, currentState: InitialState) {
  //     // if(nextProps && nextProps.commonState && nextProps.commonState.move[0] && nextProps.commonState.isGetMove) {
  //     //   // console.log("nextProps", nextProps.commonState.move[0])
  //     //   nextProps.commonState.isGetMove = false;
  //     //   currentState.moveData = nextProps.commonState.move;
  //     // }

  //     return currentState;
  // }

  render() {
    console.log("inside");
    return (
      <div className="conciergeFlowMainPage">
        {/* <div className="conciergeFlexDiv">
          <div className="conciergeLeftDiv">
            <div className="Candidate">
            <div className="ShortForm">{this.state.moveData && this.state.moveData[0] && this.state.moveData[0].user_ref ? this.state.moveData[0].user_ref.first_name.charAt(0) + this.state.moveData[0].user_ref.last_name.charAt(0) : ""}</div>
            <div className="CandidateName">
              <div className="CustomerOverview">{this.state.moveData && this.state.moveData[0] && this.state.moveData[0].user_ref ? `${this.state.moveData[0].user_ref.first_name} ${this.state.moveData[0].user_ref.last_name}` : ""}</div>
              <div className="CustomerContact">
                Primary Contact
                  <div className="BtnStyle">Edit
                  <span>
                <CreateIcon className="EditImg" />
              
                </span>
                </div>
              </div>
            </div>
            <div className="ellipse ellipsecolor">
              4
            </div>
            <div className="ellipse icon-div">
              {this.state.isLeftPanelOpen ? <ChevronLeftIcon onClick={() => this.setState({isLeftPanelOpen: false})} /> : <ChevronRightIcon onClick={() => this.setState({isLeftPanelOpen: true})} />} 
            </div>
          </div>
          </div>
          <div className="conciergeMainTabDiv">
            <TabsMain />
          </div>
        </div> */}
        {/* <div className="conciergeFlexDiv">
          {this.state.isLeftPanelOpen ? (
            <div className="leftPanelDiv">
              <LeftPanel moveData={this.state.moveData} />
            </div>
          ) : null}
          <div className={this.state.isLeftPanelOpen ? "conciergeRightContentDiv": "conciergeRightContentDiv-fullWidth"}>
            <ConciergeFlow history={this.props.history} />
          </div>
        </div> */}
        <ConciergeFlow history={this.props.history} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CMain);
