
const currentEnv: string = process.env.APP_ENV || 'development';
const port: number|string = process.env.APP_PORT || 3000;
const baseUrl: string = process.env.APP_URL || `http://localhost:${port}/`;
const apiVersion: string = 'api/v1/';
const mongoUri = 'mongodb://localhost:27018/react_express_ts';

const errorMessageList :any = {
    required: 'Please enter the :attribute',
};

export {
    currentEnv,
    port,
    baseUrl,
    apiVersion,
    mongoUri,
    errorMessageList
}