/* lexical grammar */
%lex

%options case-insensitive

%%

\s+                   				// Whitespace
"//".*							// EndOfLineComment
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
"!="                   	return 'diferente'
"=="                   	return 'igualigual'
"!"                   	return 'not'
"="						return 'igual'
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

"\\n"|"\\r"|"\\t"|"\\\\"|"\\\""|"\\“"|"\\”"|"\\\'" return 'especiales'
([a-zA-Z])([a-zA-Z0-9_])* return 'id'
[']\\\\[']|[']\\\"[']|[']\\\'[']|[']\\n[']|[']\\t[']|[']\\r[']|['].?[']	return 'caracter'
["\""]([^"\""])*["\""] 	return 'cadena' //truena con "\"Esto es una cadena\""
[0-9]+("."[0-9]+)+\b	return 'doble'
[0-9]+					return 'entero'

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex
%{
	const TIPO_OPERACION	= require('./controller/Enum/TipoOperaciones');
	const TIPO_VALOR 		= require('./controller/Enum/TipoValores');
	const TIPO_DATO			= require('./controller/Enum/Tipados');
	const INSTRUCCION		= require('./controller/Instruccion/Instruccion');
%}

/* operator associations and precedence */

%left 'or'
%left 'and'
%right 'not'
%left 'igualigual' 'diferente' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'suma' 'menos'
%left 'multi' 'div' 'modulo'
%left 'exponente'
%left 'incremento','decremento'
%left umenos

%start ini

%% /* language grammar */

ini: ENTRADA EOF {return $1;}
;

ENTRADA: ENTRADA ENTCERO {$1.push($2); $$=$1;}
		| ENTCERO {$$=[$1];}
;

ENTCERO: FUNCIONBODY {$$=$1}
		| METODOBODY {$$=$1}
		| EXECBODY {$$=$1}
		| LLAMADA ptcoma {$$=$1}
		| DEC_VAR {$$=$1}
		| DEC_VECT {$$=$1}
		| DEC_LIST {$$=$1}
		| FPRINT {$$=$1}
		| WHILE {$$=$1}
		| FOR {$$=$1}
		| DOWHILE {$$=$1}
		| CONTROLIF {$$=$1}
		| SWITCH {$$=$1}
;

FUNCIONBODY: TIPO id pabre pcierra labre INSTRUCCION lcierra { $$ = INSTRUCCION.nuevaFuncion($2, null, $6, $1, this._$.first_line, this._$.first_column+1) }
			| TIPO id pabre LISTAPARAMETROS pcierra labre INSTRUCCION lcierra { $$ = INSTRUCCION.nuevaFuncion($2, $4, $7, $1, this._$.first_line, this._$.first_column+1) }
			| TIPO_VECT id pabre pcierra labre INSTRUCCION lcierra { $$ = INSTRUCCION.nuevaFuncion($2, null, $6, {vector: $1}, this._$.first_line, this._$.first_column+1) }
			| TIPO_VECT id pabre LISTAPARAMETROS pcierra labre INSTRUCCION lcierra { $$ = INSTRUCCION.nuevaFuncion($2, $4, $7, {vector: $1}, this._$.first_line, this._$.first_column+1) }
			| TIPO_LIST id pabre pcierra labre INSTRUCCION lcierra { $$ = INSTRUCCION.nuevaFuncion($2, null, $6, {lista: $1}, this._$.first_line, this._$.first_column+1) }
			| TIPO_LIST id pabre LISTAPARAMETROS pcierra labre INSTRUCCION lcierra { $$ = INSTRUCCION.nuevaFuncion($2, $4, $7, {lista: $1}, this._$.first_line, this._$.first_column+1) }
;

METODOBODY: prvoid id pabre pcierra labre INSTRUCCION lcierra { $$ = INSTRUCCION.nuevoMetodo($2, [], $6, this._$.first_line, this._$.first_column+1) }
			| prvoid id pabre LISTAPARAMETROS pcierra labre INSTRUCCION lcierra { $$ = INSTRUCCION.nuevoMetodo($2, $4, $7, this._$.first_line, this._$.first_column+1) }
;

