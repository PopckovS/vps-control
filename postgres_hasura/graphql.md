Получение всех записей VPS с помощью Hasura 

    {query: "{api_vps{id,uid,cpu,hdd}}"}

Обновление одной записи VPS с помощью Hasura

    started stopped blocked

    {"query": "mutation updateMutation ($uid: uuid!, $status: String!) {update_api_vps(where: {uid: {_eq: $uid}},_set: {status: $status}) {affected_rows returning {status, id, uid}}}",
      "variables": {
        "uid": "21c75906-7e3c-489c-aaeb-ea2cf05b9e2a",
        "status": "started"
      }
    }

Мутация создания обьекта::

    mutation {
      insert_api_vps(objects: {cpu: "111", hdd: "222", ram: "333", status: "started", uid: "a3d8ede0-84dd-4a0f-9bda-b799f1c7a7eb"}) {
        returning {
          id
          uid
          ram
          cpu
          hdd
          status
          create_date
          update_date
        }
      }
    }

Его JSON версия  
     
    {"query": "mutation insertMutation ($uid: uuid!, $status: String!, $ram: smallint!, $hdd: smallint!, $cpu: smallint!) {insert_api_vps(objects: {cpu: $cpu, hdd: $hdd, ram: $ram, status: $status, uid: $uid}) { returning { id, uid, ram, cpu, hdd, status, create_date, update_date}}}",
      "variables": {
        "ram": 111,
        "cpu": 111,
        "hdd": 111,
        "uid": "23c75906-7e3c-489c-aaeb-ea2cf05b9e2a",
        "status": "started"
      }
    }



    










