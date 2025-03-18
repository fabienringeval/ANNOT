import os

_sqlServer = os.getenv("DATABASE_HOST")
_sqlPort = os.getenv("DATABASE_PORT")
_sqlUser = os.getenv("DATABASE_USERNAME")
_sqlPassword = os.getenv("DATABASE_PASSWORD")
_sqlDb = os.getenv("DATABASE_NAME")
_unixSocket = os.getenv("UNIX_SOCKET")