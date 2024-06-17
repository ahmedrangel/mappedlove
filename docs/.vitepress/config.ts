import { defineConfig, type HeadConfig } from "vitepress";
import { SITE } from "./../../utils/site";

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  outDir: "../public/docs",
  base: "/docs/",
  lang: "en-US",
  title:  `${SITE.name} Support`,
  titleTemplate: SITE.name,
  description: "Find all the information you need about MappedLove",
  transformHead: ({ pageData }) => {
    const head: HeadConfig[] = [];
    const path = pageData.relativePath.replace(/\.md$/, "").replace(/index$/, "");
    const tags: HeadConfig[] = [
      ["meta", { property: "og:url", content: `${SITE.host}/docs` + path }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:title", content: `${pageData.title} | ${SITE.name} Support` }],
      ["meta", { property: "og:description", content: "Find all the information you need about MappedLove" }],
      ["meta", { property: "og:image", content: SITE.cover }],
      ["meta", { property: "og:image:width", content: "750" }],
      ["meta", { property: "og:image:height", content: "375" }],
      ["meta", { property: "og:image:alt", content: "Mapping your love story" }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: `${pageData.title} | ${SITE.name} Support` }],
      ["meta", { name: "twitter:image", content: SITE.cover }],
      ["link", { rel: "canonical", href: `${SITE.host}/docs/${path}` }],
    ];
    head.push(...tags);
    return head;
  },
  cleanUrls: true,
  lastUpdated: true,
  vite: {
    resolve: {
      alias: {
        "~": "."
      }
    }
  },
  themeConfig: {
    nav: [
      { text: SITE.domain, link: SITE.host },
    ],
    sidebar: [
      {
        text: "Troubleshooting",
        collapsed: false,
        items: [
          {
            text: "Technical Support",
            items: [
              { text: "🚩 I want to report a bug", link: "/support/bug-report" },
            ]
          }
        ]
      },
      {
        text: "Using the App",
        collapsed: false,
        items: [
          {
            text: "Account",
            items: [
              { text: "😎 Create an account", link: "/account/sign-up" },
              { text: "🗝️ Change password", link: "/account/change-password" },
              { text: "💟 Link our accounts", link: "/account/link-accounts" },
              { text: "🔐 Delete my account", link: "/account/delete-account" }
            ]
          },
          {
            text: "Mapping",
            items: [
              { text: "📍 Markers", link: "/mapping/markers" },
              { text: "📝 Stories", link: "/mapping/stories" },
              { text: "🗺️ Public map", link: "/mapping/public-map" }
            ]
          }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/Yizack/mappedlove" }
    ],
    editLink: {
      pattern: "https://github.com/Yizack/mappedlove/edit/main/docs/:path",
      text: "Edit this page on GitHub"
    },
    search: {
      provider: "local"
    }
  }
});
