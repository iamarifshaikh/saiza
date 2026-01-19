package com.saiza.backend.config;

import com.saiza.backend.model.*;
import com.saiza.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    DomainRepository domainRepository;
    @Autowired
    SubjectRepository subjectRepository;
    @Autowired
    NoteRepository noteRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TestimonialRepository testimonialRepository;
    @Autowired
    PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedDomains();
        seedSubjects();
        seedTestimonials();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@saiza.com");
            admin.setPassword(encoder.encode("admin123"));
            admin.setRole("ROLE_ADMIN");
            admin.setPremium(true);
            userRepository.save(admin);
            System.out.println("Seeded Admin User");
        }
    }

    private void seedDomains() {
        // We want to ensure these specific domains exist for both Engineering and
        // Diploma
        // We use saveAll which acts as an upsert if ID exists.

        java.util.List<Domain> domains = new java.util.ArrayList<>();

        String[] streams = { "Computer", "Information Technology", "Mechanical", "Electrical", "Electronics", "Civil",
                "Chemical" };

        for (String stream : streams) {
            String slug = stream.toLowerCase().replace(" ", "-");

            // Engineering Domain
            Domain eng = new Domain();
            eng.setId("eng-" + slug); // e.g., eng-computer
            eng.setTitle(stream + (stream.endsWith("Technology") ? "" : " Engineering"));
            eng.setDescription("Engineering curriculum for " + stream);
            eng.setCourseType("engineering");
            eng.setColorClass("text-blue-500");
            eng.setBgClass("bg-blue-500/10");
            eng.setIconName("BookOpen");
            domains.add(eng);

            // Diploma Domain
            Domain dip = new Domain();
            dip.setId("dip-" + slug); // e.g., dip-computer
            dip.setTitle("Diploma in " + stream);
            dip.setDescription("Diploma curriculum for " + stream);
            dip.setCourseType("diploma");
            dip.setColorClass("text-emerald-500");
            dip.setBgClass("bg-emerald-500/10");
            dip.setIconName("BookOpen");
            domains.add(dip);
        }

        domainRepository.saveAll(domains);
        System.out.println("Seeded/Updated " + domains.size() + " Domains");
    }

    private void seedSubjects() {
        if (subjectRepository.count() == 0) {
            Subject s1 = new Subject();
            s1.setId("dsa");
            s1.setTitle("Data Structures");
            s1.setCode("CSC301");
            s1.setDomainId("computer");
            s1.setPremium(false);
            Subject s2 = new Subject();
            s2.setId("os");
            s2.setTitle("Operating Systems");
            s2.setCode("CSC302");
            s2.setDomainId("computer");
            s2.setPremium(false);
            Subject s3 = new Subject();
            s3.setId("web");
            s3.setTitle("Web Development");
            s3.setCode("ITC301");
            s3.setDomainId("it");
            s3.setPremium(false);

            subjectRepository.saveAll(Arrays.asList(s1, s2, s3));
            System.out.println("Seeded Subjects");

            // Seed Notes for DSA
            Note n1 = new Note();
            n1.setTitle("Arrays Masterclass");
            n1.setDescription("Deep dive into Arrays");
            n1.setSubjectId("dsa");
            n1.setPremium(false);
            n1.setPages(10);
            n1.setReadTime("15 min");
            n1.setDate("2024-01-01");
            noteRepository.save(n1);
        }
    }

    private void seedTestimonials() {
        if (testimonialRepository.count() == 0) {
            Testimonial t1 = new Testimonial();
            t1.setName("John Doe");
            t1.setRole("Student");
            t1.setContent("Amazing platform!");
            t1.setRating(5);
            testimonialRepository.save(t1);
        }
    }
}
