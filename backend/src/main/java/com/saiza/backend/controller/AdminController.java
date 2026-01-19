package com.saiza.backend.controller;

import com.saiza.backend.model.*;
import com.saiza.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AnalyticsService analyticsService;
    @Autowired
    private NoteService noteService;
    @Autowired
    private DomainService domainService;
    @Autowired
    private SubjectService subjectService;

    @Autowired
    private CloudinaryService cloudinaryService;

    // private final Path fileStorageLocation =
    // Paths.get("uploads").toAbsolutePath().normalize();

    public AdminController() {
        // Local storage setup removed for Cloudinary
    }

    @GetMapping("/dashboard-stats")
    public ResponseEntity<?> getDashboardStats() {
        return ResponseEntity.ok(analyticsService.getDashboardStats());
    }

    @GetMapping("/logs")
    public ResponseEntity<List<Log>> getAllLogs() {
        return ResponseEntity.ok(analyticsService.getAllLogs());
    }

    // --- CREATE ENDPOINTS ---

    @PostMapping("/domains")
    public ResponseEntity<?> createDomain(@RequestBody Domain domain) {
        return ResponseEntity.ok(domainService.createDomain(domain));
    }

    @PostMapping("/subjects")
    public ResponseEntity<?> createSubject(@RequestBody Subject subject) {
        System.out.println("DEBUG: Received CreateSubject Request");
        System.out.println("DEBUG: Payload: " + subject.getTitle() + ", DomainId: " + subject.getDomainId());
        try {
            return ResponseEntity.ok(subjectService.createSubject(subject));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error creating subject: " + e.getMessage());
        }
    }

    @DeleteMapping("/domains/{id}")
    public ResponseEntity<?> deleteDomain(@PathVariable String id) {
        System.out.println("Request to delete domain: " + id);
        try {
            domainService.deleteDomain(id);
            return ResponseEntity.ok("Domain deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed: " + e.getMessage());
        }
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable String id) {
        System.out.println("Request to delete subject: " + id);
        try {
            subjectService.deleteSubject(id);
            return ResponseEntity.ok("Subject deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed: " + e.getMessage());
        }
    }

    @PostMapping(value = "/notes/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadNote(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("subjectId") String subjectId,
            @RequestParam("pages") int pages,
            @RequestParam("readTime") String readTime,
            @RequestParam("isPremium") boolean isPremium,
            @RequestParam("file") MultipartFile file) {

        System.out.println("DEBUG: Received Upload Request for: " + title);
        System.out.println("DEBUG: Cloudinary Service: " + (cloudinaryService != null ? "Present" : "NULL"));

        try {
            // Upload to Cloudinary
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is empty");
            }
            String cloudUrl = cloudinaryService.uploadFile(file);
            System.out.println("URL forr pdf  " + cloudUrl);
            // Create Note Entry
            Note note = new Note();
            note.setTitle(title);
            note.setDescription(description);
            note.setSubjectId(subjectId);
            note.setPages(pages);
            note.setReadTime(readTime);
            note.setPremium(isPremium);
            note.setPdfUrl(cloudUrl); // Store Cloudinary URL
            note.setDate(java.time.LocalDate.now().toString());

            noteService.createNote(note);

            return ResponseEntity.ok(note);

        } catch (IOException ex) {
            return ResponseEntity.internalServerError().body("Could not upload file: " + ex.getMessage());
        }
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable String id) {
        System.out.println("Request to delete note with ID: " + id);
        try {
            noteService.deleteNote(id);
            return ResponseEntity.ok("Note deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to delete note: " + e.getMessage());
        }
    }
}
