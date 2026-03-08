const express = require('express');
const router = express.Router({ mergeParams: true }); // inherit :tripId from parent
const verifyToken = require('../middleware/auth');
const checkRole = require('../middleware/role');
const validate = require('../middleware/validate');
const {
  getItinerary,
  addDay,
  updateDay,
  deleteDay,
  addActivity,
  updateActivity,
  deleteActivity,
  reorderActivities,
  addDayValidation,
  addActivityValidation,
} = require('../controllers/itineraryController');

const member = checkRole(['owner', 'editor', 'viewer']);
const editor = checkRole(['owner', 'editor']);

// Itinerary overview
router.get('/', verifyToken, member, getItinerary);

// Day routes
router.post('/days', verifyToken, editor, addDayValidation, validate, addDay);
router.patch('/days/:dayId', verifyToken, editor, updateDay);
router.delete('/days/:dayId', verifyToken, editor, deleteDay);

// Activity routes
router.post('/days/:dayId/activities', verifyToken, editor, addActivityValidation, validate, addActivity);
router.patch('/days/:dayId/activities/:activityId', verifyToken, editor, updateActivity);
router.delete('/days/:dayId/activities/:activityId', verifyToken, editor, deleteActivity);
router.post('/days/:dayId/reorder', verifyToken, editor, reorderActivities);
// Shorthand routes (no dayId needed for update/delete)
router.patch('/activities/:activityId', verifyToken, editor, updateActivity);
router.delete('/activities/:activityId', verifyToken, editor, deleteActivity);

module.exports = router;
