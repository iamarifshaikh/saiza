package com.saiza.backend.service;

import com.saiza.backend.model.Note;
import com.saiza.backend.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;

    public List<Note> getNotesBySubject(String subjectId) {
        return noteRepository.findBySubjectId(subjectId);
    }

    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public void deleteNote(String id) {
        noteRepository.deleteById(id);
    }
}
