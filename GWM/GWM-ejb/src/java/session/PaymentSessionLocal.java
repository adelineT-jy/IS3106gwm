/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import error.NoResultException;
import java.math.BigDecimal;
import javax.ejb.Local;

/**
 *
 * @author ruth
 */
@Local
public interface PaymentSessionLocal {
    
    public void topupWallet(Long uId, BigDecimal amount) throws NoResultException;
}
