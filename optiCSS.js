var stylesheets = document.styleSheets, stylesheet, i;
for (i = 0; (stylesheet = stylesheets[i]); i++) {
    var rules = stylesheet.rules, rule, j;
    if(!rules.length) continue;
    var newRules = [];
    for (j = 0; (rule = rules[j]); j++) {
        if(rule.type === rule.STYLE_RULE) {
            if(rule.selectorText.indexOf(',')) {
                var selectors = rule.selectorText.split(','), selector, k;
                for(k = 0; (selector = selectors[k]); k++) {
                    var styles = rule.style, style, l;
                    var elements = document.querySelectorAll(selector.trim()), element, l;
                    if(!elements.length) continue;
                    var styleString = '';
                    for(m = 0; (style = styles[m]); m++) {
                        styleString += style + ': ' + styles.getPropertyValue(style) + '; ';
                    }
                    newRules.push((selector.trim() + ' { ' + styleString.trim() + ' }'));
                }
                stylesheet.deleteRule(j);
            }
        }
    }
    if(newRules.length) {
        var rule, j;
        for(j = 0; (rule = newRules[j]); j++) {
            stylesheet.insertRule(rule, 0);
        }
    }
    var ruleText = "";
    for (j = 0; (rule = rules[j]); j++) {
        if(rule.type === rule.STYLE_RULE) {
            var styles = rule.style, style, k;
            var elements = document.querySelectorAll(rule.selectorText);
            if(!elements.length) continue;
            for(k = 0; (style = styles[k]); k++) {
                var value = styles.getPropertyValue(style);
                if(value.indexOf('%') < 0) {
                    var keep = false;
                    var elements = document.querySelectorAll(rule.selectorText), element, m;
                    if(!elements.length) continue;
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
            if (styles.length) {
                ruleText += rule.cssText + "\n";
            }
        } else {
            ruleText += rule.cssText + "\n";
        }
    }
    document.body.innerHTML = '<pre>' + ruleText + '<pre>';
}
