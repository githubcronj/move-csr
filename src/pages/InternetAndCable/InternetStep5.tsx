import React from "react";
import "./InternetStep1.scss";
import "./InternetStep5.scss";
import HelpfulText from "../../components/atoms/HelpfulText/HelpfulText";
import SecurityPersonalised from "../../components/Insurance/SecurityPersonalised";
import Wifi from "../../Assets/images/Internet/Cable-Internet.svg";
import TV from "../../Assets/images/Internet/Cable-Tv.svg";
import Phone from "../../Assets/images/Internet/Cable-Phone.svg";
import trophyLogo from "../../Assets/images/Insurance/Vector.png";
import ConciergeTabs from "../ConciergeFlowPage/ConciergeFlow/ConciergeTabs";
import "../ConciergeFlowPage/ConciergeFlow/conciergeFlow.scss";
import WorkflowButton from "../ConciergeFlowPage/WorkflowButton/WorkflowButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as InternetAction from "../../store/internet/actions";
import * as CommonAction from "../../store/common/actions";
import Filters from "./Filters";
import ChatIcon from "@material-ui/icons/Chat";
import Button from "../../components/atoms/Button";
import { CircularProgress } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

type initialProps = {
  history?: any;
  internetAction?: any;
  internetState?: any;
  commonAction?: any;
  commonState?: any;
};

type initialState = {
  closed: boolean;
  internetData: any;
  Services: any;
  Providers: any;
  AverageSpeed: any;
  TvChannels: any;
  MonthlyCost: any;
  step1: any;
  step2: any;
  step3: any;
  step4: any;
  step5: any;
  isDataArrived: boolean;
  activeStep: number;
  city: string;
  state: any;
  zip_code: string;
  sort: any;
  viewDetailData: any;
  isDataArrived2: boolean;
  isDataArrived3: boolean;
  hintContent: string;
  scriptContent: any;
  objectionCompleted: boolean;
  loader: boolean;
  loader2: boolean;
  selected: any;
  filtersOpen?: boolean;
  orderData?: any;
};

class InternetStep5 extends React.Component<initialProps, initialState> {
  state: initialState = {
    city: "",
    state: "",
    zip_code: "",
    closed: false,
    step1: {
      internet: false,
      TV: false,
      Phone: false,
    },
    step2: {
      one: false,
      two: false,
      three: false,
      four: false,
    },
    step3: {
      movies: false,
      videoGames: false,
      wfh: false,
      videoCalls: false,
      downloading: false,
      noneOfThese: false,
    },
    step4: {
      entertaiment: false,
      sports: false,
      kids: false,
      films: false,
    },
    step5: {
      localAndLongDistanceCall: false,
      internationalCall: false,
    },
    Services: [
      // { name: 'Phone', value: false, count: 3 },
      // { name: 'Internet', value: false, count: 10 },
      // { name: 'Tv', value: false, count: 9 },
    ],
    Providers: [
      // { name: 'AT&T', value: false, count: 3 },
      // { name: 'Verizon', value: false, count: 3 },
      // { name: 'Spectrum', value: false, count: 10 },
      // { name: 'Xfinity', value: false, count: 9 },
    ],
    AverageSpeed: [
      // { name: '0-29Mbps', value: false, count: 10 },
      // { name: '30-59Mbps', value: false, count: 6 },
      // { name: '60-99Mbps', value: false, count: 7 },
      // { name: '100+Mbps', value: false, count: 3 },
    ],
    MonthlyCost: [
      { name: "$0-$24", prevRange: 0, nextRange: 24, value: false, count: 0 },
      { name: "$25-$50", prevRange: 25, nextRange: 50, value: false, count: 0 },
      {
        name: "$51-$100",
        prevRange: 51,
        nextRange: 100,
        value: false,
        count: 0,
      },
      { name: "$100+", prevRange: 100, nextRange: 0, value: false, count: 0 },
    ],
    TvChannels: [
      { name: "10 and up", prevRange: 10, value: false, count: 0 },
      { name: "100+", prevRange: 100, value: false, count: 0 },
      { name: "200+", prevRange: 200, value: false, count: 0 },
    ],
    isDataArrived: true,
    isDataArrived2: true,
    activeStep: 0,
    internetData: [],

    sort: { value: "LH", label: "Low to High" },
    viewDetailData: null,
    isDataArrived3: true,
    scriptContent: [],
    hintContent: "",
    objectionCompleted: true,
    loader: true,
    loader2: true,
    selected: [],
    filtersOpen: false,
    orderData: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (
      this.props.commonState &&
      this.props.commonState.move &&
      this.props.commonState.move.length > 0 &&
      this.props.commonState.move[0]
    ) {
      const dest: any =
        this.props.commonState.move[0] &&
        this.props.commonState.move[0].destination;
      this.props.internetAction.internetPlan({
        city: dest && dest.city_name,
        state: dest && dest.state_code,
        zip_code: dest && dest.zip_code,
        loader2: false,
      });
    }
    // else {
    //   this.props.commonAction.moveGet();
    // }
    const hash_code = localStorage.getItem("scriptHashCode");
    this.props.commonAction.scriptGet({
      hash_code: hash_code,
      service: "internetcable",
      page: 5,
    });
  }

