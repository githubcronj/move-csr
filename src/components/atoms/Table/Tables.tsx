import React from "react";
import PaginationComponent from "../Pagination/Pagination";
import "./dashboardTable.scss";
import "./Tables.scss";

type initialProps = {
  columns?: any;
  data?: any;
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
};

const TableStatisticsNew = (props: initialProps) => {
  return (
    <div className="statsTableDiv">
      <table className="statsTable">
        <thead className="tableHeadStats">
          <tr className="tableFont">
            {props.columns &&
              props.columns.map((item: any) => {
                return <th>{item.Header}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((item: any) => {
              let objectKeys: any = Object.keys(item);
              return (
                <tr>
                  {props.columns &&
                    props.columns.map((item2: any) => {
                      // return (
                      if (objectKeys.includes(item2.accessor)) {
                        return (
                          <td>
                            <div>{item[item2.accessor]} </div>
                          </td>
                        );
                      }
                      // )
                    })}
                </tr>
              );
            })}
        </tbody>
        <tfoot></tfoot>
      </table>

      <div className="table-foot">
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
    </div>
  );
};

export default TableStatisticsNew;
