import React from 'react';
import { ButtonToolbar, ButtonGroup, Button, FormGroup, ControlLabel, FormControl, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeDocument, addComments } from '../../api/documents/methods.js';

const handleRemove = (_id) => {
  if (confirm('Etes vous sûr?')) {
    removeDocument.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document supprimé!', 'success');
        browserHistory.push('/annonces');
      }
    });
  }
};

const handleAddComments = (doc, event) => {
  if(event.keyCode == 13){
    var annonce = { _id: doc._id };
    var comments = doc.comments;
    comments.push({comment: $("#document-comment").val(), owner: Meteor.userId(), author: Meteor.user().profile.name.first + " " + Meteor.user().profile.name.last});
    annonce.comments = comments;
    addComments.call(annonce, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        $("#document-comment").val("");
        Bert.alert('Commentaire ajouté!', 'success');
      }
    });
  }
};

const handleRemoveComment = (doc, comment, owner, author) => {
  var annonce = { _id: doc._id };
  var comments = doc.comments;
  var ind = 0;
  comments.forEach(function(com, index){
    if(com.comment == comment && com.owner == owner && com.author == author){
      ind = index;
    }
  });
  comments.splice(ind, 1);
  annonce.comments = comments;
  console.debug(annonce);
  addComments.call(annonce, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      $("#document-comment").val("");
      Bert.alert('Commentaire supprimé!', 'success');
    }
  });
};

const ViewDocument = ({ doc }) => (
  <div className="ViewDocument">
    <label>Titre</label>
    <ButtonToolbar className={ doc.owner == Meteor.userId() ? 'pull-right' : 'pull-right hidden'}>
      <ButtonGroup bsSize="small">
        <Button href={`/annonces/${doc._id}/edit`}>Editer</Button>
        <Button onClick={ () => handleRemove(doc._id) } className="text-danger">Supprimer</Button>
      </ButtonGroup>
    </ButtonToolbar>
    <div className="page-header clearfix">
      <h4 className="pull-left">{ doc.title }</h4>
    </div>
    <label>Description</label>
    <div className="document-body" style={{ width: "100%" }}>{ doc.body }</div>

    <FormGroup style={{ marginTop: "50px" }}>
      <FormControl
      id="document-comment"
      type="text"
      name="comment"
      onKeyUp={ handleAddComments.bind(this, doc)}
      placeholder="Ajouter un commentaire"
        />
    </FormGroup>

    <div>
      <ListGroup className="DocumentsList">
        {doc.comments.map(({ comment, owner, author }) => (
        <ListGroupItem>{ comment }
          <span className={(owner == Meteor.userId() || doc.owner == Meteor.userId()) ? "" : "hidden"}
          style={{float: "right", cursor: "pointer", marginLeft: "10px"}}
          onClick={ handleRemoveComment.bind(this, doc, comment, owner, author)}
          >X</span>
          <Link to={`/user/${owner}`} style={{float: "right", cursor: "pointer"}}>{ author }</Link>
        </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  </div>
);

ViewDocument.propTypes = {
  doc: React.PropTypes.object.isRequired,
};

export default ViewDocument;
