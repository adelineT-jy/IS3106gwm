package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Card implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @Column(length = 16, nullable = false)
    private int cardNum;
    
    @Column(length = 5, nullable = false)
    private String expDate;
    
    @Column(length = 4, nullable = false)
    private int cvv;
    
    @Column(length = 32, nullable = false)
    private String name;

    public Card() {
    }

    public Card(Long cardId, int cardNum, String expDate, int cvv, String name) {
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

    public int getCardNum() {
        return cardNum;
    }

    public void setCardNum(int cardNum) {
        this.cardNum = cardNum;
    }

    public String getExpDate() {
        return expDate;
    }

    public void setExpDate(String expDate) {
        this.expDate = expDate;
    }

    public int getCvv() {
        return cvv;
    }

    public void setCvv(int cvv) {
        this.cvv = cvv;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
