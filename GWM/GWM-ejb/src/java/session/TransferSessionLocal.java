package session;

import entity.Card;
import entity.User;
import error.InsufficientFundsException;
import error.NoResultException;
import java.math.BigDecimal;
import javax.ejb.Local;

@Local
public interface TransferSessionLocal {
    public void transferFunds(Long userId1, Long userId2, BigDecimal amount) throws NoResultException, InsufficientFundsException;
    
    public void transferFundsUser(User fromUser, User toUser, BigDecimal amount) throws InsufficientFundsException;
    
    public void depositFunds(Long userId, Card card) throws NoResultException;
    
    public void withdrawFunds(Long userId, BigDecimal amount) throws NoResultException, InsufficientFundsException;
}
