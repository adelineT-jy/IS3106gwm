/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.User;
import error.NoResultException;
import java.math.BigDecimal;
import javax.ejb.Stateless;
import javax.ejb.EJB;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author ruth
 */
@Stateless
public class PaymentSession implements PaymentSessionLocal {
    
    @PersistenceContext
    private EntityManager em;
    
    @EJB
    private UserSessionLocal userSessionLocal;
    
    @Override
    public void topupWallet(Long uId, BigDecimal amount) throws NoResultException {
        User u = userSessionLocal.getUserById(uId);
        u.setWallet(u.getWallet().add(amount));
        
    } 
}
