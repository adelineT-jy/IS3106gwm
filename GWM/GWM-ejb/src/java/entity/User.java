package entity;

import java.io.Serializable;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.swing.ImageIcon;

@Entity
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(length = 32, nullable = false, unique = true)
    private String email;

    @Column(length = 32, nullable = false, unique = true)
    private String username;

    //To set password: user.setProtectedPassword(password)
    //To validate password: generateProtectedPassword(user.getPasswordSalt(), enteredPW) == enteredPW
    @Column(length = 4, nullable = false)
    private String passwordSalt;
    @Column(length = 128, nullable = false)
    private String protectedPassword;

    @Column(nullable = false)
    private boolean isAvailable = true;

    @Column(scale = 2, nullable = false)
    private double wallet = 0.00;

    private ImageIcon profileImage;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<User> following;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Experience> experiences;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Card> cards;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Chat> chats;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Party> parties;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Post> posts;

    public User() {
        passwordSalt = new SecureRandom().nextInt(10000) + ""; //securerandom number from 0-9999 (4 digits)
        following = new ArrayList<>();
        experiences = new ArrayList<>();
        cards = new ArrayList<>();
        chats = new ArrayList<>();
        parties = new ArrayList<>();
        posts = new ArrayList<>();
    }

    public User(String email, String username, String plainPassword, ImageIcon profileImage) {
        this.email = email;
        this.username = username;
        this.protectedPassword = generateProtectedPassword(passwordSalt, plainPassword);
        this.profileImage = profileImage;
    }
    
    //Required constructors to be added here   
    
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getProtectedPassword() {
        return protectedPassword;
    }

    public void setProtectedPassword(String plainPassword) {
        this.protectedPassword = generateProtectedPassword(this.passwordSalt, plainPassword);
    }

    public boolean isIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public double getWallet() {
        return wallet;
    }

    public void setWallet(double wallet) {
        this.wallet = wallet;
    }

    public ImageIcon getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(ImageIcon profileImage) {
        this.profileImage = profileImage;
    }

    public List<User> getFollowing() {
        return following;
    }

    public void setFollowing(List<User> following) {
        this.following = following;
    }

    public List<Experience> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<Experience> experiences) {
        this.experiences = experiences;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    public List<Chat> getChats() {
        return chats;
    }

    public void setChats(List<Chat> chats) {
        this.chats = chats;
    }

    public List<Party> getParties() {
        return parties;
    }

    public void setParties(List<Party> parties) {
        this.parties = parties;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
}
