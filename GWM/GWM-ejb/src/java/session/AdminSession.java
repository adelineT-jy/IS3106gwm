package session;

import entity.Admin;
import entity.Game;
import entity.User;
import error.InvalidLoginException;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import error.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
public class AdminSession implements AdminSessionLocal {

    @PersistenceContext
    private EntityManager em;
    @EJB
    private UserSessionLocal userSessionLocal;

    @Override
    public Admin getAdmin(Long adminId) throws NoResultException {
        Admin admin = em.find(Admin.class, adminId);

        if (admin == null) {
            throw new NoResultException("No admin can be found from input");
        } else {
            return admin;
        }
    }

    @Override
    public Admin getAdminByEmail(String email) throws NoResultException {
        Query q = em.createQuery("SELECT a FROM Admin a WHERE a.email = :email");
        q.setParameter("email", email);

        try {
            Admin admin = (Admin) q.getSingleResult();
            return admin;
        } catch (javax.persistence.NoResultException | NonUniqueResultException ex) {
            throw new NoResultException("Email does not exist");
        }
    }

    @Override
    public Admin loginAdmin(String email, String password) throws InvalidLoginException {
        try {
            Admin admin = getAdminByEmail(email);

            if (admin.getPassword().equals(password)) {
                return admin;
            } else {
                throw new InvalidLoginException("Incorrect password");
            }
        } catch (NoResultException ex) {
            throw new InvalidLoginException("Username cannot be found");
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
        oldAdmin.setPassword(admin.getPassword());

        em.merge(oldAdmin);
    }

    @Override
    public void deleteAdmin(Long adminId) throws NoResultException {
        Admin admin = getAdmin(adminId);

        em.remove(admin);
    }

    @Override
    public void banUser(Long userId) throws NoResultException {
        User user = userSessionLocal.getUserById(userId);
        if (user.isIsAvailable()) {
            user.setIsAvailable(false);
        } else {
            throw new NoResultException("User is already banned.");
        }
    }

    @Override
    public void unbanUser(Long userId) throws NoResultException {
        User user = userSessionLocal.getUserById(userId);
        if (!user.isIsAvailable()) {
            user.setIsAvailable(true);
        } else {
            throw new NoResultException("User is not banned.");
        }
    }

    @Override
    public void createGame(Game game) throws NoResultException {
        Query q = em.createQuery("SELECT g FROM Game g WHERE g.gameName = :gameName");
        q.setParameter("gameName", game.getGameName());

        try {
            Game g1 = (Game) q.getSingleResult();
            throw new NoResultException("Game already exist!");
        } catch (javax.persistence.NoResultException | NonUniqueResultException ex) {
            game.setHidden(false);
            em.persist(game);
        }
    }

    @Override
    public Game getGame(Long gameId) throws NoResultException {
        Game game = em.find(Game.class, gameId);

        if (game == null) {
            throw new NoResultException("No game can be found from input");
        } else {
            return game;
        }
    }

    @Override
    public List<Game> searchGame(String name) throws NoResultException {
        Query q;
        if (name != null) {
            q = em.createQuery("SELECT g FROM Game g WHERE LOWER(g.gameName) LIKE :name");
            q.setParameter("name", "%" + name.toLowerCase() + "%");
        } else {
            q = em.createQuery("SELECT g from Game g");
        }

        return q.getResultList();
    }

    @Override
    public void updateGame(Game game) throws NoResultException {
        Query q = em.createQuery("SELECT g FROM Game g WHERE g.gameName = :gameName");
        q.setParameter("gameName", game.getGameName());

        try {
            Game g1 = (Game) q.getSingleResult();
            if (!g1.getGameName().equals(game.getGameName())) {
                throw new NoResultException("Game already exist!");
            } else {
                Game oldGame = getGame(game.getGameId());

                oldGame.setGameDescription(game.getGameDescription());
                oldGame.setGameDownloadLink(game.getGameDownloadLink());
                oldGame.setGameName(game.getGameName());
                oldGame.setHidden(game.isHidden());

                em.merge(oldGame);
            }
        } catch (javax.persistence.NoResultException | NonUniqueResultException ex) {
            Game oldGame = getGame(game.getGameId());

            oldGame.setGameDescription(game.getGameDescription());
            oldGame.setGameDownloadLink(game.getGameDownloadLink());
            oldGame.setGameName(game.getGameName());
            oldGame.setHidden(game.isHidden());

            em.merge(oldGame);
        }
    }

    @Override
    public void hideGame(Long gameId) throws NoResultException {
        Game game = getGame(gameId);
        if (!game.isHidden()) {
            game.setHidden(true);
        } else {
            throw new NoResultException("Game is already hidden.");
        }
    }

    @Override
    public void unhideGame(Long gameId) throws NoResultException {
        Game game = getGame(gameId);
        if (game.isHidden()) {
            game.setHidden(false);
        } else {
            throw new NoResultException("Game is not hidden.");
        }
    }
}
