package com.saiza.backend.controller;

import com.saiza.backend.model.User;
import com.saiza.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/complete-profile")
    public ResponseEntity<?> completeProfile(@RequestBody Map<String, String> request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        String college = request.get("college");
        String semesterStr = request.get("semester"); // e.g. "5th Semester"
        String courseTypeStr = request.get("courseType"); // "ENGINEERING" or "DIPLOMA"

        if (courseTypeStr == null || semesterStr == null) {
            return ResponseEntity.badRequest().body("Course Type and Semester are required");
        }

        // Parse Semester Number
        int sem = Integer.parseInt(semesterStr.replaceAll("\\D+", "")); // Extract digits

        try {
            User.CourseType courseType = User.CourseType.valueOf(courseTypeStr.toUpperCase());

            // VALIDATION LOGIC
            if (courseType == User.CourseType.DIPLOMA && (sem < 1 || sem > 6)) {
                return ResponseEntity.badRequest().body("Diploma only has 6 semesters.");
            }
            if (courseType == User.CourseType.ENGINEERING && (sem < 1 || sem > 8)) {
                return ResponseEntity.badRequest().body("Engineering only has 8 semesters.");
            }

            user.setCollege(college);
            user.setSemester(semesterStr);
            user.setCourseType(courseType);
            userRepository.save(user);

            return ResponseEntity.ok(user);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid Course Type");
        }
    }

    @PutMapping("/premium")
    public ResponseEntity<?> upgradeToPremium() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        user.setPremium(true);
        userRepository.save(user);
        return ResponseEntity.ok("Upgraded to Premium");
    }
}
