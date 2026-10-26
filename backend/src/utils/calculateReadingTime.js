export function calculateReadingTime(content) {
  const words = [];
  const visit = (node) => {
    if (!node) return;
    if (node.type === "text" && node.text) words.push(...node.text.trim().split(/\s+/).filter(Boolean));
    (node.content || []).forEach(visit);
  };
  visit(content);
  return Math.max(1, Math.ceil(words.length / 200));
}
