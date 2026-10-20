class QueryBuilder {
  constructor(query, queryString, validatedQuery) {
    this.query = query;
    this.queryString = queryString;
    this.validatedQuery = validatedQuery;
    this.filterQuery;
  }
  filter() {
    const filter = {};
    if (this.queryString.id) {
      filter._id = this.queryString.id;
    }
    if (this.queryString.title) {
      const titleSearchField = this.queryString.title;
      const regex = new RegExp(titleSearchField, "i");
      filter.title = regex;
    }
    if (this.queryString.content) {
      const contentSearchField = this.queryString.content;
      const regex = new RegExp(contentSearchField, "i");
      filter.content = regex;
    }
    if (this.queryString.tag) {
      filter.tag = this.queryString.tag;
    }
    if (this.queryString.status) {
      filter.status = this.queryString.status;
    }
    this.query = this.query.find(filter);
    this.filterQuery = filter;
    return this;
  }
  sort() {
    const allowedSortFields = ["createdAt"];
    const sortField = allowedSortFields.includes(this.queryString.sort)
      ? this.queryString.sort
      : "createdAt";
    let sortOrder = -1;
    if (this.queryString.order !== "desc") {
      sortOrder = 1;
    }
    this.query = this.query.sort({ [sortField]: sortOrder });
    return this;
  }
  paginate() {
    const validPage = this.validatedQuery.page;
    const validLimit = this.validatedQuery.limit;
    const skip = (validPage - 1) * validLimit;
    this.query = this.query.skip(skip).limit(validLimit);
    return this;
  }
}

export default QueryBuilder;
