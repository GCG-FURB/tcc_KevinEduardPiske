package br.furb.visedu.reasoner.enumeration;

/**
 * Enumeração de tipos de ações que o reasoner deve fazer.
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
	 * Obtém o código da ação.
	 * 
	 * @return código da ação.
	 */
	public int getCode() {
		return code;
	}
	
	/**
	 * Obtém a descrição da ação.
	 * 
	 * @return descrição da ação.
	 */
	public String getDescription() {
		return description;
	}
	
	/**
	 * Obtém a ação correspondente à descrição passada por parâmetro.
	 * 
	 * @param description descrição a ser verificada.
	 * @return ação correspondente ou {@code UNKNOWN} caso não encontre.
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
