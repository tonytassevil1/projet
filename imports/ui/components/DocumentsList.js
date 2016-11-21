import React from 'react';
import { ListGroup, ListGroupItem, Alert, FormControl } from 'react-bootstrap';
import { Link } from 'react-router';

const handleSearch = () => {
  $('.span-document-title').each(function(){
    if($(this).html().indexOf($("#documents-search").val()) > -1){
      $(this).parent().show();
    }
    else{
      $(this).parent().hide();
    }
  });
}

const DocumentsList = ({ documents }) => (
  documents.length > 0 ? <ListGroup className="DocumentsList">

    <label>Recherche</label>
    <FormControl
    id="documents-search"
    type="text"
    onKeyUp={ handleSearch.bind(this)}
    placeholder="Recherche d'annonce"
      />

    {documents.map(({ _id, title, owner, author }) => (
      <ListGroupItem key={ _id } href={`/annonces/${_id}`}><span className="span-document-title">{ title }</span><Link to={`/user/${owner}`} style={{float: "right", cursor: "pointer"}}>{ author }</Link></ListGroupItem>
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">Aucune annonce.</Alert>
);

DocumentsList.propTypes = {
  documents: React.PropTypes.array,
};

export default DocumentsList;
