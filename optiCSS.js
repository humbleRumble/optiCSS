var stylesheets = document.styleSheets, stylesheet, i;
var ruleText = "", mediaText = "";
if(stylesheets && stylesheets.length) {
    for (i = 0; (stylesheet = stylesheets[i]); i++) {
        var rules = stylesheet.rules, rule, j;
        if(rules && rules.length) {
            for (j = 0; (rule = rules[j]); j++) {
                if(rule.type === rule.STYLE_RULE) {
                    if(rule.selectorText.indexOf(',') >= 0) {
                        var newRules = [];
                        var selectors = rule.selectorText.split(','), selector, k;
                        for(k = 0; (selector = selectors[k]); k++) {
                            var styles = rule.style, style, l;
                            var elements = document.querySelectorAll(selector.trim()), element, l;
                            if(elements.length) {
                                var styleString = '';
                                for(m = 0; (style = styles[m]); m++) {
                                    styleString += style + ': ' + styles.getPropertyValue(style) + "; ";
                                }
                                newRules.push((selector.trim() + ' { ' + styleString.trim() + ' }'));
                            }
                        }
                        stylesheet.deleteRule(j);
                        for(k = 0; (rule = newRules[k]); k++) {
                            stylesheet.insertRule(rule, j);
                        }
                    }
                }
            }
            for (j = 0; (rule = rules[j]); j++) {
                if(rule.type === rule.STYLE_RULE && rule.selectorText.indexOf(':') < 0) {
                    var styles = rule.style, style, k;
                    var elements = document.querySelectorAll(rule.selectorText);
                    if(elements && elements.length) {
                        for(k = 0; (style = styles[k]); k++) {
                            var value = styles.getPropertyValue(style);
                            if(value.indexOf('%') < 0) {
                                var elements = document.querySelectorAll(rule.selectorText), element, m;
                                var keep = false;
                                for(m = 0; (element = elements[m]); m++) {
                                    var computed = window.getComputedStyle(element).getPropertyValue(style);
                                    var match1 = value === computed;
                                    styles.removeProperty(style);
                                    var computed = window.getComputedStyle(element).getPropertyValue(style);
                                    var match2 = value === computed;
                                    styles.setProperty(style, value);
                                    if( match1 && !match2 ) {
                                        keep = true;
                                    }
                                }
                                if(!keep) {
                                    styles.removeProperty(style);
                                }
                            }
                        }
                        ruleText += rule.cssText + "\n";
                    }
                } else {
                    mediaText += rule.cssText + "\n";
                }
            }
        }
    }
}
var inp= ruleText.split('\n'), out= '', selectors= {};
inp.forEach(function(val) {
  if(val) {
    var selector= val.split(/ *{/)[0],
        styles= val.split(/{ */)[1].split('}')[0].split(/; */);
    selectors[selector] = selectors[selector] || {};
    styles.forEach(function(val) {
      if(val) {
        var st= val.split(/ *: */);
        selectors[selector][st[0]]= st[1]+';';
      }
    });
  }
});
for(var i in selectors) {
  out+= i+' '+JSON.stringify(selectors[i]).replace(/[,"]/g,'')+'\n';
}
document.body.innerHTML= '<pre>'+out+mediaText+'</pre>';
