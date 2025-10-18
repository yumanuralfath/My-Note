import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { COLORS } from "./const"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "🧠 Yumana Digital Garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "vercel",
    },
    locale: "en-US",
    baseUrl: "notes.yumana.my.id",
    ignorePatterns: ["private", "Templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: {
          name: "DM Serif Display",
          weights: [400],
        },
        body: "Bricolage Grotesque",
        code: "Jetbrains Mono",
      },
      colors: {
        lightMode: {
          light: COLORS.medieval.light0_hard,
          lightgray: COLORS.medieval.light3,
          gray: COLORS.medieval.light4,
          darkgray: COLORS.medieval.dark2,
          dark: COLORS.medieval.dark0,
          secondary: COLORS.medieval.bright_blue,
          tertiary: COLORS.medieval.bright_yellow,
          highlight: COLORS.medieval.bright_blue + "26",
          textHighlight: COLORS.medieval.bright_yellow + "66",
        },
        darkMode: {
          light: COLORS.medieval.dark0,
          lightgray: COLORS.medieval.dark2,
          gray: COLORS.medieval.dark4,
          darkgray: COLORS.medieval.light3,
          dark: COLORS.medieval.light0_soft,
          secondary: COLORS.medieval.bright_yellow,
          tertiary: COLORS.medieval.bright_purple,
          highlight: COLORS.medieval.bright_orange + "26",
          textHighlight: COLORS.medieval.bright_yellow + "66",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      Plugin.Favicon(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
