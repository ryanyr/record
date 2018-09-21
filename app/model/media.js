module.exports = app => {
    const { STRING, INTEGER, DATE, BIGINT, TEXT} = app.Sequelize;
    const Media = app.model.define("media", {
      id: {
        type: STRING,
        primaryKey : true,
        unique : true
      },
      userid:STRING,
      author:STRING,
      title:STRING,
      department:STRING,
      intro:TEXT,
      mediaurl:TEXT,
      content:TEXT,
      province:STRING,
      city:STRING,                      
      post_time:DATE,
      publish_at: DATE,
      created_at: DATE,
      updated_at: DATE
    });
    return Media;
  };