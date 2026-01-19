package com.saiza.backend.repository;

import com.saiza.backend.model.Domain;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DomainRepository extends MongoRepository<Domain, String> {
}
