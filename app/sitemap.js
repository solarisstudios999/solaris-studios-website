const siteUrl = "https://solarisstudios.co.in";

export default function sitemap() {
  const pages = ["", "/services", "/portfolio", "/process", "/about", "/contact"];
  const now = new Date();
  return pages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
