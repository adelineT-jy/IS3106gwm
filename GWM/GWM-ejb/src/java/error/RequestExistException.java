package error;

public class RequestExistException extends Exception {

    public RequestExistException() {
    }
    
    public RequestExistException(String msg) {
        super(msg);
    }
}
