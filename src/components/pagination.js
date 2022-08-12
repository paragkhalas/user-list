import React from 'react';
import { Row, Col, Button } from 'reactstrap';

const Pagination = ({
  nextPage,
  previousPage,
  pageIndex,
  pageOptions,
  canNextPage,
  canPreviousPage,
}) => {
  return (
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
  );
};

export default Pagination;
