import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { propTypes } from 'react-bootstrap/esm/Image';

type initialProps = {
  checked ? : any,
  handleChecked ? : any
    };
const GreenCheckbox = withStyles({
  root: {
    color: 'transparent',
    '&$checked': {
      color: green[600],
  
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export default function CheckboxLabels(props:initialProps) {
//   const [state, setState] = React.useState({

//     checkedG: true,
//   });

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setState({ ...state, [event.target.name]: event.target.checked });
//   };

  return (
    <div className="checkbox-inside">
     
   
      <FormControlLabel style={{
        transform:"scale(1.5)"
      }}
        control={<GreenCheckbox checked={props.checked} onChange={props.handleChecked} name="checkedG" />}
        label=""
      />
     
    </div>
  );
}