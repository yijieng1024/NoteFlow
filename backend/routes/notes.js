const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// GET all notes
router.get("/", (req, res) => {
  const sql = "SELECT * FROM notes";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST - Create note
router.post("/", (req, res) => {
  const { title, content } = req.body;

  const sql = "INSERT INTO notes (title, content) VALUES (?, ?)";
  db.query(sql, [title, content], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, title, content });
  });
});

// PUT - Update note
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const sql = "UPDATE notes SET title=?, content=? WHERE id=?";
  db.query(sql, [title, content, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "not found" });
    res.json({ id: Number(id), title, content });
  });
});

// DELETE note
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM notes WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Note deleted" });
  });
});

module.exports = router;
