import React from "react";
import Pagination from '@material-ui/lab/Pagination';
import "./Pagination.scss"
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';

const PaginationComponent = (props:any) => {
  // console.log(props)
  return (
    <div className="pagination">
      <div className={props.activePage !== 1 ? "iconDiv" : "iconDivDisabled"}><NavigateBeforeRoundedIcon className="paginationIcon" onClick={props.handleBack} /></div>
      <Pagination 
        hideNextButton={true}
        hidePrevButton={true}
        count={props.totalPage} 
        variant="outlined" 
        onChange={props.handlePagination}
        page={props.activePage ? props.activePage : 1}
      />
       <div className={props.activePage !== props.totalPage ? "iconDiv" : "iconDivDisabled"}><NavigateNextRoundedIcon className="paginationIcon" onClick={props.handleNext} /></div>
    </div>
  );
}

export default PaginationComponent;