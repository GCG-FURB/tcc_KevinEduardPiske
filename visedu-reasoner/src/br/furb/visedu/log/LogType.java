package br.furb.visedu.log;

public enum LogType {
	
	ALL("all", "printall", "false"),
	ERROR("err", "printerr", "false"),
	INFO("inf", "printinf", "false");
	
	private String id;
	private String sysProp;
	private String sysPropDefValue;
	
	private LogType(String id, String sysProp, String sysPropDefValue) {
		this.id = id;
		this.sysProp = sysProp;
		this.sysPropDefValue = sysPropDefValue;
	}
	
	public String getId() {
		return id;
	}
	
	public String getSysprop() {
		return sysProp;
	}
	
	public String getSysPropDefValue() {
		return sysPropDefValue;
	}

}
