package com.saiza.backend.repository;

import com.saiza.backend.model.Log;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface LogRepository extends MongoRepository<Log, String> {
    List<Log> findAllByOrderByTimestampDesc();

    List<Log> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

    long countByAction(Log.ActionType action);
}
