exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path.match(/^\/countdown/)) {
    page.matchPath = '/countdown/*';
    createPage(page);
  }
  if (page.path.match(/^\/edit/)) {
    page.matchPath = '/edit/*';
    createPage(page);
  }
  if (page.path.match(/^\/login/)) {
    page.matchPath = '/login/*';
    createPage(page);
  }
};
