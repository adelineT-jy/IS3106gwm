/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Game;
import java.util.List;
import javax.ejb.Local;
import javax.persistence.NoResultException;

/**
 *
 * @author ruth
 */
@Local
public interface GameSessionLocal {

    public Game getGame(Long gameId) throws NoResultException;

    public List<Game> getAllGames();

}
