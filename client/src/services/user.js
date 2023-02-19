import axios from 'axios';
import authHeader from './authHeader';

const API_URL = '/api/user/';

axios.interceptors.response.use(
    (response) => {
        //console.log("Approved")
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
            window.location = '/login';
            }
        }
        return error;
    }
);

// const test = () => axios.get(`${API_URL}verify`, { headers: authHeader() })

const surveyList = () => axios.get(`${API_URL}survey`, { headers: authHeader() })

const surveyDetail = (id) => axios.get(`${API_URL}survey/${id}`, { headers: authHeader() })


export default {
  // test,
  surveyList,
  surveyDetail,
};
