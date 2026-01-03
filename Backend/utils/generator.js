const genid = () => {
    Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

const genp = () => {
    Math.random().toString(36).slice(-8);
}


module.exports = { genid, genp }
