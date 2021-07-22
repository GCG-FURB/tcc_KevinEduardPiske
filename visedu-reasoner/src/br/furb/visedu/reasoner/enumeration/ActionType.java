package br.furb.visedu.reasoner.enumeration;

/**
 * Enumera��o de tipos de a��es que o reasoner deve fazer.
 * 
 * @author Kevin Eduard Piske
 */
public enum ActionType {
	
	UNKNOWN(0, "unknown"),
	CREATE_AGENT(1, "createAgent"),
	PERCEPTION(2, "perception");
	
	private int code;
	private String description;
	
	private ActionType(int code, String description) {
		this.code = code;
		this.description = description;
	}
	
	/**
	 * Obt�m o c�digo da a��o.
	 * 
	 * @return c�digo da a��o.
	 */
	public int getCode() {
		return code;
	}
	
	/**
	 * Obt�m a descri��o da a��o.
	 * 
	 * @return descri��o da a��o.
	 */
	public String getDescription() {
		return description;
	}
	
	/**
	 * Obt�m a a��o correspondente � descri��o passada por par�metro.
	 * 
	 * @param description descri��o a ser verificada.
	 * @return a��o correspondente ou {@code UNKNOWN} caso n�o encontre.
	 */
	public static ActionType getActionTypeByDescription(String description) {
		for( ActionType actionType : ActionType.values()) {
			if(actionType.description.equals(description)) {
				return actionType;
			}
		}
		
		return UNKNOWN;
	}

}
