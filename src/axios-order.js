import axios from "axios";


const instance = axios.create({
    baseURL: "https://clown-e4929-default-rtdb.asia-southeast1.firebasedatabase.app/"
});
export default instance; 