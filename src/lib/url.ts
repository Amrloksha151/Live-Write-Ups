export function withBase(path: string) {
  const base = import.meta.env.BASE_URL || '/';

  if (!path || path === '/') {
    return base;
  }

  if (/^[a-z]+:\/\//i.test(path)) {
    return path;
  }

  const [pathname, hash] = path.split('#');
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const fullPath = normalizedPath ? `${normalizedBase}${normalizedPath}` : normalizedBase;

  return hash ? `${fullPath}#${hash}` : fullPath;
}