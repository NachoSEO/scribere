import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/app/",
          "/auth/",
          "/login",
          "/registro",
        ],
      },
    ],
    sitemap: "https://scritura.app/sitemap.xml",
  };
}
