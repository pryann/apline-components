export default function(eleventyConfig) {
  return {
    dir: {
      input: "src/view",
      output: "src/_site",
      includes: "_includes",
      layouts: "layouts"
    }
  };
};