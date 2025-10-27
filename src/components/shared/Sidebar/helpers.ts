export const findActiveKey = (pathname: string, items: any[]) => {
  const matches = items.filter((item) => {
    return (
      pathname === item.path ||
      pathname.startsWith(item.path + "/") ||
      pathname.startsWith(item.path)
    );
  });

  if (matches.length === 0) return "";
  matches.sort((a, b) => b.path.length - a.path.length);
  return matches[0].key;
};
