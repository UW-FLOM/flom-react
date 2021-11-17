import axios from 'axios';
import authHeader from './authHeader';

const API_URL = '/api/user/';

const test = () => axios.get(API_URL, { headers: authHeader() });

const surveyList = () => axios.get(`${API_URL}survey`, { headers: authHeader() });

const surveyDetail = (id) => axios.get(`${API_URL}survey/${id}`, { headers: authHeader() });

export default {
  test,
  surveyList,
  surveyDetail,
};
