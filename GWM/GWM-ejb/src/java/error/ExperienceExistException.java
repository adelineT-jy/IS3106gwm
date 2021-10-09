/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package error;

/**
 *
 * @author ruth
 */
public class ExperienceExistException extends Exception {

    /**
     * Creates a new instance of <code>ExperienceExistException</code> without
     * detail message.
     */
    public ExperienceExistException() {
    }

    /**
     * Constructs an instance of <code>ExperienceExistException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public ExperienceExistException(String msg) {
        super(msg);
    }
}