  componentDidUpdate(prevProps: any) {
    const prev = prevProps && prevProps.commonState;
    const cur = this.props && this.props.commonState;
    // if (prev.moveAddress !== cur.moveAddress && cur.moveAddress) {
    //     this.props.commonAction.moveGet();
    // }

    if (prev.order !== cur.order && cur.order) {
      let orderData: any = [];
      this.props.commonState.order.map((item: any) => {
        if (item.service === "Internet/Cable" || item.service === "TV")
          orderData.push(item);
      });
      this.setState({ orderData: orderData });
    }

    if (prev.move !== cur.move && cur.move && cur.move[0]) {
      const data = cur.move[0];
      const dest: any = data && data.destination;
      this.props.internetAction.internetPlan({
        city: dest && dest.city_name,
        state: dest && dest.state_code,
        zip_code: dest && dest.zip_code,
        loader2: false,
      });
    }
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (
      nextProps &&
      nextProps.internetState &&
      nextProps.internetState.isStepsSuccess
    ) {
      nextProps.internetState.isStepsSuccess = false;
      nextProps.internetAction.getSteps();
    }
    if (
      nextProps &&
      nextProps.commonState &&
      nextProps.commonState.scriptDataArrived
    ) {
      nextProps.commonState.scriptDataArrived = false;

      let hintContent: any = [];
      let points: any = [];
      let hintPara: string = "";
      // nextProps.commonState.script.map((item: any) => {
      //   if (item.page_number === 5) {
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

      currentState.scriptContent = points;
      currentState.hintContent = hintPara;
      currentState.loader = false;
    }
    if (
      nextProps.internetState &&
      nextProps.internetState.steps &&
      nextProps.internetState.steps &&
      nextProps.internetState.steps[0] &&
      nextProps.internetState.steps[0].filter_values &&
      nextProps.internetState.stepsDataArrived
    ) {
      nextProps.internetState.stepsDataArrived = false;
      currentState.activeStep =
        nextProps.internetState.steps[0].filter_values.activeStep;
      currentState.step1 = nextProps.internetState.steps[0].filter_values.step1;
      currentState.step2 = nextProps.internetState.steps[0].filter_values.step2;
      currentState.step3 = nextProps.internetState.steps[0].filter_values.step3;
      currentState.step4 = nextProps.internetState.steps[0].filter_values.step4;
      currentState.step5 = nextProps.internetState.steps[0].filter_values.step5;

      // if (
      //   nextProps &&
      //   nextProps.commonState &&
      //   nextProps.commonState.move &&
      //   nextProps.commonState.move[0]
      // ) {
      //   const data =
      //     nextProps.commonState &&
      //     nextProps.commonState.move &&
      //     nextProps.commonState.move.length > 0 &&
      //     nextProps.commonState.move[0];
      //   const dest: any = data && data.destination;
      //   // this.setState({
      //   //   city: dest && dest.city_name,
      //   //   state: dest && dest.state_code,
      //   //   zip_code: dest && dest.zip_code,
      //   // });
      //   nextProps.internetAction.internetPlan({
      //     city: dest && dest.city_name,
      //     state: dest && dest.state_code,
      //     zip_code: dest && dest.zip_code,
      //   });
      // }
    }

    if (
      nextProps.internetState &&
      nextProps.internetState.internet &&
      nextProps.internetState.internet.filters &&
      Object.keys(nextProps.internetState.internet.filters).length > 0 &&
      nextProps.internetState.isInternetDataArrived
    ) {
      nextProps.internetState.isInternetDataArrived = false;
      const filters = nextProps.internetState.internet.filters;
      let service1: any = [];
      let provider1: any = [];
      let speed1: any = [];
      // let a: any;
      for (const [key, value] of Object.entries(filters.service)) {
        if (value !== 0) {
          if (key !== "All Services") {
            service1.push({
              name: key,
              value:
                key === "Internet"
                  ? currentState.step1 &&
                    currentState.step1.internet &&
                    !currentState.step1.TV &&
                    !currentState.step1.Phone
                  : key === "TV"
                  ? currentState.step1 &&
                    currentState.step1.TV &&
                    !currentState.step1.Phone &&
                    !currentState.step1.internet
                  : key === "Phone"
                  ? currentState.step1 &&
                    currentState.step1.Phone &&
                    !currentState.step1.TV &&
                    !currentState.step1.internet
                  : key === "Internet + Phone"
                  ? currentState.step1 &&
                    currentState.step1.Phone &&
                    currentState.step1.internet &&
                    !currentState.step1.TV
                  : key === "Internet + TV"
                  ? currentState.step1 &&
                    currentState.step1.TV &&
                    currentState.step1.internet &&
                    !currentState.step1.Phone
                  : key === "TV + Phone"
                  ? currentState.step1 &&
                    currentState.step1.TV &&
                    currentState.step1.Phone &&
                    !currentState.step1.internet
                  : key === "Internet + TV + Phone"
                  ? currentState.step1 &&
                    currentState.step1.TV &&
                    currentState.step1.Phone &&
                    currentState.step1.internet
                  : false,
              count: value,
            });
          }
          // else {
          //     a = {
          //         name: key,
          //         value: false,
          //         count: value,
          //     };
          // }
        }
      }
      // service1.push(a);

      if (
        nextProps &&
        nextProps.history &&
        nextProps.history.location &&
        nextProps.history.location.state &&
        nextProps.history.location.state.providerData
      ) {
        for (const [key, value] of Object.entries(filters.provider)) {
          if (
            key.includes(nextProps.history.location.state.providerData.name)
          ) {
            provider1.push({ name: key, value: true, count: value });
          } else {
            if (value !== 0) {
              provider1.push({ name: key, value: false, count: value });
            }
          }
        }
      } else {
        for (const [key, value] of Object.entries(filters.provider)) {
          if (value !== 0) {
            provider1.push({ name: key, value: false, count: value });
          }
        }
      }

      for (const [key, value] of Object.entries(filters.speed)) {
        if (value !== 0) {
          speed1.push({ name: key, value: false, count: value });
        }
      }

      currentState.Services = service1;
      currentState.Providers = provider1;
      currentState.AverageSpeed = speed1;
      currentState.loader2 = false;
    }

    return currentState;
  }

