import axios from 'axios'

export const $axios = axios.create({
      baseURL: "https://api.mirmakhmudoff.uz/api/v1/",
      headers: {
            'Content-Type': 'application/json'
      },
      timeout: 10000
})