{
  function compact(arr, i) {
      if(Array.isArray(i)) {
        var res = i.reduce(compact, []);
        if(res.length > 0) arr.push.apply(arr, res);
    } else if(i !== null) {
        arr.push(i);
    }
    return arr;
  }
}


start
 = result:( comment / _ / block / directive / linefeed )* {
 	return result.reduce(compact, [])
 }

directive
 =  name:directive_token _+ params:((directive_token _+) / directive_token)* ";" _* comment:comment? {
     return {
        type: 'directive',
        name: name.value,
        params: params.reduce(compact, []),
        comment: comment ? comment.text : null
    };
 }

directive_token
 = '"' chars:[^"]* '"' { return { value: chars.join(''), quoted: true, quotes: 'double' }; }
 / "'" chars:[^']* "'" { return { value: chars.join(''), quoted: true, quotes: 'simple' }; }
 / chars:[^ \n\r;#]+ { return { value: chars.join(''), quoted: false }; }

block
 = name:block_token _+ values:((block_token _+) / block_token)* "{"
_* comment:comment? children:start "}" {
 	return {
    	type: "block",
        name: name,
        values: values.reduce(compact, []),
        comment: comment ? comment.text : null,
        children: children
    }
 }

block_token
 = '"' chars:[^"]* '"' { return { value: chars.join(''), quoted: true, quotes: 'double' }; }
 / "'" chars:[^']* "'" { return { value: chars.join(''), quoted: true, quotes: 'simple' }; }
 / chars:[^ \n\r#{]+ { return { value: chars.join(''), quoted: false }; }

comment
 = "#" text:([^\n\r]*) linefeed { return { type: 'comment', text:
text.join('') }; }

linefeed
 = [\n\r] { return null; }

_ "whitespace"
 = [ \t] { return null; }
