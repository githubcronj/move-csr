import React from "react";
// import {
//   geocodeByAddress,
//   geocodeByPlaceId,
//   getLatLng,
// } from "react-places-autocomplete";
// import CustomizedInputs from './CustomizedInput';
import TextField from "@material-ui/core/TextField";
import PlacesAutocomplete from "react-places-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
});
type iprops = {
  value: string;
  onChange?: (val: any) => void;
  onSelect: (val: any) => void;
  onChangeVal?: () => void;
  placeholder?: string;
  inputTitle?: string;
  edit?: boolean;
  className?: string;
  InputLabelProps?: any;
  disabled?: any;
  error?: boolean;
  helperText?: string;
};

// const google = window.google;

const AutoComplete = (props: iprops) => {
  const classes = useStyles();
  // const searchOptions = {
  //     location: new google.maps.LatLng(37, -95), //{lat: 37.09024, lng: -95.712891}
  //     radius: 2000,
  //     types: ['country', 'political', 'geocode'],
  // };

  const searchOptions = {
    location: new google.maps.LatLng(37.09024, -95.712891),
    radius: 2000,
    types: ["address"],
  };
  return (
    <PlacesAutocomplete
      value={props.value}
      onChange={props.onChange}
      onSelect={props.onSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          {/* <input
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "location-search-input",
            })}
          /> */}
          {/* <div className="flex"> */}
          {/* <CustomizedInputs
                        labelName={props.inputTitle}
                        value={props.value}
                        {...getInputProps({
                            placeholder: props.placeholder,
                            className: 'location-search-input',
                        })}
                    /> */}

          {props.edit ? (
            <input
              className="editAddressAutoComplete"
              value={props.value}
              {...getInputProps({
                placeholder: props.placeholder,
                disabled: props.disabled,
              })}
            />
          ) : (
            <TextField
              label={props.placeholder}
              value={props.value}
              id="outlined-start-adornment"
              variant="filled"
              {...getInputProps({
                // placeholder: props.placeholder,
                className: props.className ? props.className : "input1",
              })}
              InputProps={{ classes }}
              InputLabelProps={
                props.InputLabelProps ? props.InputLabelProps : ""
              }
              error={props.error}
              helperText={props.helperText}
            />
          )}
          {/* <div onClick={props.location} className="mt-6 ml-2">
              <LocationOnIcon />
            </div> */}
          {/* </div> */}
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion: any) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = {
                backgroundColor: suggestion.active ? "#fafafa" : "#ffffff",
                cursor: "pointer",
                borderBottom: "1px solid #BEBEBE",
                padding: "10px",
                minHeight: "30px",
                boxShadow: "0px 0px 3px #bebebe",
              };

              if (
                suggestion &&
                suggestion.terms &&
                suggestion.terms.length > 0 &&
                suggestion.terms
                  .map((el: any) => {
                    if (
                      el.value.toUpperCase() === "USA" ||
                      el.value.toUpperCase() === "US"
                    )
                      return true;
                  })
                  .filter((item: any) => item)
                  .includes(true)
              ) {
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AutoComplete;
