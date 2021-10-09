package entity;


import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Experience implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long experienceId;
    
    @Column(length = 32, nullable = false)
    private String rank;
    
    @Column(nullable = false)
    private String profileLink;
    
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Game game;

    public Experience() {
    }
    
    public Experience(Long experienceId, Game game, String rank, String profileLink) {
        this();
        this.experienceId = experienceId;
        this.game = game;
        this.rank = rank;
        this.profileLink = profileLink;
    }

    public Long getExperienceId() {
        return experienceId;
    }

    public void setExperienceId(Long experienceId) {
        this.experienceId = experienceId;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getProfileLink() {
        return profileLink;
    }

    public void setProfileLink(String profileLink) {
        this.profileLink = profileLink;
    }
}
