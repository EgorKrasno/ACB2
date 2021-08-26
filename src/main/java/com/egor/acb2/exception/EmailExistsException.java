package com.egor.acb2.exception;

public class EmailExistsException extends Exception{
    public EmailExistsException(String message) {
        super(message);
    }
}
