package com.saiza.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping
    public ResponseEntity<?> checkHealth() {
        Map<String, Object> status = new HashMap<>();
        status.put("server", "running");
        status.put("timestamp", System.currentTimeMillis());

        System.out.println("--- Health Check Request Received ---");

        try {
            // Execute a simple command to check DB connection
            mongoTemplate.getDb().runCommand(new org.bson.Document("ping", 1));

            status.put("database", "connected");
            status.put("dbName", mongoTemplate.getDb().getName());

            System.out.println(
                    "Health Check: System Online. Database '" + mongoTemplate.getDb().getName() + "' Connected.");

            return ResponseEntity.ok(status);
        } catch (Exception e) {
            status.put("database", "disconnected");
            status.put("error", e.getMessage());

            System.err.println("Health Check FAILED: Database connection error: " + e.getMessage());

            return ResponseEntity.status(503).body(status);
        }
    }
}
