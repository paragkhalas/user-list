import React, { Fragment } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { Table, Row, Col, Button } from "reactstrap"
import { Filter, DefaultColumnFilter } from './filter';

import sortasc from "../assets/sort_asc.png";
import sortdesc from "../assets/sort_desc.png";
import sortboth from "../assets/sort_both.png";
import loaderimage from "../assets/loader.gif";

import '../App.css';

const UserContactable = ({ columns, data, loading = false }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 20 }
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const generateSortingIndicator = column => {
    return (
        !column.disableSortBy ? (
        column.isSorted ? (
          column.isSortedDesc ? (
            <img src={sortdesc} alt="descending" />
          ) : (
            <img src={sortasc} alt="ascending" />
          )
        ) : (
          <img src={sortboth} alt="sorting" />
        )
      ) : ""
    )
  }

  return (
    <Fragment>
      <Table {...getTableProps()} bordered responsive striped>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <Fragment key={i}>
              <tr className="theader" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th key={index} {...column.getHeaderProps()}>
                    <div className="float-right" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      
                      {generateSortingIndicator(column)}
                    </div>
                    
                  </th>
                ))}
              </tr>
              <tr>
                {headerGroup.headers.map((column, index) => (
                  <th key={index} className="tfilter" {...column.getHeaderProps()}>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            </Fragment>
          ))}
        </thead>
        {loading ? 
          <tbody>
            <tr>
              <td colSpan="10000" className="text-center bg-white">
                <img src={loaderimage} alt="Loading..." />
              </td>
            </tr>
          </tbody>
        :
          page.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="10000" className="text-center">
                    No user found.
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr key={i} {...row.getRowProps()}>
                      {row.cells.map((cell, index) => {
                        return (
                          <td key={index}
                            {...cell.getCellProps({
                              className: cell.column.className
                            })}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
      </Table>
      <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Col md={5}>
          <Button
            color="primary"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {"<"}
          </Button>
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col md={5}>
          <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
            {">"}
          </Button>
        </Col>
      </Row>
    </Fragment>
  )
}


export default UserContactable;