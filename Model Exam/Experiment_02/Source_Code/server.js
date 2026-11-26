const express = require("express");
const { createNotesService } = require("./notes");
const app = express();
const notes = createNotesService();
app.use(express.json());
app.get("/", (_req,res) => res.type("html").send("<h1>Notes API</h1><p>Express REST API is running.</p><p>GET /notes, POST /notes, DELETE /notes/:id</p>"));
app.get("/health", (_req,res) => res.json({status:"ok"}));
app.get("/notes", (_req,res) => res.json(notes.list()));
app.post("/notes", (req,res) => {
  try { res.status(201).json(notes.add(req.body.text)); }
  catch (e) { res.status(e.status || 500).json({error:e.message}); }
});
app.delete("/notes/:id", (req,res) => {
  if (!notes.remove(req.params.id)) return res.status(404).json({error:"Note not found."});
  res.json({message:"Note deleted."});
});
const port = Number(process.env.PORT) || 3000;
if (require.main === module) app.listen(port,"0.0.0.0",() => console.log(`Notes API listening on port ${port}`));
module.exports = app;
