/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author ruth
 */
@Entity
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameId;
    
    @Column(length=100, nullable=false, unique=true)
    private String gameName;
    
    @Column(length=500, nullable=false)
    private String gameDescription;
    
    @Column(length=999, nullable=false)
    private String gameDownloadLink;
    
    private boolean hidden;    
    
    public Game() {
    }

    public Game(String gameName, String gameDescription, String gameDownloadLink) {
        this.gameName = gameName;
        this.gameDescription = gameDescription;
        this.gameDownloadLink = gameDownloadLink;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public String getGameDescription() {
        return gameDescription;
    }

    public void setGameDescription(String gameDescription) {
        this.gameDescription = gameDescription;
    }

    public String getGameDownloadLink() {
        return gameDownloadLink;
    }

    public void setGameDownloadLink(String gameDownloadLink) {
        this.gameDownloadLink = gameDownloadLink;
    }

    public boolean isHidden() {
        return hidden;
    }

    public void setHidden(boolean hidden) {
        this.hidden = hidden;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (gameId != null ? gameId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the gameId fields are not set
        if (!(object instanceof Game)) {
            return false;
        }
        Game other = (Game) object;
        if ((this.gameId == null && other.gameId != null) || (this.gameId != null && !this.gameId.equals(other.gameId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Game[ id=" + gameId + " ]";
    }
    
}
