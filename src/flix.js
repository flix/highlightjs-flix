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
      begin: /\$\{/,
      end: /}/,
      endsParent: true,
      endScope: 'string'
    };

    // used in strings for escaping/interpolation/substitution
    const SUBST = {
      className: 'subst',
      variants: [
        { begin: '\\$[A-Za-z0-9_]+' },
        {
          begin: /\$\{/,
          end: /}/
        }
      ]
    };
  
    const STRING = {
      scope: 'string',
      begin: '"',
      end: '"',
      illegal: '\\n',
      contains: [ hljs.BACKSLASH_ESCAPE, INTERPOLATION ]
    };
  
    const TYPE = {
      className: 'type',
      begin: '\\b[A-Z][A-Za-z0-9_]*',
      relevance: 0
    };
  
    const NAME = {
      className: 'title',
      begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
      relevance: 0
    };
  
    const CLASS = {
      className: 'class',
      beginKeywords: 'class',
      end: /[:={\[\n;]/,
      excludeEnd: true,
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        {
          beginKeywords: 'with',
          relevance: 10,
          contains: [ TYPE ]
        },
        {
          begin: /\[/,
          end: /]/,
          excludeBegin: true,
          excludeEnd: true,
          relevance: 0,
          contains: [ TYPE ]
        },
        NAME
      ]
    };

    const METHOD = {
      className: 'function',
      beginKeywords: 'def',
      end: /[(\[]/, // Start of type parameters or formal parameters
      excludeEnd: true,
      contains: [
        { // Required type instances
          beginKeywords: 'with',
          relevance: 10,
          contains: [ TYPE ]
        },
        { // Effect set
          begin: /[&\\]/,
          end: /[}=]/,
          relevance: 9,
          contains: [ TYPE ]
        },
        NAME
      ]
    };
  
    const EXTENSION = {
      begin: [
        /^\s*/, // Is first token on the line
        'extension',
        /\s+(?=[[(])/, // followed by at least one space and `[` or `(`
      ],
      beginScope: { 2: "keyword", }
    };
  
    const END = {
      begin: [
        /^\s*/, // Is first token on the line
        /end/,
        /\s+/,
        /(extension\b)?/, // `extension` is the only marker that follows an `end` that cannot be captured by another rule.
      ],
      beginScope: {
        2: "keyword",
        4: "keyword",
      }
    };

    return {
      name: 'Flix',
      keywords: {
        literal: 'true false null', // Pure Impure Read Write IO ?
        keyword: 'instance lawful law type alias yield lazy force override def with let sealed pub object if then else for foreach import use new catch class case default try match enum and or not ref deref as eff upcast static spawn solve select region par namespace without do resume chan select inject project into from where query inline discard'
      },
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        STRING,
        NUMBER,
        TYPE,
        METHOD,
        CLASS,
        EXTENSION,
        END,
        ANNOTATION,
      ]
    };
  }
  