module.exports = app => {
    const { STRING, INTEGER, DATE, BIGINT, TEXT} = app.Sequelize;
    const Banner = app.model.define("banner", {
      id: {
        type: STRING,
        primaryKey : true,
        unique : true
      },
      postkey:STRING,
      author:STRING,
      url:STRING,
      publish_at: DATE,
      created_at: DATE,
      updated_at: DATE
    });
    return Banner;
  };