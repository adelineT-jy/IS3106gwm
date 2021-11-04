package session;

import entity.Card;
import entity.User;
import error.InsufficientFundsException;
import error.NoResultException;
import java.math.BigDecimal;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class TransferSession implements TransferSessionLocal {

    @PersistenceContext
    private EntityManager em;
    @EJB
    private UserSessionLocal userSessionLocal;

    @Override
    public void transferFunds(Long fromUserId, Long toUserId, BigDecimal amount) throws NoResultException, InsufficientFundsException {
        User fromUser = userSessionLocal.getUserById(fromUserId);
        User toUser = userSessionLocal.getUserById(toUserId);
        transferFundsUser(fromUser, toUser, amount);
    }
    
    @Override
    public void transferFundsUser(User fromUser, User toUser, BigDecimal amount) throws InsufficientFundsException {
        
        if (amount.compareTo(fromUser.getWallet()) <= 0) {
            fromUser.setWallet(fromUser.getWallet().subtract(amount));
            toUser.setWallet(toUser.getWallet().add(amount));
        } else {
            throw new InsufficientFundsException("You do not have enough funds to perform the transfer!");
        }
    }

    @Override
    public void depositFunds(Long userId, Card card) throws NoResultException {
        User user = userSessionLocal.getUserById(userId);
        
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void withdrawFunds(Long userId, BigDecimal amount) throws NoResultException, InsufficientFundsException {
        User user = userSessionLocal.getUserById(userId);
        
        if (amount.compareTo(user.getWallet()) <= 0) {
            throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        } else {
            throw new InsufficientFundsException("You do not have enough funds to perform the withdrawal!");
        }
        
    }

}
