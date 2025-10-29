// routes/employee.route.js
const express = require('express');
const router = express.Router();

// Import Employee model
const Employee = require('../modules/Employee');

// -------------------------------------------------
// CREATE Employee
// -------------------------------------------------
router.post('/create', async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
});

// -------------------------------------------------
// READ ALL Employees
// -------------------------------------------------
router.get('/', async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// -------------------------------------------------
// READ ONE Employee by ID
// -------------------------------------------------
router.get('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

// -------------------------------------------------
// UPDATE Employee
// -------------------------------------------------
router.put('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

// -------------------------------------------------
// DELETE Employee
// -------------------------------------------------
router.delete('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.json({ msg: 'Employee deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// -------------------------------------------------
// Health check specific to employee API
// -------------------------------------------------
router.get('/health/check', (req, res) => {
  res.json({ status: 'OK', message: 'Employee API running fine' });
});

module.exports = router;