package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Card implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @Column(length = 16, nullable = false)
    private String cardNum;
    
    @Temporal(TemporalType.DATE)
    @Column(nullable=false)
    private Date expDate;
    
    @Column(length = 4, nullable = false)
    private String cvv;
    
    @Column(length = 32, nullable = false)
    private String name;

    public Card() {
    }

    public Card(Long cardId, String cardNum, Date expDate, String cvv, String name) {
        this();
        this.cardId = cardId;
        this.cardNum = cardNum;
        this.expDate = expDate;
        this.cvv = cvv;
        this.name = name;
    }
    
    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public String getCardNum() {
        return cardNum;
    }

    public void setCardNum(String cardNum) {
        this.cardNum = cardNum;
    }

    public Date getExpDate() {
        return expDate;
    }

    public void setExpDate(Date expDate) {
        this.expDate = expDate;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
