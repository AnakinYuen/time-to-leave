exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path.match(/^\/countdown/)) {
    page.matchPath = '/countdown/*';
    createPage(page);
  }
};
