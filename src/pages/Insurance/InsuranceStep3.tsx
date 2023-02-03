import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./InsuranceStep3.scss";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import CustomizedSelect from "../../components/atoms/CustomizedSelect";
import InputAdornment from "@material-ui/core/InputAdornment";
import MoversInputs from "../../components/Movers/Inputs/MoverInputs";
import HomeSize from "../../Assets/images/Movers/sizeHome.svg";
import HomeType from "../../Assets/images/Movers/typeHome.svg";
import Stories from "../../Assets/images/Movers/stories.svg";
import heatingSystem from "../../Assets/images/Movers/heatingSystem.svg";
import Pool from "../../Assets/images/Movers/Insurance Pool.svg";
import Roof from "../../Assets/images/Movers/Insurance Roof.svg";
import Build from "../../Assets/images/Movers/Insurance Build.svg";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { validateYear } from "../../utils/formValidation";
import * as InsuranceAction from "../../store/insurance/actions";
import * as CommonAction from "../../store/common/actions";
import ChatIcon from "@material-ui/icons/Chat";
import Button from "../../components/atoms/Button";
import { CircularProgress } from "@material-ui/core";
import { cursorTo } from "readline";

type initialProps = {
  history?: any;
  commonState: any;
  commonAction: any;
  insuranceState: any;
  insuranceAction: any;
};

type initialState = {
  typeOfHomeOptions: any;
  storiesOptions: any;
  heatingSystemOptions: any;
  roofTypeOptions: any;
  poolOptions: any;
  sizeOfHome: any;
  numberOfStories: any;
  year: any;
  heatingSystem: any;
  roofType: any;
  pool: any;
  closed: boolean;
  moveId: string;
  street: string;
  city: string;
  zipcode: string;
  isGetMove: boolean;
  isDataArrived: boolean;
  hintContent: string;
  scriptContent: any;
  objectionCompleted: boolean;
  nextButtonClicked: boolean;
  loader: boolean;
};

