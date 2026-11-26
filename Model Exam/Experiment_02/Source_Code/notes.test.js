const test = require("node:test");
const assert = require("node:assert/strict");
const { createNotesService } = require("./notes");
test("adds and lists a note", () => {
 const s=createNotesService(), n=s.add("  Buy milk  ");
 assert.equal(n.id,1); assert.equal(n.text,"Buy milk"); assert.equal(s.list().length,1);
});
test("rejects empty note text", () => {
 const s=createNotesService(); assert.throws(()=>s.add("  "),/Note text is required/);
});
test("deletes existing note and reports missing ids", () => {
 const s=createNotesService(), n=s.add("Revise Docker");
 assert.equal(s.remove(n.id),true); assert.equal(s.remove(n.id),false); assert.equal(s.list().length,0);
});
