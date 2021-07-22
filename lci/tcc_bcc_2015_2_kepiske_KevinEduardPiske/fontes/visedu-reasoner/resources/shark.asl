/* Agent Shark */

/* Initial beliefs and rules */
/* Crenças e regras iniciais */

prey("Sardinha").

/* Initial goals */
/* Objetivos iniciais */
+!explore.

/* Initial plans */
/* Planos iniciais */

+onPercept(Perceiver, Perceived, PerceivedType) : prey(PerceivedType)
	<- pursue(Perceiver, Perceived).
	
+onPercept(Perceiver, Perceived, PerceivedType) : not prey(PerceivedType)
	<- explore(Perceiver).

+onCollide(Perceiver, Perceived, PerceivedType) : prey(PerceivedType)
	<- eat(Perceiver, Perceived).
	
+onCollide(Perceiver, Perceived, PerceivedType) : not prey(PerceivedType)
	<- explore(Perceiver).