const express = require("express");
const router = express.Router();

// pass the db connection from server.js
module.exports = (db) => {
  // GET all notes
  router.get("/", (req, res) => {
    db.query("SELECT * FROM notes ORDER BY created_at DESC", (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  });

  // POST create note
  router.post("/", (req, res) => {
    const { title, content } = req.body;
    db.query(
      "INSERT INTO notes (title, content) VALUES (?, ?)",
      [title, content],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, title, content });
      }
    );
  });

  // PUT update note
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    db.query(
      "UPDATE notes SET title=?, content=?, updated_at=CURRENT_TIMESTAMP WHERE id=?",
      [title, content, id],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ id, title, content });
      }
    );
  });

  // DELETE note
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM notes WHERE id=?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Note deleted successfully" });
    });
  });

  return router;
};
