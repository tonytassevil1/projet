/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertDocument } from '../../api/documents/methods.js';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class DocumentEditor extends React.Component {
  componentDidMount() {
    setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
  }

  handleAdd() {
    const { doc } = this.props;
    const upsert = {
      title: document.querySelector('[name="title"]').value.trim(),
      body: document.querySelector('[name="body"]').value.trim(),
      owner: Meteor.userId(),
      author: Meteor.user().profile.name.first + " " + Meteor.user().profile.name.last,
      comments: [{comment: "Commentaire vide", owner: Meteor.userId(), author: Meteor.user().profile.name.first + " " + Meteor.user().profile.name.last}]
    };

    if (doc && doc._id) upsert._id = doc._id;
    upsertDocument.call(upsert, (error, { insertedId }) => {
      if (error) {
          Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert("Bien jouer", 'success');
        browserHistory.push(`/annonces/${insertedId || doc._id}`);
      }
    });
  }

  render() {
    const { doc } = this.props;
    return (<form
      ref={ form => (this.documentEditorForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <FormGroup>
        <ControlLabel>Titre</ControlLabel>
        <FormControl
          id="document-title"
          type="text"
          name="title"
          defaultValue={ doc && doc.title }
          placeholder="Titre de l'annonce"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Description</ControlLabel>
        <FormControl
          id="document-body"
          componentClass="textarea"
          name="body"
          defaultValue={ doc && doc.body }
          placeholder="Description de l'annonce"
        />
      </FormGroup>
      <Button onClick={ () => this.handleAdd() } type="submit" bsStyle="success">
        { doc && doc._id ? 'Sauvegarder' : 'Ajouter' }
      </Button>
    </form>);
  }
}

DocumentEditor.propTypes = {
  doc: React.PropTypes.object,
};
