# Local test server for Hibi: serves the repo root at http://localhost:8768
# Start:  (curl -s -o /dev/null localhost:8768 || (python3 build/test/srv.py >/dev/null 2>&1 &))
import http.server, socketserver, functools, os
root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=root)
h.log_message = lambda *a: None
socketserver.ThreadingTCPServer.allow_reuse_address = True
socketserver.ThreadingTCPServer(('127.0.0.1', 8768), h).serve_forever()
