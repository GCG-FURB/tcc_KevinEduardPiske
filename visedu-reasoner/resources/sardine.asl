/* Agent Sardine */

/* Initial beliefs and rules */
/* Cren�as e regras iniciais */

predator("Tubar�o").

/* Initial goals */
/* Objetivos iniciais */
+!explore.

/* Initial plans */
/* Planos iniciais */

+onPercept(Perceiver, Perceived, PerceivedType) : predator(PerceivedType)
	<- flee(Perceiver, Perceived).
	
+onPercept(Perceiver, Perceived, PerceivedType) : not predator(PerceivedType)
	<- explore(Perceiver).
	
+onCollide(Perceiver, Perceived, PerceivedType)
	<- explore(Perceiver).