const jsonServer = require("json-server");
const faker = require("faker");
const _ = require("lodash");

const limit = 5;
const pagesCount = 10;

const server = jsonServer.create();
const router = jsonServer.router(generate());
const middlewares = jsonServer.defaults();
server.use(middlewares);

router.render = (req, res) => {
  const pageQuery = req.originalUrl.match(/page=\d*/);
  let page, prevPage, nextPage;
  pageQuery &&
    pageQuery[0] &&
    (page = parseInt(pageQuery[0].replace(/\D/g, "")));
  if (typeof page === "number" && page >= 2) prevPage = page - 1;
  if (typeof page === "number" && page <= pagesCount - 1) nextPage = page + 1;

  if (req.originalUrl.match(/\/users\/\d/)) {
    res.jsonp(res.locals.data);
  }

  res.jsonp({
    previousPageUrl:
      prevPage && "/users?_page=" + prevPage + "&_limit=" + limit,
    nextPageUrl: nextPage && "/users?_page=" + nextPage + "&_limit=" + limit,
    result: res.locals.data
  });
};

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

function generate() {
  return {
    users: _.times(pagesCount * limit, n => {
      return {
        id: n,
        name: faker.name.findName(),
        avatarUrl: faker.internet.avatar()
      };
    })
  };
}
