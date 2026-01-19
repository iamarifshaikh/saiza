package com.saiza.backend.service;

import com.saiza.backend.model.Subject;
import com.saiza.backend.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    public List<Subject> getSubjectsByDomain(String domainId) {
        return subjectRepository.findByDomainId(domainId);
    }

    public Subject createSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public void deleteSubject(String id) {
        subjectRepository.deleteById(id);
    }
}
