module.exports = app => {
    const { STRING, INTEGER, DATE, BIGINT, TEXT} = app.Sequelize;
    const Post = app.model.define("post", {
      id: {
        type: STRING,
        primaryKey : true,
        unique : true
      },
      title:STRING,
      department:STRING,
      intro:TEXT,
      content:TEXT,
      province:STRING,
      city:STRING, 
      author:STRING,
      participant_id: TEXT,                
      meeting_time:DATE,
      publish_at: DATE,
      created_at: DATE,
      updated_at: DATE
    });
    return Post;
  };