package com.clothingstore.clothingstore.service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.clothingstore.clothingstore.domain.Clothes;
import com.clothingstore.clothingstore.domain.Images;
import com.clothingstore.clothingstore.domain.Review;
import com.clothingstore.clothingstore.domain.ReviewImages;
import com.clothingstore.clothingstore.repository.ImageRepository;
import com.clothingstore.clothingstore.repository.ReviewImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ClothesService clothesService;
    @Autowired
    private ReviewImagesRepository reviewImagesRepository;
    @Autowired
    private Executor processExecutor;

    @Value("${upload.path}")
    private String uploadPath;

    public List<Images> getClothesImages(Clothes clothes) {
        return imageRepository.findByClothes(clothes);
    }

    public List<Images> saveClothesImage(MultipartFile[] files, Long clothes_id) throws IOException {

        for (MultipartFile file : files) {
            String UUIDFile = java.util.UUID.randomUUID().toString();
            String resultFilename = UUIDFile + "." + file.getOriginalFilename();

            processExecutor.execute(() -> saveFile(file, uploadPath + "/clothes/" + resultFilename, "clothes/" + resultFilename));

            Images image = new Images();
            image.setImage(resultFilename);
            image.setClothes(clothesService.getClothesById(clothes_id));
            imageRepository.save(image);
        }

        return getClothesImages(clothesService.getClothesById(clothes_id));
    }

    public String saveCustomerImage(MultipartFile photo, String gender) {
        if (photo != null) {
            File uploadDir = new File(uploadPath);

            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            String UUIDFile = java.util.UUID.randomUUID().toString();
            String resultFilename = UUIDFile + "." + photo.getOriginalFilename();

            try {
                photo.transferTo(new File(uploadPath + "/users/" + resultFilename));
                putObjectIn_AWS_S3(get_AWS_S3_Client(), "users/" + resultFilename);

                deleteLocalFile(uploadPath + "/users/" + resultFilename);
            } catch (IOException ex) {
                System.out.println(ex);
            }

            return resultFilename;
        }

        if (gender.equals("Man")) {
            return "default-user-man.png";
        } else {
            return "default-user-woman.png";
        }
    }

    public List<ReviewImages> saveReviewImage(MultipartFile[] images, Review review) {
        List<ReviewImages> reviewImages = new ArrayList<>();
        long start = System.currentTimeMillis();

        for (MultipartFile file : images) {
            String UUIDFile = java.util.UUID.randomUUID().toString();
            String resultFilename = UUIDFile + "." + file.getOriginalFilename();

            processExecutor.execute(() -> saveFile(file, uploadPath + "/reviews/" + resultFilename, "reviews/" + resultFilename));

            ReviewImages image = new ReviewImages();
            image.setImage(resultFilename);
            image.setReview(review);
            reviewImages.add(image);
        }
        System.out.println("Elapsed time: " + (System.currentTimeMillis() - start));

        return reviewImages;
    }

    public List<ReviewImages> saveEditedReviewImages(MultipartFile[] images, Review editedReview, Review review) {
        List<ReviewImages> reviewImages = new ArrayList<>();

        if (editedReview.getReviewImages().size() != review.getReviewImages().size()) {
            if (editedReview.getReviewImages().size() != 0) {
                reviewImagesRepository.deleteAllByReview(review);
                deleteReviewsImagesFromAWS(review.getReviewImages());
            }

            for (ReviewImages image : review.getReviewImages()) {
                ReviewImages newReviewImage = new ReviewImages();
                newReviewImage.setImage(image.getImage());
                newReviewImage.setReview(editedReview);
                reviewImages.add(image);
            }
        }

        for (MultipartFile file : images) {
            String UUIDFile = java.util.UUID.randomUUID().toString();
            String resultFilename = UUIDFile + "." + file.getOriginalFilename();

            processExecutor.execute(() ->saveFile(file, uploadPath + "/reviews/" + resultFilename, "reviews/" + resultFilename));

            ReviewImages image = new ReviewImages();
            image.setImage(resultFilename);
            image.setReview(editedReview);
            reviewImages.add(image);
        }

        return reviewImages;
    }

    public void deleteClothesImage(Long id) {
        Images image = imageRepository.findById(id).orElse(null);
        deleteObjectIn_AWS_S3(get_AWS_S3_Client(), "clothes/" + image.getImage());
        imageRepository.delete(image);
    }

    public void deleteReviewsImagesFromAWS(List<ReviewImages> reviewImages) {
        for (ReviewImages image : reviewImages) {
            deleteObjectIn_AWS_S3(get_AWS_S3_Client(), "reviews/" + image.getImage());
        }
    }

    private void saveFile(MultipartFile file, String localPath, String AWSPath) {
        try {
            file.transferTo(new File(localPath));
        } catch (IOException e) {
            e.printStackTrace();
        }

        putObjectIn_AWS_S3(get_AWS_S3_Client(), AWSPath);
        deleteLocalFile(localPath);
    }


    private void deleteLocalFile(String path) {
        File imageFile = new File(path);
        if (imageFile.delete()) {
            System.out.println("Удалено успешно");
        } else {
            System.out.println("Не удалось удалить");
        }
    }

    private AmazonS3 get_AWS_S3_Client() {
        AWSCredentials credentials = new BasicAWSCredentials(
                "AKIAJTR4M5VMWDCMSASQ",
                "XAZe0Fu5gL3Bk0IAdGzvBZdvyOIIc+vxJmeiBlRs"
        );
        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.US_WEST_1)
                .build();
    }

    private void putObjectIn_AWS_S3(AmazonS3 s3client, String pathName) {
        s3client.putObject(
                "clothes-store-basket",
                pathName,
                new File(uploadPath + "/" + pathName)
        );

        System.out.println("Put");
    }

    private void deleteObjectIn_AWS_S3(AmazonS3 s3client, String pathName) {
        s3client.deleteObject(
                "clothes-store-basket",
                pathName
        );
    }


}
