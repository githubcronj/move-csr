import React, { Component } from 'react';
import CheckboxText from '../../components/Internet/CheckboxText';
import './filtersSecurity.scss';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

type initialProps = {
    Providers: any;
    changeProviders: any;
    changeInstallations: any;
    clearAllHandler ? : any
    Installations ? : any
    clickAway ? : any
};
type initialState = {
    checked: boolean;
    open:boolean
};


export class  FiltersSecurity extends Component<initialProps, initialState> {
    state: initialState = {
        checked: false,
        open:true
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




    clearProvidersHandler = () => {
        let array = this.props.Providers.map((item: any) => {
            let item1: any;
            if (item.name === 'Providers') {
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

    handleInstallationsChange = (e: any) => {
        let array = this.props.Installations.map((item: any) => {
            if (item.name === e.target.name) {
                let item1 = {
                    name: item.name,
                    value: !item.value,
                    count: item.count,
                };
                return item1;
            } else return item;
        });
        this.props.changeInstallations(array);
    };




    clearInstallationssHandler = () => {
        let array = this.props.Installations.map((item: any) => {
            let item1: any;
            if (item.name === 'Installations') {
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
        this.props.changeInstallations(array);
    };

    handleClickAway=()=>{
        this.props.clickAway()
    }


    render() {

        let Providers=this.props.Providers
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
           <div className="filters-main">
             <div className="filters-heading" >
            <div className="filter-head" > Filters</div>
            <div className="clear-head" onClick={this.props.clearAllHandler}>Clear all</div>
         </div>
         {
             this.state.open==true ?    <div className="main-filters" style={{height:this.state.open ? '60vh' : '' , overflowY: this.state.open ? 'scroll' : 'hidden'}} >
              
             <div className="headDv">
                 <div className="heads1">Providers</div>
                 <div className="link" onClick={this.clearProvidersHandler}>
                     clear 
                 </div>
             </div>

             {this.props.Providers.map((item: any, index: number) => {
                 return (
                     <div key={index}>
                         <div className="checkbox-item filtersDivab">
                             <CheckboxText
                                 className="counting"
                                 checked={item.value}
                                 onChange={(e: any) => this.handleProvidersChange(e)}
                                 label={`${item.name}`}
                                 // disabled={item.name === 'All Services'}
                                 name={item.name}
                             />
                             <div className="countStyle">({item.count})</div>
                         </div>
                     </div>
                 );
             })}
    
             <div className="line1"></div>
           <div className="headDv">
           <div className="headsic">Installation Type</div>
             <div className="link" onClick={this.clearInstallationssHandler}>
                     clear 
                 </div>
           </div>
             {this.props.Installations.map((item: any, index: number) => {
                 return (
                     <div key={index}>
                         <div className="checkbox-item">
                             <CheckboxText
                                 className="counting"
                                 checked={item.value}
                                 onChange={(e: any) => this.handleInstallationsChange(e)}
                                 label={`${item.name}`}
                                 name={item.name}
                             />
                             <div className="countStyle">({item.count})</div>
                         </div>
                     </div>
                 );
             })}
          
           
        
         </div> : null
         }
            </div>
            </ClickAwayListener >
        );
    }
}

export default FiltersSecurity;
