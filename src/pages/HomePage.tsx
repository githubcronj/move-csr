import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Action from '../store/todo/actions'

type initialProps = {
 todoAction:any;
 todoState:any
};

type initialState = {
  
   
};

class Homepage extends Component<initialProps, initialState> {
    state: initialState = {

       
    };

    componentDidMount() {
    this.props.todoAction.fetchTodoRequest()
    }

    public static getDerivedStateFromProps(nextProps: initialProps, currentState: initialState) {
        console.log("nextprops",nextProps)

        if(nextProps && nextProps.todoState){
            console.log(nextProps.todoState)
        }
       
        
        return currentState;
    }


    render() {
       
    
        return (
            <div className="Homepage-main-page">
                <div className="row">
                    <div className="col-md-4"> Hello</div>
                    <div className="col-md-4"> You</div>
                    <div className="col-md-4"> Yourrrr</div>
                </div>
               
            </div>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        todoAction: bindActionCreators(Action, dispatch),
        
    };
}

const mapStateToProps = (state: any) => ({
    todoState: state.todos,
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
