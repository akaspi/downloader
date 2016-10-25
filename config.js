require('dotenv').config();

const config = {
    firebse: {
        serviceAccount: {
            projectId: process.env.fb_projectId,
            clientEmail: process.env.fb_clientEmail,
            privateKey: process.env.fb_privateKey,
        },
        databaseURL: process.env.fb_databaseURL
    },
    dist: 'dist'
};

module.exports = config;