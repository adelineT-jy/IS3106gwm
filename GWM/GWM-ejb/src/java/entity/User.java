package entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.json.bind.annotation.JsonbTransient;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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

    @Column(length = 32, nullable = false)
    private String password;
    
    @Column(length = 80, nullable = true)
    private String about;

    @Column(nullable = false)
    private byte gender;

    @Temporal(TemporalType.DATE)
    private Date dob;

    @Column(nullable = false)
    private boolean isAvailable;

    @Column(scale = 2, nullable = false)
    private BigDecimal wallet = new BigDecimal(BigInteger.ZERO, 2);

//    private ImageIcon profileImage;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<Notification> notify;

    @JsonbTransient
    @ManyToMany
    private List<User> following;
    
//    @JsonbTransient
//    @ManyToOne
//    private List<User> followers;


    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH} )
    private List<Experience> experiences;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH})
    private List<Card> cards;

    @JsonbTransient
    @ManyToMany
    private List<Chat> chats;

    @JsonbTransient
    @ManyToMany
    private List<Party> parties;

    @JsonbTransient
    @OneToMany
    private List<Post> posts;

    @OneToMany(mappedBy = "requester")
    private List<Request> requests;

    @OneToMany
    private List<Review> reviews;

    public User() {
        isAvailable = true;
        notify = new ArrayList<>();
        following = new ArrayList<>();
//        followers = new ArrayList<>();
        experiences = new ArrayList<>();
        cards = new ArrayList<>();
        chats = new ArrayList<>();
        parties = new ArrayList<>();
        posts = new ArrayList<>();
        reviews = new ArrayList<>();
    }

    public User(String email, String username, String password, byte gender) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.gender = gender;
    }

//    public User(String email, String username, String password, ImageIcon profileImage) {
//        this.email = email;
//        this.username = username;
//        this.password = password;
//        this.profileImage = profileImage;
//    }
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public byte getGender() {
        return gender;
    }

    public void setGender(byte gender) {
        this.gender = gender;
    }

    public boolean isIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public BigDecimal getWallet() {
        return wallet;
    }

    public void setWallet(BigDecimal wallet) {
        this.wallet = wallet;
    }

//    public ImageIcon getProfileImage() {
//        return profileImage;
//    }
//
//    public void setProfileImage(ImageIcon profileImage) {
//        this.profileImage = profileImage;
//    }
    public List<Notification> getNotify() {
        return notify;
    }

    public void setNotify(List<Notification> notify) {
        this.notify = notify;
    }

    public void addNotify(Notification notify) {
        this.notify.add(notify);
    }

    public void removeNotify(Notification notify) {
        this.notify.remove(notify);
    }

    public List<User> getFollowing() {
        return following;
    }

    public void setFollowing(List<User> following) {
        this.following = following;
    }

    public void addFollowing(User user) {
        this.following.add(user);
    }

    public void removeFollowing(User user) {
        this.following.remove(user);
    }

//    public List<User> getFollowers() {
//        return followers;
//    }
//
//    public void setFollowers(List<User> followers) {
//        this.followers = followers;
//    }
//    
//    public void addFollower(User user) {
//        this.followers.add(user);
//    }
//    
//    public void removeFollower(User user) {
//        this.followers.remove(user);
//    }

    public List<Experience> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<Experience> experiences) {
        this.experiences = experiences;
    }

    public void addExperience(Experience exp) {
        this.experiences.add(exp);
    }

    public void removeExperience(Experience exp) {
        this.experiences.remove(exp);
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    public void addCard(Card card) {
        this.cards.add(card);
    }

    public void removeCard(Card card) {
        this.cards.remove(card);
    }

    public List<Chat> getChats() {
        return chats;
    }

    public void setChats(List<Chat> chats) {
        this.chats = chats;
    }

    public void addChat(Chat chat) {
        this.chats.add(chat);
    }

    public void removeChat(Chat chat) {
        this.chats.remove(chat);
    }

    public List<Party> getParties() {
        return parties;
    }

    public void setParties(List<Party> parties) {
        this.parties = parties;
    }

    public void addParty(Party party) {
        this.parties.add(party);
    }

    public void removeParty(Party party) {
        this.parties.remove(party);
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public void addPost(Post post) {
        this.posts.add(post);
    }

    public void removePost(Post post) {
        this.posts.remove(post);
    }

    public List<Request> getRequests() {
        return requests;
    }

    public void setRequests(List<Request> requests) {
        this.requests = requests;
    }

    public void addRequest(Request req) {
        this.requests.add(req);
    }

    public void removeRequest(Request req) {
        this.requests.remove(req);
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

}
