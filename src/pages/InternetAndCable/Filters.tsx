import React, { Component } from "react";
import CheckboxText from "../../components/Internet/CheckboxText";
import "./filters.scss";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

type initialProps = {
  Services: any;
  Providers: any;
  AverageSpeed: any;
  TvChannels: any;
  MonthlyCost: any;
  changeServices: any;
  changeProviders: any;
  changeAverageSpeed: any;
  changeTvChannels: any;
  changeMonthlyCost: any;
  styles?: any;
  clearAllHandler?: any;
  clickAway?: any;
};
type initialState = {
  checked: boolean;
  open: boolean;
};

function dynamicSort(property: string) {
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a: any, b: any) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  };
}
export class Filters extends Component<initialProps, initialState> {
  state: initialState = {
    checked: false,
    open: true,
  };

  handleServicesChange = (e: any) => {
    if (e.target.name !== "All Services") {
      let array = this.props.Services.map((item: any) => {
        if (item.name === e.target.name) {
          let item1 = {
            name: item.name,
            value: !item.value,
            count: item.count,
          };
          return item1;
        } else return item;
      });
      let array1 = array.filter((item: any) => item.name !== "All Services");
      let array2 = array1.filter((item: any) => item.value === false);

      array = array.map((item: any) => {
        let item1;
        if (item.name === "All Services") {
          item1 = {
            name: item.name,
            value: array2.length > 0 ? false : true,
            count: item.count,
          };
          return item1;
        } else {
          return item;
        }
      });

      this.props.changeServices(array);
    } else {
      let a = this.props.Services.find(
        (item: any) => item.name === "All Services"
      );
      if (a) {
        let array = [];
        if (a.value === false) {
          array = this.props.Services.map((item: any) => {
            let item1 = {
              name: item.name,
              value: true,
              count: item.count,
            };
            return item1;
          });
        } else {
          array = this.props.Services.map((item: any) => {
            let item1 = {
              name: item.name,
              value: false,
              count: item.count,
            };
            return item1;
          });
        }
        this.props.changeServices(array);
      }
    }
  };

  handleProvidersChange = (e: any) => {
    let array = this.props.Providers.map((item: any) => {
      if (item.name === e.target.name) {
        let item1 = {
          name: item.name,
          value: !item.value,
          count: item.count,
        };
        return item1;
      } else return item;
    });
    this.props.changeProviders(array);
  };

  handleAverageSpeedChange = (e: any) => {
    let array = this.props.AverageSpeed.map((item: any) => {
      if (item.name === e.target.name) {
        let item1 = {
          name: item.name,
          value: !item.value,
          count: item.count,
        };
        return item1;
      } else return item;
    });
    this.props.changeAverageSpeed(array);
  };

  handleTvChannelsChange = (e: any) => {
    let array = this.props.TvChannels.map((item: any) => {
      if (item.name === e.target.name) {
        let item1 = {
          name: item.name,
          value: !item.value,
          count: item.count,
          prevRange: item.count,
        };
        return item1;
      } else return item;
    });
    this.props.changeTvChannels(array);
  };

  handleMonthlyCostChange = (e: any) => {
    let array = this.props.MonthlyCost.map((item: any) => {
      if (item.name === e) {
        let item1 = {
          name: item.name,
          value: !item.value,
          count: item.count,
          prevRange: item.prevRange,
          nextRange: item.nextRange,
        };
        return item1;
      } else return item;
    });
    this.props.changeMonthlyCost(array);
  };

  clearMonthlyHandler = () => {
    let array = this.props.MonthlyCost.map((item: any) => {
      let item1 = {
        name: item.name,
        value: false,
        count: item.count,
        prevRange: item.prevRange,
        nextRange: item.nextRange,
      };
      return item1;
    });
    this.props.changeMonthlyCost(array);
  };

  clearServicesHandler = () => {
    let array = this.props.Services.map((item: any) => {
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
    });
    this.props.changeServices(array);
  };

