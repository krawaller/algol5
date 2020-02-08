import marked from "marked";

type ProcessMarkdownOpts = {
  md: string;
};

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: true,
});

export const processMarkdown = (opts: ProcessMarkdownOpts) => {
  const { md } = opts;
  return marked(md);
};
