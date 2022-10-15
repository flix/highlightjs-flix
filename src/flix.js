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
      beginKeywords: 'class|enum',
      end: /[:={\[\n;]|\(/,
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
      "instance",
      "lawful",
      "law",
      "type",
      "alias",
      "yield",
      "lazy",
      "force",
      "override",
      "def",
      "with",
      "let",
      "sealed",
      "pub",
      "object",
      "if",
      "then",
      "else",
      "for",
      "foreach",
      "import",
      "use",
      "get",
      "set",
      "new",
      "catch",
      "class",
      "case",
      "default",
      "try",
      "match",
      "enum",
      "and",
      "or",
      "not",
      "ref",
      "deref",
      "as",
      "eff",
      "upcast",
      "static",
      "spawn",
      "solve",
      "select",
      "region",
      "par",
      "namespace",
      "without",
      "do",
      "resume",
      "chan",
      "select",
      "inject",
      "project",
      "into",
      "from",
      "where",
      "query",
      "inline",
      "discard"
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
      "Err"
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
    ];

    const BUILTIN = [
      "debug",
      "debug!",
      "debug!!",
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
      "unreachable!"
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
  