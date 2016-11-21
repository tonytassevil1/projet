import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Documents from './documents';
import rateLimit from '../../modules/rate-limit.js';

export const upsertDocument = new ValidatedMethod({
  name: 'documents.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    body: { type: String, optional: true },
    owner: { type: String, optional: false },
    author: { type: String, optional: false },
    comments: { type: [Object] },
    'comments.$': { type: Object, blackbox: true },
    "comments.$.comment" : { type: String },
    "comments.$.owner" : { type: String },
    "comments.$.author" : { type: String }
  }).validator(),
  run(document) {
    return Documents.upsert({ _id: document._id }, { $set: document });
  },
});

export const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Documents.remove(_id);
  },
});

export const addComments = new ValidatedMethod({
  name: 'documents.add.comments',
  validate: new SimpleSchema({
    _id: { type: String },
    comments: { type: [Object] },
    'comments.$': { type: Object, blackbox: true },
    "comments.$.comment" : { type: String },
    "comments.$.owner" : { type: String },
    "comments.$.author" : { type: String }
  }).validator(),
  run(document) {
    Documents.update({_id: document._id}, {$set: document });
  },
});

rateLimit({
  methods: [
    upsertDocument,
    addComments,
    removeDocument,
  ],
  limit: 5,
  timeRange: 1000,
});
