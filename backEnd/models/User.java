package com.cafeteria.models;

import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.persistence.*;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.awt.image.WritableRaster;
import java.io.File;
import java.io.IOException;
import java.util.Objects;

@MappedSuperclass
public abstract class User {

    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "PasswordEnc")
    private String passwordEnc;

    @Column(name = "Email")
    private String email;

    @Column(name = "ProfilePicture")
    private String profilePicture;//address to the profile picture

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordEnc() {
        return passwordEnc;
    }

    public void setPasswordEnc(String password) {
        this.passwordEnc = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setprofilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public User() {}

    public byte[] extractBytes (String ImageName) throws IOException {
        // open image
        File imgPath = new File(ImageName);
        BufferedImage bufferedImage = ImageIO.read(imgPath);

        // get DataBufferBytes from Raster
        WritableRaster raster = bufferedImage .getRaster();
        DataBufferByte data   = (DataBufferByte) raster.getDataBuffer();

        return ( data.getData() );
    }

    public User(String username, String password, String email, String profilePicture)  {
        this.username = username;
        this.passwordEnc = password;
        this.email = email;
        this.profilePicture = profilePicture;
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.passwordEnc = password;
        this.email = email;
        this.profilePicture = profilePicture;
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, passwordEnc, email, profilePicture);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        User user = (User) obj;
        return  Objects.equals(username, user.getUsername()) &&
                Objects.equals(passwordEnc, user.getPasswordEnc()) &&
                Objects.equals(email, user.getEmail()) &&
                Objects.equals(profilePicture, user.getProfilePicture());

    }

    @Override
    public String toString() {
        return "User{"+"username='"+username+"', email='"+email+"'}";
    }
}
