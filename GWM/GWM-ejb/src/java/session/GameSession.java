/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Game;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

/**
 *
 * @author ruth
 */
@Stateless
public class GameSession implements GameSessionLocal {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Game getGame(Long gameId) throws NoResultException {
        Game game = em.find(Game.class, gameId);

        if (game == null) {
            throw new NoResultException("No game can be found from input");
        } else {
            return game;
        }
    }

}
