function ConnectorSquarePiece() {}

ConnectorSquarePiece.prototype = new ConnectorPiece();
ConnectorSquarePiece.prototype.constructor = ConnectorSquarePiece;

ConnectorSquarePiece.prototype.type = Types.typeConnectorSquare;