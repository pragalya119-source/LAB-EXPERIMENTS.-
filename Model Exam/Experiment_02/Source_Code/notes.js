function createNotesService() {
  let notes = [];
  let nextId = 1;
  return {
    list() { return notes; },
    add(text) {
      if (typeof text !== "string" || !text.trim()) {
        const error = new Error("Note text is required."); error.status = 400; throw error;
      }
      const note = { id: nextId++, text: text.trim(), createdAt: new Date().toISOString() };
      notes.push(note); return note;
    },
    remove(id) {
      const before = notes.length;
      notes = notes.filter(note => note.id !== Number(id));
      return notes.length !== before;
    }
  };
}
module.exports = { createNotesService };