class InsuranceStep3 extends React.Component<initialProps, initialState> {
  state: initialState = {
    isDataArrived: true,
    scriptContent: [],
    hintContent: "",
    isGetMove: true,
    moveId: "",
    street: "",
    city: "",
    zipcode: "",
    year: "",
    sizeOfHome: "",
    numberOfStories: "",
    heatingSystem: "",
    roofType: "",
    pool: "",
    typeOfHomeOptions: [
      { value: "", label: "" },
      { value: "Small Studio", label: "Small Studio" },
      { value: "Large Studio", label: "Large Studio" },
      { value: "1 Bedroom", label: "1 Bedroom" },
      { value: "2 Bedrooms - small", label: "2 Bedrooms - small" },
      { value: "2 Bedrooms - large", label: "2 Bedrooms - large" },
      { value: "3 Bedroom apt or house", label: "3 Bedroom apt or house" },
      { value: "3 Bedroom house", label: "3 Bedroom house" },
      { value: "4 Bedrooms - small", label: "4 Bedrooms - small" },
      { value: "4 Bedrooms - large", label: "4 Bedrooms - large" },
      { value: "5 Bedrooms plus", label: "5 Bedrooms plus" },
    ],
    storiesOptions: [
      { value: "", label: "" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
    ],
    heatingSystemOptions: [
      { value: "", label: "" },
      { value: "Electric", label: "Electric" },
      { value: "Gas - Forced Air", label: "Gas - Forced Air" },
      { value: "Gas - Hot Water", label: "Gas - Hot Water" },
      { value: "Oil - Forced Air", label: "Oil - Forced Air" },
      { value: "Oil - Hot Water", label: "Oil - Hot Water" },
      { value: "Not Sure", label: "Not Sure" },
    ],
    roofTypeOptions: [
      { value: "", label: "" },
      { value: "Architectural Shingle", label: "Architectural Shingle" },
      { value: "Asphalt Shingle", label: "Asphalt Shingle" },
      { value: "Fiberglass", label: "Fiberglass" },
      { value: "Clay Tile", label: "Clay Tile" },
      { value: "Slate", label: "Slate" },
      { value: "Metal", label: "Metal" },
      { value: "Composition", label: "Composition" },
      { value: "Asbestos", label: "Asbestos" },
      { value: "Tar &amp; Gravel", label: "Tar &amp; Gravel" },
      { value: "Wood Shingle", label: "Wood Shingle" },
      { value: "Not Sure", label: "Not Sure" },
    ],
    poolOptions: [
      { value: "", label: "" },
      { value: "None", label: "None" },
      { value: "In-ground (fenced)", label: "In-ground (fenced)" },
      { value: "In-ground (unfenced)", label: "In-ground (unfenced)" },
      { value: "Above ground (fenced)", label: "Above ground (fenced)" },
      { value: "Above ground (unfenced)", label: "Above ground (unfenced)" },
    ],
    closed: false,
    objectionCompleted: true,
    nextButtonClicked: false,
    loader: true,
  };

  componentDidMount() {
    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      this.setState({
        zipcode:
          this.props.commonState.move[0].destination &&
          this.props.commonState.move[0].destination.zip_code,
        moveId: this.props.commonState.move[0].id,
        street: this.props.commonState.move[0].destination_street,
        city:
          this.props.commonState.move[0].destination &&
          this.props.commonState.move[0].destination.lookup_name,
        year: this.props.commonState.move[0].insurance_detail.year,
        sizeOfHome: this.props.commonState.move[0].move_sq_foot,
        numberOfStories: this.props.commonState.move[0].move_no_of_stories,
        heatingSystem:
          this.props.commonState.move[0].property &&
          this.props.commonState.move[0].property.heating_type,
        roofType:
          this.props.commonState.move[0].property &&
          this.props.commonState.move[0].property.roof_material_type,
        pool:
          this.props.commonState.move[0].property &&
          this.props.commonState.move[0].property.pool_type,
      });
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }

    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "insurance",
    });
  }

  componentDidUpdate(prevProps: any) {
    let prev: any = prevProps.commonState;
    let cur: any = this.props.commonState;

    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      this.setState({
        zipcode:
          this.props.commonState.move[0].destination &&
          this.props.commonState.move[0].destination.zip_code,
        moveId: this.props.commonState.move[0].id,
        street: this.props.commonState.move[0].destination_street,
        city:
          this.props.commonState.move[0].destination &&
          this.props.commonState.move[0].destination.lookup_name,
        year: this.props.commonState.move[0].insurance_detail.year,
        sizeOfHome: this.props.commonState.move[0].move_sq_foot,
        numberOfStories: this.props.commonState.move[0].move_no_of_stories,
        heatingSystem:
          this.props.commonState.move[0].property &&
          this.props.commonState.move[0].property.heating_type,
        roofType:
          this.props.commonState.move[0].property &&
          this.props.commonState.move[0].property.roof_material_type,
        pool:
          this.props.commonState.move[0].property &&
          this.props.commonState.move[0].property.pool_type,
      });
    }
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    // if (
    //   nextProps &&
    //   nextProps.commonState &&
    //   nextProps.commonState.move[0] &&
    //   nextProps.commonState.move[0].property &&
    //   (nextProps.commonState.isGetMove || currentState.isGetMove)
    // ) {
    //   nextProps.commonState.isGetMove = false;
    //   currentState.isGetMove = false;
    //   currentState.year = nextProps.commonState.move[0].insurance_detail.year;
    //   currentState.sizeOfHome = nextProps.commonState.move[0].move_sq_foot;
    //   currentState.numberOfStories =
    //     nextProps.commonState.move[0].move_no_of_stories;
    //   currentState.heatingSystem =
    //     nextProps.commonState.move[0].property.heating_type;
    //   currentState.roofType =
    //     nextProps.commonState.move[0].property.roof_material_type;
    //   currentState.pool = nextProps.commonState.move[0].property.pool_type;
    //   currentState.zipcode =
    //     nextProps.commonState.move[0].destination &&
    //     nextProps.commonState.move[0].destination.zip_code;
    //   currentState.moveId = nextProps.commonState.move[0].id;
    //   currentState.street = nextProps.commonState.move[0].destination_street;
    //   currentState.city =
    //     nextProps.commonState.move[0].destination &&
    //     nextProps.commonState.move[0].destination.lookup_name;
    // }
    if (
      nextProps &&
      nextProps.insuranceState &&
      nextProps.insuranceState.isUpdateProperty
    ) {
      nextProps.insuranceState.isUpdateProperty = false;
      nextProps.commonAction.moveGet();
      currentState.nextButtonClicked = false;
      nextProps.history.push("/dashboard/concierge/workflow/insurancestep4");
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.scriptDataArrived
    ) {
      nextProps.commonState.scriptDataArrived = false;
      let points: any = [];
      let hintContent: any = [];
      let hintPara: string = "";
      nextProps.commonState.script.map((item: any) => {
        if (item.page_number === 3) {
          points = item.script_content.split("|");
          hintContent.push(item.hint_content);
        }
      });

      hintContent.map((hint: any) => {
        hintPara = hintPara + " " + hint;
      });

      currentState.scriptContent = points;
      currentState.hintContent = hintPara;
      currentState.loader = false;
    }
    return currentState;
  }

  handleChange = (e: any, name: string) => {
    this.setState({ ...this.state, [name]: e.target.value });
  };
  handleSelect = (e: any, name: string) => {
    this.setState({ ...this.state, [name]: e.target.value });
  };

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  backButtonHandler = () => {
    this.props.history.push("/dashboard/concierge/workflow/insurancestep2");
  };

  nextButtonHandler = () => {
    this.setState({ nextButtonClicked: true });
    const {
      sizeOfHome,
      year,
      numberOfStories,
      roofType,
      heatingSystem,
      pool,
      city,
      street,
      zipcode,
    } = this.state;
    if (
      sizeOfHome &&
      year &&
      numberOfStories &&
      roofType &&
      heatingSystem &&
      pool &&
      this.state.moveId &&
      validateYear(year)
    ) {
      const place = city && city.split(",") ? city.split(",") : "";
      const payload = {
        heating_type: heatingSystem,
        roof_material_type: roofType,
        pool_type: pool,
        year_built: year,
        total_area_sq_ft: sizeOfHome,
        stories: numberOfStories,
        street: street ? street : "",
        city: place && place[0] ? place[0] : "",
        state: place && place[1] ? place[1] : "",
        zip_code: zipcode ? zipcode : "",
      };
      this.props.insuranceAction.updateProperty({
        move_id: this.state.moveId,
        payload,
      });
    }
    // this.props.history.push("/dashboard/concierge/workflow/insurancestep4")
  };

  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            tabName={"Insurance"}
            tabId={3}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="insurance3-main">
              <div className="insurance3-heading">
                <div className="insurance3">Insurance </div>
                <div>
                  <div className="titleNumberInsurance">
                    <div className="left-number">3</div>
                    <div className="right-number">6</div>
                  </div>
                </div>
                <div className="objection-div">
                  <Button
                    className="objection"
                    startLogo={<ChatIcon />}
                    disabled={this.state.objectionCompleted}
                    color={
                      this.state.objectionCompleted ? "#DADADA" : "#EC6133 "
                    }
                    border={
                      this.state.objectionCompleted
                        ? "1px solid #DADADA"
                        : "1px solid #EC6133"
                    }
                    backgroundColor="#fff"
                    //  onClick={() => { this.setState({ objectionClick: true }) }}
                  >
                    Objection
                  </Button>
                </div>
              </div>
              {this.state.loader === true ? <CircularProgress /> : null}
              {this.state.closed == false &&
              this.state.hintContent &&
              this.state.hintContent !== " " ? (
                <div className="helpful-div-insurance">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}

              {
                <div className="script-div">
                  {this.state.scriptContent.map((item: any) => {
                    return (
                      <div className="point-content-wrapper-insurance3-script">
                        <div className="points-div-insurance3">
                          <div className="outer-point-insurance3">
                            <div className="inner-point-insurance3"></div>
                          </div>
                          <div className="vertical-line-insurance3"></div>
                        </div>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                          className="point-content-insurance3"
                        ></div>
                      </div>
                    );
                  })}
                </div>
              }
              <div className="point-content-wrapper-insurance3">
                <div className="points-div-insurance3">
                  <div className="outer-point-insurance3">
                    <div className="inner-point-insurance3"></div>
                  </div>
                  <div className="vertical-line-insurance3"></div>
                </div>

                <div className="point-content-insurance3">
                  Confirm your home specifications?
                </div>
              </div>
              <div className="InputflexDiv">
                <div className="leftDiv">
                  <div className="inputMainDiv">
                    <div className="inputDiv">
                      <div className="point-content-wrapper-insurance3">
                        <div className="points-div-insurance3">
                          <div className="outer-point-insurance3">
                            <div className="inner-point-insurance3"></div>
                          </div>
                          <div className="vertical-line-insurance3"></div>
                        </div>

                        <div className="point-content-insurance3">
                          <MoversInputs
                            title="Size of your home"
                            icon={<img src={HomeSize} />}
                            inputComponent={
                              <CustomizedInput
                                onChange={(e: any) =>
                                  this.handleChange(e, "sizeOfHome")
                                }
                                label=" SQUARE FT"
                                value={this.state.sizeOfHome}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.sizeOfHome
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.sizeOfHome &&
                              "Please enter Square ft."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-insurance3">
                        <div className="points-div-insurance3">
                          <div className="outer-point-insurance3">
                            <div className="inner-point-insurance3"></div>
                          </div>
                          <div className="vertical-line-insurance3"></div>
                        </div>

                        <div className="point-content-insurance3">
                          <MoversInputs
                            title="Number of stories"
                            icon={<img src={Stories} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelect(e, "numberOfStories")
                                }
                                label="SELECT NUMBER OF STORIES"
                                value={this.state.numberOfStories}
                                options={this.state.storiesOptions}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.numberOfStories
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.numberOfStories &&
                              "Please select no of stories."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-insurance3">
                        <div className="points-div-insurance3">
                          <div className="outer-point-insurance3">
                            <div className="inner-point-insurance3"></div>
                          </div>
                          <div className="vertical-line-insurance3"></div>
                        </div>

                        <div className="point-content-insurance3">
                          <MoversInputs
                            title="Primary heating syatem"
                            icon={<img src={heatingSystem} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelect(e, "heatingSystem")
                                }
                                label="SELECT HEATING SYSTEM"
                                value={this.state.heatingSystem}
                                options={this.state.heatingSystemOptions}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.heatingSystem
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.heatingSystem &&
                              "Please select heating system."}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rightDiv">
                  <div className="inputMainDiv">
                    <div className="inputDiv">
                      <div className="point-content-wrapper-insurance3">
                        <div className="points-div-insurance3">
                          <div className="outer-point-insurance3">
                            <div className="inner-point-insurance3"></div>
                          </div>
                          <div className="vertical-line-insurance3"></div>
                        </div>
                        <div className="point-content-insurance3">
                          <MoversInputs
                            title="House build"
                            icon={<img src={Build} />}
                            inputComponent={
                              <CustomizedInput
                                onChange={(e: any) =>
                                  this.handleChange(e, "year")
                                }
                                label="Year"
                                value={this.state.year}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.year
                                    ? true
                                    : this.state.nextButtonClicked &&
                                      this.state.year &&
                                      !validateYear(this.state.year)
                                    ? true
                                    : false
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked && !this.state.year
                              ? "Please enter build year."
                              : this.state.nextButtonClicked &&
                                this.state.year &&
                                !validateYear(this.state.year)
                              ? "Enter valid year"
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-insurance3">
                        <div className="points-div-insurance3">
                          <div className="outer-point-insurance3">
                            <div className="inner-point-insurance3"></div>
                          </div>
                          <div className="vertical-line-insurance3"></div>
                        </div>
                        <div className="point-content-insurance3">
                          <MoversInputs
                            title="Material of your roof"
                            icon={<img src={Roof} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelect(e, "roofType")
                                }
                                label="SELECT ROOF TYPE"
                                value={this.state.roofType}
                                options={this.state.roofTypeOptions}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.roofType
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.roofType &&
                              "Please select roof type."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-insurance3">
                        <div className="points-div-insurance3">
                          <div className="outer-point-insurance3">
                            <div className="inner-point-insurance3"></div>
                          </div>
                          <div className="vertical-line-insurance3"></div>
                        </div>
                        <div className="point-content-insurance3">
                          <MoversInputs
                            title="Swimming pool"
                            icon={<img src={Pool} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelect(e, "pool")
                                }
                                label="SELECT POOL TYPE"
                                value={this.state.pool}
                                options={this.state.poolOptions}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.pool
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.pool &&
                              "Please select pool."}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={"Back"}
              buttonText2={"Continue"}
              buttonStartLogo1={<ArrowBackIcon />}
              buttonStartLogo2={<ArrowForwardIcon />}
              ButtonOnClick1={this.backButtonHandler}
              ButtonOnClick2={() => this.nextButtonHandler()}
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
    insuranceAction: bindActionCreators(InsuranceAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  commonState: state.common,
  insuranceState: state.insurance,
});

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceStep3);
