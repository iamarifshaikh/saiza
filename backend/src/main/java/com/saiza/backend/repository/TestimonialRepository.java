package com.saiza.backend.repository;

import com.saiza.backend.model.Testimonial;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestimonialRepository extends MongoRepository<Testimonial, String> {
}
