import axios from 'axios';

const weather_url = process.env.REACT_APP_WEATHER_API_URL;
const news_url = process.env.REACT_APP_NEWS_API_URL;

class Request {

    static getHeadlineUrl() {
        return news_url;
    }

    static getWeatherUrl() {
        return weather_url;
    }

    static getAxiosDefaultConfig() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
    };

    static async get(url, options = null) {

        let retVal = {data: {}, isError: false, error: '' }
        
        options = (!options) ? this.getAxiosDefaultConfig()
            : this.mergeDefaultOptions(options);

        try {
            const response = await axios(url, options);
            retVal.data = response.data;

        } catch (e) {
            retVal.isError = true;
            retVal.error = e.toString();
        }

        return retVal

    };


}

export default Request;