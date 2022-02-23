package com.nurgunmakarov.studweblab4.exception;

public class InvalidLoginRequestException extends RuntimeException{
    public InvalidLoginRequestException(String message){
        super(message);
    }
}
