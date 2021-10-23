package entity;

import java.io.Serializable;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.SecureRandom;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Admin implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    @Column(length = 32, nullable = false, unique = true)
    private String email;

    @Column(length = 4, nullable = false)
    private String passwordSalt;
    @Column(length = 128, nullable = false)
    private String protectedPassword;

    public Admin() {
        passwordSalt = new SecureRandom().nextInt(10000) + ""; //securerandom number from 0-9999 (4 digits)
    }
    
    public Admin(String email, String plainPassword) {
        this.email = email;
        this.protectedPassword = generateProtectedPassword(passwordSalt, plainPassword);
    }
    
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private static String generateProtectedPassword(String passwordSalt, String plainPassword) {

        String generatedPassword = null;

        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.reset();
            md.update((passwordSalt + plainPassword).getBytes("utf8"));

            generatedPassword = String.format("%0128x", new BigInteger(1, md.digest()));
        } catch (Exception ex) {
        }
        return generatedPassword;
    }

    public String getPasswordSalt() {
        return passwordSalt;
    }

    public void setPasswordSalt(String passwordSalt) {
        this.passwordSalt = passwordSalt;
    }

    public String getProtectedPassword() {
        return protectedPassword;
    }

    public void setProtectedPassword(String plainPassword) {
        this.protectedPassword = generateProtectedPassword(this.passwordSalt, plainPassword);
    }
}
