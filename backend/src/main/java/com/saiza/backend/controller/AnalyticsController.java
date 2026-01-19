package com.saiza.backend.controller;

import com.saiza.backend.model.Log;
import com.saiza.backend.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    @Autowired
    private AnalyticsService analyticsService;

    @PostMapping("/track")
    public ResponseEntity<?> trackEvent(@RequestBody Map<String, String> payload) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = "ANONYMOUS";
        String email = "ANONYMOUS";

        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            // We can fetch User ID if needed, here we simplify using auth name (email)
            email = auth.getName();
            userId = email; // ideally lookup ID
        }

        String actionStr = payload.get("action");
        String noteId = payload.get("noteId");
        String details = payload.get("details");

        Log.ActionType action = Log.ActionType.valueOf(actionStr);

        analyticsService.logEvent(action, userId, email, noteId, details, "REQUEST_IP"); // In real app use
                                                                                         // request.getRemoteAddr()

        return ResponseEntity.ok().build();
    }
}
