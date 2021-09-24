package session;

import entity.Admin;
import error.InvalidLoginException;
import java.math.BigInteger;
import java.security.MessageDigest;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
public class AdminSession implements AdminSessionLocal {
    @PersistenceContext
    private EntityManager em;
    
    @Override
    public Admin getAdmin(Long userId) throws NoResultException {
        Admin admin = em.find(Admin.class, userId);
        
        if (admin == null) {
            throw new NoResultException("No admin can be found from input");
        } else {
            return admin;
        }
    }

    @Override
    public Admin getAdminByEmail(String email)  throws NoResultException {
        Query q = em.createQuery("SELECT a FROM Administrator a WHERE a.email = :email");
        q.setParameter("email", email);

        Admin admin = (Admin) q.getSingleResult();
        return admin;
    }

    private static String generateProtectedPassword(String passwordSalt, String plainPassword) {
        String generatedPassword = null;

        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.reset();
            md.update((passwordSalt + plainPassword).getBytes("utf8"));

            generatedPassword = String.format("%0128x", new BigInteger(1, md.digest()));
        } catch (Exception ex) {
        }
        return generatedPassword;
    }
    
    @Override
    public Long loginAdmin(String email, String password) throws InvalidLoginException {
        
        
        try {
            Admin admin;    
            admin = getAdminByEmail(email);
            
            String passwordCompare = generateProtectedPassword(admin.getPasswordSalt(), password);
            if (admin.getProtectedPassword().equals(passwordCompare)) {
                return admin.getUserId();
            }
            throw new InvalidLoginException("Login details are invalid.");
        } catch (NoResultException ex) {
            throw new InvalidLoginException("Login details are invalid.");
        }
    }

    @Override
    public void createAdmin(Admin admin) {
        em.persist(admin);
    }

    @Override
    public void updateAdmin(Admin admin) throws NoResultException {
        Admin oldAdmin = getAdmin(admin.getUserId());
        
        oldAdmin.setEmail(admin.getEmail());
        
        if (admin.getProtectedPassword() != null) { //password is changed
            oldAdmin.setProtectedPassword(admin.getProtectedPassword());
        }
        
       em.merge(oldAdmin);
    }
    
}
