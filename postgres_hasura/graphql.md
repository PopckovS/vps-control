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




     








