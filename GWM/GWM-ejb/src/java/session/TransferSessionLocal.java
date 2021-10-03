package session;

import entity.Card;
import error.InsufficientFundsException;
import error.NoResultException;
import javax.ejb.Local;

@Local
public interface TransferSessionLocal {
    public void transferFunds(Long userId1, Long userId2, double amount) throws NoResultException, InsufficientFundsException;
    
    public void depositFunds(Long userId, Card card) throws NoResultException;
    
    public void withdrawFunds(Long userId, double amount) throws NoResultException, InsufficientFundsException;
}
