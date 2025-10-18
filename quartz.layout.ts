import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

const recentNotes = [
  Component.RecentNotes({
    title: "Recent Note",
    limit: 2,
    filter: (f) => f.slug!.startsWith("Zettelkasten/"),
    linkToMore: "Zettelkasten/" as SimpleSlug,
  }),
  Component.RecentNotes({
    title: "Daily Note",
    limit: 1,
    filter: (f) => f.slug!.startsWith("Daily/"),
    linkToMore: "Daily/" as SimpleSlug,
  }),
  Component.RecentNotes({
    title: "Recent Literature",
    limit: 1,
    filter: (f) => f.slug!.startsWith("Literature/"),
    linkToMore: "Literature/" as SimpleSlug,
  }),
]

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [...recentNotes.map((c) => Component.MobileOnly(c))],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/yumanuralfath",
      LinkedIn: "https://www.linkedin.com/in/yumana/",
    },
  }),
}

const left = [
  Component.PageTitle(),
  Component.MobileOnly(Component.Spacer()),
  Component.Flex({
    components: [
      {
        Component: Component.Search(),
        grow: true,
      },
      { Component: Component.Darkmode() },
    ],
  }),
  ...recentNotes.map((c) => Component.DesktopOnly(c)),
]

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  left,
  right: [
    Component.Graph({
      localGraph: {
        showTags: false,
      },
      globalGraph: {
        showTags: false,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left,
  right: [],
}

// const explorer = Component.Explorer({
//   title: "Explore",
//   useSavedState: true,
//   filterFn: (node) => !node.displayName.startsWith("_"),
//   mapFn: (node) => {
//     return (node.displayName = node.displayName.replace(/-/g, " "))
//   },
// })
//
// // components for pages that display a single page (e.g. a single note)
// export const defaultContentPageLayout: PageLayout = {
//   beforeBody: [
//     Component.ConditionalRender({
//       component: Component.Breadcrumbs(),
//       condition: (page) => page.fileData.slug !== "index",
//     }),
//     Component.ArticleTitle(),
//     Component.ContentMeta(),
//     Component.TagList(),
//   ],
//   left: [
//     Component.PageTitle(),
//     Component.MobileOnly(Component.Spacer()),
//     Component.Flex({
//       components: [
//         {
//           Component: Component.Search(),
//           grow: true,
//         },
//         { Component: Component.Darkmode() },
//         { Component: Component.ReaderMode() },
//       ],
//     }),
//     explorer,
//   ],
//   right: [
//     Component.Graph(),
//     Component.DesktopOnly(Component.TableOfContents()),
//     Component.Backlinks(),
//   ],
// }
//
// // components for pages that display lists of pages  (e.g. tags or folders)
// export const defaultListPageLayout: PageLayout = {
//   beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
//   left: [
//     Component.PageTitle(),
//     Component.MobileOnly(Component.Spacer()),
//     Component.Flex({
//       components: [
//         {
//           Component: Component.Search(),
//           grow: true,
//         },
//         { Component: Component.Darkmode() },
//       ],
//     }),
//     explorer,
//   ],
//   right: [],
// }
