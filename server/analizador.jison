/* lexical grammar */
%lex

%options case-insensitive

%%

\s+                   				// Whitespace
"\/\/".*							// EndOfLineComment
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	// MultiLineComment

"clase"               	return 'prclase'
"double"             	return 'prdouble'
"int"             		return 'printeger'
"boolean"              	return 'prboolean'
"char"             		return 'prchar'
"string"				return 'prstring'
"list"					return 'prlist'
"new"					return 'prnew'
"add"					return 'pradd'

"if"					return 'prif'
"else"					return 'prelse'
"switch"				return 'prswitch'
"case"					return 'prcase'
"break"					return 'prbreak'
"while"               	return 'prwhile'
"for"					return 'prfor'
"do"					return 'prdo'
"default"				return 'prdefault'
"continue"				return 'prcontinue'
"return"				return 'prreturn'
"void"					return 'prvoid'
"++"					return 'incremento'
"--"					return 'decremento'

"print"					return 'prprint'
"toLower"				return 'prtoLower'
"toUpper"				return 'prtoUpper'
"length"				return 'prlength'
"truncate"				return 'prtruncate'
"round"					return 'prround'
"typeof"				return 'prtypeof'
"toString"				return 'prtoString'
"toCharArray"			return 'prtoCharArray'
"exec"					return 'prexec'

"true"                	return 'true'
"false"               	return 'false'

"||"                   	return 'or'
"&&"                   	return 'and'
"!"                   	return 'not'
"="						return 'igual'
"=="                   	return 'igualigual'
"!="                   	return 'diferente'
"<="                   	return 'menorigual'
">="					return 'mayorigual'
">"                   	return 'mayor'
"<"                   	return 'menor'
","                   	return 'coma'
";"                   	return 'ptcoma'
"."						return 'punto'
":"						return 'dospuntos'
"{"                   	return 'labre'
"}"                   	return 'lcierra'
"*"                   	return 'multi'
"/"                   	return 'div'
"-"                   	return 'menos'
"+"                   	return 'suma'
"^"                   	return 'exponente'
"%"                   	return 'modulo'
"("                   	return 'pabre'
")"                   	return 'pcierra'
"?"						return 'interrogacion'
"["						return 'cabre'
"]"						return 'ccierra'

"\\n"|"\\\\"|"\\\""|"\\“"|"\\”"|"\\t"|"\\'" return 'especiales'
([a-zA-Z])([a-zA-Z0-9_])* return 'id'
['].?[']				return 'caracter'
["\""]([^"\""])*["\""] 	return 'cadena'
[0-9]+("."[0-9]+)?\b	return 'doble'
[0-9]+					return 'entero'

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex
%{
	// const TIPO_OPERACION	= require('./controller/Enums/TipoOperacion');
	// const TIPO_VALOR 		= require('./controller/Enums/TipoValor');
	// const TIPO_DATO			= require('./controller/Enums/TipoDato'); //para jalar el tipo de dato
	// const INSTRUCCION	= require('./controller/Instruccion/Instruccion');
%}

/* operator associations and precedence */

%left 'or'
%left 'and'
%right 'not'
%left 'igualigual' 'diferente' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'suma' 'menos'
%left 'multi' 'div' 'modulo'
%left 'exponente'
%left umenos

%start ini

%% /* language grammar */

ini: ENTRADA EOF {return $1;}
;

ENTRADA: ENTRADA FUNCIONBODY
		| ENTRADA METODOBODY
		| ENTRADA LLAMADA ptcoma
		| FUNCIONBODY
		| METODOBODY
		| EXECBODY //solo deberia venir un exec
		| LLAMADA ptcoma
;

FUNCIONBODY: TIPO id pabre pcierra labre INSTRUCCION lcierra
			| TIPO id pabre LISTAPARAMETROS pcierra labre INSTRUCCION lcierra
;

METODOBODY: prvoid id pabre pcierra labre INSTRUCCION lcierra
			| TIPO id pabre LISTAPARAMETROS pcierra labre INSTRUCCION lcierra
;

