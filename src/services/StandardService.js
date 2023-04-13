import axios from 'axios'

const STANDARD_BASE_URL = 'http://localhost:8081/standards/all'
class StandardService {

    getStandards() {
        return axios.get(STANDARD_BASE_URL)
    }
}

export default new StandardService()