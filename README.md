# optiCSS

This script when included in an HTML document which includes any declared styles (excluding those set by `style=""`) will output an optimized stylesheet to the console.

1. Ignore any `@` rules to leave responsive styles as is.
2. Separate the rules into single selector rules so we can test for inheritance later on.
3. Remove rules that apply to selectors which don't exist in the document thanks to [@RickHitchcock](http://stackoverflow.com/users/3903374/rick-hitchcock) for this.
4. Retrieve both the declared and computed styles in the same format (excluding percentages) and compares both values by checking whether the computed value matches the declared value, then it will remove the property and check again.
5. Check if the declared value matches the computed value and by removing the property the value changes, then set the keep flag. This tells us whether has an effect on an element and if no elements were affected by the setting... remove it.
6. If there are no properties in the remaining `CSSRule` then remove the rule.
7. As a side effect most selectors which don't change the browsers default setting will be removed (unless using `font` as opposed to `font-*` and similar which will activate the rest of the settings for that property).

##Usage

###Note: this is only meant to be run once

If you're running this script on a site which includes styles relating to dynamic elements, just wrap them in a media query and the script will leave them alone

    @media (min-width: 0px) {
        /* This says that these styles always apply */
    }

Include this line at the bottom of the body

    <script src="https://cdn.rawgit.com/humbleRumble/optiCSS/master/optiCSS.js" type="text/javascript"></script>

Then look at your console to see the optimized css. Copy and paste the results into one main css file.
