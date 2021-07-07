# nodecfdi/sat-estado-cfdi-soap

[![Source Code][badge-source]][source]
[![Latest Version][badge-release]][release]
[![Software License][badge-license]][license]
[![Discord][badge-discord]][discord]

[source]: https://github.com/nodecfdi/sat-estado-cfdi-soap
[badge-source]: https://img.shields.io/badge/source-nodecfdi%2Fsat--estado--cfdi--soap-blue?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMTIgMTIgNDAgNDAiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiwxMy40Yy0xMC41LDAtMTksOC41LTE5LDE5YzAsOC40LDUuNSwxNS41LDEzLDE4YzEsMC4yLDEuMy0wLjQsMS4zLTAuOWMwLTAuNSwwLTEuNywwLTMuMiBjLTUuMywxLjEtNi40LTIuNi02LjQtMi42QzIwLDQxLjYsMTguOCw0MSwxOC44LDQxYy0xLjctMS4yLDAuMS0xLjEsMC4xLTEuMWMxLjksMC4xLDIuOSwyLDIuOSwyYzEuNywyLjksNC41LDIuMSw1LjUsMS42IGMwLjItMS4yLDAuNy0yLjEsMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEsMC43LTMuNywyLTUuMWMtMC4yLTAuNS0wLjgtMi40LDAuMi01YzAsMCwxLjYtMC41LDUuMiwyIGMxLjUtMC40LDMuMS0wLjcsNC44LTAuN2MxLjYsMCwzLjMsMC4yLDQuNywwLjdjMy42LTIuNCw1LjItMiw1LjItMmMxLDIuNiwwLjQsNC42LDAuMiw1YzEuMiwxLjMsMiwzLDIsNS4xYzAsNy4zLTQuNSw4LjktOC43LDkuNCBjMC43LDAuNiwxLjMsMS43LDEuMywzLjVjMCwyLjYsMCw0LjYsMCw1LjJjMCwwLjUsMC40LDEuMSwxLjMsMC45YzcuNS0yLjYsMTMtOS43LDEzLTE4LjFDNTEsMjEuOSw0Mi41LDEzLjQsMzIsMTMuNHoiLz48L3N2Zz4%3D
[license]: https://github.com/nodecfdi/sat-estado-cfdi-soap/blob/master/LICENSE
[badge-license]: https://img.shields.io/github/license/nodecfdi/sat-estado-cfdi-soap?logo=open-source-initiative&style=flat-square
[badge-release]: https://img.shields.io/npm/v/@nodecfdi/sat-estado-cfdi-soap
[release]: https://www.npmjs.com/package/@nodecfdi/sat-estado-cfdi-soap
[badge-discord]: https://img.shields.io/discord/459860554090283019?logo=discord&style=flat-square
[discord]: https://discord.gg/aFGYXvX

> Consulta el estado de un CFDI en el webservice del SAT usando SOAP (sin WSDL)

:us: The documentation of this project is in spanish as this is the natural language for intented audience.

:mexico: La documentación del proyecto está en español porque ese es el lenguaje principal de los usuarios.

Esta librería contiene objetos para consumir el **Servicio de Consulta de CFDI del SAT** usando SOAP.

Esta librería provee un objeto **`SoapConsumerClient`** que se usa en `Consumer`
de la librería [`nodecfdi/sat-estado-cfdi`](https://github.com/nodecfdi/sat-estado-cfdi).

La implementación utiliza la dependecia [`soap`](https://www.npmjs.com/package/soap) y configura el cliente y la llamada para no usar
el archivo WSDL porque el servicio del SAT ya no lo ofrece.

Esta librería está inspirada en: https://github.com/phpcfdi/sat-estado-cfdi-soap/

## Instalación

```shell
npm i @nodecfdi/sat-estado-cfdi-soap --save
```
o 
```shell
yarn add @nodecfdi/sat-estado-cfdi-soap
```

## Ejemplo básico de uso

```ts
import { SoapConsumerClient } from '@nodecfdi/sat-estado-cfdi-soap';
import { Consumer } from '@nodecfdi/sat-estado-cfdi';

// crear la instancia básica del Cliente Soap para el consumidor
const client = new SoapConsumerClient();

// creamos el consumidor con nuestro cliente
const consumer = new Consumer(client);

// consumimos el webservice!
const response = await consumer.executeAsync('...expression');

// usamos el resultado
if (response.getCancellable().notCancellable()) {
    console.log('CFDI no es cancelable');
}
```