import React from "react";
import "./MoversStep2.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import CustomizedInput from "../../components/atoms/CustomizedInput";
import CustomizedSelect from "../../components/atoms/CustomizedSelect";
import InputAdornment from "@material-ui/core/InputAdornment";
import MoversInputs from "../../components/Movers/Inputs/MoverInputs";
import AddressIcon from "../../Assets/images/Movers/addressIcon.svg";
import HomeSize from "../../Assets/images/Movers/sizeHome.svg";
import HomeType from "../../Assets/images/Movers/typeHome.svg";
import Stories from "../../Assets/images/Movers/stories.svg";
import Garage from "../../Assets/images/Movers/garage.svg";
import Basement from "../../Assets/images/Movers/basement.svg";
import * as Action from "../../store/common/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "../../components/atoms/Button";
import ChatIcon from "@material-ui/icons/Chat";
import { CircularProgress } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import AutoComplete from "../../components/atoms/PlacesAutoComplete";
import { geocodeByAddress } from "react-places-autocomplete";

type initialProps = {
  history?: any;
  commonAction: any;
  commonState: any;
  moversStepActive: any;
  moversStepTotal: any;
};

type initialState = {
  closed: boolean;
  listContent: any;
  oldAddress: any;
  // newAddress: any;
  typeOfHomeOptions: any;
  storiesOptions: any;
  garageOptions: any;
  basementOptions: any;
  parkingOptions: any;
  isDataArrived: boolean;
  moveId: any;
  hintContent: string;
  isDataArrived2: boolean;
  objectionCompleted: boolean;
  nextButtonClicked: boolean;
  loader: boolean;
  remark: string;
  fromaddress: string;
};

