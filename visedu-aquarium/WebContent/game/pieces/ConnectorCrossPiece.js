function ConnectorCrossPiece() {}

ConnectorCrossPiece.prototype = new ConnectorPiece();
ConnectorCrossPiece.prototype.constructor = ConnectorCrossPiece;

ConnectorCrossPiece.prototype.type = Types.typeConnectorCross;