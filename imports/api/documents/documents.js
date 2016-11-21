import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Documents = new Mongo.Collection('Documents');
export default Documents;

Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Documents.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the document.',
  },
  body: {
    type: String,
    label: 'The body of the document.',
  },
  owner: {
    type: String,
    label: 'The owner of the document.'
  },
  author: {
    type: String,
    label: 'The author of the document.'
  },
  comments: {
    type: [Object],
    optional: true,
    defaultValue: []
  },
  'comments.$': {
    type: Object,
    blackbox: true
  },
  "comments.$.comment" : {
    type: String,
  },
  "comments.$.owner" : {
    type: String,
  },
  "comments.$.author" : {
    type: String,
  }
});

Documents.attachSchema(Documents.schema);

Factory.define('document', Documents, {
  title: () => 'Factory Title',
  body: () => 'Factory Body',
  owner: () => 'Factory Owner'
});
