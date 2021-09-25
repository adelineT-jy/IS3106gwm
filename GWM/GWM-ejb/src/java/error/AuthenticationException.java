package error;

public class AuthenticationException extends Exception {

    
    public AuthenticationException() {
    }

    public AuthenticationException(String msg) {
        super(msg);
    }
}
