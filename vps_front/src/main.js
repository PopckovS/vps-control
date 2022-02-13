import Vue from 'vue'
import App from './App'

// импорт axios для HTTP обращений, работа с API
import axios from 'axios'

Vue.config.productionTip = false

// ========================================================
// ========================================================
// Содержит компоненты:
// 1) Работа с API DRF через обычные Ajax запросы.
// 2) Работа с Hasura через GraphQL запросы.
// ========================================================
// ========================================================


//  Адреса API по которым получаем данные
let api_url = {
  api_vps_drf: 'http://localhost:9500/api/v1/vps',
  api_vps_hasura: 'http://localhost:9502/v1/graphql'
}

// GraphQL запросы к Hasura
let graphql_query = {
  // запрос на получение всех обьектов VPS через GraphQL
  get_all: {query: "{api_vps {id, uid, cpu, hdd, ram, status}}"},
  // мутация на изменение статуса состояния одного обьекта VPS
  mutation_change_status: {
    "query": "mutation updateMutation ($uid: uuid!, $status: String!) {update_api_vps(where: {uid: {_eq: $uid}},_set: {status: $status}) {affected_rows returning {status, id, uid}}}",
    "variables": {
      "uid": null,
      "status": null
    }
  }
}


// Компонента для взаимодействия с API DRF
// Получает все обьекты VPS и меняет их статус
var api1 = new Vue({
  el: '#api-1',

  data: {
    vps_list: null,
    response: null,
    status: null,
    seen: true,
  },

  methods: {

    // Скрывает видимость обьектов VPS
    clearUp: function () {
      this.seen = false;
    },

    // Получает список всех обьектов VPS по API
    getAllVps: function () {
        console.info('Запрос по адресу = ', api_url.api_vps_drf)
        this.seen = true;
        axios
          .get(api_url.api_vps_drf)
          .then(response => (this.vps_list = response.data));
      },

    // Меняет статус обьекта VPS по API
    changeVpsStatus: function (vps, status) {
        console.info('Запрос по адресу = ', api_url.api_vps_drf)
        axios
          .put(api_url.api_vps_drf + '/' + vps.uid, { status: status })
          .then(response => (this.response = response.data), vps.status = status )
          .catch(error => console.log(error));
        console.log('this.response = ', this.response)
      },
    }
})


// Компонент для работы с формой отправки, создание нового VPS через API DRF
var api1 = new Vue({
  el: '#create-vps-api-form',

  data:  {
    cpu: '',
    ram: '',
    hdd: '',
    current_status: 'started',
    statuses: [
      {label: 'started', value: 'started'},
      {label: 'blocked', value: 'blocked'},
      {label: 'started', value: 'started'}
    ]
  }
});

// export default {
//   data(){
//     return {
//       cpu: '',
//       ram: '',
//       hdd: '',
//       current_status: 'started',
//       statuses: [
//         {label: 'started', value: 'started'},
//         {label: 'blocked', value: 'blocked'},
//         {label: 'started', value: 'started'}
//       ]
//     }
//   }
// }




// Компонента для взаимодействия с API Hasura
var api2 = new Vue({
  el: '#api-2',
  data: {
    seen: true,
    vps_list: null,
    response: null,
    status: null,
  },
  methods: {
    // Скрывает видимость обьектов VPS
    clearUp: function () {
      this.seen = false;
    },
    // Получает список всех обьектов VPS по API
    getAllVps: function () {
        this.seen = true;
        console.info('Запрос по адресу = ', api_url.api_vps_hasura);
        axios
          .post(api_url.api_vps_hasura, graphql_query.get_all)
          .then(response => (this.vps_list = response.data["data"]["api_vps"]))
          .catch(error => console.log(error));;
        console.info('VPS = ', this.vps_list)
    },
    // Меняет статус обьекта VPS по API
    changeVpsStatus: function (vps, status) {
        graphql_query.mutation_change_status.variables.uid = vps.uid
        graphql_query.mutation_change_status.variables.status = status
        axios
          .post(api_url.api_vps_hasura, graphql_query.mutation_change_status)
          .then(response => (this.response = response.data), vps.status = status )
          .catch(error => console.log(error));
        console.log('this.response = ', this.response)
      },
  }
})
























//
