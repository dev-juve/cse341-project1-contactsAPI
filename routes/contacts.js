const express = require('express');
const router = express.Router();
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contacts API endpoints
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: List of contacts
 *       500:
 *         description: Failed to get contacts
 */
router.get('/', async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find();
    result.toArray().then((contacts) => {
      res.status(200).json(contacts);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get contacts' });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     responses:
 *       200:
 *         description: A single contact object
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Invalid contact ID
 */
router.get('/:id', async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
      if (contacts.length === 0) {
        res.status(404).json({ error: 'Contact not found' });
      } else {
        res.status(200).json(contacts[0]);
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Invalid contact ID' });
  }
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - favoriteColor
 *               - birthday
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Contact created
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to create contact
 */
router.post('/', async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newContact = { firstName, lastName, email, favoriteColor, birthday };

  try {
    const result = await mongodb.getDb().collection('contacts').insertOne(newContact);
    res.status(201).json({ message: 'Contact created', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found or unchanged
 *       500:
 *         description: Failed to update contact
 */
router.put('/:id', async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contactData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await mongodb.getDb().collection('contacts').replaceOne({ _id: contactId }, contactData);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Contact not found or data unchanged' });
    }

    res.status(200).json({ message: 'Contact updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Failed to delete contact
 */
router.delete('/:id', async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;
