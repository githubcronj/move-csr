import React from "react";
import MaterialTable from "material-table";
import PaginationComponent from "../Pagination/Pagination";
import "./table.scss";

interface IProps {
  data?: any;
  columns?: any;
  totalPage?: any;
  handleBack?: any;
  handleNext?: any;
  page?: any;
  className?: string;
  onRowClick?: any;
  handlePagination?: any;
  nopagination?: boolean;
  pageSize?: any;
  noDataMessage?: string;
}

const TableComponent = (props: IProps) => {
  // console.log('data123',props.data)
  return (
    <div className={props.className}>
      <MaterialTable
        // classname={props.className}
        data={props.data}
        columns={props.columns}
        options={{
          toolbar: false,
          pageSize: props.pageSize,
        }}
        // components={{
        //   Pagination: () =>
        //     props.nopagination ? null : (
        //       <PaginationComponent
        //         totalPage={props.totalPage}
        //         handleBack={props.handleBack}
        //         handleNext={props.handleNext}
        //         activePage={props.page ? props.page : 1}
        //         handlePagination={props.handlePagination}
        //       />
        //     ),
        // }}
        localization={{
          body: {
            emptyDataSourceMessage: props.noDataMessage
              ? props.noDataMessage
              : "No records to display",
          },
        }}
      />
      {props.nopagination ? null : (
        <PaginationComponent
          totalPage={props.totalPage}
          handleBack={props.handleBack}
          handleNext={props.handleNext}
          activePage={props.page ? props.page : 1}
          handlePagination={props.handlePagination}
        />
      )}
    </div>
  );
};

export default TableComponent;
