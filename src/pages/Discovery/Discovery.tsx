import React from "react";
import "./discovery.scss";
import InfoIcon from "@material-ui/icons/Info";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
// import Discovery from "../../Discovery/Discovery";
import * as Action from "../../store/common/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CircularProgress } from "@material-ui/core";

type initialProps = {
  history?: any;
  commonAction: any;
  commonState: any;
};

type initialState = {
  listContent: any;
  closed: boolean;
  isDataArrived: boolean;
  hintContent: string;
  loader: boolean;
};

class Discovery extends React.Component<initialProps, initialState> {
  state: initialState = {
    listContent: [],
    closed: false,
    hintContent: "",
    isDataArrived: true,
    loader: true,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "",
      page: 1,
    });
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.scriptDataArrived
    ) {
      nextProps.commonState.scriptDataArrived = false;
      let points: any = [];
      let hintContent: any = [];
      let hintPara: string = "";
      // nextProps.commonState.script.map((item: any) => {
      //   if (item.page_number === 1) {
      // points.push(item.script_content)
      points =
        nextProps.commonState.script &&
        nextProps.commonState.script.script_content &&
        nextProps.commonState.script.script_content.split("|");
      if (
        nextProps.commonState.script &&
        nextProps.commonState.script.hint_content
      ) {
        hintContent.push(nextProps.commonState.script.hint_content);
      }
      //   }
      // });

      hintContent.map((hint: any) => {
        hintPara = hintPara + " " + hint;
      });

      currentState.hintContent = hintPara;
      currentState.listContent = points;
      currentState.loader = false;
    }

    return currentState;
  }

  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            // tabHandler={this.tabHandler}
            tabName={"Discovery"}
            tabId={1}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            {/* {this.state.tabName == "" ? (
              <div className="conciergeImageDiv">
                <img src={MovingImage} className="conciergeImage" />
              </div>
            ) : null} */}
            <div className="discovery-main">
              <div className="discovery-heading">
                <div className="discovery">Discovery </div>
                <div>
                  <div className="titleNumber">1</div>
                </div>
              </div>
              {this.state.loader === true ? <CircularProgress /> : null}
              {this.state.closed == false &&
              this.state.hintContent &&
              this.state.hintContent !== " " ? (
                <div className="helpful-div">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}
              {this.state.listContent &&
                this.state.listContent.map((item: any) => {
                  return (
                    <div className="point-content-wrapper">
                      <div className="points-div">
                        <div className="outer-point">
                          <div className="inner-point"></div>
                        </div>
                        <div className="vertical-line"></div>
                      </div>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: item,
                        }}
                        className="point-content"
                      ></div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch: any) {
  return {
    commonAction: bindActionCreators(Action, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);
