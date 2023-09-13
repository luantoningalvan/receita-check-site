import { Recipe } from "../common/Recipe";
import { api } from "../services/api";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://receitacheck.com.br",
  }[process.env.NODE_ENV];

  const staticPages = [
    `${baseUrl}`,
    `${baseUrl}/contato`,
    `${baseUrl}/politica-de-privacidade`,
  ];

  const recipes = await api.post<Recipe[]>("recipes/list", {});

  const dynamicPages = [
    ...recipes.data.map((recipe) => ({
      url: `receitas/${recipe.slug}`,
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
      ${dynamicPages
        .map(({ url }) => {
          return `
              <url>
                <loc>${baseUrl}/${url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.5</priority>
              </url>
            `;
        })
        .join("")}
    </urlset>
  `;
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
