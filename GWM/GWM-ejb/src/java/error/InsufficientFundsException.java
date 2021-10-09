package error;

public class InsufficientFundsException extends Exception {

    public InsufficientFundsException() {
    }

    public InsufficientFundsException(String msg) {
        super(msg);
    }
}
