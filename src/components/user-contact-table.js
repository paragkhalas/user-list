import React, { Fragment } from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
import { Table, Row, Col, Button } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filter';

import sortasc from '../assets/sort_asc.png';
import sortdesc from '../assets/sort_desc.png';
import sortboth from '../assets/sort_both.png';
import loaderimage from '../assets/loader.gif';

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
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 20 },
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  const generateSortingIndicator = (column) => {
    if (!column.disableSortBy) {
      if (column.isSorted) {
        if (column.isSortedDesc) {
          return <img src={sortdesc} alt="descending" />;
        }
        return <img src={sortasc} alt="ascending" />;
      }
      return <img src={sortboth} alt="sorting" />;
    }
    return '';
  };

  return (
    <>
      <Table {...getTableProps()} bordered responsive striped>
        <thead>
          {headerGroups.map((headerGroup, i) => {
            return (
              <Fragment key={i}>
                <tr className="theader" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <th key={column.render('Header')} {...column.getHeaderProps()}>
                        <div className="float-right" {...column.getSortByToggleProps()}>
                          {column.render('Header')}

                          {generateSortingIndicator(column)}
                        </div>
                      </th>
                    );
                  })}
                </tr>
                <tr>
                  {headerGroup.headers.map((column, index) => {
                    return (
                      <th key={index} className="tfilter" {...column.getHeaderProps()}>
                        <Filter column={column} />
                      </th>
                    );
                  })}
                </tr>
              </Fragment>
            );
          })}
        </thead>
        {loading && (
          <tbody>
            <tr>
              <td colSpan="10000" className="text-center bg-white">
                <img src={loaderimage} alt="Loading..." />
              </td>
            </tr>
          </tbody>
        )}
        {loading && page.length === 0 ? (
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
                      <td
                        key={index}
                        {...cell.getCellProps({
                          className: cell.column.className,
                        })}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>
      {!loading && (
        <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <Col md={5}>
            <Button color="primary" onClick={previousPage} disabled={!canPreviousPage}>
              {'<'}
            </Button>
          </Col>
          <Col md={2} style={{ marginTop: 7 }}>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Col>
          <Col md={5}>
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {'>'}
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default UserContactable;
