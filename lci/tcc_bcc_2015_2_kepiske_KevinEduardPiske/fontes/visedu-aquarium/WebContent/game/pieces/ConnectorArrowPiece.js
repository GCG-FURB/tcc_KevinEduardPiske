function ConnectorArrowPiece() {}

ConnectorArrowPiece.prototype = new ConnectorPiece();
ConnectorArrowPiece.prototype.constructor = ConnectorArrowPiece;

ConnectorArrowPiece.prototype.type = Types.typeConnectorArrow;