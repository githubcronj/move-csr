/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

type initialProps = {
    options ? : any;
    onChangeSearchHandler ? : any
    value ? : any
    searchClicked ? : any
    onSelectHandler ? : any
    className ? : string
    };

export default function ComboBox(props:initialProps) {
  return (
    <Autocomplete
    onSelect={props.onSelectHandler}
      id="combo-box-demo"
      className={props.className}
      options={props.options}
      getOptionLabel={(option:any) => option.title}
      style={{ width: '100%' }}
      renderInput={(params:any) => <TextField {...params} label="" variant="outlined"
       InputProps={{
           ...params.InputProps,
        startAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
         
        ),
        endAdornment: (
            <div className="icon-div-help" onClick={props.searchClicked} >
               <ArrowRightAltIcon style={{
                   color:'#fff'
               }} />
           </div>
         
        )
      }}
       onChange={props.onChangeSearchHandler} value={props.value} />}
    />
  );
}

