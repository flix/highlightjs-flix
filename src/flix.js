/*
Language: Flix
Category: functional
Description: language definition for flix files
Website: https://flix.dev/
*/

export default function(hljs) {
    const ANNOTATION = {
      className: 'meta',
      begin: '@[A-Za-z]+'
    };


    const NUMBER_SUFFIX = '(f(32|64)|i(8|16|32|64)|ii)\?';
  
    const NUMBER = {
      scope: 'number',
      begin: hljs.C_NUMBER_RE + NUMBER_SUFFIX,
      relevance: 0
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
      className: 'string',
      variants: [
        {
          begin: '"""',
          end: '"""'
        },
        {
          begin: '"',
          end: '"',
          illegal: '\\n',
          contains: [ hljs.BACKSLASH_ESCAPE ]
        },
        {
          begin: '[a-z]+"',
          end: '"',
          illegal: '\\n',
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
          ]
        },
        {
          className: 'string',
          begin: '[a-z]+"""',
          end: '"""',
          contains: [ SUBST ],
          relevance: 10
        }
      ]
  
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
      scope: 'function',
      beginKeywords: 'def',
      end: /[(\[]/, // Start of type parameters or formal parameters
      excludeEnd: true,
      contains: [
        NAME
      ]
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
        ANNOTATION,
      ]
    };
  }
  