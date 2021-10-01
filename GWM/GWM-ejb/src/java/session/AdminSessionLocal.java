package session;

import entity.Admin;
import error.InvalidLoginException;
import javax.ejb.Local;
import javax.persistence.NoResultException;

@Local
public interface AdminSessionLocal {
    
    public Admin getAdmin(Long userId) throws NoResultException;

    public Admin getAdminByEmail(String email) throws NoResultException;
    
    public Long loginAdmin(String email, String password) throws InvalidLoginException;
    
    public void createAdmin(Admin admin);
    
    public void updateAdmin(Admin admin) throws NoResultException;
    
    public void deleteAdmin(Long adminId) throws NoResultException;
}

    
    
    
