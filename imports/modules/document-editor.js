/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertDocument } from '../api/documents/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { doc } = component.props;
  const confirmation = doc && doc._id ? 'Document updated!' : 'Document added!';
  const upsert = {
    title: document.querySelector('[name="title"]').value.trim(),
    body: document.querySelector('[name="body"]').value.trim(),
  };

  if (doc && doc._id) upsert._id = doc._id;

  upsertDocument.call(upsert, (error, { insertedId }) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.form.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/documents/${insertedId || doc._id}`);
    }
  });
};

const validate = () => {
  $(component.form).validate({
    rules: {
      title: {
        required: true,
      },
      body: {
        required: true,
      },
    },
    messages: {
      title: {
        required: 'Veuillez saisir un titre.',
      },
      body: {
        required: 'Veuillez saisir une description.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function handleLogin(options) {
  component = options.component;
  validate();
}
