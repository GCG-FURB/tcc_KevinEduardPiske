package br.furb.visedu.reasoner.enumeration;

/**
 * Enumeração de tipos de agentes.
 * 
 * @author Kevin Eduard Piske.
 */
public enum AgentType {

	UNKNOWN(0, "Unknown"),
	SHARK(1, "Tubarão"),
	SARDINE(2, "Sardinha");
	
	private int code;
	private String description;
	
	private AgentType(int code, String description) {
		this.code = code;
		this.description = description;
	}
	
	/**
	 * Obtém o código do tipo de agente.
	 * 
	 * @return código do tipo de agente.
	 */
	public int getCode() {
		return code;
	}
	
	/**
	 * Obtém a descrição do tipo de agente.
	 * 
	 * @return descrição do tipo de agente.
	 */
	public String getDescription() {
		return description;
	}
	
	/**
	 * Obtém o tipo de agente correspondente à descrição passada por parâmetro.
	 * 
	 * @param description descrição do tipo de agente.
	 * @return tipo de agente correspondente à descrição ou {@code UNKNOWN} caso não encontre.
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
