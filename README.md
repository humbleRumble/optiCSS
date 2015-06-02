#optiCSS  
(read: eye-pleasing)

This script when included in an HTML document which includes any declared styles (excluding those set by `style=""`) will output an optimized stylesheet to the page. The script uses the following methods...

1. Ignore any `@` and `:` rules to leave responsive and state styles as is.
2. Separate the rules into single selector rules so we can test for inheritance later on.
3. Remove rules that apply to selectors which don't exist in the document, thanks to [@RickHitchcock](http://stackoverflow.com/users/3903374/rick-hitchcock) for this.
4. Retrieve both the declared and computed styles in the same format (excluding percentages) then compare both values each other, then remove the property and check again.
5. if the declared value matches the computed value and by removing the property the value changes, then set the keep flag. This tells us whether the property has an effect on an element, if no elements were affected by the property... remove it.
6. If there are no properties in the remaining `CSSRule` then remove that rule.
7. As a side effect most selectors which don't change the browsers default setting will be removed (unless using `font` as opposed to `font-*` and similar which will activate the rest of the settings for that property).

##Usage

###Note: this is only meant to be run once

If you're running this script on a site which includes styles relating to dynamic elements, just wrap them in a media query and the script will leave them alone

    @media (min-width: 0px) {
        /* This says that these styles always apply */
    }

Include this line at the bottom of the body

    <script src="https://cdn.rawgit.com/humbleRumble/optiCSS/master/optiCSS.js" type="text/javascript"></script>

The new stylesheet will replace the contents of the page on completion. Keep in mind this can take a while.
