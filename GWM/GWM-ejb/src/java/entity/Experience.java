package entity;

import enumeration.Game;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Experience implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long experienceId;

    @Column(nullable = false)
    private Game game;
    
    @Column(length = 32, nullable = false)
    private String rank;
    
    @Column(nullable = false)
    private String profileLink;

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
