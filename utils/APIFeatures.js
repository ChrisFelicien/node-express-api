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

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (m) => `$${m}`);

    this.mongoQuery = this.mongoQuery.find(JSON.parse(queryStr));

    return this;
  }
  sort() {
    if (this.reqQuery.sort) {
      const sortBy = this.reqQuery.sort.split(',').join(' ');
      this.mongoQuery = this.mongoQuery.sort(sortBy);
    } else {
      this.mongoQuery = this.mongoQuery.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.reqQuery.fields) {
      const selectedFields = this.reqQuery.fields.split(',').join(' ');
      this.mongoQuery = this.mongoQuery.select(selectedFields);
    } else {
      this.mongoQuery = this.mongoQuery.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.reqQuery.page * 1 || 1;
    const limit = this.reqQuery.limit * 1 || 3;
    const skip = (page - 1) * limit;

    this.mongoQuery = this.mongoQuery.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
