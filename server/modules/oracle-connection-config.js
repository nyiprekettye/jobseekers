const host ="host"
const port = 1234
const sid ="sid"
module.exports = {
    user         : "user",
    password      : "pw",
    connectString : "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = "+host+")(PORT = "+port+"))(CONNECT_DATA =(SID= "+sid+")))"
};