import axios from 'axios';
const API_URL = 'https://sketchyboss.herokuapp.com'

export class APIService {

  getReportList() {
    const url = `${API_URL}/api/reports/`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  getReport(report) {
    const url = `${API_URL}/api/reports/${report}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  addNewReport(report){
    const url = `${API_URL}/api/reports/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.post(url, report, {headers: headers});
  }

  updateReport(report){
    const url = `${API_URL}/api/reports/${report.id}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, report, {headers: headers});
  }

  deleteReport(report){
    const url = `${API_URL}/api/reports/${report}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }

  getCompany(companyID) {
    const url = `${API_URL}/api/companies/${companyID}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  getCompanyList() {
    const url = `${API_URL}/api/companies/`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  getCompanyReports(companyID) {
    const url = `${API_URL}/api/company/reports/${companyID}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  addNewCompany(company) {
    const url = `${API_URL}/api/companies/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.post(url, company, {headers: headers});
  }

  updateCompany(company) {
    const url = `${API_URL}/api/companies/${company.pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, company, {headers: headers});
  }

  deleteCompany(company) {
    const url = `${API_URL}/api/companies/${company}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }

  getActorList() {
    const url = `${API_URL}/api/actors/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  getActor(actor) {
    const url = `${API_URL}/api/actors/${actor}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  addNewActor(actor){
    const url = `${API_URL}/api/actors/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.post(url, actor, {headers: headers});
  }

  updateActor(actor){
    const url = `${API_URL}/api/actors/${actor.pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, actor, {headers: headers});
  }

  deleteActor(actor){
    const url = `${API_URL}/api/actors/${actor}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }

  authenticateLogin(credentials) {
    const url = `${API_URL}/auth/`;
    return axios.post(url, credentials);
  }
}

