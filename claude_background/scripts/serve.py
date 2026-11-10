"""Local dev server, laid out like the live site and without browser caching.
Start from the repo root: python3 claude_background/scripts/serve.py  (port 8080, also reachable in the LAN)
  /     -> Paula's website      /v1/ -> Ammers website v1      /v2/ -> Ammers website v2
  /index-experimentell.html and /1/ redirect like on the live site."""
import http.server, pathlib, posixpath, urllib.parse
repo = pathlib.Path(__file__).resolve().parents[2]
SITES = {'/v1/': repo / 'Ammers website v1', '/v2/': repo / 'Ammers website v2'}
PAULA = repo / "Paula's website"
REDIRECTS = {'/index-experimentell.html': '/v1/', '/1': '/v2/', '/1/': '/v2/', '/1/index.html': '/v2/', '/v1': '/v1/', '/v2': '/v2/'}
class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = urllib.parse.urlsplit(self.path)
        if path.path in REDIRECTS:
            self.send_response(302); self.send_header('Location', REDIRECTS[path.path] + (('?' + path.query) if path.query else '')); self.end_headers(); return
        super().do_GET()
    def translate_path(self, path):
        p = urllib.parse.unquote(urllib.parse.urlsplit(path).path)
        base, rest = PAULA, p
        for prefix, folder in SITES.items():
            if p.startswith(prefix): base, rest = folder, p[len(prefix) - 1:]
        parts = [s for s in posixpath.normpath(rest).split('/') if s and s not in ('.', '..')]
        return str(base.joinpath(*parts)) + ('/' if rest.endswith('/') else '')
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate'); self.send_header('Pragma', 'no-cache'); self.send_header('Expires', '0')
        super().end_headers()
http.server.ThreadingHTTPServer(('0.0.0.0', 8080), Handler).serve_forever()
