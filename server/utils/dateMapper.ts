
const mapDateToSqlDate = (date: Date) => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

const getNextSqlDate = () => {
    const date: Date = new Date();
    date.setDate(date.getDate() + 1);
    return mapDateToSqlDate(date);
}

export { mapDateToSqlDate, getNextSqlDate };