EXECBODY: prexec id pabre pcierra ptcoma
		| prexec id pabre LISTAVALORES pcierra ptcoma
;

LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS
				| PARAMETROS
;

PARAMETROS: TIPO id
;

SENTENCIACONTROL: INSTRUCCION
;

SENTENCIACICLO:	INSTRUCCION
;

INSTRUCCION: INSTRUCCION DEC_VAR //en las declaraciones tambien estoy tomando las asignaciones y agregaciones menos en var
			| INSTRUCCION SENTENCIACONTROL
			| INSTRUCCION SENTENCIACICLO
			| INSTRUCCION DEC_VECT
			| INSTRUCCION DEC_LIST
			| INSTRUCCION LLAMADA ptcoma
			| DEC_VAR //string a; int b = 5;
			| SENTENCIACONTROL //if, else, switch
			| SENTENCIACICLO //ciclos o bucles
			| DEC_VECT // []
			| DEC_LIST // [[]]
			| SENTENCIATRANSFERENCIA
			| LLAMADA ptcoma
			| FUNCIONESRESERVADAS //print... etc
;

FUNCIONESRESERVADAS: PRINT
					| TOLOWER
					| TOUPPER
					| LENGTH
					| TRUNCATE
					| ROUND
					| TYPEOF
					| TOSTRING
					| TOCHARARRAY
;

SENTENCIATRANSFERENCIA: prbreak ptcoma
						| prcontinue ptcoma
						| prreturn ptcoma
;

SENTENCIACICLO: WHILE
				| FOR //PROBAR EL FOR CON DEC_VAR
				| DOWHILE
;

WHILE: prwhile pabre EXPRESION pcierra labre INSTRUCCION lcierra
;

FOR: prfor pabre DEC_VAR CONDICION ptcoma ACTUALIZACION pcierra labre INSTRUCCION lcierra
;

ACTUALIZACION: id igual EXPRESION
 			| id incremento
			| id decremento
;

DOWHILE: prdo labre INSTRUCCION lcierra prwhile pabre EXPRESION pcierra ptcoma
;

// ASIG_VAR: id igual EXPRESION
// ;

// CONDICION: id menor id
// 		| id menorigual id
// 		| id mayor id
// 		| 
// ;

SENTENCIACONTROL: IF
				| SWITCH
;

IF: prif pabre EXPRESION pcierra labre INSTRUCCION lcierra prelse IF
	| prif pabre EXPRESION pcierra labre INSTRUCCION lcierra prelse labre INSTRUCCION lcierra
	| prif pabre EXPRESION pcierra labre INSTRUCCION lcierra
;

SWITCH: prswitch pabre EXPRESION pcierra labre CASESLIST DEFAULT lcierra
		| prswitch pabre EXPRESION pcierra labre CASESLIST lcierra
		| prswitch pabre EXPRESION pcierra labre DEFAULT lcierra
;

CASESLIST: prcase EXPRESION dospuntos INSTRUCCION
;

DEFAULT: prdefault dospuntos INSTRUCCION
;

DEC_VAR: TIPO id igual EXPRESION ptcoma { console.log($4); } //tentativamente agregar asignacion
		| TIPO id ptcoma
;

DEC_VECT: TIPO cabre ccierra id igual prnew TIPO cabre EXPRESION ccierra ptcoma //En expresion agregar el acceso a vector
		| TIPO cabre ccierra id igual cabre LISTAVALORES ccierra ptcoma
		| id cabre EXPRESION ccierra igual EXPRESION ptcoma
;

DEC_LIST: prlist menor TIPO mayor id igual prnew prlist menor TIPO mayor ptcoma //agregar el acceso a lista en expresion
		| id punto pradd pabre EXPRESION pcierra ptcoma
		| id cabre cabre EXPRESION ccierra ccierra igual EXPRESION ptcoma
;

LISTAVALORES: LISTAVALORES coma VALORES
			| VALORES
;

VALORES: EXPRESION	//cadena, boolean, entero, etc
;

TIPO: cabre ccierra TIPODATO
	| TIPODATO
;

TIPODATO: prstring
		| printeger
		| prdouble
		| prchar
		| prboolean
		| prlist
