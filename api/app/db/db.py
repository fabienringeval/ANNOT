import mysql.connector
from ..config.config import _sqlServer, _sqlPort, _sqlUser, _sqlPassword, _sqlDb, _unixSocket


def mysqlConnector():
    return mysql.connector.connect(host=_sqlServer, user=_sqlUser, password=_sqlPassword, database=_sqlDb, port=_sqlPort
                                   , unix_socket=_unixSocket)
