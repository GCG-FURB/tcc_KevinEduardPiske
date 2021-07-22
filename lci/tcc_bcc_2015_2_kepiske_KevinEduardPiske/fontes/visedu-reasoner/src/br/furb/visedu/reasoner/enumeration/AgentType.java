package br.furb.visedu.reasoner.enumeration;

/**
 * Enumera��o de tipos de agentes.
 * 
 * @author Kevin Eduard Piske.
 */
public enum AgentType {

	UNKNOWN(0, "Unknown"),
	SHARK(1, "Tubar�o"),
	SARDINE(2, "Sardinha");
	
	private int code;
	private String description;
	
	private AgentType(int code, String description) {
		this.code = code;
		this.description = description;
	}
	
	/**
	 * Obt�m o c�digo do tipo de agente.
	 * 
	 * @return c�digo do tipo de agente.
	 */
	public int getCode() {
		return code;
	}
	
	/**
	 * Obt�m a descri��o do tipo de agente.
	 * 
	 * @return descri��o do tipo de agente.
	 */
	public String getDescription() {
		return description;
	}
	
	/**
	 * Obt�m o tipo de agente correspondente � descri��o passada por par�metro.
	 * 
	 * @param description descri��o do tipo de agente.
	 * @return tipo de agente correspondente � descri��o ou {@code UNKNOWN} caso n�o encontre.
	 */
	public static AgentType getAgentTypeByDescription(String description) {
		for(AgentType agentType : AgentType.values()) {
			if(agentType.description.equals(description)) {
				return agentType;
			}
		}
		return UNKNOWN;
	}
	
}
