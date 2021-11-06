/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author HP
 */
@Entity
public class Party implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long partyId;

    @Column(length = 999, nullable = false)
    private String inviteLink;

    @Temporal(TemporalType.TIMESTAMP)
    private Date partyStartTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date partyEndTime;
    
    private boolean hidden;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private User partyOwner;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "parties")
    private List<User> users;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Post post;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Review> reviews;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Chat chat;

    public Party() {
    }

    public Long getPartyId() {
        return partyId;
    }

    public void setPartyId(Long partyId) {
        this.partyId = partyId;
    }

    public String getInviteLink() {
        return inviteLink;
    }

    public void setInviteLink(String inviteLink) {
        this.inviteLink = inviteLink;
    }

    public Date getPartyStartTime() {
        return partyStartTime;
    }

    public void setPartyStartTime(Date partyStartTime) {
        this.partyStartTime = partyStartTime;
    }

    public Date getPartyEndTime() {
        return partyEndTime;
    }

    public void setPartyEndTime(Date partyEndTime) {
        this.partyEndTime = partyEndTime;
    }

    public User getPartyOwner() {
        return partyOwner;
    }

    public void setPartyOwner(User partyOwner) {
        this.partyOwner = partyOwner;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public boolean isHidden() {
        return hidden;
    }

    public void setHidden(boolean Hidden) {
        this.hidden = Hidden;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (partyId != null ? partyId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the partyId fields are not set
        if (!(object instanceof Party)) {
            return false;
        }
        Party other = (Party) object;
        if ((this.partyId == null && other.partyId != null) || (this.partyId != null && !this.partyId.equals(other.partyId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Party[ id=" + partyId + " ]";
    }

    public void getPartyStartTime(Date date) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
