import React from "react";
import TextField from '@material-ui/core/TextField';
import './taskChecklist.scss';
import AddIcon from '@material-ui/icons/Add';
// import CheckIcon from '@material-ui/icons/Check'
import Checkbox from '../../atoms/checkbox'


type initialProps = {
className ? : any
border ? : any
task ? : any
handleChangeTask ? : any
placeholder ? : any
icon ? : any;
disabled ? : any;
checkboxHandler ? : any
checked ? : any;
handleChecked ? : any;
addButtonClicked ? : any
};

type initialState = {

};

class TaskChecklist extends React.Component<initialProps, initialState> {
  state: initialState = {

  };

  render() {
    return (
      <div className={this.props.className} style={{
          border:this.props.border,
          borderRadius:'5px',
          background:  this.props.icon=='plus' || this.props.checked==true ? '#ECF7FB' : '#fff'
       
      }}>
     <div className="task-wrapper">
   <div className="checkbox-div">
   <div className="checkbox" >

{
  this.props.icon=="plus" ? <AddIcon style={{color:'#75BA9F '}} onClick={this.props.addButtonClicked} />  :  <Checkbox  checked={this.props.checked} handleChecked={this.props.handleChecked}/> 
}

</div>
   </div>
<div className="input-div">
<TextField
          className={ this.props.icon=='plus' || this.props.checked==true ? 'taskInput' : 'taskInput-new'}
          id="outlined-start-adornment"
          onChange={(e: any) => this.props.handleChangeTask(e)}
          variant="filled"
          value={this.props.task}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
      />
</div>
     </div>

      </div>
    );
  }
}
export default TaskChecklist;
