package com.saiza.backend.repository;

import com.saiza.backend.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findBySubjectId(String subjectId);
}
