import {HttpRestServiceBuilder} from "./http/builder/HttpRestServiceBuilder";

export {
  HttpRestServiceBuilder
}

function http() {
 return new HttpRestServiceBuilder()
    .withBaseUrl('https://jsonplaceholder.typicode.com')
   .build()
}

