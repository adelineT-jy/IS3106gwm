package session;

import entity.Admin;
import entity.Game;
import error.InvalidLoginException;
import java.util.List;
import javax.ejb.Local;
import javax.persistence.NoResultException;

@Local
public interface AdminSessionLocal {
    
    public Admin getAdmin(Long adminId) throws NoResultException;

    public Admin getAdminByEmail(String email) throws NoResultException;
    
    public Long loginAdmin(String email, String password) throws InvalidLoginException;
    
    public void createAdmin(Admin admin);
    
    public void updateAdmin(Admin admin) throws NoResultException;
    
    public void deleteAdmin(Long adminId) throws NoResultException;
    
    public void banUser(Long userId) throws NoResultException;
    
    public void unbanUser(Long userId) throws NoResultException;
    
    public void createGame(Game game);
    
    public Game getGame(Long gameId) throws NoResultException;
    
    public List<Game> searchGame(String name) throws NoResultException;
    
    public void updateGame(Game game) throws NoResultException;
}

    
    
    
