const express = require('express');
const router = express.Router();
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find();
    result.toArray().then((lists) => {
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get contacts' });
  }
});

// GET contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').find({ _id: contactId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        res.status(404).json({ error: 'Contact not found' });
      } else {
        res.status(200).json(lists[0]);
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Invalid contact ID' });
  }
});

module.exports = router;
