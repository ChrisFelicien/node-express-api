class APIFeatures {
  constructor(mongoQuery, reqQuery) {
    this.mongoQuery = mongoQuery;
    this.reqQuery = reqQuery;
  }
  filters() {
    const queryObject = { ...this.reqQuery };

    const excludesFields = ['sort', 'limit', 'page', 'fields'];
    excludesFields.forEach((i) => delete queryObject[i]);

    let queryStr = JSON.stringify(queryObject);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq)\b/g, (m) => `$${m}`);

    this.mongoQuery = this.mongoQuery.find(JSON.parse(queryStr));

    return this;
  }
}

module.exports = APIFeatures;
