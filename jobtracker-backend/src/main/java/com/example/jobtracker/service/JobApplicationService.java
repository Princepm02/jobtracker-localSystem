package com.example.jobtracker.service;

import com.example.jobtracker.model.JobApplication;
import com.example.jobtracker.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository repository;

    public List<JobApplication> getAllApplications() {
        return repository.findAll();
    }

    public Optional<JobApplication> getApplicationById(Long id) {
        return repository.findById(id);
    }

    public JobApplication createApplication(JobApplication application) {
        return repository.save(application);
    }

    public JobApplication updateApplication(Long id, JobApplication applicationDetails) {
        JobApplication application = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Application not found with id " + id));
        
        application.setCompanyName(applicationDetails.getCompanyName());
        application.setRole(applicationDetails.getRole());
        application.setAppliedDate(applicationDetails.getAppliedDate());
        application.setStatus(applicationDetails.getStatus());
        application.setInterviewDate(applicationDetails.getInterviewDate());
        application.setNotes(applicationDetails.getNotes());
        
        return repository.save(application);
    }

    public void deleteApplication(Long id) {
        repository.deleteById(id);
    }
}
