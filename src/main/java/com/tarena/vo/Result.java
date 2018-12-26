package com.tarena.vo;

public class Result {
	private int status; 
	private String message;
	private int data;
	/**
	 * 1：成功
	 * 0：失败
	 */
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getData() {
		return data;
	}
	public void setData(int data) {
		this.data = data;
	}

}
