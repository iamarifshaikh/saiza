package com.saiza.backend.service;

import com.saiza.backend.model.Log;
import com.saiza.backend.repository.LogRepository;
import com.saiza.backend.repository.UserRepository;
import com.saiza.backend.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {
    @Autowired
    private LogRepository logRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoteRepository noteRepository;

    public void logEvent(Log.ActionType action, String userId, String userEmail, String noteId, String details,
            String ipAddress) {
        Log log = new Log();
        log.setAction(action);
        log.setUserId(userId);
        log.setUserEmail(userEmail);
        log.setNoteId(noteId);
        log.setDetails(details);
        log.setIpAddress(ipAddress);
        log.setTimestamp(LocalDateTime.now());
        logRepository.save(log);
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // 1. Total Users
        stats.put("totalUsers", userRepository.count());

        // 2. Recent Logs (Last 20)
        List<Log> recentLogs = logRepository.findAllByOrderByTimestampDesc();
        stats.put("recentLogs", recentLogs.subList(0, Math.min(recentLogs.size(), 20)));

        // 3. Traffic (Last 7 Days) - Simplified aggregation
        // In a real app, use Aggregation pipeline. Here we fetch and count in Java for
        // simplicity if data is small.
        // For production, use MongoTemplate aggregation.
        Map<String, Long> traffic = new HashMap<>();
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        List<Log> logsLast7Days = logRepository.findByTimestampBetween(sevenDaysAgo, LocalDateTime.now());

        // Count by Day
        // ... (Logic to group by day)

        stats.put("totalViews", logRepository.countByAction(Log.ActionType.VIEW_PDF));
        stats.put("totalDownloads", logRepository.countByAction(Log.ActionType.DOWNLOAD_PDF));

        return stats;
    }

    public List<Log> getAllLogs() {
        return logRepository.findAllByOrderByTimestampDesc();
    }
}