EXECBODY: prexec id pabre pcierra ptcoma {$$ = INSTRUCCION.nuevoExec($2, null, this._$.first_line, this._$.first_column+1)}
		| prexec id pabre LISTAVALORES pcierra ptcoma {$$ = INSTRUCCION.nuevoExec($2, $4, this._$.first_line, this._$.first_column+1)}
;

LISTAPARAMETROS: LISTAPARAMETROS coma PARAMETROS {$1.push($3); $$=$1;}
				| PARAMETROS {$$=[$1];}
;

PARAMETROS: TIPO_VECT id {$$ = INSTRUCCION.nuevoParametro($2, {vector: $1}, this._$.first_line, this._$.first_column+1)}
			| TIPO_LIST id {$$ = INSTRUCCION.nuevoParametro($2, {lista: $1}, this._$.first_line, this._$.first_column+1)}
			| TIPO id {$$ = INSTRUCCION.nuevoParametro($2, $1, this._$.first_line, this._$.first_column+1)}
;

INSTRUCCION: INSTRUCCION INSCERO {$1.push($2); $$=$1;}
			| INSCERO {$$=[$1];}
;

INSCERO: DEC_VAR {$$=$1}
		| SENTENCIACONTROL {$$=$1}
		| SENTENCIACICLO {$$=$1}
		| DEC_VECT {$$=$1}
		| DEC_LIST {$$=$1}
		| SENTENCIATRANSFERENCIA {$$=$1}
		| LLAMADA ptcoma {$$=$1}
		| FPRINT {$$=$1}
;

SENTENCIATRANSFERENCIA: prbreak ptcoma { $$ = new INSTRUCCION.nuevoBreak(this._$.first_line, this._$.first_column+1) }
						| prreturn EXPRESION ptcoma { $$ = new INSTRUCCION.nuevoReturn($2, this._$.first_line, this._$.first_column+1) }
						| prcontinue ptcoma { $$ = new INSTRUCCION.nuevoContinue(this._$.first_line, this._$.first_column+1) }
						| prreturn ptcoma { $$ = new INSTRUCCION.nuevoReturn(null, this._$.first_line, this._$.first_column+1) }
;

SENTENCIACICLO: WHILE {$$=$1}
				| FOR {$$=$1}
				| DOWHILE {$$=$1}
;

WHILE: prwhile pabre EXPRESION pcierra labre INSTRUCCION lcierra {$$ = new INSTRUCCION.nuevoWhile($3, $6 , this._$.first_line,this._$.first_column+1)}
;

FOR: prfor pabre DEC_VAR EXPRESION ptcoma ACTUALIZACION pcierra labre INSTRUCCION lcierra {$9.push($6); $$ = new INSTRUCCION.nuevoFor($3, $4, $9, this._$.first_line,this._$.first_column+1)}
;

ACTUALIZACION: id igual EXPRESION {$$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line,this._$.first_column+1)}
 			| id incremento {
			$$ = INSTRUCCION.nuevaAsignacion($1,
			{ opIzq: { tipo: 'VAL_IDENTIFICADOR', valor: $1, linea: this._$.first_line, columna: this._$.first_column+1 },
  			opDer: { tipo: 'VAL_ENTERO', valor: 1, linea: this._$.first_line, columna: this._$.first_column+1 },
  			tipo: 'SUMA',
  			linea: this._$.first_line,
  			columna: this._$.first_column+1 }, this._$.first_line,this._$.first_column+1)
			}
			| id decremento {
			$$ = INSTRUCCION.nuevaAsignacion($1,
			{ opIzq: { tipo: 'VAL_IDENTIFICADOR', valor: $1, linea: this._$.first_line, columna: this._$.first_column+1 },
  			opDer: { tipo: 'VAL_ENTERO', valor: 1, linea: this._$.first_line, columna: this._$.first_column+1 },
  			tipo: 'RESTA',
  			linea: this._$.first_line,
  			columna: this._$.first_column+1 }, this._$.first_line,this._$.first_column+1)
			}
;

DOWHILE: prdo labre INSTRUCCION lcierra prwhile pabre EXPRESION pcierra ptcoma {$$ = new INSTRUCCION.nuevoDoWhile($7, $3 , this._$.first_line,this._$.first_column+1)}
;

