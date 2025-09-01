/*
Language: Flix
Category: functional
Description: language definition for flix files
Website: https://flix.dev/
*/

export default function(hljs) {
    const ANNOTATION = {
      scope: 'meta',
      begin: '@[A-Za-z]+'
    };

    const NUMBER_SUFFIX = '(f(32|64)|i(8|16|32|64)|ii)\?';

    const NUMBER = {
      scope: 'number',
      begin: hljs.C_NUMBER_RE + NUMBER_SUFFIX,
      relevance: 0
    };

    const INTERPOLATION = {
      scope: 'subst',
      begin: /(\$|\%)\{/,
      end: /\}/
    };

    const STRING = {
      scope: 'string',
      begin: '"',
      end: '"',
      illegal: '\\n',
      contains: [ hljs.BACKSLASH_ESCAPE, INTERPOLATION ]
    };

    const NAME = {
      scope: 'title',
      begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
      relevance: 0
    };

    const CLASS = {
      scope: 'title.class',
      beginKeywords: 'class enum',
      end: /[:={\[\n;\(]/,
      excludeEnd: true,
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        NAME
      ]
    };

    const METHOD = {
      scope: 'title.function',
      beginKeywords: 'def',
      end: /[(\[]/,
      excludeEnd: true,
      contains: [
        NAME
      ]
    };

    const HOLE = {
      scope: 'literal',
      variants: [
        {
          begin: /\?\?\?/
        },
        {
          begin: /\?/,
          contains: [
            NAME
          ]
        }
      ]
    };

    const KEYWORDS = [
      "alias",
      "as",
      "case",
      "catch",
      "checked_cast",
      "checked_ecast",
      "choose*",
      "choose",
      "def",
      "discard",
      "eff",
      "else",
      "ematch",
      "enum",
      "fix",
      "forall",
      "forA",
      "force",
      "foreach",
      "forM",
      "from",
      "handler",
      "if",
      "import",
      "inject",
      "instanceof",
      "instance",
      "into",
      "lawful",
      "law",
      "lazy",
      "let",
      "match",
      "mod",
      "new",
      "open_variant",
      "open_variant_as",
      "override",
      "par",
      "pub",
      "project",
      "pquery",
      "psolve",
      "query",
      "redef",
      "region",
      "restrictable",
      "run",
      "sealed",
      "select",
      "solve",
      "spawn",
      "struct",
      "throw",
      "trait",
      "try",
      "type",
      "typematch",
      "unchecked_cast",
      "unsafe",
      "unsafely",
      "use",
      "where",
      "with",
      "without",
      "yield",
      "xvar"
    ];

    const LITERALS = [
      "()",
      "true",
      "false",
      "Nil",
      "Some",
      "None",
      "LessThan",
      "EqualTo",
      "GreaterThan",
      "Ok",
      "Err",
      "null",
      "static"
    ];

    const TYPES = [
      "Unit",
      "Bool",
      "Char",
      "Float32",
      "Float64",
      "Int8",
      "Int16",
      "Int32",
      "Int64",
      "String",
      "BigInt",
      "Static",
      "Univ"
    ];

    const BUILTIN = [
      "dbg",
      "dbg!",
      "dbg!!",
      "IO",
      "ef",
      "ef1",
      "ef2",
      "Read",
      "Write",
      "Channel",
      "Eq",
      "PartialOrder",
      "Order",
      "Cmp",
      "List",
      "Map",
      "Set",
      "RedBlackTree",
      "Result",
      "Array",
      "ToString",
      "toString",
      "flip",
      "on",
      "identity",
      "fst",
      "snd",
      "swap",
      ">>",
      "|>",
      "||>",
      "!>",
      "print",
      "println",
      "bug!",
      "unreachable!",
      "and",
      "or",
      "not",
      "xor",
    ];

    return {
      name: 'Flix',
      keywords: {
        $pattern: hljs.IDENT_RE + '!?',
        keyword: KEYWORDS,
        literal: LITERALS,
        type: TYPES,
        built_in: BUILTIN
      },
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        STRING,
        NUMBER,
        METHOD,
        CLASS,
        ANNOTATION,
        HOLE
      ]
    };
  }
