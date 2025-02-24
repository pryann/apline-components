export default function(eleventyConfig) {
  return {
    dir: {
      input: "src/view/pages/index.njk",
      output: "dist",
      includes: "../includes",
      layouts: "../layouts"
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk"
  }
};