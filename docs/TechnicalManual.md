# MANUAL TÉCNICO

## Indice
- [Introducción](#introducción)
- [Objetivos](#objetivos)
- [Descripción general](#Descripción-general)
- [Requerimientos funcionales](#Requerimientos-funcionales)
- [Atributos del sistema](#Atributos-del-sistema)
- [Método de trabajo](#método-de-trabajo)

<hr>
<br>

## Introducción
En el presente documento se detallan los elementos técnicos detrás de la funcionalidad de TYPESTY, realizado para el segundo proyecto del curso de Organización de Lenguajes y Compiladores 1. Así mismo 
se justifica las decisiones tomadas a lo largo de la elaboración del proyecto en busca de una implementación completa y funcional para el análisis léxico, sintáctico y semántico en la elaboración de un intérprete de código.

## Objetivos
### General 
Aplicar los conocimientos sobre la fase de análisis léxico, sintáctico y semántico de un compilador para
la realización de un intérprete sencillo, con las funcionalidades principales para que sea
funcional.
### Específicos
-	Reforzar los conocimientos de análisis léxico, sintáctico y semántico para la creación de un lenguaje de programación.
-	Aplicar los conceptos de compiladores para implementar el proceso de
interpretación de código de alto nivel.
-	Aplicar los conceptos de compiladores para analizar un lenguaje de
programación y producir las salidas esperadas.
-   Aplicar la teoría de compiladores para la creación de soluciones de software.

<br>
<hr>
<br>

## Descripción general
El curso de Organización de Lenguajes y Compiladores 1, perteneciente a la Facultad de Ingeniería de la Universidad de San Carlos de Guatemala, ha quedado satisfecho con el programa REGEXIVE (que previamente ha entregado), por lo que nuevamente se interesan en usted para generar el lenguaje Typesty, que será un intérprete para que los estudiantes de Introducción a la Programación y Computación 1 utilicen para sus primeras prácticas.

## Atributos del sistema
Cualquier computadora con sistema operativo que soporte los navegadores actuales para correr las funcionalidades de la aplicación en un entorno web.

## Requerimientos funcionales
-	Crear archivos: El editor deberá ser capaz de crear archivos en blanco.
-	Abrir archivos: El editor deberá abrir archivos .ty
-	Guardar el archivo: El editor deberá guardar el estado del archivo en el que se estará trabajando.
-	Reconocer, analizar y validar cadenas ingresadas.
-	Graficar toda parte del proceso por medio de una interfaz amigable al usuario.
-   Múltiples Pestañas: se podrán crear nuevas pestañas con la finalidad de ver y abrir los archivos de prueba en la aplicación.
-   Eliminar pestaña: permitirá cerrar la pestaña actual.

<br>
<hr>
<br>

## Herramientas
-   Ejecutar: hará el llamado al intérprete, el cual se hará cargo de realizar los análisis léxico, sintáctico y semántico, además de ejecutar todas las sentencias.

<br>

## Reportes
-   Reporte de Errores: Se mostrarán todos los errores encontrados al realizar el análisis léxico, sintáctico y semántico.
-   Generar Árbol AST (Árbol de Análisis Sintáctico): se debe generar una imagen del árbol de análisis sintáctico que se genera al realizar los análisis.
-   Reporte de Tabla de Símbolos: Se mostrarán todas las variables, métodos y funciones que han sido declarados dentro del flujo del programa.

<br>
<br>

## Método de trabajo
El proyecto está distribuido en distintas carpetas, para optimizar y ordenar mejor el trabajo, los módulos son los siguientes:

### Backend:
- controller
- model
- AST
- routes
- analizador

### Frontend:
- Se hizo uso de componenetes de Angular en su versión 11.
- App-Component (html, css, services)

<br>


Toda la metodología está ligeramente inspirada en MVC donde se busca mantener separado cada uno de sus componentes para un mejor orden y control de errores. El proyecto es multiparadigma pero predomina el OOP, representado por cada clase e instancia que se maneja a lo largo de la implementación. 

<br>

## [analizador.jison](https://github.com/ldecast/Typesty-OLC1/tree/master/server)

Archivo en donde se realiza el análisis léxico y sintáctico, así como la recopilación de todos los datos e información para su posterior procesamiento.

### [controller](https://github.com/ldecast/Typesty-OLC1/tree/master/server/controller)
Carpeta en donde se encuentran cada uno de los archivos .js para poder procesar la información y la lógica de una manera más organizada así como archivos dentro de la carpeta Enum.

### [AST](https://github.com/ldecast/Typesty-OLC1/tree/master/server/controller/AST)
Carpeta en donde se encuentran el archivo Graph.js que se encarga de toda la lógica para crear el archivo .dot para renderizar la graficación del AST.

### [model](https://github.com/ldecast/Typesty-OLC1/tree/master/server/model)
Carpeta en donde se procesa la información para clasificar instrucciones, expresiones y formar la cadena de salida.

<br>

#### [Operacion.js](https://github.com/ldecast/Typesty-OLC1/blob/master/server/model/Operacion/Operacion.js)
|Nombre de la función |Descripción|
| ------------ | ------------ |
| `Operacion(_expresion, _ambito)` | Es la función del archivo que se encarga de llamar otros módulos para clasificar y procesar las expresiones. |

<br>

#### [Bloque.js](https://github.com/ldecast/Typesty-OLC1/blob/master/server/controller/Instruccion/Bloque.js)
|Nombre de la función |Descripción|
| ------------ | ------------ |
| `Operacion(_expresion, _ambito)` | Es la función del archivo que se encarga de llamar otros módulos para clasificar y procesar las instrucciones como ciclos, sentencias y declaraciones. |

<br>

### [routes](https://github.com/ldecast/Typesty-OLC1/tree/master/server/routes)
Carpeta en donde se encuentran cada uno de los archivos .js para poder hacer caso a las solicitudes que se realicen desde la aplicación, en este caso para compilar y devolver un archivo del AST.

<br>

#### [compile.js](https://github.com/ldecast/Typesty-OLC1/blob/master/server/routes/compile.js)
|Nombre de la función |Descripción|
| ------------ | ------------ |
| `app.post('/compile', (req, res))` | Se encarga de llamar al módulo Global para procesar la entrada y devolver una cadena y arreglo de errores, símbolos dentro del intérprete. |

<br>

#### [ast.js](https://github.com/ldecast/Typesty-OLC1/blob/master/server/routes/ast.js)
|Nombre de la función |Descripción|
| ------------ | ------------ |
| `app.post('/AST_report', (req, res))` | Se encarga de llamar al módulo Graph para procesar la entrada y devolver un archivo en formato SVG que contiene una gráfica del árbol sintáctico correspondiente a la entrada. |

<br>

## Errores
Es parte del flujo de programa detectar y reportar errores, por lo que en todas partes del programa, en caso de manejar un error se retornan objetos js { err: "error detecato" }.

<br>

<hr>
<br>

## Contacto:
luis.danniel@hotmail.com