SENTENCIACONTROL: CONTROLIF {$$=$1}
				| SWITCH {$$=$1}
;

CONTROLIF: IF {$$=$1}
	| IFELSE {$$=$1}
	| ELSEIF {$$=$1}
;

IF: prif pabre EXPRESION pcierra labre INSTRUCCION lcierra { $$ = new INSTRUCCION.nuevoIf($3, $6, this._$.first_line,this._$.first_column+1) }
;

IFELSE: prif pabre EXPRESION pcierra labre INSTRUCCION lcierra prelse labre INSTRUCCION lcierra { $$ = new INSTRUCCION.nuevoIfElse($3, $6, $10, this._$.first_line,this._$.first_column+1) }
;

ELSEIF: prif pabre EXPRESION pcierra labre INSTRUCCION lcierra prelse CONTROLIF { $$ = new INSTRUCCION.nuevoElseIf($3, $6, $9, this._$.first_line,this._$.first_column+1); }
;

SWITCH: prswitch pabre EXPRESION pcierra labre CASESLIST DEFAULT lcierra { $$ = new INSTRUCCION.nuevoSwitch($3, $6, $7, this._$.first_line, this._$.first_column+1); }
		| prswitch pabre EXPRESION pcierra labre CASESLIST lcierra { $$ = new INSTRUCCION.nuevoSwitch($3, $6, null, this._$.first_line, this._$.first_column+1); }
		| prswitch pabre EXPRESION pcierra labre DEFAULT lcierra { $$ = new INSTRUCCION.nuevoSwitch($3, null, $6, this._$.first_line, this._$.first_column+1); }
;

CASESLIST: CASESLIST prcase EXPRESION dospuntos INSTRUCCION { $1.push(new INSTRUCCION.nuevoCaso($3, $5, this._$.first_line, this._$.first_column+1)); $$=$1; }
		| prcase EXPRESION dospuntos INSTRUCCION { $$ = [new INSTRUCCION.nuevoCaso($2, $4, this._$.first_line, this._$.first_column+1)]; }
;

DEFAULT: prdefault dospuntos INSTRUCCION { $$ = new INSTRUCCION.nuevoCaso(null, $3, this._$.first_line, this._$.first_column+1); }
;

DEC_VAR: TIPO id igual CASTEO ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, $4, $1, this._$.first_line, this._$.first_column+1)}
		| id igual CASTEO ptcoma {$$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line, this._$.first_column+1)}
		| TIPO id igual TERNARIO ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, $4, $1, this._$.first_line, this._$.first_column+1)}
		| id igual TERNARIO ptcoma {$$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line, this._$.first_column+1)}
		| TIPO id igual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, $4, $1, this._$.first_line,this._$.first_column+1)}
		| TIPO id ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1)}
		| id igual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line,this._$.first_column+1)}
		| id incremento ptcoma {
			$$ = INSTRUCCION.nuevaAsignacion($1,
			{ opIzq: { tipo: 'VAL_IDENTIFICADOR', valor: $1, linea: this._$.first_line, columna: this._$.first_column+1 },
  			opDer: { tipo: 'VAL_ENTERO', valor: 1, linea: this._$.first_line, columna: this._$.first_column+1 },
  			tipo: 'SUMA',
  			linea: this._$.first_line,
  			columna: this._$.first_column+1 }, this._$.first_line,this._$.first_column+1)
			}
		| id decremento ptcoma {
			$$ = INSTRUCCION.nuevaAsignacion($1,
			{ opIzq: { tipo: 'VAL_IDENTIFICADOR', valor: $1, linea: this._$.first_line, columna: this._$.first_column+1 },
  			opDer: { tipo: 'VAL_ENTERO', valor: 1, linea: this._$.first_line, columna: this._$.first_column+1 },
  			tipo: 'RESTA',
  			linea: this._$.first_line,
  			columna: this._$.first_column+1 }, this._$.first_line,this._$.first_column+1)
			}
;

