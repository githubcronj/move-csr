import React from "react";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './Search.scss'

const Search = (props: any) => {
  return (
      <TextField
          className={props.className ? props.className : "searchBar"}
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="SearchIcon" onClick={props.onSearchClick} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <div className="ArrowIcon" onClick={props.onSearchClick}>
                  <ArrowForwardIcon />
                </div>
              </InputAdornment>
            ),
          }
        }
        value={props.value}
        onChange={props.onSearchChange}
        placeholder={props.placeholder}
        />
  );
}

export default Search;