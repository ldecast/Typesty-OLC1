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

ini: ENTRADA EOF
;

ENTRADA: ENTRADA ENTCERO
		| ENTCERO
;

ENTCERO: FUNCIONBODY
		| METODOBODY
		| EXECBODY
		//| LLAMADA ptcoma -- supuestamente solo declaraciones/asignaciones
		| DEC_VAR
		| DEC_VECT
		| DEC_LIST
		| FPRINT
;

FUNCIONBODY: TIPO id pabre pcierra labre INSTRUCCION lcierra
			| TIPO id pabre LISTAPARAMETROS pcierra labre INSTRUCCION lcierra
;

METODOBODY: prvoid id pabre pcierra labre INSTRUCCION lcierra
			| prvoid id pabre LISTAPARAMETROS pcierra labre INSTRUCCION lcierra
;

EXECBODY: prexec id pabre pcierra ptcoma
		| prexec id pabre LISTAVALORES pcierra ptcoma
;

LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS
				| PARAMETROS
;

PARAMETROS: TIPO id
;

INSTRUCCION: INSTRUCCION INSCERO 
			| INSCERO {$$="hola";}
;

INSCERO: DEC_VAR //string a; int b = 5;
		| SENTENCIACONTROL //if, else, switch
		| SENTENCIACICLO //ciclos o bucles
		| DEC_VECT // []
		| DEC_LIST // [[]]
		| SENTENCIATRANSFERENCIA
		| LLAMADA ptcoma
		| FPRINT //print
;

SENTENCIATRANSFERENCIA: prbreak ptcoma
						| prreturn EXPRESION ptcoma
						| prcontinue ptcoma
						| prreturn ptcoma
;

SENTENCIACICLO: WHILE
				| FOR
				| DOWHILE
;

WHILE: prwhile pabre EXPRESION pcierra labre INSTRUCCION lcierra
;

FOR: prfor pabre DEC_VAR EXPRESION ptcoma ACTUALIZACION pcierra labre INSTRUCCION lcierra {console.log($9);}
;

ACTUALIZACION: id igual EXPRESION
 			| id incremento
			| id decremento
;

DOWHILE: prdo labre INSTRUCCION lcierra prwhile pabre EXPRESION pcierra ptcoma
;

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

DEC_VAR: TIPO id igual TERNARIO ptcoma
		| id igual TERNARIO ptcoma
		| TIPO id igual EXPRESION ptcoma { console.log($4); }
		| TIPO id ptcoma
		| id igual EXPRESION ptcoma
;

TERNARIO: EXPRESION interrogacion EXPRESION dospuntos EXPRESION
;

DEC_VECT: TIPO cabre ccierra id igual prnew TIPO cabre EXPRESION ccierra ptcoma //En expresion agregar el acceso a vector
		| TIPO cabre ccierra id igual cabre LISTAVALORES ccierra ptcoma
		| id cabre EXPRESION ccierra igual EXPRESION ptcoma
;

DEC_LIST: prlist menor TIPO mayor id igual prnew prlist menor TIPO mayor ptcoma //agregar el acceso a lista en expresion
		| id punto pradd pabre EXPRESION pcierra ptcoma
		| id cabre cabre EXPRESION ccierra ccierra igual EXPRESION ptcoma
;

// CONDICION: EXPRESION CONDICIONAL EXPRESION
// 		| EXPRESION
// ;

// CONDICIONAL: menorigual
// 			| menor
// 			| mayorigual
// 			| mayor
// 			| igualigual
// 			| diferente
// ;

// CASTEO: pabre TIPODATO pcierra EXPRESION
// ;

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
			| id cabre cabre EXPRESION ccierra ccierra {$$=$1;} //acceso a lista
			| id cabre EXPRESION ccierra {$$=$1;} //acceso a vector
			| id {$$=$1;}
			| CASTEO
			// | TERNARIO
			| LLAMADA
			| FUNCIONESRESERVADAS
;

FUNCIONESRESERVADAS: FPRINT
					| FTOLOWER
					| FTOUPPER
					| FLENGTH
					| FTRUNCATE
					| FROUND
					| FTYPEOF
					| FTOSTRING
					| FTOCHARARRAY
;

FPRINT: prprint pabre EXPRESION pcierra ptcoma
;

FTOLOWER: prtoLower pabre EXPRESION pcierra
;

FTOUPPER: prtoUpper pabre EXPRESION pcierra
;

FLENGTH: prlength pabre VALORLEN pcierra
;

VALORLEN: id cabre cabre EXPRESION ccierra ccierra
		| id cabre EXPRESION ccierra
		| id
;

FTRUNCATE: prtruncate pabre EXPRESION pcierra
;

FROUND: prround pabre EXPRESION pcierra
;

FTYPEOF: prtypeof pabre EXPRESION pcierra
;

FTOSTRING: prtoString pabre EXPRESION pcierra
;

FTOCHARARRAY: prtoCharArray pabre EXPRESION pcierra //recibe una cadena
;

CASTEO: pabre TIPOCAST pcierra EXPRESION ptcoma//no debe llevar ';' pero sin el token truena
;

TIPOCAST: print
		| prdouble
		| prchar
		| prstring
;

EXPCAST: caracter {$$=$1;}
		| entero {$$=$1;}
		| doble {$$=$1;}
		| id {$$=$1;}
;

LLAMADA: id pabre LISTAVALORES pcierra
		| id pabre pcierra
;

LISTAVALORES: LISTAVALORES coma VALORES
			| VALORES
;

VALORES: EXPRESION	//cadena, boolean, entero, etc
;