DEC_VECT: TIPO_VECT id igual prnew TIPO cabre EXPRESION ccierra ptcoma { $$ = INSTRUCCION.nuevoVector($1, $5, $2, $7, null, null, this._$.first_line, this._$.first_column+1) }
		| TIPO_VECT id igual labre LISTAVALORES lcierra ptcoma { $$ = INSTRUCCION.nuevoVector($1, null, $2, null, $5, null, this._$.first_line, this._$.first_column+1) }
		| id cabre EXPRESION ccierra igual EXPRESION ptcoma { $$ = INSTRUCCION.modificacionVector($1, $3, $6, this._$.first_line, this._$.first_column+1) }
		| TIPO_VECT id igual EXPRESION ptcoma { $$ = INSTRUCCION.nuevoVector($1, null, $2, null, null, $4, this._$.first_line, this._$.first_column+1) }
;

DEC_LIST: TIPO_LIST id igual prnew prlist menor TIPO mayor ptcoma { $$ = INSTRUCCION.nuevaLista($1, $7, $2, null, this._$.first_line, this._$.first_column+1) }
		| id punto pradd pabre EXPRESION pcierra ptcoma { $$ = INSTRUCCION.modificacionLista($1, null, $5, this._$.first_line, this._$.first_column+1) }
		| id cabre cabre EXPRESION ccierra ccierra igual EXPRESION ptcoma { $$ = INSTRUCCION.modificacionLista($1, $4, $8, this._$.first_line, this._$.first_column+1) }
		| TIPO_LIST id igual EXPRESION ptcoma { $$ = INSTRUCCION.nuevaLista($1, null, $2, $4, this._$.first_line, this._$.first_column+1) }
;

TIPO_VECT: TIPO cabre ccierra {$$ = $1}
;

TIPO_LIST: prlist menor TIPO mayor {$$ = $3}
;

TIPO: TIPODATO {$$ = $1}
;

TIPODATO: prstring {$$ = TIPO_DATO.CADENA}
		| printeger {$$ = TIPO_DATO.ENTERO}
		| prdouble {$$ = TIPO_DATO.DOBLE}
		| prchar {$$ = TIPO_DATO.CARACTER}
		| prboolean {$$ = TIPO_DATO.BOOLEANO}
;

EXPRESION: 	EXPRESION suma EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1);}
			| EXPRESION menos EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1);}
			| EXPRESION multi EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MULTIPLICACION,this._$.first_line,this._$.first_column+1);}
			| EXPRESION div EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIVISION,this._$.first_line,this._$.first_column+1);}
			| EXPRESION exponente EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA,this._$.first_line,this._$.first_column+1);}
			| EXPRESION modulo EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MODULO,this._$.first_line,this._$.first_column+1);}
			| menos EXPRESION %prec umenos {$$= INSTRUCCION.nuevaOperacionBinaria($2, null, TIPO_OPERACION.NEGACION,this._$.first_line,this._$.first_column+1);}
			| pabre EXPRESION pcierra {$$=$2}
			| EXPRESION igualigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line,this._$.first_column+1);}
			| EXPRESION diferente EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line,this._$.first_column+1);}
			| EXPRESION menor EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line,this._$.first_column+1);}
			| EXPRESION menorigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line,this._$.first_column+1);}
			| EXPRESION mayor EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line,this._$.first_column+1);}
			| EXPRESION mayorigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line,this._$.first_column+1);}
			| EXPRESION or EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line,this._$.first_column+1);}
			| EXPRESION and EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line,this._$.first_column+1);}
			| not EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($2, null, TIPO_OPERACION.NOT,this._$.first_line,this._$.first_column+1);}
			| cadena {$$ = INSTRUCCION.nuevoValor($1.trim().substring(1, $1.length - 1), TIPO_VALOR.CADENA, this._$.first_line,this._$.first_column+1)}
			| caracter {$$ = INSTRUCCION.nuevoValor($1.trim().substring(1, $1.length - 1), TIPO_VALOR.CARACTER, this._$.first_line,this._$.first_column+1)}
			| true {$$ = INSTRUCCION.nuevoValor($1.trim(), TIPO_VALOR.BOOLEANO, this._$.first_line,this._$.first_column+1)}
			| false {$$ = INSTRUCCION.nuevoValor($1.trim(), TIPO_VALOR.BOOLEANO, this._$.first_line,this._$.first_column+1)}
			| entero {$$ = INSTRUCCION.nuevoValor(Number($1.trim()), TIPO_VALOR.ENTERO, this._$.first_line,this._$.first_column+1)}
			| doble {$$ = INSTRUCCION.nuevoValor(Number($1.trim()), TIPO_VALOR.DOBLE, this._$.first_line,this._$.first_column+1)}
			| id cabre cabre EXPRESION ccierra ccierra { $$ = INSTRUCCION.accesoLista($1, $4, this._$.first_line, this._$.first_column+1) }
			| id cabre EXPRESION ccierra { $$ = INSTRUCCION.accesoVector($1, $3, this._$.first_line, this._$.first_column+1) }
			| id {$$ = INSTRUCCION.nuevoValor($1.trim(), TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)}
			| pabre CASTEO pcierra {$$=$2}
			| pabre TERNARIO pcierra {$$=$2}
			| LLAMADA { $$=$1; }
			| FUNCIONESRESERVADAS {$$=$1}
