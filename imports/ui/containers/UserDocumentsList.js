import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Documents from '../../api/documents/documents.js';
import User from '../pages/User.js';
import Loading from '../components/Loading.js';

const composer = ({params}, onData) => {
  const subscription = Meteor.subscribe('documents.list');
  if (subscription.ready()) {
    const documents = Documents.find({owner: params.owner}).fetch();
    onData(null, { documents });
  }
};

export default composeWithTracker(composer, Loading)(User);