  sortByKey = (array: any, key: any) => {
    return array.slice().sort(function (a: any, b: any) {
      var x = parseFloat(a[key]);
      var y = parseFloat(b[key]);

      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  changeServices = async (val: any) => {
    await this.setState({
      Services: val,
    });
  };
  changeProviders = (val: any) => {
    this.setState({
      Providers: val,
    });
  };
  changeAverageSpeed = (val: any) => {
    this.setState({
      AverageSpeed: val,
    });
  };
  changeTvChannels = (val: any) => {
    this.setState({
      TvChannels: val,
    });
  };
  changeMonthlyCost = (val: any) => {
    this.setState({
      MonthlyCost: val,
    });
  };

  nextHandler = () => {
    const payload = {
      page_name: "Internet",
      filter_values: {
        activeStep: this.state.step1.Phone == true ? 4 : 5,
        step1: this.state.step1,
        step2: this.state.step2,
        step3: this.state.step3,
        step4: this.state.step4,
        step5: this.state.step5,
      },
    };

    if (this.state.selected.length) {
      this.props.history.push({
        pathname: "/dashboard/concierge/workflow/internetstep6",
        state: { data: this.state.selected },
      });
    } else {
      window.alert("Please Select Atleast One Provider!");
    }

    // this.props.history.push(
    //   "/dashboard/concierge/workflow/internetstep6"
    // );

    this.props.internetAction.changeSteps(payload);
  };
  clearAll = () => {
    let services = this.state.Services.map((item: any) => {
      if (item.value) {
        let item1: any;
        if (item.name === "All Services") {
          item1 = {
            name: item.name,
            value: true,
            count: item.count,
          };
        } else {
          item1 = {
            name: item.name,
            value: false,
            count: item.count,
          };
        }
        return item1;
      } else return item;
    });

    let providers = this.state.Providers.map((item: any) => {
      if (item.value) {
        let item1 = {
          name: item.name,
          value: !item.value,
          count: item.count,
        };
        return item1;
      } else return item;
    });

    let tvChannels = this.state.TvChannels.map((item: any) => {
      if (item.value) {
        let item1 = {
          name: item.name,
          value: !item.value,
          count: item.count,
        };
        return item1;
      } else return item;
    });

    this.setState({
      Services: services,
      Providers: providers,
      TvChannels: tvChannels,
    });
  };

  closeHandler = () => {
    this.setState({
      closed: true,
    });
  };

  buyNow = (buyNow: any) => {
    if (buyNow && buyNow.provider_name === "XFINITY") {
      window.open(buyNow && buyNow.plan_url, "_blank");
    } else {
      if (buyNow && buyNow.plan_url) {
        window.open(buyNow && buyNow.plan_url, "_blank");
      } else {
        let selected = this.state.selected;
        if (this.state.selected.length) {
          let selectedValues: any = [];
          if (!this.state.selected.includes(buyNow)) {
            this.state.selected.map((item: any) => {
              // if((buyNow.is_internet && item.is_internet) || (buyNow.is_tv && item.is_tv) || (buyNow.is_phone && item.is_phone)) {

              //   window.alert(`Plan Already Selected for ${item.is_tv ? 'TV' : item.is_phone ? 'Phone' : item.is_internet ? 'Internet' : ''}!`)
              // } else {

              //   selected.push(buyNow);

              // }
              if (item.is_internet && item.is_phone && item.is_tv) {
                selectedValues.push("internet");
                selectedValues.push("tv");
                selectedValues.push("phone");
              } else if (item.is_internet && item.is_phone && !item.is_tv) {
                selectedValues.push("internet");
                selectedValues.push("phone");
              } else if (item.is_internet && !item.is_phone && item.is_tv) {
                selectedValues.push("tv");
                selectedValues.push("internet");
              } else if (item.is_internet && !item.is_phone && !item.is_tv) {
                selectedValues.push("internet");
              } else if (item.is_phone && item.is_tv && !item.is_internet) {
                selectedValues.push("tv");
                selectedValues.push("phone");
              } else if (item.is_tv && !item.is_internet && !item.is_phone) {
                selectedValues.push("tv");
              } else if (item.is_phone && !item.is_internet && !item.is_tv) {
                selectedValues.push("phone");
              } else {
                selectedValues.push(null);
              }
            });

            if (
              (selectedValues.includes("tv") && buyNow.is_tv) ||
              (selectedValues.includes("phone") && buyNow.is_phone) ||
              (selectedValues.includes("internet") && buyNow.is_internet)
            ) {
              window.alert(
                `Plan Already Selected for ${
                  buyNow.is_tv
                    ? "TV"
                    : buyNow.is_phone
                    ? "Phone"
                    : buyNow.is_internet
                    ? "Internet"
                    : ""
                }!`
              );
            } else {
              selected.push(buyNow);
            }
          } else {
            selected = selected.filter((item: any) => item != buyNow);
          }
        } else {
          selected.push(buyNow);
        }
        this.setState({
          selected: selected,
        });
      }
    }
  };

  render() {
    let selected: any = this.state.selected;
    this.props.internetState &&
      this.props.internetState.internet &&
      this.props.internetState.internet.products &&
      this.props.internetState.internet.products.map((item: any) => {
        this.state.orderData.map((item2: any) => {
          if (
            item.is_internet === item2.plan_detail.is_internet &&
            item.is_tv === item2.plan_detail.is_tv &&
            item.is_phone === item2.plan_detail.is_phone &&
            item.base_price === item2.plan_detail.base_price &&
            item.provider_name === item2.plan_detail.provider_name
            // this.props.internetState.internet.products.includes(item2)
            // item === item2.plan_detail
          ) {
            if (!selected.includes(item)) {
              selected.push(item);
            }
          }
          return selected;
        });
      });
    this.state.selected = selected;

    let plans: any = [];
    let recommendedData: any = [];
    let { products } =
      this.props.internetState && this.props.internetState.internet;
    const { sort, viewDetailData } = this.state;
    let sortByData: any;
    let array1: any = [];
    let array2: any = [];
    let array3: any = [];

    if (products) {
      sortByData = products;

      // service wise filtered data
      if (this.state.Services && this.state.Services.length > 0) {
        let serviceFilters: any = [];
        this.state.Services.map(
          (item: any) => item.value && serviceFilters.push(item.name)
        );
        let b: any = [];
        if (serviceFilters.includes("Internet")) {
          let c: any = sortByData.filter(
            (item: any) =>
              item.is_internet === 1 && item.is_tv === 0 && item.is_phone === 0
          );
          b = b.concat(c);
        }
        if (serviceFilters.includes("TV")) {
          let c: any = sortByData.filter(
            (item: any) =>
              item.is_internet === 0 && item.is_tv === 1 && item.is_phone === 0
          );
          b = b.concat(c);
        }
        if (serviceFilters.includes("TV + Phone")) {
          let c: any = sortByData.filter(
            (item: any) =>
              item.is_internet === 0 && item.is_tv === 1 && item.is_phone === 1
          );
          b = b.concat(c);
        }
        if (serviceFilters.includes("Phone")) {
          let c: any = sortByData.filter(
            (item: any) =>
              item.is_internet === 0 && item.is_tv === 0 && item.is_phone === 1
          );
          b = b.concat(c);
        }
        if (serviceFilters.includes("Internet + TV + Phone")) {
          let c: any = sortByData.filter(
            (item: any) =>
              item.is_internet === 1 && item.is_tv === 1 && item.is_phone === 1
          );
          b = b.concat(c);
        }
        if (serviceFilters.includes("Internet + Phone")) {
          let c: any = sortByData.filter(
            (item: any) =>
              item.is_internet === 1 && item.is_tv === 0 && item.is_phone === 1
          );
          b = b.concat(c);
        }

        if (serviceFilters.includes("Internet + TV")) {
          let c: any = sortByData.filter(
            (item: any) =>
              item.is_internet === 1 && item.is_tv === 1 && item.is_phone === 0
          );
          b = b.concat(c);
        }

        if (serviceFilters.length > 0) {
          sortByData = b;
        }
      }

      // Provider wise filtered data
      let providerFilters: any = [];
      this.state.Providers.map(
        (item: any) => item.value && providerFilters.push(item.name)
      );
      if (
        this.state.Providers &&
        this.state.Providers.length > 0 &&
        providerFilters.length > 0
      ) {
        let b: any = [];
        let c: any = sortByData.filter((item: any) =>
          providerFilters.includes(item.provider_name)
        );
        b = c;
        sortByData = b;
      }

      // //Average speed filtered data
      // let speedFilters: any = [];
      // this.state.AverageSpeed.map((item: any) => item.value && speedFilters.push(item.name));
      // if (this.state.AverageSpeed && this.state.AverageSpeed.length > 0 && speedFilters.length > 0) {
      //     let b: any = [];
      //     if (speedFilters.includes('1-29Mbps')) {
      //         let c: any = sortByData.filter((item: any) => item.download_speed >= 1 && item.download_speed < 29);
      //         b = b.concat(c);
      //     }

      //     if (speedFilters.includes('30-59Mbps')) {
      //         let c: any = sortByData.filter(
      //             (item: any) => item.download_speed >= 30 && item.download_speed < 59,
      //         );
      //         b = b.concat(c);
      //     }

      //     if (speedFilters.includes('60-99Mbps')) {
      //         let c: any = sortByData.filter(
      //             (item: any) => item.download_speed >= 60 && item.download_speed < 99,
      //         );
      //         b = b.concat(c);
      //     }

      //     if (speedFilters.includes('100+Mbps')) {
      //         let c: any = sortByData.filter((item: any) => item.download_speed >= 100);
      //         b = b.concat(c);
      //     }
      //     sortByData = b;
      // }

      //No of channels filtered data
      let channelFilters: any = [];
      this.state.TvChannels.map(
        (item: any) => item.value && channelFilters.push(item.name)
      );
      if (
        this.state.TvChannels &&
        this.state.TvChannels.length > 0 &&
        channelFilters.length > 0
      ) {
        let b: any = [];

        if (channelFilters.includes("10 and up")) {
          let c: any = sortByData.filter((item: any) => {
            return (
              item &&
              item.no_of_channels &&
              item.no_of_channels.toString().match(/\d+/) &&
              item.no_of_channels.toString().match(/\d+/)[0] >= 10 &&
              item.no_of_channels.toString().match(/\d+/)[0] < 100
            );
          });
          b = b.concat(c);
        }

        if (channelFilters.includes("100+")) {
          let c: any = sortByData.filter(
            (item: any) =>
              item.no_of_channels &&
              item.no_of_channels.toString().match(/\d+/) &&
              item.no_of_channels.toString().match(/\d+/)[0] >= 100 &&
              item.no_of_channels.toString().match(/\d+/)[0] < 200
          );
          b = b.concat(c);
        }

        if (channelFilters.includes("200+")) {
          let c: any = sortByData.filter(
            (item: any) =>
              item.no_of_channels &&
              item.no_of_channels.toString().match(/\d+/) &&
              item.no_of_channels.toString().match(/\d+/)[0] >= 200
          );
          b = b.concat(c);
        }
        sortByData = b;
      }

      //Monthly Cost filtered data
      // let monthlyCostFilters: any = [];
      // this.state.MonthlyCost.map((item: any) => item.value && monthlyCostFilters.push(item.name));
      // if (this.state.MonthlyCost && this.state.MonthlyCost.length > 0 && monthlyCostFilters.length > 0) {
      //     let b: any = [];
      //     if (monthlyCostFilters.includes('$0-$24')) {
      //         let c: any = sortByData.filter((item: any) => item.base_price >= 0 && item.base_price < 24);
      //         b = b.concat(c);
      //     }

      //     if (monthlyCostFilters.includes('$25-$50')) {
      //         let c: any = sortByData.filter((item: any) => item.base_price >= 25 && item.base_price < 50);
      //         b = b.concat(c);
      //     }

      //     if (monthlyCostFilters.includes('$51-$100')) {
      //         let c: any = sortByData.filter((item: any) => item.base_price >= 51 && item.base_price < 100);
      //         b = b.concat(c);
      //     }

      //     if (monthlyCostFilters.includes('$100+')) {
      //         let c: any = sortByData.filter((item: any) => item.base_price >= 100);
      //         b = b.concat(c);
      //     }
      //     sortByData = b;
      // }
      if (sort.value === "LH") {
        sortByData = this.sortByKey(sortByData, "base_price");
      } else {
        sortByData = this.sortByKey(sortByData, "base_price").reverse();
      }
      if (sortByData.length > 3) {
        let str1: any = "";
        for (const [key, value] of Object.entries(this.state.step3)) {
          if (value) {
            str1 = key;
          }
        }

        if (str1 != "") {
          let array1: any = [];
          if (str1 === "movies") {
            array1 = sortByData.filter(
              (item: any) =>
                item.download_speed >= 0 && item.download_speed < 25
            );
          } else if (str1 === "wfh") {
            array1 = sortByData.filter(
              (item: any) =>
                item.download_speed >= 25 && item.download_speed < 100
            );
          } else if (str1 === "downloading") {
            array1 = sortByData.filter(
              (item: any) =>
                item.download_speed >= 100 && item.download_speed < 200
            );
          } else if (str1 === "videoCalls") {
            array1 = sortByData.filter(
              (item: any) =>
                item.download_speed >= 200 && item.download_speed < 400
            );
          } else if (str1 === "videoGames") {
            array1 = sortByData.filter(
              (item: any) => item.download_speed >= 1000
            );
          }
          array1 = this.sortByKey(array1, "base_price");
          // recommendedData = array1.slice(0, 3);
        } else if (this.state.step1.internet) {
          let str: string;
          let num: number = 0;
          let array: any = [];
          for (const [key, value] of Object.entries(this.state.step2)) {
            if (value) {
              str = key;
              if (str == "one") {
                num = 1;
              } else if (str == "two") {
                num = 2;
              } else if (str == "three") {
                num = 3;
              } else if (str == "four") {
                num = 4;
              }
            }
          }
          if (num !== 0) {
            if (num === 1) {
              array = sortByData.filter(
                (item: any) =>
                  item.download_speed >= 25 && item.download_speed < 100
              );
            } else if (num === 2) {
              array = sortByData.filter(
                (item: any) =>
                  item.download_speed >= 100 && item.download_speed < 200
              );
            } else if (num === 3) {
              array = sortByData.filter(
                (item: any) =>
                  item.download_speed >= 200 && item.download_speed < 400
              );
            } else if (num === 4) {
              array = sortByData.filter(
                (item: any) => item.download_speed >= 400
              );
            }
            array = this.sortByKey(array, "base_price");
            // recommendedData = array.slice(0, 3);
          } else {
            let plans2 = this.sortByKey(sortByData, "base_price");
            // recommendedData = plans2.slice(0, 3);
          }
        } else {
          let plans2 = this.sortByKey(sortByData, "base_price");
          // recommendedData = plans2.slice(0, 3);
        }
      }
      if (sortByData.length > 23) {
        plans = sortByData.slice(0, 23);
      } else {
        plans = sortByData;
      }
    }
    // if (recommendedData && recommendedData.length === 0 && plans.length >= 3) {
    //     let recommendedData1 = this.sortByKey(plans, 'base_price');
    //     recommendedData = recommendedData1.slice(0, 3);
    //     plans.splice(0, 1);
    //     plans.splice(1, 1);
    //     plans.splice(2, 1);
    // }

    if (
      this.state.step1.internet == true &&
      this.state.step1.TV == false &&
      this.state.step1.Phone == false
    ) {
      products =
        products &&
        products.filter((item: any) => {
          return item && item.is_internet == 1;
        });
    }
    return (
      <div className="ConciergeFlowPage">
        <div className="conciergeFlowHeading">Concierge workflow</div>

        <div>
          <ConciergeTabs
            tabName={"Int/Cable"}
            tabId={5}
            history={this.props.history}
          />
        </div>
        <div className="component-div">
          <div className="componetContent">
            <div className="internet1-main">
              <div className="internet1-heading">
                <div className="internet1">Internet / Cable </div>
                <div>
                  <div className="titleNumberInternet">
                    <div className="left-number">5</div>
                    <div className="right-number">7</div>
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
                <div className="helpful-div-internet">
                  <HelpfulText
                    heading="HELPFUL HINT"
                    para={this.state.hintContent}
                    handleHelpClose={this.closeHandler}
                  />
                </div>
              ) : null}
              {
                <div className="script-div">
                  {this.state.scriptContent &&
                    this.state.scriptContent.map((item: any) => {
                      return (
                        <div className="point-content-wrapper-internet1-script">
                          <div className="points-div-internet1">
                            <div className="outer-point-internet1">
                              <div className="inner-point-internet1"></div>
                            </div>
                            <div className="vertical-line-internet1"></div>
                          </div>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                            className="point-content-internet1 point-content-padding"
                          ></div>
                        </div>
                      );
                    })}
                </div>
              }
              <div className="point-content-wrapper-internet1">
                <div className="points-div-internet1">
                  <div className="outer-point-internet1">
                    <div className="inner-point-internet1"></div>
                  </div>
                  <div className="vertical-line-internet1"></div>
                </div>

                <div className="point-content-internet1">
                  <div className="flex-div">
                    <div className="left">
                      Figure out bundling opoportunities.
                    </div>
                    <div className="right">
                      {this.state.filtersOpen == false ? (
                        <div className="filters-div">
                          <div
                            onClick={() => {
                              this.setState({
                                filtersOpen: true,
                              });
                            }}
                          >
                            {" "}
                            Filters
                          </div>
                          <div
                            className="expandIcon"
                            onClick={() => {
                              this.setState({
                                filtersOpen: true,
                              });
                            }}
                          >
                            <ExpandMoreIcon style={{ color: "#52BDE6" }} />
                          </div>
                        </div>
                      ) : null}
                      {this.state.filtersOpen ? (
                        <div className="filters-main-outer">
                          <Filters
                            Services={this.state.Services}
                            Providers={this.state.Providers}
                            AverageSpeed={this.state.AverageSpeed}
                            TvChannels={this.state.TvChannels}
                            MonthlyCost={this.state.MonthlyCost}
                            changeServices={(val: any) =>
                              this.changeServices(val)
                            }
                            changeProviders={(val: any) =>
                              this.changeProviders(val)
                            }
                            changeAverageSpeed={(val: any) =>
                              this.changeAverageSpeed(val)
                            }
                            changeTvChannels={(val: any) =>
                              this.changeTvChannels(val)
                            }
                            changeMonthlyCost={(val: any) =>
                              this.changeMonthlyCost(val)
                            }
                            clearAllHandler={this.clearAll}
                            clickAway={() => {
                              this.setState({
                                filtersOpen: false,
                              });
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {this.state.loader2 == true ? (
                    <div style={{ margin: "15px auto", textAlign: "center" }}>
                      <CircularProgress />
                    </div>
                  ) : null}
                  {plans &&
                    plans.map((item: any) => {
                      return (
                        <div className="internetStep5">
                          <SecurityPersonalised
                            companyLogo={item.provider_logo}
                            companyTitle={item.provider_name}
                            trophyLogo={item.trophyLogo ? item.trophyLogo : ""}
                            trophyText={item.trophyText ? item.trophyText : ""}
                            monitoring={"INTERNET SPEED"}
                            internetSpeed={item.download_speed}
                            internetSpeedUnit={"Mbps"}
                            tvChannels={"TV CHANNELS"}
                            tvChannelsNumber={item.no_of_channels}
                            contract={"CONTRACT TERM"}
                            contractMonth={
                              item.service_contract_length
                                ? item.service_contract_length
                                : "NA"
                            }
                            perMonth={item.base_price_first}
                            perMonthPower={item.base_price_second}
                            selected={this.state.selected.includes(item)}
                            BuyNowHandler={() => {
                              this.buyNow(item);
                            }}
                            ViewDetailsHandler={() => console.log("Hello")}
                            Communications={
                              item.is_internet && item.is_phone && item.is_tv
                                ? [
                                    {
                                      // text: "Internet",
                                      icon: (
                                        <img
                                          src={Wifi}
                                          className="communicationsIcon"
                                        />
                                      ),
                                    },
                                    {
                                      // text: "Phone",
                                      icon: (
                                        <img
                                          src={Phone}
                                          className="communicationsIcon"
                                        />
                                      ),
                                    },
                                    {
                                      // text: "TV",
                                      icon: (
                                        <img
                                          src={TV}
                                          className="communicationsIcon"
                                        />
                                      ),
                                    },
                                  ]
                                : item.is_internet &&
                                  item.is_phone &&
                                  !item.is_tv
                                ? [
                                    {
                                      // text: "Internet",
                                      icon: (
                                        <img
                                          src={Wifi}
                                          className="communicationsIcon"
                                        />
                                      ),
                                    },
                                    {
                                      // text: "Phone",
                                      icon: (
                                        <img
                                          src={Phone}
                                          className="communicationsIcon"
                                        />
                                      ),
                                    },
                                  ]
                                : item.is_internet &&
                                  !item.is_phone &&
                                  item.is_tv
                                ? [
                                    {
                                      // text: "Internet",
                                      icon: (
                                        <img
                                          src={Wifi}
                                          className="communicationsIcon"
                                        />
                                      ),
                                    },
                                    {
                                      // text: "TV",
                                      icon: (
                                        <img
                                          src={TV}
                                          className="communicationsIcon"
                                        />
                                      ),
                                    },
                                  ]
                                : item.is_internet &&
                                  !item.is_phone &&
                                  !item.is_tv
                                ? [
                                    {
                                      // text: "Internet",
                                      icon: (
                                        <img
                                          src={Wifi}
                                          className="communicationsIcon"
                                        />
                                      ),
                                    },
                                  ]
                                : item.is_phone &&
                                  item.is_tv &&
                                  !item.is_internet
                                ? [
                                    {
                                      // text: "Phone",
                                      icon: (
                                        <img
                                          src={Phone}
                                          className="communicationsIcon"
                                        />
                                      ),
                                    },
                                    {
                                      // text: "TV",
                                      icon: (
                                        <img
                                          src={TV}
                                          className="communicationsIcon"
                                        />
                                      ),
                                    },
                                  ]
                                : item.is_tv &&
                                  !item.is_internet &&
                                  !item.is_phone
                                ? [
                                    {
                                      // text: "TV",
                                      icon: (
                                        <img
                                          src={TV}
                                          className="communicationsIcon"
                                        />
                                      ),
                                    },
                                  ]
                                : item.is_phone &&
                                  !item.is_internet &&
                                  !item.is_tv
                                ? [
                                    {
                                      // text: "Phone",
                                      icon: (
                                        <img
                                          src={Phone}
                                          className="communicationsIcon"
                                        />
                                      ),
                                    },
                                  ]
                                : []
                            }
                          />
                        </div>
                      );
                    })}
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
              ButtonOnClick1={() =>
                this.props.history.push(
                  "/dashboard/concierge/workflow/internetstep2"
                )
              }
              ButtonOnClick2={() => {
                this.nextHandler();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch: any) {
  return {
    internetAction: bindActionCreators(InternetAction, dispatch),
    commonAction: bindActionCreators(CommonAction, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  internetState: state.internet,
  commonState: state.common,
});

export default connect(mapStateToProps, mapDispatchToProps)(InternetStep5);
