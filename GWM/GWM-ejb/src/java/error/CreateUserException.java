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
public class CreateUserException extends Exception {

    /**
     * Creates a new instance of <code>CreateUserException</code> without detail
     * message.
     */
    public CreateUserException() {
    }

    /**
     * Constructs an instance of <code>CreateUserException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public CreateUserException(String msg) {
        super(msg);
    }
}
