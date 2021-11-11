package error;

public class ReviewExistException extends Exception {

    public ReviewExistException() {
    }
    
    public ReviewExistException(String msg) {
        super(msg);
    }
}
