const pool = require('../config/db');

const selectWorkerExperiences = (id_worker) => {
        pool.query(`SELECT * FROM work_experiences WHERE id_worker='${id_worker}'`);
}

const selectWorkExperience = (id) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT * FROM work_experiences where id='${id}'`,
            (error, result) => (!error) ? resolve(result) : reject(error)));
}

const insertWorkExperience = (data) => {
    const { id, id_worker, jobdesk, company_name, date_start, date_end, 
        description } = data;
    return pool.query(`INSERT INTO work_experiences VALUES('${id}', '${id_worker}', 
        '${jobdesk}', '${company_name}', '${date_start}', '${date_end}', 
        '${description}')`);
}

const updateWorkExperience = (data) => {
    const { id, id_worker, jobdesk, company_name, date_start, date_end, 
        description } = data;
    return pool.query(`UPDATE work_experiences SET jobdesk='${jobdesk}', 
        company_name='${company_name}', date_start='${date_start}', 
        date_end='${date_end}', description='${description}' WHERE id='${id}'`);
}

const deleteWorkExperience = (id) => {
    return pool.query(`DELETE FROM work_experiences WHERE id='${id}'`);
}

const countData = () => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT COUNT(id) FROM work_experiences`,
            (error, result) => (!error) ? resolve(result) : reject(error)));
}

module.exports = {
    selectWorkerExperiences,
    selectWorkExperience,
    insertWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
    countData
}