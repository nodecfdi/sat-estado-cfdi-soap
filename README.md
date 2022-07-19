# `@nodecfdi/sat-estado-cfdi-soap`

[![Source Code][badge-source]][source]
[![Npm Node Version Support][badge-node-version]][node-version]
[![Discord][badge-discord]][discord]
[![Latest Version][badge-release]][release]
[![Software License][badge-license]][license]
[![Build Status][badge-build]][build]
[![Reliability][badge-reliability]][reliability]
[![Maintainability][badge-maintainability]][maintainability]
[![Code Coverage][badge-coverage]][coverage]
[![Violations][badge-violations]][violations]
[![Total Downloads][badge-downloads]][downloads]

> Consulta el estado de un CFDI en el webservice del SAT usando SOAP (sin WSDL)

:us: The documentation of this project is in spanish as this is the natural language for intented audience.

:mexico: La documentación del proyecto está en español porque ese es el lenguaje principal de los usuarios.

## Acerca de `@nodecfdi/sat-estado-cfdi-soap`

Esta librería contiene objetos para consumir el **Servicio de Consulta de CFDI del SAT** usando SOAP.

Esta librería provee un objeto **`SoapConsumerClient`** que se usa en `Consumer`
de la librería [`@nodecfdi/sat-estado-cfdi`](https://github.com/nodecfdi/sat-estado-cfdi).

La implementación utiliza la dependecia [`soap`](https://www.npmjs.com/package/soap) y configura el cliente y la llamada para no usar
el archivo WSDL porque el servicio del SAT ya no lo ofrece.

Esta librería está inspirada en: <https://github.com/phpcfdi/sat-estado-cfdi-soap/>

## Instalación

```bash
npm i @nodecfdi/sat-estado-cfdi-soap --save
```

o

```bash
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

## Soporte

Puedes obtener soporte abriendo un ticket en Github.

Adicionalmente, esta librería pertenece a la comunidad [OcelotlStudio](https://ocelotlstudio.com), así que puedes usar los mismos canales de comunicación para obtener ayuda de algún miembro de la comunidad.

## Compatibilidad

Esta librería se mantendrá compatible con al menos la versión con
[soporte activo de Node](https://nodejs.org/es/about/releases/) más reciente.

También utilizamos [Versionado Semántico 2.0.0](https://semver.org/lang/es/) por lo que puedes usar esta librería sin temor a romper tu aplicación.

## Contribuciones

Las contribuciones con bienvenidas. Por favor lee [CONTRIBUTING][] para más detalles y recuerda revisar el archivo [CHANGELOG][].

## Copyright and License

The `@nodecfdi/sat-estado-cfdi-soap` library is copyright © [NodeCfdi](https://github.com/nodecfdi) - [OcelotlStudio](https://ocelotlstudio.com) and licensed for use under the MIT License (MIT). Please see [LICENSE][] for more information.

[contributing]: https://github.com/nodecfdi/sat-estado-cfdi-soap/blob/main/CONTRIBUTING.md
[changelog]: https://github.com/nodecfdi/sat-estado-cfdi-soap/blob/main/CHANGELOG.md

[source]: https://github.com/nodecfdi/sat-estado-cfdi-soap
[node-version]: https://www.npmjs.com/package/@nodecfdi/sat-estado-cfdi-soap
[discord]: https://discord.gg/AsqX8fkW2k
[release]: https://www.npmjs.com/package/@nodecfdi/sat-estado-cfdi-soap
[license]: https://github.com/nodecfdi/sat-estado-cfdi-soap/blob/main/LICENSE
[build]: https://github.com/nodecfdi/sat-estado-cfdi-soap/actions/workflows/build.yml?query=branch:main
[reliability]:https://sonarcloud.io/component_measures?id=nodecfdi_sat-estado-cfdi-soap&metric=Reliability
[maintainability]: https://sonarcloud.io/component_measures?id=nodecfdi_sat-estado-cfdi-soap&metric=Maintainability
[coverage]: https://sonarcloud.io/component_measures?id=nodecfdi_sat-estado-cfdi-soap&metric=Coverage
[violations]: https://sonarcloud.io/project/issues?id=nodecfdi_sat-estado-cfdi-soap&resolved=false
[downloads]: https://www.npmjs.com/package/@nodecfdi/sat-estado-cfdi-soap

[badge-source]: https://img.shields.io/badge/source-nodecfdi/sat--estado--cfdi--soap-blue.svg?logo=github
[badge-node-version]: https://img.shields.io/node/v/@nodecfdi/sat-estado-cfdi-soap.svg?logo=nodedotjs
[badge-discord]: https://img.shields.io/discord/459860554090283019?logo=discord
[badge-release]: https://img.shields.io/npm/v/@nodecfdi/sat-estado-cfdi-soap.svg?logo=npm
[badge-license]: https://img.shields.io/github/license/nodecfdi/sat-estado-cfdi-soap.svg?logo=open-source-initiative
[badge-build]: https://img.shields.io/github/workflow/status/nodecfdi/sat-estado-cfdi-soap/build/main?logo=github-actions
[badge-reliability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_sat-estado-cfdi-soap&metric=reliability_rating
[badge-maintainability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_sat-estado-cfdi-soap&metric=sqale_rating
[badge-coverage]: https://img.shields.io/sonar/coverage/nodecfdi_sat-estado-cfdi-soap/main?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-violations]: https://img.shields.io/sonar/violations/nodecfdi_sat-estado-cfdi-soap/main?format=long&logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-downloads]: https://img.shields.io/npm/dm/@nodecfdi/sat-estado-cfdi-soap.svg?logo=npm