;

EXPRESION: 	EXPRESION suma EXPRESION
			| EXPRESION menos EXPRESION
			| EXPRESION multi EXPRESION
			| EXPRESION div EXPRESION
			| EXPRESION exponente EXPRESION
			| EXPRESION modulo EXPRESION
			| menos EXPRESION %prec umenos
			| pabre EXPRESION pcierra
			| EXPRESION igualigual EXPRESION
			| EXPRESION diferente EXPRESION
			| EXPRESION menor EXPRESION
			| EXPRESION menorigual EXPRESION
			| EXPRESION mayor EXPRESION
			| EXPRESION mayorigual EXPRESION
			| EXPRESION or EXPRESION
			| EXPRESION and EXPRESION
			| not EXPRESION
			| cadena {$$=$1;}
			| caracter {$$=$1;}
			| true {$$=$1;}
			| false {$$=$1;}
			| entero {$$=$1;}
			| doble {$$=$1;}
			| pabre TIPODATO pcierra EXPRESION
			| CONDICION interrogacion EXPRESION dospuntos EXPRESION //¿
			| LLAMADA
;

LLAMADA: id pabre LISTAVALORES pcierra
		| id pabre pcierra
;

CONDICION: //
;

// CASTEO: pabre TIPODATO pcierra EXPRESION
// ;


// OPCIONESCUERPO: OPCIONESCUERPO CUERPO {$1.push($2); $$=$1;}
//               | CUERPO {$$=[$1];}
// ;

// CUERPO: DEC_VAR {$$=$1}
//       | WHILE {$$=$1}
//       | IMPRIMIR {$$=$1}
//       | DEC_MET {$$=$1}
//       | AS_VAR {$$=$1}
// ;

// AS_VAR: identificador menor menos EXPRESION ptcoma {$$ = INSTRUCCION.nuevaAsignacion($1, $4, this._$.first_line,this._$.first_column+1)}
// ;

// DEC_VAR: TIPO identificador ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1)}
//        | TIPO identificador menor menos EXPRESION ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, $5, $1, this._$.first_line,this._$.first_column+1)}
// ;

// TIPO: decimal {$$ = TIPO_DATO.DECIMAL}
//     | cadena
//     | bandera
// ;


// EXPRESION: EXPRESION suma EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1);}
//          | EXPRESION menos EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1);}
//          | EXPRESION multi EXPRESION
//          | EXPRESION div EXPRESION
//          | EXPRESION exponente EXPRESION
//          | EXPRESION modulo EXPRESION
//          | menos EXPRESION %prec umenos
//          | parA EXPRESION parC {$$=$2}
//          | EXPRESION igualigual EXPRESION
//          | EXPRESION diferente EXPRESION
//          | EXPRESION menor EXPRESION
//          | EXPRESION menorigual EXPRESION
//          | EXPRESION mayor EXPRESION
//          | EXPRESION mayorigual EXPRESION
//          | EXPRESION or EXPRESION
//          | EXPRESION and EXPRESION
//          | not EXPRESION
//          | NUMBER {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1)}
//          | true {$$ = INSTRUCCION.nuevoValor(Boolean($1), TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1)}
//          | false {$$ = INSTRUCCION.nuevoValor(Boolean($1), TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1)}
//          | string {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line,this._$.first_column+1)}
//          | identificador {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)}
// ;

// DEC_MET : identificador parA parC llaveA OPCIONESMETODO llaveC
//         | identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC
// ;


// PARAMETROS: TIPO identificador
// ;

// OPCIONESMETODO: OPCIONESMETODO CUERPOMETODO
//               | CUERPOMETODO
// ;

// CUERPOMETODO: DEC_VAR
//             | IMPRIMIR
//             | WHILE
//             | AS_VAR
// ;

// IMPRIMIR: cout menor menor EXPRESION ptcoma{$$ = new INSTRUCCION.nuevoCout($4, this._$.first_line,this._$.first_column+1)}
// ;

// WHILE: while parA EXPRESION parC llaveA OPCIONESMETODO llaveC
// ;