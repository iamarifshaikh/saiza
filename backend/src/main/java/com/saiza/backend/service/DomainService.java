package com.saiza.backend.service;

import com.saiza.backend.model.Domain;
import com.saiza.backend.repository.DomainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DomainService {
    @Autowired
    private DomainRepository domainRepository;

    public List<Domain> getAllDomains() {
        return domainRepository.findAll();
    }

    public Domain createDomain(Domain domain) {
        return domainRepository.save(domain);
    }

    public void deleteDomain(String id) {
        domainRepository.deleteById(id);
    }
}