  clearProvidersHandler = () => {
    let array = this.props.Providers.map((item: any) => {
      let item1: any;
      if (item.name === "Providers") {
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
    });
    this.props.changeProviders(array);
  };

  clearTvChannelsHandler = () => {
    let array = this.props.TvChannels.map((item: any) => {
      let item1: any;
      if (item.name === "TV Channels") {
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
    });
    this.props.changeTvChannels(array);
  };

  render() {
    let Providers = this.props.Providers.sort(dynamicSort("name"));
    return (
      <div>
        <div className="filters-heading">
          <div className="filter-head" onClick={this.props.clickAway}>
            {" "}
            Filters
          </div>
          <div style={{ display: "flex" }}>
            <div
              className="clear-head"
              onClick={this.props.clickAway}
              style={{ marginRight: "10px", textDecoration: "none" }}
            >
              {" "}
              Save
            </div>
            <div className="clear-head" onClick={this.props.clearAllHandler}>
              Clear all
            </div>
          </div>
        </div>
        {this.state.open == true ? (
          <div
            className="main-filters"
            style={{
              height: this.state.open ? "60vh" : "",
              overflowY: this.state.open ? "scroll" : "hidden",
            }}
          >
            <div className="headDv">
              <div className="heads1">Services</div>
              <div className="link" onClick={this.clearServicesHandler}>
                clear
              </div>
            </div>

            {this.props.Services.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <div className="checkbox-item filtersDivab">
                    <CheckboxText
                      className="counting"
                      checked={item.value}
                      onChange={(e: any) => this.handleServicesChange(e)}
                      label={`${item.name}`}
                      // disabled={item.name === 'All Services'}
                      name={item.name}
                    />
                    <div className="countStyle">({item.count})</div>
                  </div>
                </div>
              );
            })}
            {/* <div className="line1"></div>
             <div className="headsic">Average Speed</div>
             {this.props.AverageSpeed.map((item: any, index: number) => {
                 return (
                     <div key={index}>
                         <div className="checkbox-item">
                             <CheckboxText
                                 className="counting"
                                 checked={item.value}
                                 onChange={(e: any) => this.handleAverageSpeedChange(e)}
                                 label={`${item.name}`}
                                 name={item.name}
                             />
                             <div className="countStyle">({item.count})</div>
                         </div>
                     </div>
                 );
             })} */}
            <div className="line1"></div>
            <div className="headDv">
              <div className="headsic">Providers</div>
              <div className="link" onClick={this.clearProvidersHandler}>
                clear
              </div>
            </div>
            {Providers.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <div className="checkbox-item">
                    <CheckboxText
                      className="counting"
                      checked={item.value}
                      onChange={(e: any) => this.handleProvidersChange(e)}
                      label={`${item.name}`}
                      name={item.name}
                    />
                    <div className="countStyle">({item.count})</div>
                  </div>
                </div>
              );
            })}
            {/* <div className="line1"></div>
             <div className="headDv">
                 <div className="headsic">Monthly Cost</div>
                 <div className="link" onClick={this.clearMonthlyHandler}>
                     clear
                 </div>
             </div> */}
            {/* <div className="checkbox-item1">
                 {this.props.MonthlyCost.map((item: any, index: number) => {
                     return (
                         <div key={index}>
                             <div>
                                 <div
                                     className={item.value ? 'blueColor' : 'dummyColor'}
                                     onClick={() => this.handleMonthlyCostChange(item.name)}
                                 >
                                     {item.name}
                                 </div>
                             </div>
                         </div>
                     );
                 })}
             </div> */}
            <div className="line1"></div>
            <div className="headDv">
              <div className="headsic">TV Channels</div>
              <div className="link" onClick={this.clearTvChannelsHandler}>
                clear
              </div>
            </div>
            {this.props.TvChannels.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <div className="checkbox-item">
                    <CheckboxText
                      className="counting"
                      checked={item.value}
                      onChange={(e: any) => this.handleTvChannelsChange(e)}
                      label={`${item.name}`}
                      name={item.name}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Filters;
