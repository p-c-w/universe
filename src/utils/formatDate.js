const formatDate = date => date?.match(/^([a-zA-Z0-9_.+-]+)T/)[1].replace(/-/g, ' .');

export default formatDate;
