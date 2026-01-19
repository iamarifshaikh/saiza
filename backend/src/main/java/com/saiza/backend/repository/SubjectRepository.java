package com.saiza.backend.repository;

import com.saiza.backend.model.Subject;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SubjectRepository extends MongoRepository<Subject, String> {
    List<Subject> findByDomainId(String domainId);
}
