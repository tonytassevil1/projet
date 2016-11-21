import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import DocumentsList from '../components/DocumentsList.js';

const User = ({ documents }) => (
<div className="Documents">
  <Row>
    <Col xs={ 12 }>
      <div className="page-header-new clearfix">
        <h4 className="pull-left">Annonces de { documents[0].author }</h4>
      </div>
      <DocumentsList documents={ documents }/>
    </Col>
  </Row>
</div>
);

export default User;
