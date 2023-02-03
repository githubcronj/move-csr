import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Action from "../store/todo/actions";
// import { tableData } from "./Dashboard/data.json";
import InsuranceCard from "../components/Insurance/InsuranceCard";
// import TableComponent from "../components/atoms/Table/Table";
import LeftColProgressBar from "../components/atoms/LeftColProgressBar";
import CustomerDetails from "../components/atoms/CustomerDetails/CustomerDetails";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import HelpfulText from "../components/atoms/HelpfulText/HelpfulText";
import Discovery from "../pages/Discovery/Discovery";
import CustomizedInput from "../components/atoms/CustomizedInput";
import CustomizedSelect from "../components/atoms/CustomizedSelect";
import InputAdornment from "@material-ui/core/InputAdornment";
import MoversInputs from "../components/Movers/Inputs/MoverInputs";
import AddressIcon from "../Assets/images/Movers/addressIcon.svg";
import PODS from "../Assets/images/Movers/PODS.svg";
import MoversCard from "../components/Movers/MoversCard/MoversCard";
// import InsuranceCompanyCard from "../components/Insurance/InsuranceCompanyCard";
import MoversRatingCard from "../components/Movers/MoversRatingCard";
import SmallMoverCard from "../components/Movers/SmallMoverCard";
import sampleLogo from "../Assets/images/Movers/sample-logo.png";
// import MoversStep4 from "./Movers/MoversStep4";
import InsuranceDiscount from "../components/Insurance/InsuranceDiscount";
import womenImg from "../Assets/images/Insurance/Group 34072.svg";
import InsuranceSchedule from "../components/Insurance/InsuranceSchedule";
import InsuranceCompany from "../Assets/images/Insurance/insuranceCompany.svg";
import OrderCompletionCard from "../components/OrderCompletionCard/OrderCompletionCard";
import CommonCard from "../components/atoms/CommonCard";
import CommonIcon from "../Assets/images/Insurance/Icon1.svg";
import SecurityPersonalised from "../components/Insurance/SecurityPersonalised";
import trophyLogo from "../Assets/images/Insurance/Vector.png";
import WifiIcon from "@material-ui/icons/Wifi";
import PhoneIcon from "@material-ui/icons/Phone";
import TvIcon from "@material-ui/icons/Tv";
import SecurityMainCard from "../components/Security/SecurityMainCard";
import SecurityUpdatedCard from "../components/Security/SecurityUpdatedCard";
import UtilitiesFirstCard from "../components/Utilities/UtilitiesFirstCard";
import * as Action2 from "../store/dashboard/actions";
import UtilitiesSecondCard from "../components/Utilities/UtilitiesSecondCard";
import SummaryFirstCard from "../components/summary/SummaryFirstCard";
import SecurityADT from "../Assets/images/Security/Security-ADT.svg";
import ObjectionCard1 from "../components/Objection/ObjectionCard1";
import ObjectionCard2 from "../components/Objection/ObjectionCard2";
import ProviderServicesCard from "../components/HomePros/PopularServicesCard";
import img from "../Assets/images/HomePros/02.jpg";

type initialProps = {
  todoAction: any;
  todoState: any;
  dashboardAction: any;
  dashboardState: any;
};

type initialState = {
  users: any;
};

