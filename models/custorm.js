module.exports = function (sequelize, datatype) {
    return sequelize.define('custorm', {
        key: {
            type: datatype.STRING,
            primaryKey: true
        },
        car_id: {
            type: datatype.STRING,
        },
        nickname: {
            type: datatype.STRING,
        },
        change_time: {
            type: datatype.DATE,
        },
        change_mile: {
            type: datatype.STRING,
        },
        sug_mile: {
            type: datatype.INTEGER,
        },
        oil_type: {
            type: datatype.STRING,
        }
    }, {
        tableName: 'custorm'
    });
}
