function ConnectorDiamondPiece() {}

ConnectorDiamondPiece.prototype = new ConnectorPiece();
ConnectorDiamondPiece.prototype.constructor = ConnectorDiamondPiece;

ConnectorDiamondPiece.prototype.type = Types.typeConnectorDiamond;