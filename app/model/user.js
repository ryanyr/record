module.exports = app => {
    const { STRING, INTEGER, DATE, BIGINT , TEXT } = app.Sequelize;
    const User = app.model.define("user", {
      id: {
        type: STRING,
        primaryKey : true,
        unique : true
      },
      role: {
        type: INTEGER,//0普通用户，1管理人员，2医生学者
        default: 0
      },
      username: STRING(30),
      name: STRING(30),
      password: STRING(32),
      age: INTEGER,
      telephone: BIGINT(11),
      avatar: STRING,
      company: STRING,
      department: STRING,
      intro: TEXT,
      posts: STRING,
      media: TEXT,
      last_sign_in_at: DATE,
      created_at: DATE,
      updated_at: DATE
    });
    return User;
  };