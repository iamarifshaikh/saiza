package com.saiza.backend.controller;

import com.saiza.backend.model.*;
import com.saiza.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DataController {

    @Autowired
    private DomainService domainService;
    @Autowired
    private SubjectService subjectService;
    @Autowired
    private NoteService noteService;
    @Autowired
    private TestimonialService testimonialService;

    // --- DOMAINS ---
    @GetMapping("/domains")
    public List<Domain> getAllDomains() {
        return domainService.getAllDomains();
    }

    // --- SUBJECTS ---
    @GetMapping("/subjects/domain/{domainId}")
    public List<Subject> getSubjects(@PathVariable String domainId) {
        // Fix for Electronics domain mismatch (Frontend uses 'extc', DB uses
        // 'electronics')
        if (domainId.endsWith("-extc")) {
            domainId = domainId.replace("-extc", "-electronics");
        }
        return subjectService.getSubjectsByDomain(domainId);
    }

    // --- NOTES ---
    @GetMapping("/notes/subject/{subjectId}")
    public List<Note> getNotes(@PathVariable String subjectId) {
        return noteService.getNotesBySubject(subjectId);
    }

    // --- TESTIMONIALS ---
    @GetMapping("/testimonials")
    public List<Testimonial> getTestimonials() {
        return testimonialService.getAllTestimonials();
    }
}
