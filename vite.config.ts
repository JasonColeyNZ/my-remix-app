import {
  unstable_vitePlugin as remix,
  unstable_cloudflarePreset as cloudflare,
} from "@remix-run/dev";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { installGlobals } from "@remix-run/node";

installGlobals();

export default defineConfig({
  server: {
    port: 3005,
    host: "192.168.20.100",
  },
    optimizeDeps: {
    include: [
      "@conform-to/react",
      "@conform-to/zod",
      "@headlessui/react",
      "@googlemaps/js-api-loader",
      "@mailchimp/mailchimp_marketing",
      "@prisma/client",
      "@prisma/extension-accelerate",
      "@prisma/client/runtime/library.js",
      "@radix-ui/react-accordion",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dialog",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-toast",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-icons",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-switch",
      "@radix-ui/react-popover",
      "@radix-ui/react-label",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-tabs",
      "@react-spring/web",

      "@syncfusion/ej2-base",
      "@syncfusion/ej2-base/src/validate-lic.js",
      "@syncfusion/ej2-react-base/src/services.js",

      "@syncfusion/ej2-react-popups",
      "@syncfusion/ej2-react-popups/src/dialog/dialog.component",

      "@syncfusion/ej2-schedule/src/schedule/base/interface.js",
      "@syncfusion/ej2-schedule/src/schedule/models/resources-model.js",
      "@syncfusion/ej2-schedule/src/schedule/models/views-model.js",
      "@syncfusion/ej2-schedule/src/schedule/renderer/agenda.js",
      "@syncfusion/ej2-schedule/src/schedule/renderer/day.js",
      "@syncfusion/ej2-schedule/src/schedule/renderer/week.js",
      "@syncfusion/ej2-schedule/src/schedule/renderer/work-week.js",
      "@syncfusion/ej2-schedule/src/schedule/renderer/month.js",
      "@syncfusion/ej2-schedule/src/schedule/actions/drag.js",
      "@syncfusion/ej2-schedule/src/schedule/actions/resize.js",
      "@syncfusion/ej2-react-schedule/src/schedule/schedule.component.js",

      "@syncfusion/ej2-richtexteditor/src/rich-text-editor/models/toolbar-settings-model.js",
      "@syncfusion/ej2-richtexteditor/src/rich-text-editor/actions/html-editor.js",
      "@syncfusion/ej2-richtexteditor/src/rich-text-editor/renderer/image-module.js",
      "@syncfusion/ej2-richtexteditor/src/rich-text-editor/renderer/link-module.js",
      "@syncfusion/ej2-richtexteditor/src/rich-text-editor//actions/paste-clean-up.js",
      "@syncfusion/ej2-richtexteditor/src/rich-text-editor/actions/quick-toolbar.js",
      "@syncfusion/ej2-richtexteditor/src/rich-text-editor/actions/toolbar.js",
      "@syncfusion/ej2-react-richtexteditor/src/rich-text-editor/richtexteditor.component.js",

      // "@syncfusion/ej2-grids/src/grid/models/column-model.js",
      "@syncfusion/ej2-grids/src/grid/base/interface.js",
      "@syncfusion/ej2-grids/src/grid/actions/column-menu.js",
      "@syncfusion/ej2-grids/src/grid/actions/context-menu.js",
      "@syncfusion/ej2-grids/src/grid/actions/filter.js",
      "@syncfusion/ej2-grids/src/grid/actions/page.js",
      "@syncfusion/ej2-grids/src/grid/actions/search.js",
      "@syncfusion/ej2-grids/src/grid/actions/sort.js",
      "@syncfusion/ej2-grids/src/grid/actions/toolbar.js",
      "@syncfusion/ej2-react-grids/src/grid/grid.component.js",

      "@syncfusion/ej2-react-inputs",

      "@supabase/ssr",
      "autosuggest-highlight/parse/index.js",
      "class-variance-authority",
      "clsx",
      "cmdk",
      "css-box-model",
      "date-fns",
      "lucide-react",
      "object-to-formdata",
      "react-colorful",
      "react-day-picker",
      "react-dom",
      "react-beautiful-dnd/*",
      "react-icons/pi/index.js",
      "react-icons/md/index.js",
      "react-icons/io/index.js",

      "react-router",
      // "react-remove-scroll",
      "react-spinners",
      "remix-utils/client-only",
      "remix-utils/csrf/server",
      "remix-utils/csrf/react",
      "remix-utils/honeypot/react",
      "remix-utils/locales/react",
      "remix-utils/locales/server",
      "remix-utils/honeypot/server",
      "spin-delay",
      "uuid",
      "validator",
      "zod",
      "zodix",
    ],
  },
  plugins: [
    remix({
      presets: [cloudflare()],
          ignoredRouteFiles: ["**/.*"],
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes, {
          ignoredRouteFiles: [
            ".*",
            "**/*.css",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__*.*",
          ],
        });
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    resolve: {
      externalConditions: ["workerd", "worker"],
    },
    noExternal: [
      "@syncfusion/*",
      "react-spinners",
      "@googlemaps/js-api-loader",
    ],
  },
});