class Homepage extends Component<initialProps, initialState> {
  state: initialState = {
    users: [],
  };
  columns = [
    {
      title: "No",
      field: "no",
    },
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Brokerage",
      field: "brokerage",
    },
    {
      title: "Move Date",
      field: "moveDate",
    },
    {
      title: "Appt Date And Time",
      field: "apptDateTime",
    },
    {
      title: "Sold",
      field: "sold",
      render: (rowData: any) => {
        return <div className="soldDiv">{rowData.sold}</div>;
      },
    },
  ];
  columns1 = [
    {
      text: "No",
      dataField: "no",
    },
    {
      text: "Name",
      dataField: "name",
    },
    {
      text: "Email",
      dataField: "email",
    },
    {
      text: "Brokerage",
      dataField: "brokerage",
    },
    {
      text: "Move Date",
      dataField: "moveDate",
    },
    {
      text: "Appt Date And Time",
      dataField: "apptDateTime",
    },
    {
      text: "Sold",
      dataField: "sold",
      formatter: (rowData: any, cell: any, row: any, rowIndex: any) => {
        return <div className="soldDiv">{cell.sold}</div>;
      },
    },
  ];

  componentDidMount() {
    this.props.todoAction.fetchTodoRequest();
    this.props.dashboardAction.users();
  }

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    // if (nextProps && nextProps.todoState && nextProps.todoState.todos) {
    //   console.log(nextProps.todoState.todos);
    // }

    if (
      nextProps &&
      nextProps.dashboardState &&
      nextProps.dashboardState.users &&
      nextProps.dashboardState.users !== []
    ) {
      // console.log("users",nextProps.dashboardState.users);
      // currentState.users=nextProps.dashboardState.users
    }

    return currentState;
  }

  render() {
    // const Date = ["24 Sep 2011"];
    // const Days = ["35"];

    // const fromaddress = ["3673 Kite Street,San Diego,CA 92103"];
    // const toaddress = ["3673 Kite Street,San Diego,CA 92103"];

    // const Name = ["Kounain Shariff "];
    // const Email = ["example@testmail.com"];
    // const Phone = ["+1 911929394"];
    // const RealtorCompanyName = ["Berkshire Hathaway Concierge "];

    // const CustomerCheckInDate = ["27 July 2021, 05:23 pm EST"];
    // const CustomerEmail = ["mariano.rosgago@gmail.com "];
    // const CustomerPhone = ["+1 777-464-5748"];

    // const day = ["Monday"];
    // const date = ["23 June 2021"];
    // const notes = [
    //   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem aut neque iste ratione, error ex.",
    // ];

    return (
      <div className="Homepage-main-page">
        <div
          style={{
            margin: "100px auto",
            width: "30%",
          }}
        >
          <ObjectionCard1
            objection1="I am setting up internet myself"
            possibility="4 possible rebutals"
          />
          <ObjectionCard1
            objection1="I am setting up internet myself"
            possibility="4 possible rebutals"
            selected={true}
          />
          <ObjectionCard2 objection2="I am setting up internet myself" />
          <ObjectionCard2
            objection2="I am setting up internet myself"
            selected={true}
          />
        </div>

        <div
          style={{
            margin: "100px auto",
            width: "100%",
          }}
        >
          {/* <div className="content" dangerouslySetInnerHTML={{__html: this.state.users}}></div> */}

          <SummaryFirstCard
            name="Mariano Rosgago"
            email="mariano.rosgago@gmail.com"
            time="03:20 hrs"
            amount="$123.99"
          />

          <div style={{ width: "100%", marginTop: "50px" }}>
            <SecurityUpdatedCard
              logo={SecurityADT}
              title={"ADT"}
              planType="Remote"
              Price={29}
            />
            <SecurityUpdatedCard
              logo={SecurityADT}
              title={"ADT"}
              planType="Remote"
              Price={29}
              selected={true}
            />
          </div>
        </div>

        <div
          style={{
            margin: "100px auto",
            width: "40%",
          }}
        >
          <UtilitiesSecondCard
            logo={sampleLogo}
            title="GAS"
            subTitle="AEP Ohio"
            phone="+1 777-464-5748"
          />

          <UtilitiesFirstCard
            icon={<img src={AddressIcon} />}
            title="ELECTRICITY"
            subTitle="AEP Ohio"
            completed={false}
          />
        </div>
        <div
          style={{
            margin: "100px auto",
            width: "80%",
          }}
        >
          <SecurityMainCard
            title="Vivint"
            rateGiven={9.9}
            rateTotal={10}
            price={27}
            contactParam="NO"
            monitoringPrice={49}
            equipmentPrice={499}
          />
        </div>
        <CustomizedInput
          onChange={() => console.log("change")}
          label="Input"
          value={"100"}
        />
        <CustomizedInput
          onChange={() => console.log("change")}
          label="Input"
          value={"100"}
          InputProps={{
            endAdornment: <InputAdornment position="start">Hii</InputAdornment>,
          }}
        />
        <CustomizedSelect
          onChange={() => console.log("change")}
          label="Input"
          value={"100"}
          options={[{ value: "100", label: "100" }]}
        />

        <MoversInputs
          title="Move From"
          icon={<img src={AddressIcon} />}
          inputComponent={
            <CustomizedInput
              onChange={() => console.log("change")}
              label="Input"
              value={"100"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">Hii</InputAdornment>
                ),
              }}
            />
          }
        />
        <InsuranceDiscount
          insuranceDcHandle={() => console.log("Hello")}
          dcheading={"Unlock additional providers discounts"}
          dcsubheading={
            "Answer few more questions and availability for eligible discounts"
          }
          insurancebutton={"Get Started"}
          imgdiscount={womenImg}
        />

        <SecurityPersonalised
          companyLogo={"AT & T Internet"}
          // trophyLogo={trophyLogo}
          // trophyText={"BEST OVERALL VALUE"}
          monitoring={"Internet speed"}
          internetSpeed={63}
          internetSpeedUnit={"Mbps"}
          tvChannels={"Tv Channels"}
          tvChannelsNumber={"100+"}
          contract={"Contract Term"}
          contractMonth={"12 mo."}
          perMonth={"27"}
          perMonthPower={"99"}
          BuyNowHandler={() => console.log("Hello")}
          ViewDetailsHandler={() => console.log("Hello")}
          Communications={[
            { text: "Internet", icon: <WifiIcon /> },
            { text: "Phone", icon: <PhoneIcon /> },
            { text: "TV", icon: <TvIcon /> },
          ]}
        ></SecurityPersonalised>
        <InsuranceSchedule></InsuranceSchedule>

        <MoversCard
          icon={<img src={PODS} />}
          isRecommended={true}
          title="PODS"
          subTitle="pods are selected"
          featuers={[
            "Store on property or at a facility",
            "Store on property or at a facility",
            "Store on property or at a facility",
          ]}
          selected={true}
        />
        <div style={{ width: "80%", margin: "100px auto" }}>
          <MoversRatingCard
            logo={sampleLogo}
            title={"Air Van northAmericanVan Lines"}
            rate={4.8}
            reviews={122}
            phone="+1 777-464-5748"
            address="123 Main Street,Columbus, OH 43212"
          />
          <MoversRatingCard
            logo={sampleLogo}
            title={"Air Van northAmericanVan Lines"}
            rate={4.8}
            reviews={122}
            phone="+1 777-464-5748"
            address="123 Main Street,Columbus, OH 43212"
            recommended={true}
          />
        </div>
        <div style={{ width: "20%", margin: "0 auto" }}>
          <SmallMoverCard
            title={"northAmericanVan Lines"}
            phone="+1 777-464-5748"
            emailStatus="xyzxxxx"
          />
        </div>
        <Discovery />
        {/* <MoversStep4 /> */}
        {/* <div className="row mt-5">
                    <div className="col-md-4"> Hello</div>
                    <div className="col-md-4"> You</div>
                    <div className="col-md-4"> Yourrrr</div>
                </div> */}
        <div
          style={{
            width: "80%",
            margin: "20px auto",
          }}
        >
          <HelpfulText
            heading="HELPFUL HINT"
            para="Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Curabitur blandit tempus porttitor.Vestibulum id ligula porta felis euismod semper."
          />
        </div>

        {/* <InsuranceCard
          PlanButtonClick={() => console.log()}
          CoverageHandler={() => console.log()}
          insuranceName={" Safe Insurance"}
          monthlyCost={"28"}
          yearlyCost={"$339* for 12 months"}
        />
        <InsuranceCompanyCard
          image={InsuranceCompany}
          insuranceCompanyName={"State Auto"}
          EditHandler={() => console.log()}
        />
 */}
        <OrderCompletionCard OrderSaveHandler={() => console.log()} />

        <CommonCard
          isSelected={false}
          commonImg={CommonIcon}
          commonCardText={"Local & long distance calling"}
          SelectHandler={() => console.log()}
        />

        <LeftPanel />

        <ProviderServicesCard serviceimg={img}></ProviderServicesCard>

        {/* <LeftColProgressBar />
        <CustomerDetails
          CustomerCheckInDate={CustomerCheckInDate}
          CustomerEmail={CustomerEmail}
          CustomerPhone={CustomerPhone}
        /> */}

        {/* <MovingDate Days={Days} Date={Date} />

        <MovingDetailsCard fromaddress={fromaddress} toaddress={toaddress} />

        <CustomerNotes day={day} date={date} notes={notes} /> */}

        {/* <div style={{ width: "70%", margin: "100px 0 0 50px" }}>
          <TableComponent
            data={tableData}
            columns={this.columns}
            nopagination={true}
            className=""
            resizable={false}
            onRowClick={() => console.log("hii")}
          />
        </div> */}
        {/* <RealtorDataCard
          image={RealtorImg}
          Name={Name}
          Email={Email}
          Phone={Phone}
          RealtorCompanyName={RealtorCompanyName}
        /> */}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    todoAction: bindActionCreators(Action, dispatch),
    dashboardAction: bindActionCreators(Action2, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  todoState: state.todo,
  dashboardState: state.dashboard,
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
