package com.saiza.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.lastIndexOf(".") > 0) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        } else {
            extension = ".pdf"; // Default to pdf if missing
        }

        // Use UUID + extension for public_id to ensure Cloudinary treats it as a file
        // with extension
        String publicId = java.util.UUID.randomUUID().toString() + extension;

        Map<String, Object> params = new java.util.HashMap<>();
        params.put("resource_type", "raw"); // Raw files bypass image processing
        params.put("public_id", publicId); // Explicit extension is key for correct MIME type
        params.put("type", "upload"); // Public access

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), params);

        return uploadResult.get("secure_url").toString();
    }
}
