// import * as React from "react";
// // import styled from "styled-components";
// import { useTable } from "react-table";
// // import "./styles.css";
// // import makeData from "./makeData";

// // const Styles = styled.div`
// //   padding: 1rem;

// //   table {
// //     border-spacing: 0;
// //     border: 1px solid black;

// //     tr {
// //       :last-child {
// //         td {
// //           border-bottom: 0;
// //         }
// //       }
// //     }

// //     th,
// //     td {
// //       margin: 0;
// //       padding: 0.5rem;
// //       border-bottom: 1px solid black;
// //       border-right: 1px solid black;

// //       :last-child {
// //         border-right: 0;
// //       }
// //     }
// //   }
// // `;
// // let columns: any = [
// //       {
// //         Header: 'Name',
// //         columns: [
// //           {
// //             Header: 'First Name',
// //             accessor: 'firstName',
// //           },
// //           {
// //             Header: 'Last Name',
// //             accessor: 'lastName',
// //           },
// // 		];

// function Table(props: any) {
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({
//       columns: props.columns,
//       data: props.data,
//     });
//   // Render the UI for your table
//   return (
//     <table {...getTableProps()}>
//       <thead>
//         {headerGroups.map((headerGroup: any) => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column: any) => (
//               <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row: any, i: any) => {
//           prepareRow(row);
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map((cell: any) => {
//                 return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
//               })}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// }
// export default function App() {
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Name",
//         columns: [
//           {
//             Header: "First Name",
//             accessor: "firstName",
//           },
//           {
//             Header: "Last Name",
//             accessor: "lastName",
//           },
//         ],
//       },
//       {
//         Header: "Info",
//         columns: [
//           {
//             Header: "Age",
//             accessor: "age",
//           },
//           {
//             Header: "Visits",
//             accessor: "visits",
//           },
//           {
//             Header: "Status",
//             accessor: "status",
//           },
//           {
//             Header: "Profile Progress",
//             accessor: "progress",
//           },
//         ],
//       },
//     ],
//     []
//   );

//   const data: any = [];
//   return (
//     // <Styles>
//     <Table columns={columns} data={data} />
//     // </Styles>
//   );
// }

import React from "react";
import PaginationComponent from "../Pagination/Pagination";
import "./dashboardTable.scss";

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

const TableComponentNew = (props: initialProps) => {
  return (
    <div className="dashboardTableDiv">
      <table className="dashboardTable">
        <thead className="tableHead">
          <tr className="tableRow">
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
                          <td onClick={() => item2.Cell && item2.Cell(item)}>
                            <div
                              className={
                                item2.accessor == "status"
                                  ? "soldDiv"
                                  : item2.accessor == "name"
                                  ? "nameDiv"
                                  : ""
                              }
                              style={{
                                backgroundColor:
                                  item2.accessor == "status"
                                    ? item[item2.accessor] == "Completed"
                                      ? "#81C975"
                                      : item[item2.accessor] == "Pending"
                                      ? "#F48600"
                                      : item[item2.accessor] == "In-progess"
                                      ? "#FFE277"
                                      : item[item2.accessor] == "Pending"
                                      ? "#6EBBE2"
                                      : "#6EBBE2"
                                    : "",
                              }}
                            >
                              {item[item2.accessor]}{" "}
                            </div>
                            <div className="email-table">
                              {item[item2.accessor2]
                                ? item[item2.accessor2]
                                : null}
                            </div>
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

export default TableComponentNew;
