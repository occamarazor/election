import api from '../../components/common/commonApi';
import { ELECTION_REQUEST_INFO_URL } from './electionConstants';

export const electionRequestInfoApi = () => api.get(ELECTION_REQUEST_INFO_URL);
