from flask import Blueprint, request, jsonify
from app import db
from app.models.notes import Note

note_bp = Blueprint("notes", __name__)

@note_bp.route("/", methods=["GET"])
def get_notes():
    notes = Note.query.all()
    return jsonify([note.to_dict() for note in notes]), 200

@note_bp.route("/<int:note_id>", methods=["GET"])
def get_note(note_id):
    note = Note.query.get_or_404(note_id)
    return jsonify(note.to_dict()), 200

@note_bp.route("/", methods=["POST"])
def create_note():
    data = request.get_json()
    if not data or not data.get("title") or not data.get("content"):
        return jsonify({"error": "Title and content are required"}), 400

    new_note = Note(title=data["title"], content=data["content"])
    db.session.add(new_note)
    db.session.commit()
    return jsonify(new_note.to_dict()), 201

@note_bp.route("/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    note = Note.query.get_or_404(note_id)
    db.session.delete(note)
    db.session.commit()
    return jsonify({"message": "Note has been deleted successfully."}), 200
