from app import app, tasks


def setup_function():
    tasks.clear()


def test_add_task():
    c = app.test_client()
    c.post("/add", data={"task": "Complete SE record"})
    assert c.get("/api/tasks").get_json()[0]["title"] == "Complete SE record"


def test_mark_done():
    c = app.test_client()
    c.post("/add", data={"task": "Prepare viva"})
    c.get("/done/1")
    assert c.get("/api/tasks").get_json()[0]["done"] is True


def test_delete_task():
    c = app.test_client()
    c.post("/add", data={"task": "Submit assignment"})
    c.get("/delete/1")
    assert c.get("/api/tasks").get_json() == []


def test_blank_task_ignored():
    c = app.test_client()
    c.post("/add", data={"task": "   "})
    assert c.get("/api/tasks").get_json() == []