class MoversStep2 extends React.Component<initialProps, initialState> {
  state: initialState = {
    listContent: [],
    hintContent: "",
    isDataArrived2: true,
    moveId: "",
    closed: false,
    isDataArrived: true,
    oldAddress: {
      zipCode: "",
      street: "",
      homeSize: "",
      homeType: "",
      numberOfStories: "",
      garage: "",
      basement: "",
      park_distance: "",
    },
    fromaddress: "",
    parkingOptions: [
      {
        value: "",
        label: "",
      },
      {
        value: "0-50 ft",
        label: "50 ft or less",
      },
      {
        value: "50-100 ft",
        label: "50 to 100 ft",
      },
      {
        value: "100-150 ft",
        label: "100 to 150 ft",
      },
      {
        value: "150+ ft",
        label: "150+ ft",
      },
    ],
    // newAddress: {
    //   zipCode: "",
    //   street: "",
    //   homeSize: "",
    //   homeType: "",
    //   numberOfStories: "",
    //   garage: "",
    //   basement: "",
    // },
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
      { value: "1", label: "One" },
      { value: "2", label: "Two" },
      { value: "3", label: "Three" },
      { value: "4", label: "Four" },
    ],
    garageOptions: [
      { value: "", label: "" },
      { value: "0", label: "No Garage" },
      { value: "1", label: "1 Car Garage" },
      { value: "2", label: "2 Car Garage" },
      { value: "3", label: "3 Car Garage" },
      { value: "4", label: "4+ Car Garage" },
    ],
    basementOptions: [
      { value: "", label: "" },
      { value: "N/A", label: "No Basement/Attic" },
      { value: "Basement", label: "Basement" },
      {
        value: "Attic Space",
        label: "Attic Space",
      },
      {
        value: "Basement & Attic",
        label: "Basement & Attic",
      },
    ],
    objectionCompleted: true,
    nextButtonClicked: false,
    loader: true,
    remark: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    // this.props.commonAction.moveGet();
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "moving",
      page: 2,
      subCategory: "professional-mover",
    });

    if (
      this.props &&
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move[0]
    ) {
      let oldAddress = {
        street: this.props.commonState.move[0].source_street,
        zipCode:
          this.props.commonState.move[0].source &&
          this.props.commonState.move[0].source.zip_code
            ? this.props.commonState.move[0].source.zip_code
            : "",
        homeSize:
          this.props.commonState.move[0] &&
          this.props.commonState.move[0].move_sq_foot
            ? this.props.commonState.move[0].move_sq_foot
            : "",
        numberOfStories:
          this.props.commonState.move[0] &&
          this.props.commonState.move[0].move_no_of_stories
            ? this.props.commonState.move[0].move_no_of_stories.toString()
            : "",
        homeType:
          this.props.commonState.move[0] &&
          this.props.commonState.move[0].move_size &&
          this.props.commonState.move[0].move_size != "Default"
            ? this.props.commonState.move[0].move_size
            : "",
        garage:
          this.props.commonState.move[0] &&
          this.props.commonState.move[0].move_no_of_garage
            ? this.props.commonState.move[0].move_no_of_garage.toString()
            : this.props.commonState.move[0].destination_no_of_garage == 0
            ? "0"
            : "",
        basement:
          this.props.commonState.move[0] &&
          this.props.commonState.move[0].move_basement
            ? this.props.commonState.move[0].move_basement.toString()
            : "",
        park_distance:
          this.props.commonState.move[0] &&
          this.props.commonState.move[0].distance_truck_to_door
            ? this.props.commonState.move[0].distance_truck_to_door.toString()
            : "",
      };
      this.setState({
        moveId: this.props.commonState.move[0].id
          ? this.props.commonState.move[0].id
          : "",
        oldAddress: oldAddress,
        fromaddress: this.props.commonState.move[0].source_full_address,
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;

    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      // this.props.commonAction.moveGet();
      let oldAddress = {
        street: cur.move[0].source_street,
        zipCode:
          cur.move[0].source && cur.move[0].source.zip_code
            ? cur.move[0].source.zip_code
            : "",
        homeSize:
          cur.move[0] && cur.move[0].move_sq_foot
            ? cur.move[0].move_sq_foot
            : "",
        numberOfStories:
          cur.move[0] && cur.move[0].move_no_of_stories
            ? cur.move[0].move_no_of_stories.toString()
            : "",
        homeType:
          cur.move[0] &&
          cur.move[0].move_size &&
          cur.move[0].move_size != "Default"
            ? cur.move[0].move_size
            : "",
        garage:
          cur.move[0] && cur.move[0].move_no_of_garage
            ? cur.move[0].move_no_of_garage.toString()
            : cur.move[0].destination_no_of_garage == 0
            ? "0"
            : "",
        basement:
          cur.move[0] && cur.move[0].move_basement
            ? cur.move[0].move_basement.toString()
            : "",
        park_distance:
          cur.move[0] && cur.move[0].distance_truck_to_door
            ? cur.move[0].distance_truck_to_door.toString()
            : "",
      };
      this.setState({
        moveId: cur.move[0].id ? cur.move[0].id : "",
        oldAddress: oldAddress,
        fromaddress: cur.move[0].source_full_address,
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
    //   nextProps.commonState.move &&
    //   nextProps.commonState.move[0] &&
    //   currentState.isDataArrived
    // ) {
    //   currentState.isDataArrived = false;
    //   nextProps.commonState.move.map((item: any) => {
    //     currentState.moveId = item.id ? item.id : "";
    //     currentState.oldAddress.zipCode =
    //       item.source && item.source.zip_code ? item.source.zip_code : "";
    //     currentState.oldAddress.street =
    //       item.source && item.source.source_street
    //         ? item.source.source_street
    //         : "";
    //     currentState.oldAddress.homeSize =
    //       item && item.move_sq_foot ? item.move_sq_foot : "";
    //     currentState.oldAddress.numberOfStories =
    //       item && item.move_no_of_stories
    //         ? item.move_no_of_stories.toString()
    //         : "";
    //     currentState.oldAddress.homeType =
    //       item && item.move_size && item.move_size != "Default"
    //         ? item.move_size
    //         : "";
    //     currentState.oldAddress.garage =
    //       item && item.move_no_of_garage
    //         ? item.move_no_of_garage.toString()
    //         : item.destination_no_of_garage == 0
    //         ? "0"
    //         : "";
    //     currentState.oldAddress.basement =
    //       item && item.move_basement ? item.move_basement.toString() : "";

    //     currentState.oldAddress.park_distance =
    //       item && item.distance_truck_to_door
    //         ? item.distance_truck_to_door.toString()
    //         : "";

    //     currentState.fromaddress = item && item.source_full_address;

    //     // currentState.newAddress.zipCode =
    //     //   item.destination && item.destination.zip_code
    //     //     ? item.destination.zip_code
    //     //     : "";
    //     // currentState.newAddress.homeSize =
    //     //   item && item.destination_sq_foot ? item.destination_sq_foot : "";
    //     // currentState.newAddress.numberOfStories =
    //     //   item && item.destination_no_of_stories
    //     //     ? item.destination_no_of_stories.toString()
    //     //     : "";
    //     // currentState.newAddress.homeType =
    //     //   item &&
    //     //   item.destination_move_size &&
    //     //   item.destination_move_size != "Default"
    //     //     ? item.destination_move_size
    //     //     : "";
    //     // currentState.newAddress.garage =
    //     //   item && item.destination_no_of_garage
    //     //     ? item.destination_no_of_garage.toString()
    //     //     : item.destination_no_of_garage == 0
    //     //     ? "0"
    //     //     : "";
    //     // currentState.newAddress.basement =
    //     //   item && item.destination_basement
    //     //     ? item.destination_basement.toString()
    //     //     : "";
    //   });
    // }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.scriptDataArrived
    ) {
      nextProps.commonState.scriptDataArrived = false;

      let hintContent: any = [];
      let hintPara: string = "";
      let points: any = [];
      // nextProps.commonState.script.map((item: any) => {
      //   if (item.page_number === 2) {
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

      currentState.listContent = points;

      currentState.hintContent = hintPara;
      currentState.loader = false;
    }

    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.isSourceDetailsUpdated
    ) {
      nextProps.commonState.isSourceDetailsUpdated = false;
      nextProps.commonAction.moveGet();
    }
    return currentState;
  }

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  backButtonHandler = () => {
    this.props.history.push("/dashboard/concierge/workflow/moversstep1");
  };

  nextButtonHandler = async () => {
    this.setState({ nextButtonClicked: true });
    if (
      this.state.moveId &&
      this.state.oldAddress.zipCode &&
      this.state.oldAddress.homeType &&
      this.state.oldAddress.homeSize &&
      this.state.oldAddress.numberOfStories
      // this.state.newAddress.zipCode &&
      // this.state.newAddress.homeType &&
      // this.state.newAddress.homeSize &&
      // this.state.newAddress.numberOfStories
    ) {
      await this.props.commonAction.updateMoveSourceHomeInfo({
        move_id: this.state.moveId,
        data: {
          move_size: this.state.oldAddress.homeType,
          move_sq_foot: parseInt(this.state.oldAddress.homeSize),
          move_no_of_stories: parseInt(this.state.oldAddress.numberOfStories),
          move_no_of_garage: parseInt(this.state.oldAddress.garage)
            ? parseInt(this.state.oldAddress.garage)
            : 0,
          move_basement: this.state.oldAddress.basement,
          distance_truck_to_door: this.state.oldAddress.park_distance,
        },
      });

      // await this.props.commonAction.updateMoveDestinationHomeInfo({
      //   move_id: this.state.moveId,
      //   data: {
      //     destination_move_size: this.state.newAddress.homeType,
      //     destination_sq_foot: parseInt(this.state.newAddress.homeSize),
      //     destination_no_of_stories: parseInt(
      //       this.state.newAddress.numberOfStories
      //     ),
      //     destination_no_of_garage: parseInt(this.state.newAddress.garage)
      //       ? parseInt(this.state.newAddress.garage)
      //       : 0,
      //     destination_basement: this.state.newAddress.basement,
      //   },
      // });

      // this.props.history.push("/dashboard/concierge/workflow/moversstep3");
      this.props.history.push({
        pathname: "/dashboard/concierge/workflow/moversstep4",
        state: this.props.history.location.state,
      });
    }
  };

  handleChangeOldAddress = (e: any, name: string) => {
    let oldAddress = { ...this.state.oldAddress, [name]: e.target.value };
    this.setState({ oldAddress: oldAddress });
  };
  handleSelectOldAddress = (e: any, name: string) => {
    let oldAddress = { ...this.state.oldAddress, [name]: e.target.value };
    this.setState({ oldAddress: oldAddress });
  };
  // handleChangeNewAddress = (e: any, name: string) => {
  //   let newAddress = { ...this.state.newAddress, [name]: e.target.value };
  //   this.setState({ newAddress: newAddress });
  // };
  // handleSelectNewAddress = (e: any, name: string) => {
  //   let newAddress = { ...this.state.newAddress, [name]: e.target.value };
  //   this.setState({ newAddress: newAddress });
  // };
  handleSelectFromAddress = (address: any) => {
    geocodeByAddress(address)
      .then((results) => {
        // this.setState({ address: results[0].formatted_address });
        let city: any = "",
          state: any = "",
          zip: any = "",
          country: any = "",
          route: any = "",
          streetNumber: any = "";

        results &&
          results[0] &&
          results[0].address_components &&
          results[0].address_components.map((el) => {
            state = el.types.includes("administrative_area_level_1")
              ? el.short_name
              : state;
            zip = el.types.includes("postal_code") ? el.short_name : zip;
            city = el.types.includes("locality")
              ? el.long_name
              : el.types.includes("sublocality")
              ? el.long_name
              : city;
            streetNumber = el.types.includes("street_number")
              ? el.short_name
              : streetNumber;
            route = el.types.includes("route") ? el.short_name : route;
            country = el.types.includes("country") ? el.short_name : country;
          });
        if (country === "USA" || country === "US") {
          this.setState({
            // sourceStreet: `${streetNumber} ${route}, ${city}, ${state}, ${zip} `,
            fromaddress: `${streetNumber} ${route} ${city} ${state},${zip}  `,
          });
        }
        if (
          (country === "USA" || country === "US") &&
          // state &&
          // city &&
          // zip &&
          // streetNumber &&
          // route &&
          this.state.moveId
        ) {
          this.props.commonAction.moveAddressUpdate({
            source_detail: `${streetNumber} ${route}, ${city}, ${state}, ${zip}`,
            move_id: this.state.moveId,
          });
        }
      })
      .catch((error) => console.error("error", error));
  };

  handleChange = (e: any, name: string) => {
    if (name === "fromaddress") {
      this.setState({ fromaddress: e });
    }
  };

  render() {
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            tabName={"Movers"}
            tabId={2}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="mover2-main">
              <div className="mover2-heading">
                <div className="mover2">Movers </div>
                <div>
                  <div className="titleNumberMover">
                    <div className="left-number">2</div>
                    <div className="right-number">5</div>
                  </div>
                </div>
                {/* <div className="objection-div">
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
                </div> */}
              </div>
              {this.state.loader === true ? <CircularProgress /> : null}
              {this.state.closed == false &&
              this.state.hintContent &&
              this.state.hintContent !== " " ? (
                <div className="helpful-div-mover">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}
              <div className="script-div">
                {this.state.listContent &&
                  this.state.listContent.map((item: any) => {
                    return (
                      <div className="point-content-wrapper-mover2-script">
                        <div className="points-div-mover2">
                          <div className="outer-point-mover2">
                            <div className="inner-point-mover2"></div>
                          </div>
                          <div className="vertical-line-mover2"></div>
                        </div>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                          className="point-content-mover2"
                        ></div>
                      </div>
                    );
                  })}
              </div>
              <div className="InputflexDiv">
                <div className="leftDiv">
                  <div className="heading">
                    Confirm your current home details
                  </div>
                  <div className="inputMainDiv">
                    <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="points-div-mover2">
                          <div className="outer-point-mover2">
                            <div className="inner-point-mover2"></div>
                          </div>
                          <div className="vertical-line-mover2"></div>
                        </div>

                        <div className="point-content-mover2">
                          <MoversInputs
                            // className="CustomInput"
                            title="Moving from"
                            icon={<img src={AddressIcon} />}
                            inputComponent={
                              // <CustomizedInput
                              //   disabled={true}
                              //   label="OLD ZIP CODE"
                              //   value={this.state.oldAddress.zipCode}
                              //   InputProps={{
                              //     endAdornment: (
                              //       <InputAdornment position="start">
                              //         {this.state.oldAddress.street}
                              //       </InputAdornment>
                              //     ),
                              //   }}
                              //   error={
                              //     this.state.nextButtonClicked &&
                              //     !this.state.oldAddress.zipCode
                              //   }
                              // />
                              <AutoComplete
                                className="CustomInput"
                                value={this.state.fromaddress}
                                onChange={(e: any) => {
                                  this.handleChange(e, "fromaddress");
                                }}
                                onSelect={this.handleSelectFromAddress}
                                placeholder={
                                  this.state.fromaddress == "" ? "From" : ""
                                }
                                // inputTitle="To"
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.oldAddress.zipCode &&
                              "Please enter old zip code."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="points-div-mover2">
                          <div className="outer-point-mover2">
                            <div className="inner-point-mover2"></div>
                          </div>
                          <div className="vertical-line-mover2"></div>
                        </div>

                        <div className="point-content-mover2">
                          <MoversInputs
                            title="Size of your home"
                            icon={<img src={HomeSize} />}
                            inputComponent={
                              <CustomizedInput
                                onChange={(e: any) =>
                                  this.handleChangeOldAddress(e, "homeSize")
                                }
                                className="CustomInput"
                                label=" SQUARE FT"
                                value={this.state.oldAddress.homeSize}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.oldAddress.homeSize
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.oldAddress.homeSize &&
                              "Please enter old home size."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="points-div-mover2">
                          <div className="outer-point-mover2">
                            <div className="inner-point-mover2"></div>
                          </div>
                          <div className="vertical-line-mover2"></div>
                        </div>

                        <div className="point-content-mover2">
                          <MoversInputs
                            title="Type of home"
                            icon={<img src={HomeType} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelectOldAddress(e, "homeType")
                                }
                                // onChange={() => console.log("hii")}
                                label="SELECT TYPE OF HOME"
                                value={this.state.oldAddress.homeType}
                                options={this.state.typeOfHomeOptions}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.oldAddress.homeType
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.oldAddress.homeType &&
                              "Please select old home type."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="points-div-mover2">
                          <div className="outer-point-mover2">
                            <div className="inner-point-mover2"></div>
                          </div>
                          <div className="vertical-line-mover2"></div>
                        </div>

                        <div className="point-content-mover2">
                          <MoversInputs
                            title="Number of stories"
                            icon={<img src={Stories} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelectOldAddress(
                                    e,
                                    "numberOfStories"
                                  )
                                }
                                label="SELECT NUMBER OF STORIES"
                                value={this.state.oldAddress.numberOfStories}
                                options={this.state.storiesOptions}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.oldAddress.numberOfStories
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.oldAddress.numberOfStories &&
                              "Please select old number of stories."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="points-div-mover2">
                          <div className="outer-point-mover2">
                            <div className="inner-point-mover2"></div>
                          </div>
                          <div className="vertical-line-mover2"></div>
                        </div>

                        <div className="point-content-mover2">
                          <MoversInputs
                            title="Distance from door"
                            icon={<img src={Basement} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelectOldAddress(
                                    e,
                                    "park_distance"
                                  )
                                }
                                label="SELECT DISTANCE"
                                value={this.state.oldAddress.park_distance}
                                options={this.state.parkingOptions}
                              />
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="points-div-mover2">
                          <div className="outer-point-mover2">
                            <div className="inner-point-mover2"></div>
                          </div>
                          <div className="vertical-line-mover2"></div>
                        </div>

                        <div className="point-content-mover2">
                          <MoversInputs
                            title="Garage"
                            icon={<img src={Garage} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelectOldAddress(e, "garage")
                                }
                                label="SELECT GARAGE"
                                value={this.state.oldAddress.garage}
                                options={this.state.garageOptions}
                              />
                            }
                          />
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="points-div-mover2">
                          <div className="outer-point-mover2">
                            <div className="inner-point-mover2"></div>
                          </div>
                          <div className="vertical-line-mover2"></div>
                        </div>

                        <div className="point-content-mover2">
                          <MoversInputs
                            title="Basement"
                            icon={<img src={Basement} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelectOldAddress(e, "basement")
                                }
                                label="SELECT BASEMENT"
                                value={this.state.oldAddress.basement}
                                options={this.state.basementOptions}
                              />
                            }
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="rightDiv">
                  <div className="inputMainDiv">
                    <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="point-content-mover2">
                          <div className="titleDiv">Remarks:</div>
                          <TextareaAutosize
                            aria-label="Remark"
                            minRows={3}
                            placeholder="Enter remark"
                            style={{ height: "180px" }}
                            className="CustomTextArea"
                            value={this.state.remark}
                            onChange={(e: any) =>
                              this.setState({ remark: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="point-content-mover2">
                          <MoversInputs
                            title="Moving to"
                            icon={<img src={AddressIcon} />}
                            inputComponent={
                              <CustomizedInput
                                onChange={(e: any) =>
                                  this.handleChangeNewAddress(e, "zipCode")
                                }
                                label="ZIP CODE"
                                value={this.state.newAddress.zipCode}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="start">
                                      {this.state.newAddress.street}
                                    </InputAdornment>
                                  ),
                                }}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.newAddress.zipCode
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.newAddress.zipCode &&
                              "Please enter new zip code."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="point-content-mover2">
                          <MoversInputs
                            title="Size of your home"
                            icon={<img src={HomeSize} />}
                            inputComponent={
                              <CustomizedInput
                                onChange={(e: any) =>
                                  this.handleChangeNewAddress(e, "homeSize")
                                }
                                label=" SQUARE FT"
                                value={this.state.newAddress.homeSize}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.newAddress.homeSize
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.newAddress.homeSize &&
                              "Please enter new home size ."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="point-content-mover2">
                          <MoversInputs
                            title="Type of home"
                            icon={<img src={HomeType} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelectNewAddress(e, "homeType")
                                }
                                label="SELECT TYPE OF HOME"
                                value={this.state.newAddress.homeType}
                                options={this.state.typeOfHomeOptions}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.newAddress.homeType
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.newAddress.homeType &&
                              "Please select new home type ."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="point-content-mover2">
                          <MoversInputs
                            title="Number of stories"
                            icon={<img src={Stories} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelectNewAddress(
                                    e,
                                    "numberOfStories"
                                  )
                                }
                                label="SELECT NUMBER OF STORIES"
                                value={this.state.newAddress.numberOfStories}
                                options={this.state.storiesOptions}
                                error={
                                  this.state.nextButtonClicked &&
                                  !this.state.newAddress.numberOfStories
                                }
                              />
                            }
                          />
                          <div className="error">
                            {this.state.nextButtonClicked &&
                              !this.state.newAddress.numberOfStories &&
                              "Please select new number of stories ."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="point-content-mover2">
                          <MoversInputs
                            title="Garage"
                            icon={<img src={Garage} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelectNewAddress(e, "garage")
                                }
                                label="SELECT GARAGE"
                                value={this.state.newAddress.garage}
                                options={this.state.garageOptions}
                              />
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="inputDiv">
                      <div className="point-content-wrapper-mover2">
                        <div className="point-content-mover2">
                          <MoversInputs
                            title="Basement"
                            icon={<img src={Basement} />}
                            inputComponent={
                              <CustomizedSelect
                                onChange={(e: any) =>
                                  this.handleSelectNewAddress(e, "basement")
                                }
                                label="SELECT BASEMENT"
                                value={this.state.newAddress.basement}
                                options={this.state.basementOptions}
                              />
                            }
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="WorkflowButtons">
            <WorkflowButton
              buttonText1={
                // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                "Back"
              }
              buttonText2={
                // this.state.tabName === "" || this.state.tabName === "Discovery" ?
                "Continue"
              }
              buttonStartLogo1={
                // this.state.tabName === "" ||
                // this.state.tabName === "Discovery" ? (
                ""
                // ) : (
                //   <ArrowBackIcon />
                // )
              }
              buttonStartLogo2={<ArrowForwardIcon />}
              ButtonOnClick1={() => {
                this.backButtonHandler();
              }}
              ButtonOnClick2={() => {
                this.nextButtonHandler();
              }}
              button2Disabled={
                this.state.oldAddress.zipCode === "" ? true : false
              }
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(MoversStep2);
