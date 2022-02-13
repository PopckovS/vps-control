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
  },

  // мутация на создание нового VPS
  mutation_crate_new_vps: {
    "query": "mutation insertMutation ($uid: uuid!, $status: String!, $ram: smallint!, $hdd: smallint!, $cpu: smallint!) {insert_api_vps(objects: {cpu: $cpu, hdd: $hdd, ram: $ram, status: $status, uid: $uid}) { returning { id, uid, ram, cpu, hdd, status, create_date, update_date}}}",
      "variables": {
        "ram": null,
        "cpu": null,
        "hdd": null,
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
var api_form = new Vue({
  el: '#create-vps-api-form',
  data:  {
    cpu: '',
    ram: '',
    hdd: '',
    status: 'started',
    response: null,
    message: '',
  },
  methods: {
    AddVps: function() {
      event.preventDefault();
      axios
        .post(
          api_url.api_vps_drf,
          {cpu: Number(this.cpu), ram: Number(this.ram), hdd: Number(this.hdd), status: this.status }
        )
        .then(response => (this.response = response.data), this.message = "Новый VPS добавлен")
        .catch(error => console.log(error));
        api1.getAllVps();
    }
  }
});




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
          .catch(error => console.log(error));
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



// Компонент для работы с формой отправки, создание нового VPS через Hasura
var hasura_form = new Vue({
  el: '#create-vps-hasura-form',
  data:  {
    cpu: '',
    ram: '',
    hdd: '',
    status: 'started',
    response: null,
    message: '',
  },
  methods: {
    AddVps: function() {
      event.preventDefault();

      graphql_query.mutation_crate_new_vps.variables.status = this.status;
      graphql_query.mutation_crate_new_vps.variables.cpu = Number(this.cpu);
      graphql_query.mutation_crate_new_vps.variables.ram = Number(this.ram);
      graphql_query.mutation_crate_new_vps.variables.hdd = Number(this.hdd);
      graphql_query.mutation_crate_new_vps.variables.uid = this.createUUID();

      console.log('my_query = ', graphql_query.mutation_crate_new_vps);

      axios
        .post(api_url.api_vps_hasura, graphql_query.mutation_crate_new_vps)
        .then(response => (this.response = response.data), this.message = "Новый VPS добавлен")
        .catch(error => console.log(error));
    },

    // Функция генерации uuid
    createUUID: function () {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
     });
    }

  }
});




















//
