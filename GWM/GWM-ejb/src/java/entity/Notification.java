/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Possible use of notification > ppl request post, post accepted, reminder??,
 * chat involvement, review reminder
 *
 * @author Adeline
 */
@Entity
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notiId;

    @Column(nullable = false)
    private String message;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTime;

    @ManyToOne
    private User user;

    public Notification(String message, Date dateTime) {
        this.message = message;
        this.dateTime = dateTime;
    }

    public Long getId() {
        return notiId;
    }

    public void setId(Long notiId) {
        this.notiId = notiId;
    }

    public Long getNotiId() {
        return notiId;
    }

    public void setNotiId(Long notiId) {
        this.notiId = notiId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (notiId != null ? notiId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the notiId fields are not set
        if (!(object instanceof Notification)) {
            return false;
        }
        Notification other = (Notification) object;
        if ((this.notiId == null && other.notiId != null) || (this.notiId != null && !this.notiId.equals(other.notiId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Notification[ notiId=" + notiId + " ]";
    }

}
