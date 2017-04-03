const Sequelize = require('sequelize');
const sequelize = new Sequelize('xk', null, null, {
    dialect: 'sqlite',
    define: {
        timestamps: false
    },
    storage: 'xk.sqlite'
});

sequelize
    .authenticate()
    .then(function (err) {
        console.log('数据库连接成功');
        return sequelize.sync().then(() => console.log('数据库表同步成功')).catch(() => console.error('数据库表同步失败'));
    })
    .catch(function (err) {
        console.log('数据库连接失败:', err);
    });

module.exports = {
    custorm: require('./custorm')(sequelize, Sequelize)
}