;

CASTEO: pabre TIPO pcierra EXPRESION { $$ = new INSTRUCCION.nuevoCasteo($2, $4, this._$.first_line, this._$.first_column+1) }
;

TERNARIO: EXPRESION interrogacion EXPRESION dospuntos EXPRESION { $$ = new INSTRUCCION.nuevoTernario($1, $3, $5, this._$.first_line, this._$.first_column+1) }
;

FUNCIONESRESERVADAS: FTOLOWER {$$=$1}
					| FTOUPPER {$$=$1}
					| FLENGTH {$$=$1}
					| FTRUNCATE {$$=$1}
					| FROUND {$$=$1}
					| FTYPEOF {$$=$1}
					| FTOSTRING {$$=$1}
					| FTOCHARARRAY {$$=$1}
;

FPRINT: prprint pabre EXPRESION pcierra ptcoma {$$ = new INSTRUCCION.nuevoImprimir($3, this._$.first_line,this._$.first_column+1)}
;

FTOLOWER: prtoLower pabre EXPRESION pcierra {$$ = new INSTRUCCION.toLower($3, this._$.first_line,this._$.first_column+1)}
;

FTOUPPER: prtoUpper pabre EXPRESION pcierra {$$ = new INSTRUCCION.toUpper($3, this._$.first_line,this._$.first_column+1)}
;

FLENGTH: prlength pabre EXPRESION pcierra {$$ = new INSTRUCCION.nuevoLength($3, this._$.first_line,this._$.first_column+1)}
;

FTRUNCATE: prtruncate pabre EXPRESION pcierra {$$ = new INSTRUCCION.nuevoTruncate($3, this._$.first_line,this._$.first_column+1)}
;

FROUND: prround pabre EXPRESION pcierra {$$ = new INSTRUCCION.nuevoRound($3, this._$.first_line,this._$.first_column+1)}
;

FTYPEOF: prtypeof pabre EXPRESION pcierra {$$ = new INSTRUCCION.nuevoTypeOf($3, this._$.first_line,this._$.first_column+1)}
;

FTOSTRING: prtoString pabre EXPRESION pcierra {$$ = new INSTRUCCION.nuevoToString($3, this._$.first_line,this._$.first_column+1)}
;

FTOCHARARRAY: prtoCharArray pabre EXPRESION pcierra {$$ = new INSTRUCCION.nuevoToCharArray($3, this._$.first_line,this._$.first_column+1)}
;

LLAMADA: id pabre LISTAVALORES pcierra {$$ = INSTRUCCION.nuevaLlamada($1, $3, this._$.first_line, this._$.first_column+1)}
		| id pabre pcierra {$$ = INSTRUCCION.nuevaLlamada($1, [], this._$.first_line, this._$.first_column+1)}
;

LISTAVALORES: LISTAVALORES coma VALORES {$1.push($3); $$=$1;}
			| VALORES {$$=[$1];}
;

VALORES: EXPRESION {$$=$1}
;

